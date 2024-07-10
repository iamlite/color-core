import React, { useState } from 'react';
import { FiCheck, FiCopy } from 'react-icons/fi';

const InstallElement: React.FC = () => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText('npm i next-colors');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className='relative top-0 left-0'>
            <div className='duimockup-code w-1/4 text-white'>
                <pre data-prefix='$'>
                    <code>npm i next-colors</code>
                    <button
                        onClick={handleCopy}
                        className='text-white px-4 py-2 rounded-full flex items-center space-x-2 absolute top-[40%] right-2'>
                        {copied ? <FiCheck size={20} /> : <FiCopy size={20} />}
                        <span className='text-center'>{copied ? 'Copied!' : ''}</span>
                    </button>
                </pre>
            </div>
        </div>
    );
};

export default InstallElement;
