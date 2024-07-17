'use client';

import {
  Link,
  link as linkStyles,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from '@nextui-org/react';
import clsx from 'clsx';
import NextLink from 'next/link';

import { GithubIcon, NPMIcon } from '@/components/icons';
import { ThemeSwitch } from '@/components/theme-switch';
import { siteConfig } from '@/config/site';

const LightLogo = '/assets/color-core-dark.png';
const DarkLogo = '/assets/color-core-light.png';
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
        <Links />
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
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      {/* Mobile */}
      <NavbarContent
        className='pl-4 sm:hidden basis-1'
        justify='end'>
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
