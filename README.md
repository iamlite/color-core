<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD041 -->

<div align="center">
<h1 style="padding: 20px">color-core</h1>
</div>

<div align="center">

<img alt="NPM Downloads" src="https://img.shields.io/npm/d18m/color-core?style=for-the-badge&logo=npm&color=purple">

<img alt="NPM Version" src="https://img.shields.io/npm/v/color-core?style=for-the-badge&logo=npm">

<img alt="NPM License" src="https://img.shields.io/npm/l/color-core?style=for-the-badge&color=red" >

<img src="https://img.shields.io/github/last-commit/iamlite/color-core?display_timestamp=author&style=for-the-badge&logo=github" alt="last-commit" />

<img alt="Libraries.io dependency status for latest release" src="https://img.shields.io/librariesio/release/npm/color-core?style=for-the-badge&logo=dependabot">

<img alt="Codecov" src="https://img.shields.io/codecov/c/github/iamlite/color-core?style=for-the-badge&logo=codecov">

<img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/color-core?style=for-the-badge">
<a href="https://iamlite.github.io/color-core/">
<img alt="Static Badge" src="https://img.shields.io/badge/Docs-blue?style=for-the-badge&logo=github&logoColor=white&labelColor=gray" >
</a>

</div>

---
<div align="center">

<a href="https://color-core.com">
<img alt="Static Badge" src="https://img.shields.io/badge/Demo_Website-blue?style=for-the-badge&logo=vercel&logoColor=white&labelColor=gray" >
</a>
<a href="https://www.npmjs.com/package/color-core">
<img alt="Static Badge" src="https://img.shields.io/badge/NPM-URL%20-%20link?style=for-the-badge&logo=npm" >
</a>
<a href="https://discord.gg/uYBuFXUmcU">
<img src="https://img.shields.io/discord/640575167772491786?style=for-the-badge&logo=discord&label=Discord&color=gold" alt="Discord" />
</a>

</div>

---

# color-core

`color-core` is a powerful, type-safe color manipulation library for TypeScript and JavaScript applications. It provides a comprehensive toolkit for working with colors across multiple color spaces, making it an indispensable tool for developers working on projects that require advanced color handling.

## Key Features

- 🎨 Support for 9 color spaces: RGB, HEX, HSL, HSV, CMYK, LAB, LCH, XYZ, and YUV
- 🔄 Seamless color space conversions
- 🌈 Advanced color harmony generation
- 🛠 Robust color manipulation tools
- 🎛 Flexible, unopinionated ColorPicker component
- 💪 Full TypeScript support
- 🔧 Unified `Color` class for intuitive operations
- 🚀 Optimized for modern web applications

At its core, `color-core` offers a unified `Color` class that simplifies complex color operations. Whether you're converting between color spaces, generating harmonious color schemes, or performing intricate color manipulations, `color-core` provides the tools you need in an easy-to-use package.

While designed with Next.js and React applications in mind, `color-core`'s versatility makes it suitable for any JavaScript or TypeScript project requiring sophisticated color management.

Elevate your color handling capabilities with `color-core` – the essential library for developers working with color. 🌈

## Installation

```bash
npm i color-core
```

or:

```bash
yarn add color-core
```

---

## Usage

### Unified Color Class

```typescript
import { Color } from 'color-core';

// Create a color from hex
const color = new Color('#ff0000');

// Convert to different formats
console.log(color.toRgb());  // { r: 255, g: 0, b: 0 }
console.log(color.toHsl());  // { h: 0, s: 100, l: 50 }
console.log(color.toHex());  // '#ff0000'
console.log(color.toXyz());  // { x: 41.24, y: 21.26, z: 1.93 }
console.log(color.toYuv());  // { y: 0.299, u: -0.14713, v: 0.615 }

// Create a color from RGB and perform operations
const blueColor = new Color({ r: 0, g: 0, b: 255 });
console.log(blueColor.toHex());  // '#0000ff'
console.log(blueColor.adjustLightness(20).toHex());  // '#3333ff'
console.log(blueColor.adjustSaturation(-50).toHex());  // '#4040bf'

// Check equality
const sameRed = new Color({ r: 255, g: 0, b: 0 });
console.log(color.equals(sameRed));  // true
```

