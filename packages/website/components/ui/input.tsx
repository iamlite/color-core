import { ChevronDown, ChevronUp } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, onChange, value: propValue, defaultValue, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(() => {
      if (propValue !== undefined) return propValue.toString()
      if (defaultValue !== undefined) return defaultValue.toString()
      return ''
    })

    const value = propValue !== undefined ? propValue.toString() : internalValue

    const handleChange = (newValue: string) => {
      setInternalValue(newValue)
      onChange?.({ target: { value: newValue } } as React.ChangeEvent<HTMLInputElement>)
    }

    const adjustValue = (adjustment: number) => {
      if (type === 'number') {
        const currentValue = parseFloat(value) || 0
        const newValue = (currentValue + adjustment).toString()
        handleChange(newValue)
      }
    }

    return (
      <div className='relative inline-flex'>
        <input
          type={type === 'number' ? 'text' : type}
          inputMode={type === 'number' ? 'numeric' : undefined}
          pattern={type === 'number' ? '[0-9]*' : undefined}
          className={cn(
            'flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            type === 'number' && 'pr-8 w-20',
            type !== 'number' && 'w-full',
            className
          )}
          value={value}
          onChange={e => handleChange(e.target.value)}
          ref={ref}
          {...props}
        />
        {type === 'number' && (
          <div className='absolute right-0 top-0 h-full flex flex-col'>
            <button
              type='button'
              className='flex items-center justify-center h-1/2 w-8 text-gray-500 hover:text-gray-700 focus:outline-none'
              onClick={() => adjustValue(1)}
              tabIndex={-1}>
              <ChevronUp className='h-4 w-4' />
            </button>
            <button
              type='button'
              className='flex items-center justify-center h-1/2 w-8 text-gray-500 hover:text-gray-700 focus:outline-none'
              onClick={() => adjustValue(-1)}
              tabIndex={-1}>
              <ChevronDown className='h-4 w-4' />
            </button>
          </div>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
