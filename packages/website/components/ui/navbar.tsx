'use client'

import {
  Button,
  Link,
  link as linkStyles,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
  Navbar as NextUINavbar
} from '@nextui-org/react'

import { GithubIcon, NPMIcon } from '@/components/icons'
import { ThemeSwitch } from '@/components/theme-switch'
import { siteConfig } from '@/config/site'
import UtilDropdown from './navbar-dropdown'

const CodeLinks = () => {
  return (
    <>
      <Link className={linkStyles({ color: 'foreground' })} color='foreground' href={siteConfig.links.github}>
        <GithubIcon className='text-default-500' />
      </Link>
      <p className='text-default-500'>|</p>
      <Link className={linkStyles({ color: 'foreground' })} color='foreground' href={siteConfig.links.npm}>
        <NPMIcon className='text-default-500' />
      </Link>
    </>
  )
}

const MenuItems = () => {
  return (
    <>
      <NavbarItem>
        <Button
          as={Link}
          href='/'
          className='bg-transparent data-[hover=true]:bg-transparent'
          radius='md'
          variant='light'>
          Home
        </Button>
      </NavbarItem>

      <UtilDropdown />

      <NavbarItem>
        <Button
          as={Link}
          href='https://docs.color-core.com'
          className='bg-transparent data-[hover=true]:bg-transparent'
          radius='md'
          variant='light'>
          Documentation
        </Button>
      </NavbarItem>
    </>
  )
}

export const Navbar = () => {
  return (
    <NextUINavbar maxWidth='xl' position='sticky' suppressHydrationWarning>
      {/* Start */}
      <NavbarContent className='basis-1/5 sm:basis-full' justify='start'>
        <CodeLinks />
      </NavbarContent>

      {/* Center */}
      <NavbarContent className='hidden md:flex basis-1/5' justify='center'>
        <MenuItems />
      </NavbarContent>

      {/* End */}
      <NavbarContent className='hidden sm:flex basis-1/5 sm:basis-full' justify='end'>
        <NavbarItem className='hidden gap-2 sm:flex'>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      {/* Mobile */}
      <NavbarContent className='pl-4 sm:hidden basis-1' justify='end'>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <NavbarContent className='flex flex-col gap-2 mx-4 mt-2' justify='center'>
          <MenuItems />
        </NavbarContent>
      </NavbarMenu>
    </NextUINavbar>
  )
}
