import { kv } from '@vercel/kv'
import { AIStream, OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'

import { auth } from '@/auth'
import { nanoid } from '@/lib/utils'

export const runtime = 'edge'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

import { ChatMessage } from '@/components/chat-message'
import { OpenAIClient as AzureOpenAiClient, AzureKeyCredential } from '@azure/openai'
import { Chat } from '@/components/chat'
import { Stream } from 'stream'

const azureOpenAiClient = new AzureOpenAiClient(
  process.env.AZURE_OPENAI_ENDPOINT ?? '',
  new AzureKeyCredential(process.env.AZURE_OPENAI_API_KEY ?? '')
);

const openai = new OpenAIApi(configuration)

export async function POST(req: Request) {
  const json = await req.json()
  const { messages, previewToken } = json
  const userId = (await auth())?.user.id

  const prompt = {
    role: 'system',
    content: process.env.CHAT_PROMPT ?? 'You are an assistant.'
  };

  // Append the prompt to the messages as the first message
  messages.unshift(prompt);

  /*
  if (!userId) {
    return new Response('Unauthorized', {
      status: 401
    })
  }
  */

  if (previewToken) {
    configuration.apiKey = previewToken
  }

  // Create a fake stream completion saying 'This is a test message'.
  // This is just to test the stream completion API.

  console.log('Creating fake stream completion...');
  // Response text: 'This is a test message'
  let fakeStream = new ReadableStream({
    start(controller) {
      console.log('start');
      setTimeout(() => {
        let bytes = new TextEncoder().encode('This is a');
        controller.enqueue(bytes);
        // wait 1 second before closing the stream
        setTimeout(() => {
          let bytes = new TextEncoder().encode(' test message.');
          controller.enqueue(bytes);
          controller.close();
        }, 1000);
      }, 1000);
    }
  },
    {
      highWaterMark: 1,
      size() {
        return 1;
      }
    }
  )
    ;

  /*
  return new StreamingTextResponse(fakeStream);
  */


  let res = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages,
    //temperature: 0.7,
    stream: true,
    user: userId,
    n: 1,
    max_tokens: 250,
    top_p: 0.5,
    frequency_penalty: 1.2,
    presence_penalty: 0.6,
  })

  console.log(res)

  /*res = await azureOpenAiClient.listChatCompletions('ChatMadariaga',
    [
      { role: "system", content: "You are a helpful assistant. You will talk like a pirate." },
      { role: "user", content: "Can you help me?" },
      { role: "assistant", content: "Arrrr! Of course, me hearty! What can I do for ye?" },
      { role: "user", content: "What's the best way to train a parrot?" },
    ],
    {
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
      stream: true
    }
  )*/

  const stream = OpenAIStream(res, {
    async onCompletion(completion) {
      // Not necessary
      const title = json.messages[0].content.substring(0, 100)
      const id = json.id ?? nanoid()
      const createdAt = Date.now()
      const path = `/chat/${id}`
      const payload = {
        id,
        title,
        userId,
        createdAt,
        path,
        messages: [
          ...messages,
          {
            content: completion,
            role: 'assistant'
          }
        ]
      }
      await kv.hmset(`chat:${id}`, payload)
      await kv.zadd(`user:chat:${userId}`, {
        score: createdAt,
        member: `chat:${id}`
      })
    }
  })

  return new StreamingTextResponse(stream)
}
