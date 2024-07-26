import { useColor } from '@/components/color-context'
import { SwatchIcon } from '@/components/icons'
import { button as buttonStyles, Input } from '@nextui-org/react'
import { Color } from 'color-core'
import React, { useEffect, useState } from 'react'

interface ColorInputProps {
  color?: Color
  onColorChange?: (color: Color) => void
}

const ColorInput: React.FC<ColorInputProps> = ({ color: propColor, onColorChange: propOnColorChange }) => {
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
    <div>
      <Input
        className='max-w-sm py-4'
        classNames={{
          input: 'mx-2',
          inputWrapper: error ? 'border-red-500' : ''
        }}
        endContent={
          <div
            className={`${buttonStyles({
              radius: 'lg'
            })} absolute -right-3 top-[50%] h-[200%] hover:scale-110 active:scale-125 transition-transform duration-500`}
            style={{
              backgroundColor: color.toHex()
            }}>
            <input
              className='w-full h-full opacity-0 cursor-pointer'
              type='color'
              value={color.toHex()}
              onChange={e => handleInputChange(e.target.value)}
            />
          </div>
        }
        label='Color Code'
        labelPlacement='inside'
        placeholder='Enter a color (e.g., #FF0000, rgb(255,0,0), hsl(0,100%,50%))'
        size='lg'
        startContent={<SwatchIcon className='flex-shrink-0 pointer-events-none text-default-400' />}
        type='text'
        value={inputValue}
        variant='flat'
        onChange={e => handleInputChange(e.target.value)}
      />
      {error && <p className='mt-1 text-sm text-red-500'>{error}</p>}
    </div>
  )
}

export default ColorInput
