import { FaNpm } from 'react-icons/fa';
import { FiFileText, FiGithub } from 'react-icons/fi';

export default function Links() {
    return (
        <div className='relative top-10 right-4 text-right z-10'>
            <a
                href='https://www.npmjs.com/package/next-colors'
                className='inline-block mx-2 duitooltip duitooltip-bottom'
                target='_blank'
                rel='noopener noreferrer'
                data-tip='NPM'>
                <FaNpm
                    size={24}
                    className='text-white transition-transform hover:scale-150 duration-500'
                />
            </a>
            <a
                href='https://github.com/iamlite/next-colors'
                className='inline-block mx-2 duitooltip duitooltip-bottom'
                target='_blank'
                rel='noopener noreferrer'
                data-tip='GitHub'>
                <FiGithub
                    size={24}
                    className='text-white transition-transform hover:scale-150 duration-500'
                />
            </a>
            <a
                href='https://iamlite.github.io/next-colors/'
                className='inline-block mx-2 duitooltip duitooltip-bottom'
                target='_blank'
                rel='noopener noreferrer'
                data-tip='Documentation'>
                <FiFileText
                    size={24}
                    className='text-white transition-transform hover:scale-150 duration-500'
                />
            </a>
        </div>
    );
}
