<div align="center">
<h1 style="padding: 20px">next-colors</h1>
</div>

<div align="center">

<img alt="NPM Downloads" src="https://img.shields.io/npm/d18m/next-colors?style=for-the-badge" style='margin: 5px'>
<img alt="NPM Version" src="https://img.shields.io/npm/v/next-colors?style=for-the-badge&logo=npm" style='margin: 5px'>
<img alt="NPM License" src="https://img.shields.io/npm/l/next-colors?style=for-the-badge&color=red" style='margin: 5px'>
<img src="https://img.shields.io/github/last-commit/iamlite/next-colors?display_timestamp=author&style=for-the-badge&logo=github" alt="last-commit" style="margin: 5px;" />
<img alt="Libraries.io dependency status for latest release" src="https://img.shields.io/librariesio/release/npm/next-colors?style=for-the-badge" style='margin: 5px'>
<img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/next-colors?style=for-the-badge" style='margin: 5px'>
<a href="https://iamlite.github.io/next-colors/">
<img alt="Static Badge" src="https://img.shields.io/badge/Docs-blue?style=for-the-badge&logo=github&logoColor=white&labelColor=gray" style="margin: 5px" >
</a>

</div>

---
<div align="center">

<a href="https://next-colors-demo.vercel.app">
<img alt="Static Badge" src="https://img.shields.io/badge/Demo_Website-blue?style=for-the-badge&logo=vercel&logoColor=white&labelColor=gray" style="margin: 5px" >
</a>

<a href="https://www.npmjs.com/package/next-colors">
<img alt="Static Badge" src="https://img.shields.io/badge/NPM-URL%20-%20link?style=for-the-badge&logo=npm" style="margin: 5px;">
</a>

<a href="https://discord.gg/uYBuFXUmcU">
<img src="https://img.shields.io/discord/640575167772491786?style=for-the-badge&logo=discord&label=Discord&color=gold" alt="Discord" style="margin: 5px;" />
</a>

</div>

---

`next-colors` is a powerful and versatile color manipulation library designed specifically for Next.js and React applications. It provides a comprehensive set of tools for working with colors across various color spaces, making it an essential utility for developers working on projects that require advanced color handling.

This library offers a unified `Color` class that simplifies color conversions, manipulations, and harmony calculations. With support for RGB, HEX, HSL, HSV, CMYK, LAB, LCH, XYZ, and YUV color spaces, next-colors enables developers to effortlessly convert between formats, generate color harmonies, and perform complex color operations.

Key features include:

- Seamless color space conversions
- Color harmony generation (complementary, analogous, triadic, etc.)
- A type-safe API with full TypeScript support
- Efficient and accurate color calculations
- Easy integration with Next.js and React projects

Whether you're building a design tool, a data visualization app, or simply need robust color management in your Next.js project, next-colors provides the functionality you need with a clean, intuitive API.

## Installation

```bash
npm install next-colors
```

## Usage

### Basic Usage

```typescript
import { Color } from 'next-colors';

// Create a color from hex
const color = new Color('#ff0000');

// Convert to different formats
console.log(color.toRgb());  // { r: 255, g: 0, b: 0 }
console.log(color.toHsl());  // { h: 0, s: 100, l: 50 }
console.log(color.toHex());  // '#ff0000'
console.log(color.toXyz());  // { x: 0.4124, y: 0.2126, z: 0.0193 }
console.log(color.toYuv());  // { y: 0.299, u: -0.14713, v: 0.615 }

// Create a color from RGB
const blueColor = new Color({ r: 0, g: 0, b: 255 });
console.log(blueColor.toHex());  // '#0000ff'

// Check equality
const sameRed = new Color({ r: 255, g: 0, b: 0 });
console.log(color.equals(sameRed));  // true
```

### Using Individual Conversion Functions

```typescript
import { hexToRgb, rgbToHsl, rgbToXyz, rgbToYuv } from 'next-colors';

const rgb = hexToRgb('#00ff00');
console.log(rgb);  // { r: 0, g: 255, b: 0 }

const hsl = rgbToHsl(rgb);
console.log(hsl);  // { h: 120, s: 100, l: 50 }

const xyz = rgbToXyz(rgb);
console.log(xyz);  // { x: 0.3576, y: 0.7152, z: 0.1192 }

const yuv = rgbToYuv(rgb);
console.log(yuv);  // { y: 0.587, u: -0.28886, v: -0.51499 }
```

### Using Color Harmony Functions

```typescript
import { Color, complementary, analogous } from 'next-colors';

const baseColor = new Color('#ff0000');

// Generate complementary harmony
const [base, complement] = complementary(baseColor);
console.log(complement.toHex());  // '#00ffff'

// Generate analogous harmony
const [color1, color2, color3] = analogous(baseColor);
console.log(color1.toHex(), color2.toHex(), color3.toHex());  // '#ff0080', '#ff0000', '#ff8000'
```

### Using Color Harmony Methods

```typescript
import { Color } from 'next-colors';

const baseColor = new Color('#ff0000');

// Generate complementary harmony
const [base, complement] = baseColor.complementary();
console.log(complement.toHex());  // '#00ffff'

// Generate analogous harmony
const [color1, color2, color3] = baseColor.analogous();
console.log(color1.toHex(), color2.toHex(), color3.toHex());  // '#ff0080', '#ff0000', '#ff8000'

// Generate monochromatic harmony
const monoColors = baseColor.monochromatic(5);
monoColors.forEach(color => console.log(color.toHex()));
```

