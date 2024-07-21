'use client'

import ColorInput from './components/color-input'
import ColorMixer from './components/color-mixer'
import ColorPickerDemo from './components/color-picker'
import ColorScalesDemo from './components/color-scales-demo'
import ConversionSection from './components/conversion'
import ColorHarmonies from './components/harmonies'
import ManipulationSection from './components/manipulation'

import { useColor } from '@/components/color-context'

export default function DemoPage() {
  const { color, setColor } = useColor()

  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <div>
        <ColorInput
          color={color}
          onColorChange={setColor}
        />
      </div>
      <div className='flex flex-col gap-4 md:flex-row'>
        <ConversionSection color={color} />
        <ColorHarmonies color={color} />
      </div>
      <div className='flex flex-col gap-4 md:flex-row'>
        <ManipulationSection
          color={color}
          setColor={setColor}
        />
        <ColorMixer />
      </div>
      <div className='flex flex-col gap-4 md:flex-row'>
        <ColorPickerDemo
          color={color}
          setColor={setColor}
        />
      </div>
      {/* <ColorScalesDemo /> */}
    </div>
  )
}
