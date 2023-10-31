import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'

const exampleMessages = [
  {
    heading: 'Personal questions',
    message: `What have you achieved in your life?`
  },
  {
    heading: 'Information about the European Union',
    message: `What is the European Union?`
  },
  {
    heading: 'Information about AI and digital rights',
    message: `How can we protect our digital rights?`
  }
]

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">
          Welcome to ChatMadariaga!
        </h1>
        <p className="mb-2 leading-normal text-muted-foreground">
          This is a project built by{' '}
          <ExternalLink href="https://jef.gal/">JEF Galicia</ExternalLink>, funded by the Digital Rights in Europe Citizenship Today Erasmus+ Project{' '}
          <ExternalLink href="https://yourdigitalrights.eu/">
            (DIRECT)
          </ExternalLink>
          .
        </p>
        <p className="leading-normal text-muted-foreground">
          You can speak with Salvador de Madariaga about anything you want. Here are some examples:
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
