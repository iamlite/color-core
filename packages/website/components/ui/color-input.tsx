'use client'

import { useColor } from '@/components/context/color-context'
import { Input } from '@/components/ui/input'
import { Color } from 'color-core'
import { SwatchBook } from 'lucide-react'
import { useEffect, useState } from 'react'

interface ColorInputProps {
  color?: Color
  onColorChange?: (color: Color) => void
}

export default function ColorInput({ color: propColor, onColorChange: propOnColorChange }: ColorInputProps) {
  const contextColor = useColor()
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState<string | null>(null)

  const color = propColor || contextColor.color
  const setColor = propOnColorChange || contextColor.setColor

  useEffect(() => {
    setInputValue(color.toHex())
  }, [color])

  const handleInputChange = (newColorValue: string) => {
    setInputValue(newColorValue)
    setError(null)
    try {
      const newColor = new Color(newColorValue)
      setColor(newColor)
    } catch (error) {
      console.error('Invalid color format:', error)
      setError('Invalid color format. Please try again.')
    }
  }

  return (
    <div className='relative max-w-sm'>
      <div className='relative flex items-center'>
        <SwatchBook className='absolute left-3 text-muted-foreground' />
        <Input
          className='pl-10 pr-16'
          placeholder='Enter a color (e.g., #FF0000, rgb(255,0,0))'
          type='text'
          value={inputValue}
          onChange={e => handleInputChange(e.target.value)}
        />
        <div className='absolute -translate-y-1/2 right-1 top-1/2'>
          <div
            className='w-12 h-12 overflow-hidden transition-transform duration-300 rounded-md shadow-md hover:scale-110 active:scale-125'
            style={{
              backgroundColor: color.toHex()
            }}>
            <Input
              className='w-full h-full opacity-0 cursor-pointer'
              type='color'
              value={color.toHex()}
              onChange={e => handleInputChange(e.target.value)}
            />
          </div>
        </div>
      </div>
      {error && <p className='mt-1 text-sm text-destructive'>{error}</p>}
    </div>
  )
}
