import {
  AdobeRGB,
  CIExyY,
  CMYK,
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
  XYZ,
  YUV
} from '../../types'

export function parseColor(
  input: string
):
  | RGB
  | HSL
  | HSV
  | CMYK
  | LAB
  | LCH
  | XYZ
  | YUV
  | Oklab
  | Oklch
  | HSLuv
  | HPLuv
  | CIExyY
  | LUV
  | SRGB
  | HSI
  | HWB
  | AdobeRGB
  | null {
  input = input.trim().toLowerCase()

  const parsers = [
    parseHex,
    parseRGB,
    parseHSL,
    parseHSV,
    parseHSI,
    parseHWB,
    parseLAB,
    parseXYZ,
    parseLCH,
    parseYUV,
    parseOklab,
    parseOklch,
    parseHPLuv,
    parseHSLuv,
    parseCIELuv,
    parseCIExyY,
    parseCMYK,
    parseSRGB,
    parseAdobeRGB,
    parseGenericColor
  ]

  for (const parser of parsers) {
    const result = parser(input)
    if (result) return result
  }

  return null
}

const parseHex = (input: string): RGB | null => {
  const hexRegex = /^#?([0-9a-f]{3,8})$/
  const match = input.match(hexRegex)
  if (match) {
    let hex = match[1]
    if (hex.length === 3 || hex.length === 4) {
      hex = hex
        .split('')
        .map(char => char + char)
        .join('')
    }
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)
    const b = parseInt(hex.substr(4, 2), 16)
    const a = hex.length === 8 ? parseInt(hex.substr(6, 2), 16) / 255 : 1
    return { r, g, b, a }
  }
  return null
}

const parseRGB = (input: string): RGB | null => {
  const rgbRegex = /^rgba?\(?\s*(-?\d+%?)\s*,?\s*(-?\d+%?)\s*,?\s*(-?\d+%?)\s*,?\s*(-?[\d.]+%?)?\s*\)?$/i
  const rgbMatchColon = input.match(/^rgb:?\s*r:(-?\d+%?),?\s*g:(-?\d+%?),?\s*b:(-?\d+%?),?\s*a?:?(-?[\d.]+%?)?\s*$/i)
  const match = input.match(rgbRegex) || rgbMatchColon
  if (match) {
    const [, r, g, b, a = '1'] = match
    return {
      r: parseValue(r, 255),
      g: parseValue(g, 255),
      b: parseValue(b, 255),
      a: parseValue(a, 1)
    }
  }
  return null
}

const parseHSL = (input: string): HSL | null => {
  const hslRegex =
    /^hsla?\(?\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?\d+(?:\.\d+)?%?)\s*,?\s*(-?\d+(?:\.\d+)?%?)\s*,?\s*(-?[\d.]+%?)?\s*\)?$/i
  const hslMatchColon = input.match(
    /^hsl:?\s*h:(-?\d+(?:\.\d+)?),?\s*s:(-?\d+(?:\.\d+)?%?),?\s*l:(-?\d+(?:\.\d+)?%?),?\s*a?:?(-?[\d.]+%?)?\s*$/i
  )
  const match = input.match(hslRegex) || hslMatchColon
  if (match) {
    const [, h, s, l, a = '1'] = match
    return {
      h: parseAngle(h),
      s: parseValue(s, 100),
      l: parseValue(l, 100),
      a: parseValue(a, 1)
    }
  }
  return null
}

const parseHSV = (input: string): HSV | null => {
  const hsvRegex =
    /^hsva?\(?\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?\d+(?:\.\d+)?%?)\s*,?\s*(-?\d+(?:\.\d+)?%?)\s*,?\s*(-?[\d.]+%?)?\s*\)?$/i
  const hsvMatchColon = input.match(
    /^hsv:?\s*h:(-?\d+(?:\.\d+)?),?\s*s:(-?\d+(?:\.\d+)?%?),?\s*v:(-?\d+(?:\.\d+)?%?),?\s*a?:?(-?[\d.]+%?)?\s*$/i
  )
  const match = input.match(hsvRegex) || hsvMatchColon
  if (match) {
    const [, h, s, v, a = '1'] = match
    return {
      h: parseAngle(h),
      s: parseValue(s, 100),
      v: parseValue(v, 100),
      a: parseValue(a, 1)
    }
  }
  return null
}

