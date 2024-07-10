import { Link } from '@nextui-org/link';
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from '@nextui-org/navbar';
import { link as linkStyles } from '@nextui-org/theme';
import clsx from 'clsx';
import NextLink from 'next/link';

import { GithubIcon, Logo } from '@/components/icons';
import { ThemeSwitch } from '@/components/theme-switch';
import { siteConfig } from '@/config/site';
import InstallSnippet from './install-snippet';

export const Navbar = () => {
  return (
    <NextUINavbar
      maxWidth='xl'
      position='sticky'>
      <NavbarContent
        className='basis-1/5 sm:basis-full'
        justify='start'>
        <NavbarBrand
          as='li'
          className='gap-3 max-w-fit'>
          <NextLink
            className='flex justify-start items-center gap-1'
            href='/'>
            <Logo />
            <p className='font-bold text-inherit'>ACME</p>
          </NextLink>
        </NavbarBrand>
        <ul className='hidden lg:flex gap-4 justify-start ml-2'>
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

      <NavbarContent
        className='hidden sm:flex basis-1/5 sm:basis-full'
        justify='end'>
        <NavbarItem className='hidden sm:flex gap-2'>
          <Link
            isExternal
            aria-label='Github'
            href={siteConfig.links.github}>
            <GithubIcon className='text-default-500' />
          </Link>
        </NavbarItem>
        <InstallSnippet />
        <ThemeSwitch />
      </NavbarContent>

      <NavbarContent
        className='sm:hidden basis-1 pl-4'
        justify='end'>
        <Link
          isExternal
          aria-label='Github'
          href={siteConfig.links.github}>
          <GithubIcon className='text-default-500' />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className='mx-4 mt-2 flex flex-col gap-2'>
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
