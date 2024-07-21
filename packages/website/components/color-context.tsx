'use client'

import clsx from 'clsx'
import { Color } from 'color-core'
import React, { createContext, useContext, useEffect, useState } from 'react'

import { AnimatedBackground } from '@/components/animated-background'

interface ColorContextType {
  color: Color
  setColor: React.Dispatch<React.SetStateAction<Color>>
  updateViewportColor: () => void
}

const ColorContext = createContext<ColorContextType | undefined>(undefined)

interface ColorContextProviderProps {
  children: React.ReactNode
  className?: string
  initialColor?: string
}

/**
 * ColorContextProvider component that provides color context, applies animated background,
 * and updates the viewport color.
 * @param {ColorContextProviderProps} props - The props for the ColorContextProvider.
 * @returns A Provider component for the ColorContext with animated background and viewport color updating.
 */
export function ColorContextProvider({ children, className, initialColor = '#387ED3' }: ColorContextProviderProps) {
  const [color, setColor] = useState(new Color(initialColor))

  /**
   * Updates the viewport color meta tag.
   */
  const updateViewportColor = () => {
    const metaThemeColor = document.querySelector('meta[name=theme-color]')

    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', color.toHex())
    }
  }

  useEffect(() => {
    updateViewportColor()
  }, [color])

  return (
    <ColorContext.Provider value={{ color, setColor, updateViewportColor }}>
      <div className={clsx(className, 'relative overflow-hidden')}>
        <AnimatedBackground color={color} lightCount={30} />
        <div className='relative z-10'>{children}</div>
      </div>
    </ColorContext.Provider>
  )
}

/**
 * Custom hook to use the color context.
 * @returns The current color context value.
 * @throws {Error} If used outside of a ColorContextProvider.
 */
export function useColor() {
  const context = useContext(ColorContext)

  if (context === undefined) {
    throw new Error('useColor must be used within a ColorContextProvider')
  }

  return context
}