const parseHSI = (input: string): HSI | null => {
  const hsiRegex =
    /^hsia?\(?\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?\d+(?:\.\d+)?%?)\s*,?\s*(-?\d+(?:\.\d+)?%?)\s*,?\s*(-?[\d.]+%?)?\s*\)?$/i
  const hsiMatchColon = input.match(
    /^hsi:?\s*h:(-?\d+(?:\.\d+)?),?\s*s:(-?\d+(?:\.\d+)?%?),?\s*i:(-?\d+(?:\.\d+)?%?),?\s*a?:?(-?[\d.]+%?)?\s*$/i
  )
  const match = input.match(hsiRegex) || hsiMatchColon
  if (match) {
    const [, h, s, i, a = '1'] = match
    return {
      h: parseAngle(h),
      s: parseValue(s, 100),
      i: parseValue(i, 100)
    }
  }
  return null
}

const parseHWB = (input: string): HWB | null => {
  const hwbRegex =
    /^hwba?\(?\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?\d+(?:\.\d+)?%?)\s*,?\s*(-?\d+(?:\.\d+)?%?)\s*,?\s*(-?[\d.]+%?)?\s*\)?$/i
  const hwbMatchColon = input.match(
    /^hwb:?\s*h:(-?\d+(?:\.\d+)?),?\s*w:(-?\d+(?:\.\d+)?%?),?\s*b:(-?\d+(?:\.\d+)?%?),?\s*a?:?(-?[\d.]+%?)?\s*$/i
  )
  const match = input.match(hwbRegex) || hwbMatchColon
  if (match) {
    const [, h, w, b, a = '1'] = match
    return {
      h: parseAngle(h),
      w: parseValue(w, 100),
      b: parseValue(b, 100)
    }
  }
  return null
}

const parseLAB = (input: string): LAB | null => {
  const labRegex =
    /^laba?\(?\s*(-?\d+(?:\.\d+)?%?)\s*,?\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?[\d.]+%?)?\s*\)?$/i
  const labMatchColon = input.match(
    /^lab:?\s*l:(-?\d+(?:\.\d+)?%?),?\s*a:(-?\d+(?:\.\d+)?),?\s*b:(-?\d+(?:\.\d+)?),?\s*alpha?:?(-?[\d.]+%?)?\s*$/i
  )
  const match = input.match(labRegex) || labMatchColon
  if (match) {
    const [, l, a, b, alpha = '1'] = match
    return {
      l: parseValue(l, 100),
      a: parseFloat(a),
      b: parseFloat(b)
    }
  }
  return null
}

const parseXYZ = (input: string): XYZ | null => {
  const xyzRegex =
    /^xyza?\(?\s*(-?\d+(?:\.\d+)?%?)\s*,?\s*(-?\d+(?:\.\d+)?%?)\s*,?\s*(-?\d+(?:\.\d+)?%?)\s*,?\s*(-?[\d.]+%?)?\s*\)?$/i
  const xyzMatchColon = input.match(
    /^xyz:?\s*x:(-?\d+(?:\.\d+)?%?),?\s*y:(-?\d+(?:\.\d+)?%?),?\s*z:(-?\d+(?:\.\d+)?%?),?\s*alpha?:?(-?[\d.]+%?)?\s*$/i
  )
  const match = input.match(xyzRegex) || xyzMatchColon
  if (match) {
    const [, x, y, z, alpha = '1'] = match
    return {
      x: parseValue(x, 100),
      y: parseValue(y, 100),
      z: parseValue(z, 100)
    }
  }
  return null
}

const parseLCH = (input: string): LCH | null => {
  const lchRegex =
    /^lcha?\(?\s*(-?\d+(?:\.\d+)?%?)\s*,?\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?[\d.]+%?)?\s*\)?$/i
  const lchMatchColon = input.match(
    /^lch:?\s*l:(-?\d+(?:\.\d+)?%?),?\s*c:(-?\d+(?:\.\d+)?),?\s*h:(-?\d+(?:\.\d+)?),?\s*alpha?:?(-?[\d.]+%?)?\s*$/i
  )
  const match = input.match(lchRegex) || lchMatchColon
  if (match) {
    const [, l, c, h, alpha = '1'] = match
    return {
      l: parseValue(l, 100),
      c: parseFloat(c),
      h: parseAngle(h),
      alpha: parseValue(alpha, 1)
    }
  }
  return null
}

