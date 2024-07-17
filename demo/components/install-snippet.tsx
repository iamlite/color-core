import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { Snippet } from '@nextui-org/snippet'
import { Color } from 'color-core'
import React, { useState } from 'react'

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
const InstallSnippet: React.FC<InstallSnippetProps> = ({ packageName }) => {
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
        <Dropdown>
          <DropdownTrigger>
            <Button className='capitalize'>{selectedManager.name}</Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label='Package manager selection'
            onAction={key => {
              const manager = packageManagers.find(pm => pm.name === key)

              if (manager) setSelectedManager(manager)
            }}>
            {packageManagers.map(pm => (
              <DropdownItem key={pm.name}>{pm.name}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <Snippet className='flex-grow' variant='shadow'>
          {`${selectedManager.command} ${packageName}`}
        </Snippet>
      </div>
    </div>
  )
}

export default InstallSnippet
