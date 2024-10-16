import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { AnimatePresence, motion } from 'framer-motion'
import * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline'
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

const getRippleColor = (variant: string) => {
  switch (variant) {
    case 'destructive':
      return 'rgba(255, 100, 100, 0.5)' // Reddish for destructive
    case 'secondary':
      return 'rgba(200, 200, 200, 0.5)' // Grayish for secondary
    case 'ghost':
      return 'rgba(100, 100, 100, 0.3)' // Light gray for ghost
    default:
      return 'rgba(255, 255, 255, 0.5)' // White for default and others
  }
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  disableRipple?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, disableRipple = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    const [ripples, setRipples] = React.useState<{ x: number; y: number; id: number }[]>([])

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!disableRipple) {
        const rect = event.currentTarget.getBoundingClientRect()
        const size = Math.max(rect.width, rect.height)
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        setRipples([...ripples, { x, y, id: Date.now() }])
      }
      props.onClick?.(event)
    }

    const buttonContent = (
      <>
        {props.children}
        <AnimatePresence>
          {ripples.map(ripple => (
            <motion.span
              key={ripple.id}
              initial={{ scale: 0, opacity: 0.5, y: -50 }}
              animate={{ scale: 5, opacity: 0, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                top: ripple.y,
                left: ripple.x,
                transform: 'translate(-50%, -50%)',
                backgroundColor: getRippleColor(variant ?? 'default'),
                borderRadius: '50%',
                width: 100,
                height: 100,
                pointerEvents: 'none',
                zIndex: 1
              }}
            />
          ))}
        </AnimatePresence>
      </>
    )

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }), 'relative overflow-hidden')}
        ref={ref}
        {...props}
        onClick={handleClick}>
        {asChild ? React.Children.only(props.children) : buttonContent}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