const parseYUV = (input: string): YUV | null => {
  const yuvRegex =
    /^yuva?\(?\s*(-?\d+(?:\.\d+)?%?)\s*,?\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?[\d.]+%?)?\s*\)?$/i
  const yuvMatchColon = input.match(
    /^yuv:?\s*y:(-?\d+(?:\.\d+)?%?),?\s*u:(-?\d+(?:\.\d+)?),?\s*v:(-?\d+(?:\.\d+)?),?\s*a?:?(-?[\d.]+%?)?\s*$/i
  )
  const match = input.match(yuvRegex) || yuvMatchColon
  if (match) {
    const [, y, u, v, a = '1'] = match
    return {
      y: parseValue(y, 100),
      u: parseFloat(u),
      v: parseFloat(v)
    }
  }
  return null
}

const parseOklab = (input: string): Oklab | null => {
  const oklabRegex =
    /^oklaba?\(?\s*(-?\d+(?:\.\d+)?%?)\s*,?\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?[\d.]+%?)?\s*\)?$/i
  const oklabMatchColon = input.match(
    /^oklab:?\s*l:(-?\d+(?:\.\d+)?%?),?\s*a:(-?\d+(?:\.\d+)?),?\s*b:(-?\d+(?:\.\d+)?),?\s*alpha?:?(-?[\d.]+%?)?\s*$/i
  )
  const match = input.match(oklabRegex) || oklabMatchColon
  if (match) {
    const [, L, a, b, alpha = '1'] = match
    return {
      L: parseValue(L, 1),
      a: parseFloat(a),
      b: parseFloat(b)
    }
  }
  return null
}

const parseOklch = (input: string): Oklch | null => {
  const oklchRegex =
    /^oklcha?\(?\s*(-?\d+(?:\.\d+)?%?)\s*,?\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?[\d.]+%?)?\s*\)?$/i
  const oklchMatchColon = input.match(
    /^oklch:?\s*l:(-?\d+(?:\.\d+)?%?),?\s*c:(-?\d+(?:\.\d+)?),?\s*h:(-?\d+(?:\.\d+)?),?\s*alpha?:?(-?[\d.]+%?)?\s*$/i
  )
  const match = input.match(oklchRegex) || oklchMatchColon
  if (match) {
    const [, L, C, h, alpha = '1'] = match
    return {
      L: parseValue(L, 1),
      C: parseFloat(C),
      h: parseAngle(h)
    }
  }
  return null
}

const parseHPLuv = (input: string): HPLuv | null => {
  const hpluvRegex =
    /^hpluva?\(?\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?\d+(?:\.\d+)?%?)\s*,?\s*(-?\d+(?:\.\d+)?%?)\s*,?\s*(-?[\d.]+%?)?\s*\)?$/i
  const hpluvMatchColon = input.match(
    /^hpluv:?\s*h:(-?\d+(?:\.\d+)?),?\s*p:(-?\d+(?:\.\d+)?%?),?\s*l:(-?\d+(?:\.\d+)?%?),?\s*alpha?:?(-?[\d.]+%?)?\s*$/i
  )
  const match = input.match(hpluvRegex) || hpluvMatchColon
  if (match) {
    const [, h, p, l, alpha = '1'] = match
    return {
      h: parseAngle(h),
      p: parseValue(p, 100),
      l: parseValue(l, 100)
    }
  }
  return null
}

const parseHSLuv = (input: string): HSLuv | null => {
  const hsluvRegex =
    /^hsluva?\(?\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?\d+(?:\.\d+)?%?)\s*,?\s*(-?\d+(?:\.\d+)?%?)\s*,?\s*(-?[\d.]+%?)?\s*\)?$/i
  const hsluvMatchColon = input.match(
    /^hsluv:?\s*h:(-?\d+(?:\.\d+)?),?\s*s:(-?\d+(?:\.\d+)?%?),?\s*l:(-?\d+(?:\.\d+)?%?),?\s*alpha?:?(-?[\d.]+%?)?\s*$/i
  )
  const match = input.match(hsluvRegex) || hsluvMatchColon
  if (match) {
    const [, h, s, l, alpha = '1'] = match
    return {
      h: parseAngle(h),
      s: parseValue(s, 100),
      l: parseValue(l, 100)
    }
  }
  return null
}

