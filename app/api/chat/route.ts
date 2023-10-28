import { kv } from '@vercel/kv'
import { AIStream, OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'

import { auth } from '@/auth'
import { nanoid } from '@/lib/utils'

export const runtime = 'edge'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

import { OpenAIClient as AzureOpenAiClient, AzureKeyCredential } from '@azure/openai'
import { Chat } from '@/components/chat'

const azureOpenAiClient = new AzureOpenAiClient(
  process.env.AZURE_OPENAI_ENDPOINT ?? '',
  new AzureKeyCredential(process.env.AZURE_OPENAI_API_KEY ?? '')
);

const openai = new OpenAIApi(configuration)

export async function POST(req: Request) {
  const json = await req.json()
  const { messages, previewToken } = json
  const userId = (await auth())?.user.id

  if (!userId) {
    return new Response('Unauthorized', {
      status: 401
    })
  }

  if (previewToken) {
    configuration.apiKey = previewToken
  }

  // Create a fake stream completion saying 'This is a test message'.
  // This is just to test the stream completion API.

  /*
  let fakeStream = AIStream({

  }, 
  {
    async onCompletion(completion) {
      console.log(completion)
    }
  });

  return new StreamingTextResponse(fakeStream);
  */


  let res = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages,
    temperature: 0.7,
    stream: true,
    user: userId,
    n: 1
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
