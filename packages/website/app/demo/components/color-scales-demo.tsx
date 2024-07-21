import React, { useState } from 'react'
import { Card, CardBody, CardHeader, Input } from '@nextui-org/react'
import {
  Color,
  createSequentialScale,
  createDivergingScale,
  createMultiHueSequentialScale,
  createPerceptuallyUniformScale,
  createQualitativeScale
} from 'color-core'
import ColorSwatch from './color-swatch'
import ColorInput from './color-input'

/**
 * Props for the ScaleSection component
 */
interface ScaleSectionProps {
  title: string
  scale: Color[]
}

/**
 * Renders a section displaying a color scale
 * @param title - The title of the scale section
 * @param scale - An array of Colors representing the scale
 */
const ScaleSection: React.FC<ScaleSectionProps> = ({ title, scale }) => (
  <Card isFooterBlurred>
    <CardBody className='flex flex-col items-center justify-center'>
      <p className='mb-2 text-sm'>{title}</p>
      <div className='grid grid-cols-5 md:grid-cols-10 '>
        {scale.map((color, index) => (
          <ColorSwatch
            key={index}
            color={color}
          />
        ))}
      </div>
    </CardBody>
  </Card>
)

/**
 * Demo component for showcasing various color scales
 */
const ColorScalesDemo: React.FC = () => {
  const [startColor, setStartColor] = useState<Color>(new Color('#ff0000'))
  const [midColor, setMidColor] = useState<Color>(new Color('#00ff00'))
  const [endColor, setEndColor] = useState<Color>(new Color('#0000ff'))
  const [steps, setSteps] = useState<number>(10)

  const sequentialScale = createSequentialScale({
    startColor,
    endColor,
    steps
  })

  const divergingScale = createDivergingScale({
    startColor,
    midColor,
    endColor,
    steps
  })

  const multiHueSequentialScale = createMultiHueSequentialScale([startColor, midColor, endColor], steps)

  const perceptuallyUniformScale = createPerceptuallyUniformScale(startColor, endColor, steps)

  const qualitativeScale = createQualitativeScale(steps)

  return (
    <Card
      isBlurred
      className='w-full md:w-[40vw] my-2 px-4'>
      <CardHeader className='justify-center my-4 text-lg font-semibold'>Color Scales</CardHeader>
      <CardBody className='grid grid-cols-1 gap-4'>
        <div className='flex flex-col gap-4 md:flex-row'>
          <ColorInput
            color={startColor}
            onColorChange={setStartColor}
          />
          <ColorInput
            color={midColor}
            onColorChange={setMidColor}
          />
          <ColorInput
            color={endColor}
            onColorChange={setEndColor}
          />
        </div>
        <div className='flex flex-col justify-center gap-4 md:flex-row'>
          <Input
            type='number'
            label='Steps'
            value={steps.toString()}
            onChange={e => setSteps(Number(e.target.value))}
            min={3}
            max={20}
            className='max-w-32'
          />
        </div>
        <ScaleSection
          title='Sequential Scale'
          scale={sequentialScale}
        />
        <ScaleSection
          title='Diverging Scale'
          scale={divergingScale}
        />
        <ScaleSection
          title='Multi-Hue Sequential Scale'
          scale={multiHueSequentialScale}
        />
        <ScaleSection
          title='Perceptually Uniform Scale'
          scale={perceptuallyUniformScale}
        />
        <ScaleSection
          title='Qualitative Scale'
          scale={qualitativeScale}
        />
      </CardBody>
    </Card>
  )
}

export default ColorScalesDemo
