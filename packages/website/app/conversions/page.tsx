'use client'
import { useColor } from '@/components/color-context'
import { InfoIcon } from '@/components/icons'
import { Button, Card, CardBody, CardHeader, Input, Snippet, Tooltip } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import ColorInput from '../../components/ui/color-input'

export default function ConversionsPage() {
  const { color } = useColor()
  const [decimals, setDecimals] = useState(2)
  const [conversions, setConversions] = useState<Record<string, Record<string, string | number>>>({})

  const formatColorValue = (value: unknown): Record<string, string | number> => {
    if (typeof value === 'string') {
      return { value }
    }
    if (typeof value === 'object' && value !== null) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { whitePoint, ...rest } = value as Record<string, unknown>
      const result: Record<string, string | number> = {}
      Object.entries(rest).forEach(([key, val]) => {
        if (typeof val === 'number') {
          result[key] = Number(val.toFixed(decimals))
        } else if (typeof val === 'string') {
          result[key] = val
        }
      })
      return result
    }
    return {}
  }

  useEffect(() => {
    if (color) {
      const newConversions: Record<string, Record<string, string | number>> = {
        RGB: formatColorValue(color.toRgb()),
        SRGB: formatColorValue(color.toSrgb()),
        AdobeRGB: formatColorValue(color.toAdobeRGB()),
        HEX: formatColorValue(color.toHex()),
        HSL: formatColorValue(color.toHsl()),
        HSV: formatColorValue(color.toHsv()),
        HSI: formatColorValue(color.toHsi()),
        HWB: formatColorValue(color.toHwb()),
        'LAB D65': formatColorValue(color.toLab()),
        'LAB D50': formatColorValue(color.toLabD50()),
        'XYZ D65': formatColorValue(color.toXyz()),
        'XYZ D50': formatColorValue(color.toXyzD50()),
        LCH: formatColorValue(color.toLch()),
        YUV: formatColorValue(color.toYuv()),
        OKLAB: formatColorValue(color.toOklab()),
        OKLCH: formatColorValue(color.toOklch()),
        HPLuv: formatColorValue(color.toHPLuv()),
        HSLuv: formatColorValue(color.toHSLuv()),
        CIELuv: formatColorValue(color.toCIELuv()),
        CIExyY: formatColorValue(color.toCIExyY()),
        CMYK: formatColorValue(color.toCmyk())
      }
      setConversions(newConversions)
    }
  }, [color, decimals])

  if (!color) {
    return <div>Loading...</div>
  }

  return (
    <Card isBlurred className='flex-grow w-full p-6 my-4 max-w-7xl'>
      <CardHeader className='flex-col items-center'>
        <h1 className='mb-2 text-2xl font-bold'>Color Converter</h1>
        <p className='text-center'>Convert colors between different formats. </p>
      </CardHeader>
      <Tooltip
        content={
          <Card isBlurred className='p-4'>
            <CardHeader className='text-lg'>Quick Tips:</CardHeader>
            <CardBody>
              <ul className='text-sm list-disc list-inside '>
                <li>Click on any color format to copy it to your clipboard.</li>
                <li>You can paste colors directly from design tools into the input above.</li>
                <li>Adjust the decimal places to increase or decrease precision.</li>
              </ul>
            </CardBody>
          </Card>
        }>
        <Button isIconOnly variant='light' className='absolute z-50 top-4 right-4'>
          <InfoIcon />
        </Button>
      </Tooltip>

      <div className='flex flex-col items-center justify-between '>
        <ColorInput />
        <div className='my-4'>
          <Input
            type='number'
            label='Decimal places'
            labelPlacement='outside-left'
            value={decimals.toString()}
            onChange={e => setDecimals(Math.min(6, Math.max(0, parseInt(e.target.value) || 0)))}
            min={0}
            max={6}
          />
        </div>
      </div>

      {/* <p className='py-4 text-lg font-semibold text-center'>Conversion Results</p> */}

      <CardBody className='grid items-center grid-cols-1 gap-4 place-content-center md:grid-cols-2 lg:grid-cols-3'>
        {Object.entries(conversions).map(([key, value]) => (
          <Snippet key={key} symbol size='lg' variant='flat'>
            <div className='flex flex-wrap items-center'>
              <span className='pr-2 text-sm font-bold'>{key}: </span>
              {Object.entries(value).map(([subKey, subValue], index) => (
                <span key={subKey} className='mr-2'>
                  <span className='mr-1 text-sm uppercase'>{subKey}:</span>
                  <span className='text-xs'>{subValue}</span>
                  {index < Object.entries(value).length - 1 && ', '}
                </span>
              ))}
            </div>
          </Snippet>
        ))}
      </CardBody>
    </Card>
  )
}
