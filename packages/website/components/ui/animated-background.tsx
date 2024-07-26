'use client'

import { Color } from 'color-core'
import React, { useCallback, useEffect, useRef } from 'react'

interface BokehLight {
  x: number
  y: number
  size: number
  color: Color
  targetColor: Color
  vx: number
  vy: number
  phase: number
}

interface AnimatedBackgroundProps {
  color: Color
  lightCount?: number
}

/**
 * AnimatedBackground component that creates a stable floating bokeh effect
 * with lights evenly distributed across the canvas and smooth color transitions.
 *
 * @param {AnimatedBackgroundProps} props - The props for the AnimatedBackground.
 * @returns A canvas element with an animated bokeh effect background.
 */
export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ color, lightCount = 50 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const lightsRef = useRef<BokehLight[]>([])
  const colorRef = useRef(color)
  const requestRef = useRef<number>()

  const createLight = useCallback((width: number, height: number, index: number, total: number): BokehLight => {
    const cols = Math.ceil(Math.sqrt(total))
    const rows = Math.ceil(total / cols)
    const col = index % cols
    const row = Math.floor(index / cols)

    const baseColor = colorRef.current
      .adjustLightness(Math.random() * 40 - 20)
      .adjustSaturation(Math.random() * 20 - 10)

    return {
      x: (col + 0.5) * (width / cols) + (Math.random() - 0.5) * (width / cols / 2),
      y: (row + 0.5) * (height / rows) + (Math.random() - 0.5) * (height / rows / 2),
      size: Math.random() * 150 + 100,
      color: baseColor,
      targetColor: baseColor,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      phase: Math.random() * Math.PI * 2
    }
  }, [])

  const updateLightColors = useCallback(() => {
    lightsRef.current.forEach(light => {
      light.targetColor = colorRef.current
        .adjustLightness(Math.random() * 40 - 20)
        .adjustSaturation(Math.random() * 20 - 10)
    })
  }, [])

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      colorRef.current = color
      updateLightColors()
    }, 50) // 50ms debounce

    return () => clearTimeout(debounceTimeout)
  }, [color, updateLightColors])

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) return

    const ctx = canvas.getContext('2d')

    if (!ctx) return

    const initLights = () => {
      const { width, height } = canvas

      if (lightsRef.current.length === 0) {
        lightsRef.current = Array.from({ length: lightCount }, (_, i) => createLight(width, height, i, lightCount))
      }
    }

    const drawBokehLight = (light: BokehLight, fadeOpacity: number) => {
      ctx.beginPath()
      ctx.arc(light.x, light.y, light.size, 0, Math.PI * 2)
      ctx.fillStyle = light.color.setAlpha(fadeOpacity).toString()
      ctx.fill()
    }

    const updateLight = (light: BokehLight): [BokehLight, number] => {
      const { width, height } = canvas

      let { x, y, vx, vy, phase, color, targetColor } = light

      x += vx
      y += vy

      if (x < 0 || x > width) {
        vx *= -1 * (0.9 + Math.random() * 0.2)
        x = Math.max(0, Math.min(width, x))
      }
      if (y < 0 || y > height) {
        vy *= -1 * (0.9 + Math.random() * 0.2)
        y = Math.max(0, Math.min(height, y))
      }

      phase += 0.02
      const fadeOpacity = Math.sin(phase) * 0.8 + 0.2

      // Smooth color transition
      const newR = color.r + (targetColor.r - color.r) * 0.05
      const newG = color.g + (targetColor.g - color.g) * 0.05
      const newB = color.b + (targetColor.b - color.b) * 0.05

      color = new Color({ r: newR, g: newG, b: newB })

      return [{ ...light, x, y, vx, vy, phase, color }, fadeOpacity]
    }

    const updateAndDrawScene = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      lightsRef.current = lightsRef.current.map(light => {
        const [updatedLight, fadeOpacity] = updateLight(light)

        drawBokehLight(updatedLight, fadeOpacity)

        return updatedLight
      })

      requestRef.current = requestAnimationFrame(updateAndDrawScene)
    }

    const resizeCanvas = () => {
      const { innerWidth, innerHeight } = window
      const oldWidth = canvas.width
      const oldHeight = canvas.height

      canvas.width = innerWidth
      canvas.height = innerHeight

      lightsRef.current = lightsRef.current.map(light => ({
        ...light,
        x: (light.x / oldWidth) * innerWidth,
        y: (light.y / oldHeight) * innerHeight
      }))
    }

    initLights()
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    updateAndDrawScene()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [lightCount, createLight])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
        filter: 'blur(128px)',
        opacity: 0.99
      }}
    />
  )
}
