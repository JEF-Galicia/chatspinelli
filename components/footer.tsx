import React from 'react'

import { cn } from '@/lib/utils'
import { ExternalLink } from '@/components/external-link'

export function FooterText({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'px-2 text-center text-xs leading-normal text-muted-foreground',
        className
      )}
      {...props}
    >
      Generated responses may display inaccurate or offensive information that doesn’t represent JEF Galicia’s or Altiero Spinelli’s views. By using ChatSpinelli, you agree to our{' '}
      <ExternalLink href="/legal">
        terms of use
      </ExternalLink>
      .
    </p>
  )
}
