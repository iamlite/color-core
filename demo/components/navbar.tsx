'use client';

import {
  Link,
  link as linkStyles,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from '@nextui-org/react';
import clsx from 'clsx';
import NextLink from 'next/link';

import { GithubIcon, Logo, NPMIcon } from '@/components/icons';
import { ThemeSwitch } from '@/components/theme-switch';
import { siteConfig } from '@/config/site';

const Links = () => {
  return (
    <>
      <Link
        className={linkStyles({ color: 'foreground' })}
        color='foreground'
        href={siteConfig.links.github}>
        <GithubIcon className='text-default-500' />
      </Link>
      <p className='mx-2 text-default-500'>|</p>
      <Link
        className={linkStyles({ color: 'foreground' })}
        color='foreground'
        href={siteConfig.links.npm}>
        <NPMIcon className='text-default-500' />
      </Link>
    </>
  );
};

export const Navbar = () => {
  return (
    <NextUINavbar
      maxWidth='xl'
      position='sticky'>
      {/* Start */}
      <NavbarContent
        justify='start'
        className='basis-1/5 sm:basis-full'>
        <NavbarBrand
          as='li'
          className='gap-3 max-w-fit'>
          <NextLink
            className='flex items-center justify-start gap-1'
            href='/'>
            <Logo />
            <p className='font-bold text-inherit'>color-core</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      {/* Center */}
      <NavbarContent
        className='basis-1/5 sm:basis-full'
        justify='center'>
        <ul className='justify-start hidden gap-4 ml-2 lg:flex'>
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: 'foreground' }),
                  'data-[active=true]:text-primary data-[active=true]:font-medium'
                )}
                color='foreground'
                href={item.href}>
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      {/* End */}
      <NavbarContent
        className='hidden sm:flex basis-1/5 sm:basis-full'
        justify='end'>
        <NavbarItem className='hidden gap-2 sm:flex'>
          <Links />
          <p className='mx-2 text-default-500'>|</p>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      {/* Mobile */}
      <NavbarContent
        className='pl-4 sm:hidden basis-1'
        justify='end'>
        <Links />
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className='flex flex-col gap-2 mx-4 mt-2'>
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={index === 2 ? 'primary' : index === siteConfig.navMenuItems.length - 1 ? 'danger' : 'foreground'}
                href='#'
                size='lg'>
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
