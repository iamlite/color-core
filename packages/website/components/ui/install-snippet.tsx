import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Color } from 'color-core'
import { ChevronDown } from 'lucide-react'
import React, { useState } from 'react'
import Snippet from './snippet'

/**
 * Interface for package manager options
 * @interface PackageManager
 * @property {string} name - The name of the package manager
 * @property {string} command - The install command for the package manager
 */
interface PackageManager {
  name: string
  command: string
}

/**
 * InstallSnippet component props
 * @interface InstallSnippetProps
 * @property {string} packageName - The name of the package to install
 */
interface InstallSnippetProps {
  packageName: string
  color?: Color
}

/**
 * InstallSnippet component that displays installation commands with a dropdown for different package managers
 * @param {InstallSnippetProps} props - The component props
 * @returns {React.ReactElement} The rendered InstallSnippet component
 */
const InstallSnippet: React.FC<InstallSnippetProps> = ({ packageName, color }) => {
  const packageManagers: PackageManager[] = [
    { name: 'npm', command: 'npm i' },
    { name: 'yarn', command: 'yarn add' },
    { name: 'pnpm', command: 'pnpm add' },
    { name: 'bun', command: 'bun add' }
  ]

  const [selectedManager, setSelectedManager] = useState<PackageManager>(packageManagers[0])

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center gap-2'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='flex items-center gap-2 capitalize'>
              {selectedManager.name}
              <ChevronDown className='w-4 h-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {packageManagers.map(pm => (
              <DropdownMenuItem key={pm.name} onSelect={() => setSelectedManager(pm)}>
                {pm.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Snippet className='flex-grow' variant='outline'>
          {`${selectedManager.command} ${packageName}`}
        </Snippet>
      </div>
    </div>
  )
}

export default InstallSnippet
