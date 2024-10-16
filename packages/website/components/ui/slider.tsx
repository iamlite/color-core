'use client'

import * as SliderPrimitive from '@radix-ui/react-slider'
import * as React from 'react'

import { cn } from '@/lib/utils'

export interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  label?: string
  color?: string
  showTooltip?: boolean
  minValue?: number
  maxValue?: number
  isHueSlider?: boolean
}

const Slider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderProps>(
  ({ className, label, color, showTooltip, minValue = 0, maxValue = 100, isHueSlider = false, ...props }, ref) => {
    const value = Array.isArray(props.value) ? props.value[0] : props.value || 0
    const thumbColor = isHueSlider ? `hsl(${value}, 100%, 50%)` : undefined

    return (
      <div className='w-full'>
        {label && <div className='mb-2 font-medium'>{label}</div>}
        <SliderPrimitive.Root
          ref={ref}
          className={cn('relative flex w-full touch-none select-none items-center', className)}
          min={minValue}
          max={maxValue}
          {...props}>
          <SliderPrimitive.Track className='relative w-full h-2 overflow-hidden rounded-full grow bg-secondary'>
            <SliderPrimitive.Range className={`absolute h-full ${color ? `bg-${color}` : 'bg-primary'}`} />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb
            className={cn(
              'block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
              isHueSlider && 'border-transparent'
            )}
            style={isHueSlider ? { backgroundColor: thumbColor } : undefined}>
            {showTooltip && (
              <div className='absolute px-2 py-1 mb-2 text-xs text-white -translate-x-1/2 bg-gray-800 rounded bottom-full left-1/2'>
                {value}
              </div>
            )}
          </SliderPrimitive.Thumb>
        </SliderPrimitive.Root>
      </div>
    )
  }
)
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
