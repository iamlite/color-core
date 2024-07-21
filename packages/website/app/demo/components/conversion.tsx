import { Card, CardBody, CardHeader, Snippet } from '@nextui-org/react'
import { Color } from 'color-core'
import React from 'react'

/**
 * Props for the ConversionSection component
 * @interface ConversionSectionProps
 * @property {Color} color - The color object to display conversions for
 */
interface ConversionSectionProps {
  color: Color
}

/**
 * A component that displays various color space conversions for a given color
 * @param {ConversionSectionProps} props - The component props
 * @returns {React.ReactElement} The rendered component
 */
const ConversionSection: React.FC<ConversionSectionProps> = ({ color }) => {
  /**
   * Converts a color value to a display-friendly format, explicitly removing the whitePoint property
   * @param {unknown} value - The color value to format
   * @returns {Record<string, string | number>} The formatted color value
   */
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
          result[key] = Number(val.toFixed(2))
        } else if (typeof val === 'string') {
          result[key] = val
        }
      })

      return result
    }

    return {}
  }

  const conversions: Record<string, Record<string, string | number>> = {
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

  return (
    <Card isBlurred className='w-full md:w-[40vw] my-2 px-4'>
      <CardHeader className='justify-center my-4 text-lg font-semibold'>Color Conversions</CardHeader>
      <CardBody>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          {Object.entries(conversions).map(([key, value]) => (
            <Snippet key={key} symbol size='sm' variant='flat'>
              <div className='flex'>
                <span className='pr-2 text-sm font-bold '>{key}:</span>
                {Object.entries(value).map(([subKey, subValue]) => (
                  <div key={subKey}>
                    <span className='text-sm uppercase'>{subKey}:</span>
                    <span className='pr-2 text-xs'>{subValue}</span>
                  </div>
                ))}
              </div>
            </Snippet>
          ))}
        </div>
      </CardBody>
    </Card>
  )
}

export default ConversionSection
