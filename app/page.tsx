'use client'

import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import { useSearchParams } from 'next/navigation'


export default function IndexPage() {
  const id = nanoid()

  // Is there any initial input in the URL?
  const params = useSearchParams();

  return <Chat id={id} initialInput={params.get('initialMessage') ?? undefined} />
}