### Individual Conversion Functions

```typescript
import { hexToRgb, rgbToHsl, rgbToXyz, rgbToYuv } from 'color-core';

const rgb = hexToRgb('#00ff00');
console.log(rgb);  // { r: 0, g: 255, b: 0 }

const hsl = rgbToHsl(rgb);
console.log(hsl);  // { h: 120, s: 100, l: 50 }

const xyz = rgbToXyz(rgb);
console.log(xyz);  // { x: 35.76, y: 71.52, z: 11.92 }

const yuv = rgbToYuv(rgb);
console.log(yuv);  // { y: 0.587, u: -0.28886, v: -0.51499 }
```

### Color Harmonies

```typescript
import { Color } from 'color-core';

const baseColor = new Color('#ff0000');

// Complementary
const [complement] = baseColor.complementary();
console.log(complement.toHex());  // '#00ffff'

// Analogous
const [color1, color2, color3] = baseColor.analogous();
console.log(color1.toHex(), color2.toHex(), color3.toHex());  // '#ff0080', '#ff0000', '#ff8000'

// Triadic
const [triad1, triad2] = baseColor.triadic();
console.log(triad1.toHex(), triad2.toHex());  // '#00ff00', '#0000ff'

// Tetradic
const [tetra1, tetra2, tetra3] = baseColor.tetradic();
console.log(tetra1.toHex(), tetra2.toHex(), tetra3.toHex());  // '#00ff00', '#00ffff', '#ff00ff'

// Split-complementary
const [split1, split2] = baseColor.splitComplementary();
console.log(split1.toHex(), split2.toHex());  // '#00ffff', '#00ff80'
```

### ColorPicker Component

The ColorPicker component is unopinionated and comes with minimal styling for layout. You can easily customize it using your preferred styling method, such as Tailwind CSS.

```jsx
import { ColorPicker } from 'color-core';

function MyComponent() {
  return (
    <ColorPicker
      initialColor={{ r: 255, g: 0, b: 0 }}
      onChange={(color) => console.log('Selected color:', color)}
      width={300}
      height={200}
      hueSliderHeight={30}
      className="bg-gray-100 p-4 rounded-lg shadow-md"
      saturationValueAreaClassName="rounded-md overflow-hidden"
      hueSliderClassName="mt-4 rounded-full"
      inputClassName="mt-2 px-2 py-1 border rounded"
      previewClassName="w-8 h-8 rounded-full border-2 border-gray-300"
    />
  );
}
```

## Color Naming

The Color class now includes methods for retrieving color names and information:

```typescript
const color = new Color('#ff0000');

// Get color name
color.getName().then(name => console.log(name));  // e.g., "Red"

// Get color information
color.getInfo().then(info => console.log(info));
// Returns: { name, hex, rgb, hsl, luminance, requestedHex }
```

## API Overview

- `Color`: Main class for color operations
  - Properties: `r`, `g`, `b`, `a`
  - Methods: `toRgb()`, `toHex()`, `toHsl()`, `toHsv()`, `toCmyk()`, `toLab()`, `toLch()`, `toXyz()`, `toYuv()`
  - Harmony methods: `complementary()`, `analogous()`, `triadic()`, `tetradic()`, `splitComplementary()`, `monochromatic()`
  - Manipulation methods: `adjustLightness()`, `adjustSaturation()`, `adjustHue()`, `adjustAlpha()`, `invert()`, `grayscale()`, `mix()`
  - Utility methods: `toString()`, `equals()`
  - Color naming: `getColorName()` method to get the closest named color
  - Brightness calculation: `getBrightness()` and `isLight()` methods
- Conversion functions: `hexToRgb()`, `rgbToHex()`, `rgbToHsl()`, `hslToRgb()`, `rgbToHsv()`, `hsvToRgb()`, `rgbToCmyk()`, `cmykToRgb()`, `rgbToLab()`, `labToRgb()`, `rgbToLch()`, `lchToRgb()`, `rgbToXyz()`, `xyzToRgb()`, `rgbToYuv()`, `yuvToRgb()`
- Harmony functions: `complementary()`, `analogous()`, `triadic()`, `tetradic()`, `splitComplementary()`, `monochromatic()`
- Components: `ColorPicker`

