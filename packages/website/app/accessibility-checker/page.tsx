'use client'

import { useColor } from '@/components/context/color-context'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Separator,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui'
import ColorInput from '@/components/ui/color-input'
import { Color } from 'color-core'
import { ArrowUpDown } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function AccessibilityDemo() {
  const { color, setColor } = useColor()
  const [foreground, setForeground] = useState(new Color(color.toHex()))
  const [background, setBackground] = useState(new Color('#303030'))
  const [results, setResults] = useState<any>(null)

  const checkAccessibility = () => {
    const luminance1 = foreground.getRelativeLuminance()
    const luminance2 = background.getRelativeLuminance()
    const contrastRatio = foreground.getContrastRatio(background)
    const wcagNormal = foreground.getWCAGCompliance(background, 'Normal')
    const wcagLarge = foreground.getWCAGCompliance(background, 'Large')
    setResults({
      luminance1,
      luminance2,
      contrastRatio,
      wcagNormal,
      wcagLarge
    })
  }

  useEffect(() => {
    checkAccessibility()
  }, [foreground, background])

  useEffect(() => {
    setForeground(new Color(color.toHex()))
  }, [color])

  const handleForegroundChange = (newColor: Color) => {
    setForeground(newColor)
    setColor(newColor)
  }

  const flipColors = () => {
    const temp = foreground
    setForeground(background)
    setBackground(temp)
    setColor(background)
  }

  const resetColors = () => {
    handleForegroundChange(new Color('#94e3fe'))
    setBackground(new Color('#202020'))
    setResults(null)
  }

  const bwReset = () => {
    handleForegroundChange(new Color('#FFFFFF'))
    setBackground(new Color('#202020'))
    setResults(null)
  }

  const getColorForValue = (value: string) => {
    if (value.includes('AAA')) return 'text-green-500'
    if (value.includes('AA')) return 'text-yellow-500'
    return 'text-red-500'
  }

  return (
    <Card blurred className='flex-grow w-full p-6 mx-auto my-4 max-w-7xl'>
      <CardHeader className='flex flex-col justify-center my-4'>
        <h2 className='py-4 text-4xl font-bold'>Accessibility Checker</h2>
        <p className='text-center'>Check the accessibility of your colors</p>

        <div className='p-10 rounded-2xl bg-default-100'>
          <div className='space-y-4 '>
            <p className='text-lg'>
              This tool helps you ensure your color choices meet WCAG accessibility standards. Follow these steps:
            </p>

            <ol className='pl-4 space-y-2 list-decimal list-inside'>
              <li>
                Use the top color picker to select your <span className='font-semibold'>foreground (text) color</span>.
              </li>
              <li>
                Use the bottom color picker to choose your <span className='font-semibold'>background color</span>.
              </li>
              <li>The results table will update automatically, showing you important accessibility metrics.</li>
              <li>Use the flip button (↑↓) to quickly swap foreground and background colors.</li>
            </ol>

            <h4 className='mt-6 text-xl font-semibold'>Understanding the Results</h4>

            <Table aria-label='WCAG Compliance Ratings'>
              <TableHeader>
                <TableHead>Level</TableHead>
                <TableHead>Description</TableHead>
              </TableHeader>
              <TableBody>
                <TableRow key='AAA'>
                  <TableCell className='text-green-500'>AAA</TableCell>
                  <TableCell>Highest level of accessibility</TableCell>
                </TableRow>
                <TableRow key='AA'>
                  <TableCell className='text-yellow-500'>AA</TableCell>
                  <TableCell>Good accessibility</TableCell>
                </TableRow>
                <TableRow key='A'>
                  <TableCell className='text-red-200'>A</TableCell>
                  <TableCell>Poor accessibility</TableCell>
                </TableRow>
                <TableRow key='Fail'>
                  <TableCell className='text-red-500'>Fail</TableCell>
                  <TableCell>Does not meet minimum standards</TableCell>
                </TableRow>
                <TableRow key='Poor'>
                  <TableCell className='font-extrabold text-red-800'>Poor</TableCell>
                  <TableCell>...What are you doing?</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <p className='mt-4 italic'>
              Aim for at least AA compliance for body text, and AAA for larger headings and important content.
            </p>

            <p>
              Use the text preview below the results to see how your color combination looks with various font sizes and
              styles. This can help you make informed decisions about readability across different contexts in your
              design.
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <div className='flex flex-col items-center'>
            <ColorInput color={foreground} onColorChange={handleForegroundChange} />

            <div className='flex items-center justify-center my-4'>
              <Separator className='mx-5 my-4' />
              <Button size='icon' onClick={flipColors} variant='outline'>
                <ArrowUpDown className='flex-shrink-0 pointer-events-none text-default-900' />
              </Button>
              <Separator className='mx-5 my-4' />
            </div>

            <ColorInput color={background} onColorChange={setBackground} />
            <div className='flex flex-row my-4 gap-x-4'>
              <Button onClick={resetColors}>Reset default</Button>
              <Button onClick={bwReset}>Black/White</Button>
            </div>
          </div>

          <div className='flex flex-col justify-center flex-1'>
            <Table aria-label='Accessibility Results'>
              <TableHeader>
                <TableHead>Metric</TableHead>
                <TableHead>Value</TableHead>
              </TableHeader>
              <TableBody>
                <TableRow key='luminance1'>
                  <TableCell>Luminance (Color 1)</TableCell>
                  <TableCell>{results?.luminance1.toFixed(3) || '-'}</TableCell>
                </TableRow>
                <TableRow key='luminance2'>
                  <TableCell>Luminance (Color 2)</TableCell>
                  <TableCell>{results?.luminance2.toFixed(3) || '-'}</TableCell>
                </TableRow>
                <TableRow key='contrastRatio'>
                  <TableCell>Contrast Ratio</TableCell>
                  <TableCell>{results ? `${results.contrastRatio.toFixed(2)}:1` : '-'}</TableCell>
                </TableRow>
                <TableRow key='wcagNormal'>
                  <TableCell>WCAG Compliance (Normal Text)</TableCell>
                  <TableCell className={getColorForValue(results?.wcagNormal.level || '')}>
                    {results?.wcagNormal.level || '-'}
                  </TableCell>
                </TableRow>
                <TableRow key='wcagLarge'>
                  <TableCell>WCAG Compliance (Large Text)</TableCell>
                  <TableCell className={getColorForValue(results?.wcagLarge.level || '')}>
                    {results?.wcagLarge.level || '-'}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
        <Card
          className='h-full px-4 py-10 mt-4 text-center'
          style={{
            backgroundColor: background.toHex(),
            color: foreground.toHex(),
            border: `1px solid ${foreground.toHex()}`
          }}>
          <p className='mb-4 font-sans text-5xl font-extrabold'>The quick brown fox jumps over the lazy dog</p>
          <p className='mb-4 font-serif text-4xl font-bold'>The quick brown fox jumps over the lazy dog</p>
          <p className='mb-4 font-mono text-3xl font-semibold'>The quick brown fox jumps over the lazy dog</p>
          <p className='mb-4 text-2xl italic font-medium'>The quick brown fox jumps over the lazy dog</p>
          <p className='mb-4 text-xl font-extrabold'>The quick brown fox jumps over the lazy dog</p>
          <p className='mb-4 text-lg font-light'>The quick brown fox jumps over the lazy dog</p>
          <p className='mb-4 font-serif text-base font-thin'>The quick brown fox jumps over the lazy dog</p>
          <p className='mb-4 text-sm italic font-extralight'>The quick brown fox jumps over the lazy dog</p>
          <p className='mb-4 font-mono text-xs font-medium'>The quick brown fox jumps over the lazy dog</p>
        </Card>
      </CardContent>
    </Card>
  )
}
