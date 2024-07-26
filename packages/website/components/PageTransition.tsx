'use client'

import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    setIsTransitioning(true)
    const timer = setTimeout(() => setIsTransitioning(false), 500) // Adjust timing as needed
    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <div className='page-container'>
      <div className={`page-content ${isTransitioning ? 'transitioning' : ''}`}>{children}</div>
      <div className={`page-overlay ${isTransitioning ? 'visible' : ''}`} />
    </div>
  )
}

export default PageTransition