const parseCIELuv = (input: string): LUV | null => {
  const cieluvRegex =
    /^cieluva?\(?\s*(-?\d+(?:\.\d+)?%?)\s*,?\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?[\d.]+%?)?\s*\)?$/i
  const cieluvMatchColon = input.match(
    /^cieluv:?\s*l:(-?\d+(?:\.\d+)?%?),?\s*u:(-?\d+(?:\.\d+)?),?\s*v:(-?\d+(?:\.\d+)?),?\s*alpha?:?(-?[\d.]+%?)?\s*$/i
  )
  const match = input.match(cieluvRegex) || cieluvMatchColon
  if (match) {
    const [, L, u, v, alpha = '1'] = match
    return {
      L: parseValue(L, 100),
      u: parseFloat(u),
      v: parseFloat(v)
    }
  }
  return null
}

const parseCIExyY = (input: string): CIExyY | null => {
  const ciexyYRegex =
    /^ciexyya?\(?\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?\d+(?:\.\d+)?%?)\s*,?\s*(-?[\d.]+%?)?\s*\)?$/i
  const ciexyYMatchColon = input.match(
    /^ciexyy:?\s*x:(-?\d+(?:\.\d+)?),?\s*y:(-?\d+(?:\.\d+)?),?\s*Y:(-?\d+(?:\.\d+)?%?),?\s*alpha?:?(-?[\d.]+%?)?\s*$/i
  )
  const match = input.match(ciexyYRegex) || ciexyYMatchColon
  if (match) {
    const [, x, y, Y, alpha = '1'] = match
    return {
      x: parseFloat(x),
      y: parseFloat(y),
      Y: parseValue(Y, 100)
    }
  }
  return null
}

const parseCMYK = (input: string): CMYK | null => {
  const cmykRegex =
    /^cmyka?\(?\s*(-?\d+(?:\.\d+)?%?)\s*,?\s*(-?\d+(?:\.\d+)?%?)\s*,?\s*(-?\d+(?:\.\d+)?%?)\s*,?\s*(-?\d+(?:\.\d+)?%?)\s*,?\s*(-?[\d.]+%?)?\s*\)?$/i
  const cmykMatchColon = input.match(
    /^cmyk:?\s*c:(-?\d+(?:\.\d+)?%?),?\s*m:(-?\d+(?:\.\d+)?%?),?\s*y:(-?\d+(?:\.\d+)?%?),?\s*k:(-?\d+(?:\.\d+)?%?),?\s*alpha?:?(-?[\d.]+%?)?\s*$/i
  )
  const match = input.match(cmykRegex) || cmykMatchColon
  if (match) {
    const [, c, m, y, k, alpha = '1'] = match
    return {
      c: parseValue(c, 100),
      m: parseValue(m, 100),
      y: parseValue(y, 100),
      k: parseValue(k, 100)
    }
  }
  return null
}

const parseSRGB = (input: string): SRGB | null => {
  const srgbRegex =
    /^srgba?\(?\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?[\d.]+%?)?\s*\)?$/i
  const srgbMatchColon = input.match(
    /^srgb:?\s*sr:(-?\d+(?:\.\d+)?),?\s*sg:(-?\d+(?:\.\d+)?),?\s*sb:(-?\d+(?:\.\d+)?),?\s*alpha?:?(-?[\d.]+%?)?\s*$/i
  )
  const match = input.match(srgbRegex) || srgbMatchColon
  if (match) {
    const [, sr, sg, sb, alpha = '1'] = match
    return {
      sr: parseFloat(sr),
      sg: parseFloat(sg),
      sb: parseFloat(sb)
    }
  }
  return null
}

const parseAdobeRGB = (input: string): AdobeRGB | null => {
  const adobeRGBRegex =
    /^adobergba?\(?\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?\d+(?:\.\d+)?)\s*,?\s*(-?[\d.]+%?)?\s*\)?$/i
  const adobeRGBMatchColon = input.match(
    /^adobergb:?\s*ar:(-?\d+(?:\.\d+)?),?\s*ag:(-?\d+(?:\.\d+)?),?\s*ab:(-?\d+(?:\.\d+)?),?\s*alpha?:?(-?[\d.]+%?)?\s*$/i
  )
  const match = input.match(adobeRGBRegex) || adobeRGBMatchColon
  if (match) {
    const [, ar, ag, ab, alpha = '1'] = match
    return {
      ar: parseFloat(ar),
      ag: parseFloat(ag),
      ab: parseFloat(ab)
    }
  }
  return null
}

