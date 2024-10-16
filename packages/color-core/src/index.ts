/**
 * Color conversion functions
 * These functions allow conversion between various color spaces
 */
export {
  adobeRGBToRGB,
  cieLuvToRgb,
  ciexyyToRgb,
  cmykToRgb,
  hexToRgb,
  hpluvToRgb,
  hsiToRgb,
  hslToRgb,
  hsluvToRgb,
  hsvToRgb,
  hwbToRgb,
  labToRgb,
  lchToRgb,
  linearSrgbToOklab,
  linearSrgbToSrgb,
  oklabToLinearSrgb,
  oklabToRgb,
  oklchToRgb,
  rgbToAdobeRGB,
  rgbToCIELuv,
  rgbToCIExyY,
  rgbToCmyk,
  rgbToHPLuv,
  rgbToHSLuv,
  rgbToHex,
  rgbToHsi,
  rgbToHsl,
  rgbToHsv,
  rgbToHwb,
  rgbToLab,
  rgbToLch,
  rgbToOklab,
  rgbToOklch,
  rgbToSrgb,
  rgbToXyz,
  rgbToYuv,
  srgbToLinearSrgb,
  srgbToRgb,
  xyzD50ToD65,
  xyzD65ToD50,
  xyzToRgb,
  yuvToRgb
} from './conversions'

/**
 * Color harmony functions
 * These functions generate color harmonies based on color theory
 */
export {
  analogous,
  complementary,
  doubleSplitComplementary,
  monochromatic,
  shades,
  splitComplementary,
  square,
  tetradic,
  tints,
  tones,
  triadic
} from './harmony'

/**
 * Color manipulation functions
 * These functions allow for adjusting various aspects of colors
 */
export { adjustAlpha, adjustHue, adjustLightness, adjustSaturation, grayscale, invert, mix } from './manipulation'

/**
 * Color scale functions
 * These functions generate color scales based on color theory
 */
export {
  createDivergingScale,
  createMultiHueSequentialScale,
  createPerceptuallyUniformScale,
  createQualitativeScale,
  createSequentialScale
} from './scales'

/**
 * Color type definitions
 * These types represent colors in various color spaces
 */
export {
  AdobeRGB,
  CIExyY,
  CMYK,
  ColorInput,
  ColorSpace,
  HPLuv,
  HSI,
  HSL,
  HSLuv,
  HSV,
  HWB,
  HexColor,
  LAB,
  LCH,
  LUV,
  Oklab,
  Oklch,
  RGB,
  SRGB,
  XYZ,
  YUV
} from './types'

/**
 * Unified Color Class
 * This class provides a comprehensive way to work with colors
 */
export { Color } from './color'

/**
 * @description getColorInfo and getColorName
 * Axios functions for color name and information
 * These functions can be used to fetch color name and information from the Color.pizza API
 *
 */
export { getColorInfo, getColorName } from './utils'

export { getContrastRatio, getRelativeLuminance, getWCAGCompliance } from './accessability'
