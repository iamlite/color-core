import { getContrastRatio, getWCAGCompliance } from './accessability'
import { getRelativeLuminance } from './accessability/components/relative-luminance'
import {
  adobeRGBToRGB,
  cieLuvToRgb,
  ciexyyToRgb,
  cmykToRgb,
  hpluvToRgb,
  hsiToRgb,
  hslToRgb,
  hsvToRgb,
  hwbToRgb,
  labToRgb,
  lchToRgb,
  oklabToRgb,
  oklchToRgb,
  rgbToAdobeRGB,
  rgbToCIELuv,
  rgbToCIExyY,
  rgbToCmyk,
  rgbToHex,
  rgbToHPLuv,
  rgbToHsi,
  rgbToHsl,
  rgbToHSLuv,
  rgbToHsv,
  rgbToHwb,
  rgbToLab,
  rgbToLabD50,
  rgbToLch,
  rgbToOklab,
  rgbToOklch,
  rgbToSrgb,
  rgbToXyz,
  rgbToXyzD50,
  rgbToYuv,
  srgbToRgb,
  xyzToRgb,
  yuvToRgb
} from './conversions'
import {
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
import { adjustAlpha, adjustHue, adjustLightness, adjustSaturation, grayscale, invert, mix } from './manipulation'
import {
  AdobeRGB,
  CIExyY,
  CMYK,
  ColorInfo,
  HPLuv,
  HSI,
  HSL,
  HSLuv,
  HSV,
  HWB,
  LAB,
  LCH,
  LUV,
  Oklab,
  Oklch,
  RGB,
  SRGB,
  TextSize,
  WCAGComplianceLevel,
  XYZ,
  YUV
} from './types'
import { calculateBrightness, isLightColor, parseColor } from './utils'
import { getColorInfo, getColorName } from './utils/components/color-naming'

/**
 * The Color class represents a color with various color space representations and manipulation methods.
 *
 * The class supports multiple color spaces, including RGB, HSL, HSV, CMYK, LAB, LCH, XYZ, and YUV.
 * It also provides methods for converting between color spaces and generating harmony colors.
 *
 * The class offers various color manipulation methods, such as adjusting lightness, saturation, hue, and alpha.
 * It also provides methods for converting colors to different string representations and retrieving information about the color.
 *
 * The class also includes utility methods for determining the perceived brightness of the color and checking if it is light or dark.
 */
export class Color {
  private _rgb: RGB
  private static PRECISION = 6

  constructor(
    color:
      | string
      | RGB
      | SRGB
      | HSL
      | HSV
      | CMYK
      | LAB
      | LCH
      | LUV
      | XYZ
      | YUV
      | Oklab
      | Oklch
      | HSLuv
      | HPLuv
      | CIExyY
      | HSI
      | HWB
      | AdobeRGB
  ) {
    if (typeof color === 'string') {
      const parsedColor = parseColor(color)
      if (parsedColor) {
        this._rgb = this.convertToRgb(parsedColor)
      } else {
        throw new Error('Invalid color format')
      }
    } else {
      this._rgb = this.convertToRgb(color)
    }

    if (this._rgb.a === undefined) {
      this._rgb.a = undefined
    }
    this._rgb = this.roundObject(this._rgb)
  }

  private convertToRgb(color: any): RGB {
    if ('r' in color && 'g' in color && 'b' in color) return { ...color, a: color.a ?? 1 }
    if ('sr' in color && 'sg' in color && 'sb' in color) return srgbToRgb(color as SRGB)
    if ('x' in color && 'y' in color && 'z' in color) return xyzToRgb(color as XYZ)
    if ('l' in color && 'a' in color && 'b' in color) return labToRgb(color as LAB)
    if ('l' in color && 'c' in color && 'h' in color) return lchToRgb(color as LCH)
    if ('y' in color && 'u' in color && 'v' in color) return yuvToRgb(color as YUV)
    if ('L' in color && 'u' in color && 'v' in color) return cieLuvToRgb(color as LUV)
    if ('L' in color && 'a' in color && 'b' in color) return oklabToRgb(color as Oklab)
    if ('L' in color && 'C' in color && 'h' in color) return oklchToRgb(color as Oklch)
    if ('x' in color && 'y' in color && 'Y' in color) return ciexyyToRgb(color as CIExyY)
    if ('h' in color && 's' in color && 'i' in color) return hsiToRgb(color as HSI)
    if ('h' in color && 'w' in color && 'b' in color) return hwbToRgb(color as HWB)
    if ('h' in color && 's' in color && 'l' in color) return hslToRgb(color as HSL)
    if ('h' in color && 's' in color && 'v' in color) return hsvToRgb(color as HSV)
    if ('h' in color && 'p' in color && 'l' in color) return hpluvToRgb(color as HPLuv)
    if ('c' in color && 'm' in color && 'y' in color && 'k' in color) return cmykToRgb(color as CMYK)
    if ('ar' in color && 'ag' in color && 'ab' in color) return adobeRGBToRGB(color as AdobeRGB)
    throw new Error('Invalid color format')
  }

  // Getters and setters

  get r(): number {
    return this._rgb.r
  }
  get g(): number {
    return this._rgb.g
  }
  get b(): number {
    return this._rgb.b
  }
  get a(): number | undefined {
    return this._rgb.a
  }

  set r(value: number) {
    this._rgb.r = Math.max(0, Math.min(255, Math.round(value)))
  }
  set g(value: number) {
    this._rgb.g = Math.max(0, Math.min(255, Math.round(value)))
  }
  set b(value: number) {
    this._rgb.b = Math.max(0, Math.min(255, Math.round(value)))
  }
  set a(value: number | undefined) {
    if (value === undefined) {
      this._rgb.a = undefined
    } else {
      this._rgb.a = Math.max(0, Math.min(1, value))
    }
  }

  // Conversion methods

  toRgb(): RGB {
    const { r, g, b, a } = this._rgb
    return a === undefined ? { r, g, b } : { r, g, b, a }
  }

  toHex(includeAlpha: boolean = this._rgb.a !== 1): string {
    return rgbToHex(this._rgb, includeAlpha)
  }

  toSrgb(): SRGB {
    return this.roundObject(rgbToSrgb(this._rgb))
  }
  toHsl(): HSL {
    return this.roundObject(rgbToHsl(this._rgb))
  }
  toHsv(): HSV {
    return this.roundObject(rgbToHsv(this._rgb))
  }
  toHsi(): HSI {
    return this.roundObject(rgbToHsi(this._rgb))
  }
  toHwb(): HWB {
    return this.roundObject(rgbToHwb(this._rgb))
  }
  toLch(): LCH {
    return this.roundObject(rgbToLch(this._rgb))
  }
  toYuv(): YUV {
    return this.roundObject(rgbToYuv(this._rgb))
  }
  toCmyk(): CMYK {
    return this.roundObject(rgbToCmyk(this._rgb))
  }
  toOklab(): Oklab {
    return this.roundObject(rgbToOklab(this._rgb))
  }
  toOklch(): Oklch {
    return this.roundObject(rgbToOklch(this._rgb))
  }
  toHSLuv(): HSLuv {
    return this.roundObject(rgbToHSLuv(this._rgb))
  }
  toHPLuv(): HPLuv {
    return this.roundObject(rgbToHPLuv(this._rgb))
  }
  toCIELuv(): LUV {
    return this.roundObject(rgbToCIELuv(this._rgb))
  }
  toCIExyY(): CIExyY {
    return this.roundObject(rgbToCIExyY(this._rgb))
  }
  toAdobeRGB(): AdobeRGB {
    return this.roundObject(rgbToAdobeRGB(this._rgb))
  }
  toXyz(): XYZ {
    return this.roundObject(rgbToXyz(this._rgb))
  }
  toXyzD50(): XYZ {
    return this.roundObject(rgbToXyzD50(this._rgb))
  }
  toLab(): LAB {
    return this.roundObject(rgbToLab(this._rgb))
  }
  toLabD50(): LAB {
    return this.roundObject(rgbToLabD50(this._rgb))
  }

  // Harmony methods

  complementary(): [Color, Color] {
    return complementary(this)
  }
  analogous(angle?: number): [Color, Color, Color] {
    return analogous(this, angle)
  }
  triadic(): [Color, Color, Color] {
    return triadic(this)
  }
  tetradic(angle?: number): [Color, Color, Color, Color] {
    return tetradic(this)
  }
  splitComplementary(angle?: number): [Color, Color, Color] {
    return splitComplementary(this, angle)
  }
  monochromatic(count?: number): Color[] {
    return monochromatic(this, count)
  }
  square(): [Color, Color, Color, Color] {
    return square(this)
  }
  doubleSplitComplementary(angle?: number): [Color, Color, Color, Color, Color] {
    return doubleSplitComplementary(this)
  }
  shades(count?: number): Color[] {
    return shades(this, count)
  }
  tints(count?: number): Color[] {
    return tints(this, count)
  }
  tones(count?: number): Color[] {
    return tones(this, count)
  }

  // Manipulation methods

  adjustLightness(amount: number): Color {
    return adjustLightness(this, amount)
  }
  adjustSaturation(amount: number): Color {
    return adjustSaturation(this, amount)
  }
  adjustHue(amount: number): Color {
    return adjustHue(this, amount)
  }
  adjustAlpha(amount: number): Color {
    return adjustAlpha(this, amount)
  }
  invert(): Color {
    return invert(this)
  }
  grayscale(): Color {
    return grayscale(this)
  }
  mix(color: Color, amount: number): Color {
    return mix(this, color, amount)
  }

  // Utility methods
  static setPrecision(precision: number): void {
    Color.PRECISION = precision
  }

  toString(includeAlpha: boolean = false): string {
    return this.toHex(includeAlpha)
  }

  setAlpha(value: number | undefined): Color {
    this.a = value
    return this
  }
  getEffectiveAlpha(): number {
    return this.a ?? 1
  }

  async getName(): Promise<string> {
    return getColorName(this)
  }
  async getInfo(): Promise<ColorInfo> {
    return getColorInfo(this)
  }

  getBrightness(): number {
    return calculateBrightness(this._rgb)
  }

  isLight(threshold: number = 128): boolean {
    return isLightColor(this._rgb, threshold)
  }

  /**
   * Calculates the relative luminance of the color.
   * @returns The relative luminance value between 0 and 1.
   */
  getRelativeLuminance(): number {
    return getRelativeLuminance(this)
  }

  /**
   * Calculates the contrast ratio between this color and another color.
   * @param otherColor The color to compare against.
   * @returns The contrast ratio between the two colors.
   */
  getContrastRatio(otherColor: Color): number {
    return getContrastRatio(this, otherColor)
  }

  /**
   * Determines the WCAG compliance level for the contrast between this color and another color.
   * @param otherColor The color to compare against.
   * @param size The size of the text ('Normal' or 'Large').
   * @returns An object containing the compliance level and the contrast ratio.
   */
  getWCAGCompliance(otherColor: Color, size: TextSize): { level: WCAGComplianceLevel; contrastRatio: number } {
    return getWCAGCompliance(this, otherColor, size)
  }

  equals(other: Color): boolean {
    const rgb1 = this.toRgb()
    const rgb2 = other.toRgb()
    return rgb1.r === rgb2.r && rgb1.g === rgb2.g && rgb1.b === rgb2.b && rgb1.a === rgb2.a
  }

  private roundNumber(num: number): number {
    return Number(num.toFixed(Color.PRECISION))
  }

  private roundObject<T extends object>(obj: T): T {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, typeof value === 'number' ? this.roundNumber(value) : value])
    ) as T
  }
}