const parseGenericColor = (input: string): any | null => {
  const genericRegex = /^color\(\s*--(\w+)\s+([-\d.%\s]+)\s*\)$/i
  const match = input.match(genericRegex)
  if (match) {
    const [, colorSpace, values] = match
    const parsedValues = values
      .trim()
      .split(/\s+/)
      .map(v => parseValue(v, 100))
    switch (colorSpace.toLowerCase()) {
      case 'rgb':
        return { r: parsedValues[0], g: parsedValues[1], b: parsedValues[2], a: parsedValues[3] || 1 }
      case 'hsl':
        return { h: parsedValues[0], s: parsedValues[1], l: parsedValues[2], a: parsedValues[3] || 1 }
      case 'hsv':
        return { h: parsedValues[0], s: parsedValues[1], v: parsedValues[2], a: parsedValues[3] || 1 }
      case 'hwb':
        return { h: parsedValues[0], w: parsedValues[1], b: parsedValues[2], a: parsedValues[3] || 1 }
      case 'lab':
        return { l: parsedValues[0], a: parsedValues[1], b: parsedValues[2], alpha: parsedValues[3] || 1 }
      case 'lch':
        return { l: parsedValues[0], c: parsedValues[1], h: parsedValues[2], alpha: parsedValues[3] || 1 }
      case 'oklab':
        return { L: parsedValues[0], a: parsedValues[1], b: parsedValues[2], alpha: parsedValues[3] || 1 }
      case 'oklch':
        return { L: parsedValues[0], C: parsedValues[1], h: parsedValues[2], alpha: parsedValues[3] || 1 }
      case 'xyz':
        return { x: parsedValues[0], y: parsedValues[1], z: parsedValues[2], alpha: parsedValues[3] || 1 }
      case 'yuv':
        return { y: parsedValues[0], u: parsedValues[1], v: parsedValues[2], a: parsedValues[3] || 1 }
      case 'hsi':
        return { h: parsedValues[0], s: parsedValues[1], i: parsedValues[2], a: parsedValues[3] || 1 }
      case 'hsluv':
        return { h: parsedValues[0], s: parsedValues[1], l: parsedValues[2], alpha: parsedValues[3] || 1 }
      case 'hpluv':
        return { h: parsedValues[0], p: parsedValues[1], l: parsedValues[2], alpha: parsedValues[3] || 1 }
      case 'cieluv':
        return { L: parsedValues[0], u: parsedValues[1], v: parsedValues[2], alpha: parsedValues[3] || 1 }
      case 'ciexyy':
        return { x: parsedValues[0], y: parsedValues[1], Y: parsedValues[2], alpha: parsedValues[3] || 1 }
      case 'cmyk':
        return {
          c: parsedValues[0],
          m: parsedValues[1],
          y: parsedValues[2],
          k: parsedValues[3],
          alpha: parsedValues[4] || 1
        }
      case 'srgb':
        return { sr: parsedValues[0], sg: parsedValues[1], sb: parsedValues[2], alpha: parsedValues[3] || 1 }
      case 'adobergb':
        return { ar: parsedValues[0], ag: parsedValues[1], ab: parsedValues[2], alpha: parsedValues[3] || 1 }
      default:
        return null
    }
  }
  return null
}

const parseValue = (value: string, max: number): number => {
  if (value.endsWith('%')) {
    return (parseFloat(value) / 100) * max
  }
  return parseFloat(value)
}

const parseAngle = (angle: string): number => {
  const value = parseFloat(angle)
  if (angle.endsWith('deg')) {
    return value % 360
  } else if (angle.endsWith('grad')) {
    return (value * 0.9) % 360
  } else if (angle.endsWith('rad')) {
    return ((value * 180) / Math.PI) % 360
  } else if (angle.endsWith('turn')) {
    return (value * 360) % 360
  }
  return value % 360
}

export { parseAngle, parseValue }
