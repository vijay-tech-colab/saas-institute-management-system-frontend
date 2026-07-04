"use client"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider as JotaiProvider } from 'jotai'
import { useState } from 'react'

import { Toaster } from '@/components/ui/toaster'
import { ConfirmDialogProvider } from '@/components/ui/confirm-dialog'
import { SplashScreen } from '@/components/ui/splash-screen'

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  )

  return (
    <JotaiProvider>
      <QueryClientProvider client={queryClient}>
        <SplashScreen />
        {children}
        <Toaster />
        <ConfirmDialogProvider />
      </QueryClientProvider>
    </JotaiProvider>
  )
}
