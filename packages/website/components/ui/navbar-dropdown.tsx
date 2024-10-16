import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { BarChart3, ChevronDown, Droplet, Eye, Music, Palette, Sliders } from 'lucide-react'

export default function UtilDropdown() {
  const icons = {
    chevron: <ChevronDown className='w-5 h-5' />,
    conversions: <Palette className='w-6 h-6' />,
    harmonies: <Music className='w-6 h-6' />,
    mixing: <Droplet className='w-6 h-6' />,
    manipulation: <Sliders className='w-6 h-6' />,
    scales: <BarChart3 className='w-6 h-6' />,
    accessibility: <Eye className='w-6 h-6' />
  }

  const getTitleText = (key: string): string => {
    if (key === 'mixing') return 'Color Mixing'
    if (key === 'accessibility') return 'Accessibility Checker'
    return key.charAt(0).toUpperCase() + key.slice(1)
  }

  const getPath = (key: string): string => {
    if (key === 'mixing') return '/color-mixing'
    if (key === 'accessibility') return '/accessibility-checker'
    return `/${key}`
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='flex items-center'>
          Color Utilities
          {icons.chevron}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-[340px]'>
        {Object.entries(icons)
          .slice(1)
          .map(([key, icon]) => (
            <DropdownMenuItem key={key} className='p-0'>
              <a href={getPath(key)} className='flex items-center w-full p-2'>
                <div className='flex items-center justify-center w-10 h-10 mr-3'>{icon}</div>
                <div className='flex-1'>
                  <div className='font-medium'>{getTitleText(key)}</div>
                  <p className='text-sm text-muted-foreground'>{getDescription(key)}</p>
                </div>
              </a>
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function getDescription(key: string): string {
  const descriptions: { [key: string]: string } = {
    conversions: 'Convert colors between different color spaces',
    harmonies: 'Generate color harmonies based on color theory',
    mixing: 'Mix and blend different colors',
    manipulation: 'Adjust hue, saturation, lightness, and more',
    scales: 'Generate color scales for data visualization',
    accessibility: 'Check color contrast and accessibility'
  }
  return descriptions[key]?.trim() || ''
}
