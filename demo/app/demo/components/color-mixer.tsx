import { Card, CardBody, CardFooter, CardHeader, Chip, Divider, Slider, Snippet } from '@nextui-org/react'
import { Color } from 'color-core'
import React, { useEffect, useState } from 'react'

import ColorInput from './color-input'

const ColorMixer: React.FC = () => {
  const [color1, setColor1] = useState(new Color('#00D0FF'))
  const [color2, setColor2] = useState(new Color('#FCD248'))
  const [mixAmount, setMixAmount] = useState(0.5)
  const [mixedColorName, setMixedColorName] = useState('')
  const mixedColor = color1.mix(color2, mixAmount)

  useEffect(() => {
    const fetchColorName = async () => {
      try {
        const name = await mixedColor.getName()

        setMixedColorName(name)
      } catch (error) {
        setMixedColorName('Unknown')
      }
    }

    fetchColorName()
  }, [mixedColor])

  return (
    <Card isBlurred className='w-full md:w-[40vw] my-2 px-4'>
      <CardHeader className='justify-center my-4 text-lg font-semibold'>Color Mixer</CardHeader>
      <CardBody className='grid grid-cols-1 md:grid-cols-2'>
        <div className='flex flex-col items-center justify-center align-middle'>
          <ColorInput color={color1} onColorChange={setColor1} />
          <div className='flex items-center justify-center my-4'>
            <Divider className='my-4' />
            <p className='mx-4 text-4xl'>+</p>
            <Divider className='my-4' />
          </div>
          <ColorInput color={color2} onColorChange={setColor2} />
        </div>
        <div className='flex flex-col items-center justify-center mt-4'>
          <h3 className='mb-2 text-xl'>Result</h3>
          <Card className='w-24 h-24 my-2' style={{ backgroundColor: mixedColor.toHex() }} />
          <Snippet hideSymbol className='my-2' variant='flat'>
            {mixedColor.toHex()}
          </Snippet>
          <Chip className='my-2' variant='flat'>
            {mixedColorName}
          </Chip>
        </div>
      </CardBody>
      <Divider className='mt-4' />
      <CardFooter>
        <Slider
          className='max-w-md mx-auto my-4'
          color='foreground'
          formatOptions={{ style: 'percent' }}
          label='Mix Amount'
          maxValue={1}
          minValue={0}
          showTooltip={true}
          step={0.01}
          value={mixAmount}
          onChange={value => setMixAmount(value as number)}
        />
      </CardFooter>
    </Card>
  )
}

export default ColorMixer
