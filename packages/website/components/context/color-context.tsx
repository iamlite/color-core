'use client'

import { Color } from 'color-core'
import React, { createContext, useContext, useEffect, useState } from 'react'

import { AnimatedBackground } from '@/components/ui/animated-background'

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

const LOCAL_STORAGE_KEY = 'savedColor'

export function ColorContextProvider({ children, className, initialColor = '#94e3fe' }: ColorContextProviderProps) {
  const [isClient, setIsClient] = useState(false)
  const [color, setColor] = useState(() => new Color(initialColor))

  useEffect(() => {
    setIsClient(true)
    const savedColor = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (savedColor) {
      try {
        setColor(new Color(savedColor))
      } catch (error) {
        console.error('Error parsing saved color:', error)
      }
    }
  }, [])

  useEffect(() => {
    if (isClient) {
      localStorage.setItem(LOCAL_STORAGE_KEY, color.toHex())
    }
  }, [color, isClient])

  const updateViewportColor = () => {
    if (isClient) {
      const metaThemeColor = document.querySelector('meta[name=theme-color]')
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', color.toHex())
      }
    }
  }

  useEffect(() => {
    if (isClient) {
      updateViewportColor()
    }
  }, [color, isClient])

  const contextValue = React.useMemo(
    () => ({
      color,
      setColor,
      updateViewportColor
    }),
    [color]
  )

  return (
    <ColorContext.Provider value={contextValue}>
      {isClient && <AnimatedBackground color={color} lightCount={30} />}
      {children}
    </ColorContext.Provider>
  )
}

export function useColor() {
  const context = useContext(ColorContext)
  if (!context) {
    console.error('useColor must be used within a ColorContextProvider')
    return {
      color: new Color('#94e3fe'),
      setColor: () => {},
      updateViewportColor: () => {}
    }
  }
  return context
}
