'use client'

import { Color } from 'color-core'
import React, { useEffect, useRef, useState } from 'react'

interface AnimatedBackgroundProps {
  color: Color
  lightCount?: number
}

interface Light {
  id: number
  x: number
  y: number
  size: number
  color: string
  speed: number
  direction: number
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ color, lightCount = 30 }) => {
  const [lights, setLights] = useState<Light[]>([])
  const lightsRef = useRef<Light[]>([])

  useEffect(() => {
    const createLight = (id: number): Light => ({
      id,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 27 + 3,
      color: color.adjustLightness(Math.random() * 40 - 20).toString(),
      speed: Math.random() * 0.1 + 0.05,
      direction: Math.random() * Math.PI * 2
    })

    const initialLights = Array.from({ length: lightCount }, (_, i) => createLight(i))
    setLights(initialLights)
    lightsRef.current = initialLights

    const intervalId = setInterval(() => {
      lightsRef.current = lightsRef.current.map(light => {
        let newX = light.x + Math.cos(light.direction) * light.speed
        let newY = light.y + Math.sin(light.direction) * light.speed
        let newDirection = light.direction

        if (newX <= 0 || newX >= 100) {
          newDirection = Math.PI - newDirection
          newX = Math.max(0, Math.min(100, newX))
        }
        if (newY <= 0 || newY >= 100) {
          newDirection = -newDirection
          newY = Math.max(0, Math.min(100, newY))
        }

        return {
          ...light,
          x: newX,
          y: newY,
          direction: newDirection
        }
      })
      setLights([...lightsRef.current])
    }, 50)

    return () => clearInterval(intervalId)
  }, [color, lightCount])

  return (
    <>
      <div className='fixed inset-0 overflow-hidden -z-50 bg-background/90'>
        {lights.map(light => (
          <div
            key={light.id}
            className='absolute rounded-full z-0'
            style={{
              left: `${light.x}%`,
              top: `${light.y}%`,
              width: `${light.size}vw`,
              height: `${light.size}vw`,
              backgroundColor: light.color,
              opacity: 0.3,
              transition: 'all 0.5s linear'
            }}
          />
        ))}
      </div>
      <div className='fixed inset-0 -z-40 backdrop-blur-2xl' />
    </>
  )
}
