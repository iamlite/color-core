import { Link } from '@nextui-org/link'

export const Footer = () => {
  return (
    <footer className='flex items-center justify-center w-full py-3'>
      <Link
        isExternal
        className='flex items-center gap-1 text-current'
        href='https://npmjs.com/package/color-core'
        title='nextui.org homepage'>
        <span className='text-default-600'>Powered by</span>
        <p className='text-primary'>color-core</p>
      </Link>
    </footer>
  )
}
