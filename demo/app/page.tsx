'use client';
import { button as buttonStyles, Link } from '@nextui-org/react';

import { GithubIcon } from '@/components/icons';
import InstallSnippet from '@/components/install-snippet';
import { subtitle, title } from '@/components/primitives';
import { siteConfig } from '@/config/site';

export default function Home() {
  return (
    <section className='flex flex-col items-center justify-center gap-4 py-8 md:py-10'>
      <div className='justify-center inline-block max-w-lg text-center'>
        <h1 className={title()}>Make&nbsp;</h1>
        <h1 className={title({ color: 'yellow' })}>beautiful&nbsp;</h1>
        <br />
        <h1 className={title()}>websites regardless of your design experience.</h1>
        <h2 className={subtitle({ class: 'mt-4' })}>Beautiful, fast and modern React UI library.</h2>
      </div>

      <div className='flex gap-3'>
        <InstallSnippet />
        <Link
          isExternal
          className={buttonStyles({
            color: 'primary',
            radius: 'full',
            variant: 'shadow',
          })}
          href={siteConfig.links.docs}>
          Documentation
        </Link>
        <Link
          isExternal
          className={buttonStyles({ variant: 'bordered', radius: 'full' })}
          href={siteConfig.links.github}>
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div>
    </section>
  );
}