For a complete API reference, please refer to our [documentation](https://iamlite.github.io/color-core/).

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

| Method                       | Parameters     | Return Type                  | Description                                    |
| ---------------------------- | -------------- | ---------------------------- | ---------------------------------------------- |
| `complementary()`            | None           | [Color, Color]               | Generates a complementary harmony              |
| `analogous()`                | angle?: number | [Color, Color, Color]        | Generates an analogous harmony                 |
| `triadic()`                  | None           | [Color, Color, Color]        | Generates a triadic harmony                    |
| `tetradic()`                 | angle?: number | [Color, Color, Color, Color] | Generates a tetradic harmony                   |
| `splitComplementary()`       | angle?: number | [Color, Color, Color]        | Generates a split-complementary harmony        |
| `doubleSplitComplementary()` | angle?: number | [Color, Color, Color, Color] | Generates a double split-complementary harmony |
| `square()`                   | None           | [Color, Color, Color, Color] | Generates a square harmony                     |
| `monochromatic()`            | count?: number | Color[]                      | Generates a monochromatic harmony              |
| `shades()`                   | count?: number | Color[]                      | Generates shades of the color                  |
| `tints()`                    | count?: number | Color[]                      | Generates tints of the color                   |
| `tones()`                    | count?: number | Color[]                      | Generates tones of the color                   |

#### Manipulation Methods

| Method               | Parameters                   | Return Type | Description                         |
| -------------------- | ---------------------------- | ----------- | ----------------------------------- |
| `adjustLightness()`  | amount: number               | Color       | Adjusts the lightness of the color  |
| `adjustSaturation()` | amount: number               | Color       | Adjusts the saturation of the color |
| `adjustHue()`        | amount: number               | Color       | Adjusts the hue of the color        |
| `adjustAlpha()`      | amount: number               | Color       | Adjusts the alpha of the color      |
| `invert()`           | None                         | Color       | Inverts the color                   |
| `grayscale()`        | None                         | Color       | Converts the color to grayscale     |
| `mix()`              | color: Color, amount: number | Color       | Mixes the color with another color  |

#### Utility Methods

| Method                 | Parameters   | Return Type | Description                       |
| ---------------------- | ------------ | ----------- | --------------------------------- |
| `toString()`           | None         | string      | Returns the color as a hex string |
| `equals(other: Color)` | other: Color | boolean     | Checks if two colors are equal    |
| `getColorName()` | None                  | string      | Returns the name of the closest matching color  |
| `getBrightness()`| None                  | number      | Calculates the perceived brightness (0-255)     |
| `isLight()`      | threshold?: number    | boolean     | Determines if the color is light or dark        |

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
| `xyzToRgb`  | xyz: XYZ    | RGB         | Converts XYZ         |
| `rgbToXyz`  | rgb: RGB    | XYZ         | Converts RGB to XYZ  |
| `xyzToRgb`  | xyz: XYZ    | RGB         | Converts XYZ to RGB  |
| `rgbToYuv`  | rgb: RGB    | YUV         | Converts RGB to YUV  |
| `yuvToRgb`  | yuv: YUV    | RGB         | Converts YUV to RGB  |

### Harmony Functions

| Function                   | Parameters           | Return Type                  | Description                                    |
| -------------------------- | -------------------- | ---------------------------- | ---------------------------------------------- |
| `complementary`            | color: Color         | [Color, Color]               | Generates a complementary harmony              |
| `analogous`                | color: Color, angle? | [Color, Color, Color]        | Generates an analogous harmony                 |
| `triadic`                  | color: Color         | [Color, Color, Color]        | Generates a triadic harmony                    |
| `tetradic`                 | color: Color, angle? | [Color, Color, Color, Color] | Generates a tetradic harmony                   |
| `splitComplementary`       | color: Color, angle? | [Color, Color, Color]        | Generates a split-complementary harmony        |
| `doubleSplitComplementary` | color: Color, angle? | [Color, Color, Color, Color] | Generates a double split-complementary harmony |
| `square`                   | color: Color         | [Color, Color, Color, Color] | Generates a square harmony                     |
| `monochromatic`            | color: Color, count? | Color[]                      | Generates a monochromatic harmony              |
| `shades`                   | color: Color, count? | Color[]                      | Generates shades of the color                  |
| `tints`                    | color: Color, count? | Color[]                      | Generates tints of the color                   |
| `tones`                    | color: Color, count? | Color[]                      | Generates tones of the color                   |

### Types

```typescript
type RGB = { r: number; g: number; b: number; a?: number };
type HSL = { h: number; s: number; l: number; a?: number };
type HSV = { h: number; s: number; v: number; a?: number };
type CMYK = { c: number; m: number; y: number; k: number };
type LAB = { l: number; a: number; b: number };
type LCH = { l: number; c: number; h: number };
type XYZ = { x: number; y: number; z: number };
type YUV = { y: number; u: number; v: number };
```

## ColorPicker Component Props

The `ColorPicker` component accepts the following props:

| Prop Name                        | Type                 | Description                                        |
| -------------------------------- | -------------------- | -------------------------------------------------- |
| `initialColor`                   | RGB                  | Initial color value in RGB format                  |
| `onChange`                       | (color: RGB) => void | Callback function triggered when the color changes |
| `className`                      | string               | Custom class name for the main container           |
| `style`                          | React.CSSProperties  | Custom inline styles for the main container        |
| `width`                          | number \| string     | Width of the color picker                          |
| `height`                         | number \| string     | Height of the color picker                         |
| `hueSliderHeight`                | number \| string     | Height of the hue slider                           |
| `saturationValueAreaClassName`   | string               | Custom class name for the saturation-value area    |
| `saturationValueCursorClassName` | string               | Custom class name for the saturation-value cursor  |
| `hueSliderClassName`             | string               | Custom class name for the hue slider               |
| `hueSliderCursorClassName`       | string               | Custom class name for the hue slider cursor        |
| `inputClassName`                 | string               | Custom class name for the hex input field          |
| `previewClassName`               | string               | Custom class name for the color preview box        |
| `containerClassName`             | string               | Custom class name for the outer container          |
| `containerStyle`                 | React.CSSProperties  | Custom inline styles for the outer container       |

## Examples

### Color Manipulation

```typescript
import { Color } from 'color-core';

const color = new Color('#ff0000');

// Lighten the color
const lighterColor = color.adjustLightness(20);
console.log(lighterColor.toHex()); // '#ff6666'

// Desaturate the color
const desaturatedColor = color.adjustSaturation(-50);
console.log(desaturatedColor.toHex()); // '#bf4040'

// Change the hue
const hueShiftedColor = color.adjustHue(120);
console.log(hueShiftedColor.toHex()); // '#00ff00'

// Invert the color
const invertedColor = color.invert();
console.log(invertedColor.toHex()); // '#00ffff'

// Convert to grayscale
const grayscaleColor = color.grayscale();
console.log(grayscaleColor.toHex()); // '#4d4d4d'

// Mix with another color
const mixedColor = color.mix(new Color('#0000ff'), 0.5);
console.log(mixedColor.toHex()); // '#800080'
```

## Versioning

This project follows [Semantic Versioning](https://semver.org/). For the versions available, see the [tags on this repository](https://github.com/iamlite/color-core/tags).

## Contributing

Contributions are welcome and greatly appreciated! Here are a few ways you can contribute:

1. Reporting bugs
2. Suggesting enhancements
3. Writing or improving documentation
4. Submitting pull requests with code changes

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you're having any problem, please [raise an issue](https://github.com/iamlite/color-core/issues/new) on GitHub and I will be happy to help.

---

Built with ❤️ by [iamlite](https://github.com/iamlite)

<div align="center">
<h1>Code Coverage</h1>
<img alt=codecov src="https://codecov.io/gh/iamlite/color-core/graphs/sunburst.svg?token=MBMKJU55OY">
</div>
