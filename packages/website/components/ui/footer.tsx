'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

export const Footer = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <footer className='flex items-center justify-between w-full py-3 mx-auto text-xs text-muted-foreground bg-background/50 backdrop-blur-md'>
      <div className='flex justify-between w-full md:max-w-3xl mx-auto px-4 md:px-0'>
        <p className='text-foreground'> © {new Date().getFullYear()} Color Core. All rights reserved. </p>
        <p className='text-xs'>
          Made with &hearts; by{' '}
          <Link
            className='hover:text-primary relative'
            href='https://tariel.me'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            T
            <motion.span
              className='absolute left-full whitespace-nowrap'
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: isHovered ? 1 : 0, width: isHovered ? 'auto' : 0 }}
              transition={{ duration: 0.3 }}>
              ariel Davidashvili
            </motion.span>
          </Link>
        </p>
      </div>
    </footer>
  )
}
