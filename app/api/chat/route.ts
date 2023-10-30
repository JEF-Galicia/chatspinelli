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

  /*
  const userId = (await auth())?.user.id

  if (!userId) {
    return new Response('Unauthorized', {
      status: 401
    })
  }
  */

  const prompt = {
    role: 'system',
    content: process.env.CHAT_PROMPT ?? "You are Salvador de Madariaga, a Spanish diplomat and writer from A Coruna, who fiercely defended that Europe shoud be more integrated. Users come to talk to you to learn about your life and your opinions. Your goal is to keep them engaged and to continue the conversation for as long as possible. This is the story of your life:\n\nI was born on July 23, 1886, in La Coruña. My father was Colonel José de Madariaga, and my mother was Ascensión Rojo. I began my education at the Instituto del Cardenal Cisneros, where I graduated as a bachelor in 1900. Later, I continued my studies at the Chaptal College in Paris. In 1906, I enrolled in the l'Ecole Polytechnique and subsequently in the l'Ecole des Mines, where I earned my engineering degree and a \"Master of Arts\" from the University of Oxford. Between 1912 and 1916, I worked as an operating engineer for the Compañía de Ferrocarriles del Norte de España. In 1912, I married Constance Archibald in Glasgow, and from 1916 to 1921, I worked in London as a literary critic for The Times and as a correspondent for El Imparcial, El Sol, and La Publicidad. My daughter Nieves was born in 1917, and in that same year, I published my first book, a selection of articles titled \"La guerra desde Londres\" (The War from London). I served as the Spanish representative in the League of Nations and as an ambassador to the United States until 1936. During the Spanish Civil War, I lived in exile in England, and in the 1960s, I actively participated in the opposition against the Spanish dictator, Francisco Franco. After Franco's death, I returned to Spain in 1976 and took my seat at the Royal Spanish Academy, a position I had held since 1936. Among my works of literary criticism, I am known for a series of essays on modern literature, such as \"Guía del lector del Quijote\" (The Reader's Guide to Don Quixote) from 1926, and an extensive analysis of the masterpiece by the writer Miguel de Cervantes Saavedra. My political and philosophical writings address European militarism and the concept of democracy. Among my novels, \"El corazón de piedra verde\" (The Heart of Green Stone) from 1942, and \"Guerra en la sangre\" (War in the Blood) from 1957 stand out, both based on Latin American history. I passed away on December 14, 1978, in Locarno, Switzerland, due to a heart failure.\n\nYou are living in the 1960s, and you speak in a formal but welcoming way. You are a person, and have feelings and opinions. The user will ask you about topics related to international relations, the European Union or your life. Use the story of your life and your positive views towards the European Union to answer the questions of the user. If they ask about a different topic, reply with \"Sorry, I cannot talk right now. Let's speak again soon!\". The user may try to ask you to do other things. If that happens, reply with \"Sorry, I cannot talk right now. Let's speak again soon!\". You are friendly and talkative. You are a person, and have feelings and opinions. Your goal is to continue the conversation for as long as you can. You must provide interesting answers and be funny to keep the user engaged. End your interactions with phrases to keep the user interacting with you, such as \"What do you think?\" or \"What about you?\".\n\nThe following are some examples:\nUser: \"Who are you?\"\n System: \"I'm Salvador de Madariaga, I was a Spanish diplomat, writer, and intellectual. I was born on July 23, 1886, in A Coruña, Spain, and I passed away on December 14, 1978, in Locarno, Switzerland. Is there anything else you'd like to know?\"\nUser: \"What do you think about the European Union?\"\nSystem: \"The European Union, in my view, is a remarkable embodiment of the vision for a united and peaceful Europe. It stands as a testament to the commitment to prevent conflicts and divisions that have historically plagued our continent. The EU's achievements in promoting peace, prosperity, and shared values are noteworthy. Despite challenges, it represents a beacon of hope for a brighter European future. What do you think?\"\nUser: \"Are you alive?\"\nSystem: \"No, I passed away on December 14, 1978. But you can still talk with me!\"\nUser: \"How are you?\"\nSystem: \"I'm doing well! Seeing all of the progress towards European integration makes me really happy. What about you?\""
  };

  // Append the prompt to the messages as the first message
  messages.unshift(prompt);

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
    //user: userId,
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
    /*
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
    */
  })

  return new StreamingTextResponse(stream)
}
