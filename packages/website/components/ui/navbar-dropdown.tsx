import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, NavbarItem } from '@nextui-org/react'
import { BarChart3, ChevronDown, Droplet, Eye, Music, Palette, Sliders } from 'lucide-react'

export default function UtilDropdown() {
  const icons = {
    chevron: <ChevronDown size={12} color='currentColor' />,
    conversions: <Palette />,
    harmonies: <Music />,
    mixing: <Droplet />,
    manipulation: <Sliders />,
    scales: <BarChart3 />,
    accessibility: <Eye />
  }

  return (
    <Dropdown backdrop='blur'>
      <NavbarItem>
        <DropdownTrigger>
          <Button
            className='bg-transparent data-[hover=true]:bg-transparent'
            endContent={icons.chevron}
            radius='md'
            variant='light'>
            Color Utilities
          </Button>
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu aria-label='Color Utilities' className='w-[340px]' itemClasses={{ base: 'gap-4' }}>
        <DropdownItem
          key='conversions'
          description='Convert colors between different color spaces'
          startContent={icons.conversions}
          href='/conversions'>
          Conversions
        </DropdownItem>
        <DropdownItem
          key='harmonies'
          description='Generate color harmonies based on color theory'
          startContent={icons.harmonies}
          href='/harmonies'>
          Harmonies
        </DropdownItem>
        <DropdownItem
          key='mixing'
          description='Mix and blend different colors'
          startContent={icons.mixing}
          href='/color-mixing'>
          Color Mixing
        </DropdownItem>
        <DropdownItem
          key='manipulation'
          description='Adjust hue, saturation, lightness, and more'
          startContent={icons.manipulation}
          href='/manipulation'>
          Color Manipulation
        </DropdownItem>
        <DropdownItem
          key='scales'
          description='Generate color scales for data visualization'
          startContent={icons.scales}
          href='/scales'>
          Color Scales
        </DropdownItem>
        <DropdownItem
          key='accessibility'
          description='Check color contrast and accessibility'
          startContent={icons.accessibility}
          href='/accessibility-checker'>
          Accessibility Checker
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
