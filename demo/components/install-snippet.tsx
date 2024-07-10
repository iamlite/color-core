import { Divider } from '@nextui-org/react';
import { Snippet } from '@nextui-org/snippet';

const InstallSnippet = () => {
  return (
    <div className='flex flex-col gap-4'>
      <Snippet variant='shadow'>npm i color-core</Snippet>
      <div className='flex items-center justify-center'>
        <Divider className='w-14' />
        <p className='mx-2 opacity-70'>or</p>
        <Divider className='w-14' />
      </div>
      <Snippet variant='shadow'>yarn add color-core</Snippet>
    </div>
  );
};

export default InstallSnippet;
