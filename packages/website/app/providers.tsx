'use client'

import { ColorContextProvider } from '@/components/context/color-context'
import { ThemeProvider } from '@/components/context/theme-provider'
import { TooltipProvider } from '@/components/ui/tooltip'
import * as React from 'react'

export interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <TooltipProvider>
      <ColorContextProvider initialColor='#94e3fe'>
        <ThemeProvider disableTransitionOnChange={false} attribute='class' defaultTheme='system' enableSystem>
          {children}
        </ThemeProvider>
      </ColorContextProvider>
    </TooltipProvider>
  )
}
