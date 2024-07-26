'use client'

import ColorInput from '@/components/ui/color-input'
import ColorSwatch from '@/components/ui/color-swatch'
import { Button, ButtonGroup, Card, CardBody, CardHeader } from '@nextui-org/react'
import {
  Color,
  createDivergingScale,
  createMultiHueSequentialScale,
  createPerceptuallyUniformScale,
  createQualitativeScale,
  createSequentialScale
} from 'color-core'
import React, { useState } from 'react'

interface ScaleSectionProps {
  title: string
  scale: Color[]
  usedColors: Color[]
  description: string
}

const ScaleSection: React.FC<ScaleSectionProps> = ({ title, scale, usedColors, description }) => (
  <Card isFooterBlurred className='w-full mb-6'>
    <CardHeader className='justify-center mt-6 text-lg font-semibold'>{title}</CardHeader>
    <CardBody className='flex flex-col items-center justify-center p-4'>
      <p className='mb-6 text-sm text-center text-wrap opacity-70'>{description}</p>
      <div className='flex mb-6 gap-x-6'>
        {usedColors.map((color, index) => (
          <div key={index} className='flex flex-col items-center'>
            <ColorSwatch color={color} />
            <span className='mt-1 text-xs'>Color {index + 1}</span>
          </div>
        ))}
      </div>
      <div className='grid grid-cols-10 gap-2 lg:grid-cols-15 xl:grid-cols-20'>
        {scale.map((color, index) => (
          <ColorSwatch key={index} color={color} />
        ))}
      </div>
    </CardBody>
  </Card>
)

const ColorScalesDemo: React.FC = () => {
  const [startColor, setStartColor] = useState<Color>(new Color('#53d5fd'))
  const [midColor, setMidColor] = useState<Color>(new Color('#ed719e'))
  const [endColor, setEndColor] = useState<Color>(new Color('#f2f7b7'))
  const [extraColor, setExtraColor] = useState<Color>(new Color('#77FCAE'))
  const [steps, setSteps] = useState<number>(20)
  const [stepsError, setStepsError] = useState<string>('')

  const handleStepsChange = (value: string) => {
    const numValue = Number(value)
    if (numValue < 3 || numValue > 400 || isNaN(numValue)) {
      setStepsError('Please enter a number between 3 and 400')
    } else {
      setStepsError('')
      setSteps(numValue)
    }
  }

  const sequentialScale = createSequentialScale({ startColor, endColor, steps })
  const divergingScale = createDivergingScale({ startColor, midColor, endColor, steps })
  const multiHueSequentialScale = createMultiHueSequentialScale({
    colorStops: [startColor, midColor, endColor, extraColor],
    steps
  })
  const perceptuallyUniformScale = createPerceptuallyUniformScale(startColor, endColor, steps)
  const qualitativeScale = createQualitativeScale(steps)

  return (
    <Card isBlurred className='flex-grow w-full p-6 my-4 max-w-7xl'>
      <CardHeader className='flex flex-col items-center justify-center'>
        <h1 className='mb-2 text-2xl font-bold'>Color Scales</h1>
        <p className='py-4 text-center'>
          Explore different types of color scales and see how they can be used to represent data visually. Adjust the
          colors and number of steps to see how the scales change.
        </p>
        <div className='flex flex-col gap-6 py-6 md:flex-row'>
          <ColorInput color={startColor} onColorChange={setStartColor} />
          <ColorInput color={midColor} onColorChange={setMidColor} />
          <ColorInput color={endColor} onColorChange={setEndColor} />
          <ColorInput color={extraColor} onColorChange={setExtraColor} />
        </div>
        <div className='flex flex-col justify-center gap-4'>
          <p className='text-lg font-semibold text-center'>Number of steps:</p>
          <ButtonGroup variant='flat'>
            <Button onPress={() => setSteps(20)}>20</Button>
            <Button onPress={() => setSteps(40)}>40</Button>
            <Button onPress={() => setSteps(80)}>80</Button>
            <Button onPress={() => setSteps(100)}>100</Button>
            <Button onPress={() => setSteps(200)}>200</Button>
          </ButtonGroup>
        </div>
      </CardHeader>
      <CardBody className='flex flex-col items-center gap-y-4'>
        <ScaleSection
          title='Sequential Scale'
          scale={sequentialScale}
          usedColors={[startColor, endColor]}
          description='A smooth transition between two colors, useful for representing continuous data.'
        />
        <ScaleSection
          title='Diverging Scale'
          scale={divergingScale}
          usedColors={[startColor, midColor, endColor]}
          description='Transitions from one color to a middle color, then to another, ideal for data with a meaningful midpoint.'
        />
        <ScaleSection
          title='Multi-Hue Sequential Scale'
          scale={multiHueSequentialScale}
          usedColors={[startColor, midColor, endColor, extraColor]}
          description='A scale that passes through multiple colors, useful for representing complex data ranges.'
        />
        <ScaleSection
          title='Perceptually Uniform Scale'
          scale={perceptuallyUniformScale}
          usedColors={[startColor, endColor]}
          description='A scale where the perceived difference between each step is uniform, ensuring consistent visual interpretation.'
        />
        <ScaleSection
          title='Qualitative Scale'
          scale={qualitativeScale}
          usedColors={[]}
          description='A set of distinct colors suitable for representing categorical data. This scale is generated automatically.'
        />
      </CardBody>
    </Card>
  )
}

export default ColorScalesDemo
