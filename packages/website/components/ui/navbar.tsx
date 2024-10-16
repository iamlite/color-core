'use client'

import { GithubIcon, NPMIcon } from '@/components/icons'
import { ThemeSwitch } from '@/components/theme-switch'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import UtilDropdown from './navbar-dropdown'

const CodeLinks = () => {
  return (
    <div className='flex items-center space-x-4'>
      <a href='https://github.com/iamlite/color-core' className='mr-2 text-muted-foreground hover:text-foreground'>
        <GithubIcon className='w-5 h-5' />
      </a>
      <span className='mx-2 text-muted-foreground'>|</span>
      <a href='https://www.npmjs.com/package/color-core' className='ml-2 text-muted-foreground hover:text-foreground'>
        <NPMIcon className='w-5 h-5' />
      </a>
    </div>
  )
}

const MenuItems = () => {
  const router = useRouter()

  return (
    <>
      <Button variant='ghost' onClick={() => router.push('/')}>
        Home
      </Button>
      <UtilDropdown />
      <Button variant='ghost' onClick={() => router.push('https://docs.color-core.com')}>
        Documentation
      </Button>
    </>
  )
}

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)

  return (
    <nav className='border-b backdrop-blur-md bg-background/80'>
      <div className='container px-4 mx-auto sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Start */}
          <div className='flex items-center'>
            <CodeLinks />
          </div>

          {/* Center */}
          <div className='items-center hidden space-x-4 md:flex'>
            <MenuItems />
          </div>

          {/* End */}
          <div className='flex items-center'>
            <ThemeSwitch />
            <Button variant='ghost' size='icon' className='ml-4 md:hidden' onClick={toggleMobileMenu}>
              <Menu className='w-5 h-5 md:hidden' />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className='flex flex-col h-full'>
          <div className='flex justify-end p-4'>
            <Button variant='ghost' size='icon' onClick={toggleMobileMenu}>
              <X className='w-5 h-5' />
            </Button>
          </div>
          <div className='flex items-center justify-center flex-grow'>
            <nav className='flex flex-col items-center space-y-4'>
              <MenuItems />
            </nav>
          </div>
        </div>
      </div>
    </nav>
  )
}
