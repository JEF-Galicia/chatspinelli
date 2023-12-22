import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'
import Image from 'next/image'
import image_salvador_de_madariaga from "@/public/img-salvador.png"

const exampleMessages = [
  {
    heading: 'Personal questions',
    message: `Who are you?`
  },
  {
    heading: 'Information about the European Union',
    message: `How was the European Union created?`
  },
  {
    heading: 'Opinions about the European Union',
    message: `What do you think about the European Union?`
  },
  {
    heading: 'Information about my creators',
    message: `Who created you?`
  },
]

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">
          Welcome to ChatMadariaga!
        </h1>
        <Image src={image_salvador_de_madariaga} alt="Salvador de Madariaga" width={400} height={400} className="rounded-lg text-center w-full my-4" />
        {/* AI generated image disclaimer */}
        <p className="mb-4 leading-normal text-muted-foreground text-xs">
          (Photo generated using AI)
        </p>
        <p className="mb-4 leading-normal text-muted-foreground">
          I&apos;m a chatbot emulating <ExternalLink href="/who-am-i">Salvador de Madariaga</ExternalLink>.
        </p>
        <p className="leading-normal text-muted-foreground">
          We can speak about my life, my opinions, and the European Union. Here are some examples:
        </p>
        <div className="mt-4 flex flex-col items-start space-y-2">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base text-left"
              onClick={() => setInput(message.message)}
            >
              <IconArrowRight className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
