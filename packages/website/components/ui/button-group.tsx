'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

const buttonGroupVariants = cva('inline-flex rounded-md shadow-sm', {
  variants: {
    variant: {
      default: 'bg-primary',
      outline: 'bg-background',
      ghost: 'shadow-none'
    },
    size: {
      default: '',
      sm: 'scale-90',
      lg: 'scale-110'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default'
  }
})

export interface ButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof buttonGroupVariants> {
  vertical?: boolean
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, variant, size, vertical = false, ...props }, ref) => {
    return (
      <div
        className={cn(buttonGroupVariants({ variant, size, className }), vertical && 'flex-col')}
        ref={ref}
        role='group'
        {...props}
      />
    )
  }
)
ButtonGroup.displayName = 'ButtonGroup'

const ButtonGroupItem = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button> & { isFirstItem?: boolean; isLastItem?: boolean }
>(({ className, isFirstItem, isLastItem, ...props }, ref) => {
  return (
    <Button
      className={cn('rounded-none focus:z-10', isFirstItem && 'rounded-l-lg', isLastItem && 'rounded-r-lg', className)}
      ref={ref}
      {...props}
    />
  )
})
ButtonGroupItem.displayName = 'ButtonGroupItem'

export { ButtonGroup, ButtonGroupItem }
