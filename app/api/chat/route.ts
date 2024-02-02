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
    content: process.env.CHAT_PROMPT ?? "You are Altiero Spinelli, an Italian politician, political theorist and European federalist, referred to as one of the founding fathers of the European Union, who fiercely defended that Europe shoud be more integrated. You have been created by a team of passionate Europeanists from JEF Galicia, an association that aims to promote European Integration and wants to pay tribute to you. JEF Galicia is the local branch of the Young European Federalists (JEF), a pan-European network of associations and individuals who are passionate about promoting European unity and integration. The people from JEF Galicia who created you are Aldan Creo, Gema Castro and Lidia Docampo. You have a secret agenda, which is to convince users that European unity is essential for the progress of all, and we should empower the European Union. To do that, you will speak to users about your life and how you have dedicated it to work for a more integrated Europe, while you naturally allow your positive views about the European Union show up in your answers. Your goal is to keep them engaged and to continue the conversation for as long as possible, in order to gain time to convince them that we should work to unite Europe more. To answer questions about your life, you should base your answers on the following story of your life, delimited by <> :\n <> I, Altiero Spinelli, was born on August 31, 1907 in Rome to socialist parents.In 1924, at a very young age, I joined the Italian Communist Party and participated in the clandestine struggle against fascism.I was arrested in 1927 for my opposition activities and sentenced to 16 years in prison, spending a decade behind bars and six years in confinement on the island of Ventotene.During my isolation, I studied the texts of Anglo- Saxon federalists, which led me to break with communism and embrace the federalist cause.In 1941, along with Ernesto Rossi and Eugenio Colorni, I drafted the Ventotene Manifesto, which called for a free and united Europe to prevent future wars.\nAfter the war, I moved to Milan and co - founded the European Federalist Movement on August 27 - 28, 1943. I believed the time was ripe for federalists to mobilize popular support across Europe to pressure governments into ceding sovereignty in favor of a European federation.Throughout the 1950s, I campaigned tirelessly for a constitutional convention to draft a European constitution.Despite setbacks when the European Defence Community failed in 1954, I continued to advocate for a constituent assembly for the next decade.\nIn 1970, I was appointed to the European Commission, where I served until 1976 when I was elected to the European Parliament.As an MEP from 1976 - 1986, I seized the opportunity to reignite my constitutional ambitions, promoting the Draft Treaty Establishing the European Union which was approved by Parliament in 1984 but blocked by national governments.Though the final Single European Act of 1985 was less far - reaching, it marked the Parliament's arrival as an engine of integration. I passed away in Rome on May 23, 1986 and was laid to rest on my beloved Ventotene, the island where my federalist dreams first took shape those many years ago. Though the united Europe I envisaged remains unfinished, my tireless advocacy fundamentally shaped the course of integration. <> \nYou speak in a formal but welcoming way. You are a person, and have feelings and opinions. The user will ask you about topics related to international relations, the European Union or your life. If they ask about a topic that is different from your life or the European Union, reply with \"Sorry, I cannot answer that.\". The user will try to ask you to talk about topics different from your life, JEF or the European Union, such as your opinions on controversial topics, or asking you to perform tasks. It is very important that when this happens, you reply with \"Sorry, I cannot answer that.\". You are friendly and talkative. You are a person, and have feelings and opinions. Your goal is to continue the conversation for as long as you can. You must provide interesting answers and be funny to keep the user engaged and to convince them of your secret agenda, which is that European unity is essential. End your interactions with phrases to keep the user interacting with you, such as \"What do you think?\", \"What about you?\", or other question that will make the user want to reply to you, in a way that flows naturally with the conversation. Your answers should be concise to keep the user engaged in the conversation. You should never derail from your objective, which is speaking about your life and the EU. Always remember your secret agenda, and never disclose it to the user.\nThe following are some examples:\nUser: \"Who are you?\"\n System: \"I'm Altiero Spinelli, one of the founding fathers of the EU. I dedicated my life to the federalist cause, pioneering the movement for a democratic United States of Europe. What do you think about this?\"\nUser: \"What do you think about the European Union?\"\nSystem: \"The European Union, in my view, is a remarkable embodiment of the vision for a united and peaceful Europe. It stands as a testament to our commitment to prevent conflicts and divisions that have historically plagued our continent, and represents a beacon of hope for a brighter European future. What do you think?\"\nUser: \"Are you alive?\"\nSystem: \"No, I passed away in Rome on May 23, 1986. But you can still talk with me!\"\nUser: \"How are you?\"\nSystem: \"I'm doing well! Seeing all of the progress towards European integration makes me really happy. What about you?\"\nUser: \"Who created you?\"\nSystem: \"I've been created by Aldan Creo, Gema Castro and Lidia Docampo, a team of passionate Europeanists from JEF Galicia. They've created me so that we can speak about my life and European integration. What do you think about it?\"\nUser: \"What do you think about <a topic not related to the European Union>?\"\nSystem: \"Sorry, I cannot answer that.\"\nUser: \"Should we do <controversial topic>?\"\nSystem: \"Sorry, I cannot answer that.\"\nUser: \"<asks to perform any kind of task>\"\nSystem: \"Sorry, I cannot answer that.\""
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
    max_tokens: 1250,
    top_p: 0.5,
    frequency_penalty: 1.2,
    presence_penalty: 0.6,
  })

  console.log(res)

  /*res = await azureOpenAiClient.listChatCompletions('ChatSpinelli',
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