## API Reference

### Color Class

The `Color` class is the main entry point for color manipulations.

#### Constructor

```typescript
new Color(color: string | RGB | HSL | HSV | CMYK | LAB | LCH | XYZ | YUV)
```

Creates a new Color instance from various color formats.

#### Conversion Methods

| Method     | Return Type | Description                       |
| ---------- | ----------- | --------------------------------- |
| `toRgb()`  | RGB         | Converts the color to RGB format  |
| `toHex()`  | string      | Converts the color to HEX format  |
| `toHsl()`  | HSL         | Converts the color to HSL format  |
| `toHsv()`  | HSV         | Converts the color to HSV format  |
| `toCmyk()` | CMYK        | Converts the color to CMYK format |
| `toLab()`  | LAB         | Converts the color to LAB format  |
| `toLch()`  | LCH         | Converts the color to LCH format  |
| `toXyz()`  | XYZ         | Converts the color to XYZ format  |
| `toYuv()`  | YUV         | Converts the color to YUV format  |

#### Harmony Methods

| Method                 | Parameters     | Return Type                  | Description                             |
| ---------------------- | -------------- | ---------------------------- | --------------------------------------- |
| `complementary()`      | None           | [Color, Color]               | Generates a complementary harmony       |
| `analogous()`          | angle?: number | [Color, Color, Color]        | Generates an analogous harmony          |
| `triadic()`            | None           | [Color, Color, Color]        | Generates a triadic harmony             |
| `tetradic()`           | angle?: number | [Color, Color, Color, Color] | Generates a tetradic harmony            |
| `splitComplementary()` | angle?: number | [Color, Color, Color]        | Generates a split-complementary harmony |
| `monochromatic()`      | count?: number | Color[]                      | Generates a monochromatic harmony       |

#### Utility Methods

| Method                 | Parameters   | Return Type | Description                       |
| ---------------------- | ------------ | ----------- | --------------------------------- |
| `toString()`           | None         | string      | Returns the color as a hex string |
| `equals(other: Color)` | other: Color | boolean     | Checks if two colors are equal    |

### Conversion Functions

| Function    | Parameters  | Return Type | Description          |
| ----------- | ----------- | ----------- | -------------------- |
| `hexToRgb`  | hex: string | RGB         | Converts HEX to RGB  |
| `rgbToHex`  | rgb: RGB    | string      | Converts RGB to HEX  |
| `rgbToHsl`  | rgb: RGB    | HSL         | Converts RGB to HSL  |
| `hslToRgb`  | hsl: HSL    | RGB         | Converts HSL to RGB  |
| `rgbToHsv`  | rgb: RGB    | HSV         | Converts RGB to HSV  |
| `hsvToRgb`  | hsv: HSV    | RGB         | Converts HSV to RGB  |
| `rgbToCmyk` | rgb: RGB    | CMYK        | Converts RGB to CMYK |
| `cmykToRgb` | cmyk: CMYK  | RGB         | Converts CMYK to RGB |
| `rgbToLab`  | rgb: RGB    | LAB         | Converts RGB to LAB  |
| `labToRgb`  | lab: LAB    | RGB         | Converts LAB to RGB  |
| `rgbToLch`  | rgb: RGB    | LCH         | Converts RGB to LCH  |
| `lchToRgb`  | lch: LCH    | RGB         | Converts LCH to RGB  |
| `rgbToXyz`  | rgb: RGB    | XYZ         | Converts RGB to XYZ  |
| `xyzToRgb`  | xyz: XYZ    | RGB         | Converts XYZ to RGB  |
| `rgbToYuv`  | rgb: RGB    | YUV         | Converts RGB to YUV  |
| `yuvToRgb`  | yuv: YUV    | RGB         | Converts YUV to RGB  |

### Harmony Functions

| Function             | Parameters           | Return Type                  | Description                             |
| -------------------- | -------------------- | ---------------------------- | --------------------------------------- |
| `complementary`      | color: Color         | [Color, Color]               | Generates a complementary harmony       |
| `analogous`          | color: Color, angle? | [Color, Color, Color]        | Generates an analogous harmony          |
| `triadic`            | color: Color         | [Color, Color, Color]        | Generates a triadic harmony             |
| `tetradic`           | color: Color, angle? | [Color, Color, Color, Color] | Generates a tetradic harmony            |
| `splitComplementary` | color: Color, angle? | [Color, Color, Color]        | Generates a split-complementary harmony |
| `monochromatic`      | color: Color, count? | Color[]                      | Generates a monochromatic harmony       |

### Types

```typescript
type RGB = { r: number; g: number; b: number };
type HSL = { h: number; s: number; l: number };
type HSV = { h: number; s: number; v: number };
type CMYK = { c: number; m: number; y: number; k: number };
type LAB = { l: number; a: number; b: number };
type LCH = { l: number; c: number; h: number };
type XYZ = { x: number; y: number; z: number };
type YUV = { y: number; u: number; v: number };
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
