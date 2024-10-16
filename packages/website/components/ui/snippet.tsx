'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Check, Copy } from 'lucide-react'
import { ReactNode, useState } from 'react'

interface SnippetProps {
  children: ReactNode
  symbol?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'outline' | 'ghost'
  className?: string
}

export default function Snippet({
  children,
  symbol = false,
  size = 'md',
  variant = 'default',
  className,
  ...props
}: SnippetProps) {
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      const text =
        typeof children === 'string' ? children : document.getElementById('snippet-content')?.textContent || ''
      await navigator.clipboard.writeText(text)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const sizeClasses = {
    sm: 'text-xs p-2',
    md: 'text-sm p-3',
    lg: 'text-base p-4'
  }

  const variantClasses = {
    default: 'bg-muted border',
    outline: 'border-2',
    ghost: 'bg-transparent'
  }

  return (
    <div
      className={cn('relative rounded-md font-mono', variantClasses[variant], sizeClasses[size], className)}
      {...props}>
      <div id='snippet-content' className='pr-8'>
        {children}
      </div>
      <div className='absolute inset-y-0 flex items-center right-1'>
        <Button
          variant='ghost'
          size='icon'
          className='w-8 h-8'
          onClick={copyToClipboard}
          aria-label={isCopied ? 'Copied' : 'Copy content to clipboard'}>
          {isCopied ? <Check className='w-4 h-4 text-green-500' /> : <Copy className='w-4 h-4' />}
        </Button>
      </div>
    </div>
  )
}
