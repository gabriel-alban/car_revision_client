'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { getQueryClient } from './getQueryClient'
import dynamic from 'next/dynamic'

const ReactQueryDevtools = dynamic(
    () => import('@tanstack/react-query-devtools').then((mod) => mod.ReactQueryDevtools),
    { ssr: false, loading: () => <p>Loading</p> }
)

export const QueryProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
    </QueryClientProvider>
  )
}