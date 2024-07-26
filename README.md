<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD041 -->

<div align="center">
<a name="top"></a>
<img alt="logo" src="./assets/color-core-light.png"/>
</div>

<div align="center">

<img alt="NPM Downloads" src="https://img.shields.io/npm/d18m/color-core?style=for-the-badge&logo=npm&color=purple"/>

<img alt="NPM Version" src="https://img.shields.io/npm/v/color-core?style=for-the-badge&logo=npm"/>

<img alt="NPM License" src="https://img.shields.io/npm/l/color-core?style=for-the-badge&color=red"/>

<img src="https://img.shields.io/github/last-commit/iamlite/color-core?display_timestamp=author&style=for-the-badge&logo=github" alt="last-commit" />

<img alt="Libraries.io dependency status for latest release" src="https://img.shields.io/librariesio/release/npm/color-core?style=for-the-badge&logo=dependabot"/>

<img alt="Codecov" src="https://img.shields.io/codecov/c/github/iamlite/color-core?style=for-the-badge&logo=codecov"/>

<img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/color-core?style=for-the-badge"/>
<a href="https://iamlite.github.io/color-core/">
<img alt="Static Badge" src="https://img.shields.io/badge/Docs-blue?style=for-the-badge&logo=github&logoColor=white&labelColor=gray"/>
</a>

</div>

---
<div align="center">

<a href="https://color-core.com">
<img alt="Static Badge" src="https://img.shields.io/badge/Demo_Website-blue?style=for-the-badge&logo=vercel&logoColor=white&labelColor=gray"/>
</a>
<a href="https://www.npmjs.com/package/color-core">
<img alt="Static Badge" src="https://img.shields.io/badge/NPM-URL%20-%20link?style=for-the-badge&logo=npm"/>
</a>
<a href="https://discord.gg/uYBuFXUmcU">
<img src="https://img.shields.io/discord/640575167772491786?style=for-the-badge&logo=discord&label=Discord&color=gold" alt="Discord" />
</a>

</div>

---

<div align="center">
`color-core` is a comprehensive, type-safe color manipulation library for TypeScript and JavaScript applications. It provides a powerful toolkit for working with colors across multiple color spaces, making it an essential tool for developers working on projects that require advanced color handling.
</div>

## Features

- 🎨 Support for 22 color spaces: RGB, sRGB, Adobe RGB, HEX, HSL, HSV, HSI, HWB, CMYK, LCH, LAB(D50), LAB(D60), XYZ(D50), XYZ(D65), YUV, Oklab, Oklch, HSLuv, HPLuv, CIExyY, and CIELuv
- 🔄 Easy color conversions between all supported formats
- 🌈 Generate color harmonies (complementary, analogous, triadic, tetradic, split-complementary, and more)
- 🛠 Powerful color manipulation tools (adjust lightness, saturation, hue, alpha, and more)
- 🎛 Customizable, unopinionated ColorPicker component
- 💪 Full TypeScript support with type safety
- 🔌 Seamless IDE integration
- 🧠 Color naming and information retrieval
- 🔦 Brightness calculation and light/dark color detection
- 🚀 Optimized for modern web applications

<div align="center">

## Installation

```bash
npm i color-core
```

<br>

---

## Usage

`color-core` is designed to simplify color manipulation for developers and designers. Whether you're working on web applications, data visualization, or graphic design, this library provides the tools you need to handle colors efficiently across various formats and color spaces. Let's explore how to use `color-core` in your projects. The following examples demonstrate key functionalities of the library, from basic color conversions to more advanced color manipulations

<br>

### The Color Class

The `Color` class is the heart of `color-core`.  It provides a unified way to create, convert, and manipulate colors across different color spaces.

See it in action ⤵️

<br>
<div align="left">

```typescript
import { Color } from 'color-core';

// Create a color from different formats
const red = new Color('#ff0000');
const green = new Color({ r: 0, g: 255, b: 0 });
const blue = new Color({ h: 240, s: 100, l: 50 });

// Convert to different formats
console.log(red.toRgb());    // { r: 255, g: 0, b: 0 }
console.log(green.toHsl());  // { h: 120, s: 100, l: 50 }
console.log(blue.toHex());   // '#0000ff'

// Advanced color spaces
console.log(red.toOklab());   // { L: 0.627955, a: 0.224863, b: 0.125846 }
console.log(green.toCIExyY());// { x: 0.3, y: 0.6, Y: 0.715158 }
console.log(blue.toHSLuv()); // { h: 265.87, s: 100, l: 32.3 }

// Color manipulation
const lightRed = red.adjustLightness(20);
console.log(lightRed.toHex()); // '#ff6666'

const desaturatedGreen = green.adjustSaturation(-50);
console.log(desaturatedGreen.toHex()); // '#40bf40'

// Generate harmonies
const [complement] = red.complementary();
console.log(complement.toHex()); // '#00ffff'

const [color1, color2] = blue.splitComplementary();
console.log(color1.toHex(), color2.toHex()); // '#ffaa00' '#ff5500'

// Mix colors
const purple = red.mix(blue, 0.5);
console.log(purple.toHex()); // '#800080'

// Get color information
red.getName().then(name => console.log(name)); // 'Red'
red.getInfo().then(info => console.log(info));
// Returns: { name, hex, rgb, hsl, luminance, requestedHex }

// Check brightness and lightness
console.log(red.getBrightness()); // 76.245
console.log(red.isLight()); // false
```

</div>
<br>

### Color Conversion Functions

For situations where you need quick, one-off color conversions, `color-core` offers standalone conversion functions. These can be useful when you don't need the full functionality of the `Color` class.

<br>
<div align="left">

```typescript
import { hexToRgb, rgbToHsl, rgbToOklab } from 'color-core';

const rgb = hexToRgb('#00ff00');
console.log(rgb);  // { r: 0, g: 255, b: 0 }

const hsl = rgbToHsl(rgb);
console.log(hsl);  // { h: 120, s: 100, l: 50 }

const oklab = rgbToOklab(rgb);
console.log(oklab);  // { L: 0.866440, a: -0.233888, b: 0.179498 }
```

</div>
<br>

### ColorPicker Component

`color-core` includes a customizable ColorPicker component for typescript applications. This component provides a user-friendly interface for color selection while allowing extensive customization to fit your application's needs.

<br>
<div align="left">

```jsx
import { ColorPicker } from 'color-core';

function MyComponent() {
  return (
    <ColorPicker
      initialColor={{ r: 255, g: 0, b: 0 }}
      onChange={(color) => console.log('Selected color:', color)}
      width={300}
      height={200}
    />
  );
}
```

</div>
<br>

---

## API Reference

The following section provides a comprehensive overview of color-core's API. Each method and function is documented to help you understand its purpose and usage within your color manipulation workflows.You can find more detailed information in the [official documentation](https://color-core.com/docs).

<br>

### Color Class

The `Color` class is the main entry point for color manipulations.

<br>

#### Constructor

<div align="left">

```typescript
new Color(color: string | RGB | HSL | HSV | CMYK | LAB | LCH | XYZ | YUV | Oklab | Oklch | HSLuv | HPLuv | CIExyY | HSI | HWB | AdobeRGB)
```

</div>
Creates a new Color instance from various color formats.

<br>

#### Conversion Methods

<br>

| Method        | Return Type | Description                          |
|---------------|:-----------:|:-------------------------------------:|
| `toRgb()`     | RGB         | Converts the color to RGB format     |
| `toSrgb()`    | SRGB        | Converts the color to sRGB format    |
| `toHex()`     | string      | Converts the color to HEX format     |
| `toHsl()`     | HSL         | Converts the color to HSL format     |
| `toHsv()`     | HSV         | Converts the color to HSV format     |
| `toHsi()`     | HSI         | Converts the color to HSI format     |
| `toHwb()`     | HWB         | Converts the color to HWB format     |
| `toLch()`     | LCH         | Converts the color to LCH format     |
| `toYuv()`     | YUV         | Converts the color to YUV format     |
| `toCmyk()`    | CMYK        | Converts the color to CMYK format    |
| `toOklab()`   | Oklab       | Converts the color to Oklab format   |
| `toOklch()`   | Oklch       | Converts the color to Oklch format   |
| `toHSLuv()`   | HSLuv       | Converts the color to HSLuv format   |
| `toHPLuv()`   | HPLuv       | Converts the color to HPLuv format   |
| `toCIELuv()`  | LUV         | Converts the color to CIELuv format  |
| `toCIExyY()`  | CIExyY      | Converts the color to CIExyY format  |
| `toAdobeRGB()`| AdobeRGB    | Converts the color to Adobe RGB format |
| `toXyz()`     | XYZ         | Converts the color to XYZ (D65) format |
| `toXyzD50()`  | XYZ         | Converts the color to XYZ (D50) format |
| `toLab()`     | LAB         | Converts the color to LAB (D65) format |
| `toLabD50()`  | LAB         | Converts the color to LAB (D50) format |

<br>

#### Harmony Methods

<br>

| Method                       | Parameters     | Return Type                  | Description                                    |
|------------------------------|:--------------:|:----------------------------:|:----------------------------------------------:|
| `complementary()`            | None           | [Color, Color]               | Generates a complementary harmony              |
| `analogous()`                | angle?: number | [Color, Color, Color]        | Generates an analogous harmony                 |
| `triadic()`                  | None           | [Color, Color, Color]        | Generates a triadic harmony                    |
| `tetradic()`                 | angle?: number | [Color, Color, Color, Color] | Generates a tetradic harmony                   |
| `splitComplementary()`       | angle?: number | [Color, Color, Color]        | Generates a split-complementary harmony        |
| `doubleSplitComplementary()` | angle?: number | [Color, Color, Color, Color, Color] | Generates a double split-complementary harmony |
| `square()`                   | None           | [Color, Color, Color, Color] | Generates a square harmony                     |
| `monochromatic()`            | count?: number | Color[]                      | Generates a monochromatic harmony              |
| `shades()`                   | count?: number | Color[]                      | Generates shades of the color                  |
| `tints()`                    | count?: number | Color[]                      | Generates tints of the color                   |
| `tones()`                    | count?: number | Color[]                      | Generates tones of the color                   |

<br>

#### Manipulation Methods

<br>

| Method               | Parameters                   | Return Type | Description                         |
|----------------------|:----------------------------:|:-----------:|:-----------------------------------:|
| `adjustLightness()`  | amount: number               | Color       | Adjusts the lightness of the color  |
| `adjustSaturation()` | amount: number               | Color       | Adjusts the saturation of the color |
| `adjustHue()`        | amount: number               | Color       | Adjusts the hue of the color        |
| `adjustAlpha()`      | amount: number               | Color       | Adjusts the alpha of the color      |
| `invert()`           | None                         | Color       | Inverts the color                   |
| `grayscale()`        | None                         | Color       | Converts the color to grayscale     |
| `mix()`              | color: Color, amount: number | Color       | Mixes the color with another color  |

<br>

#### Utility Methods

<br>

| Method                 | Parameters             | Return Type | Description                                   |
|------------------------|:----------------------:|:-----------:|:---------------------------------------------:|
| `toString()`           | includeAlpha?: boolean | string      | Returns the color as a hex string             |
| `equals(other: Color)` | other: Color           | boolean     | Checks if two colors are equal                |
| `getBrightness()`      | None                   | number      | Calculates the perceived brightness (0-255)   |
| `isLight()`            | threshold?: number     | boolean     | Determines if the color is light or dark      |
| `getName()`            | None                   | Promise<string> | Returns the name of the closest matching color |
| `getInfo()`            | None                   | Promise<ColorInfo> | Returns detailed information about the color |

<br>

### Standalone Functions

<br>

#### Conversion Functions

<br>

| Function        | Parameters     | Return Type | Description             |
|-----------------|:--------------:|:-----------:|:-----------------------:|
| `hexToRgb`      | hex: string    | RGB    | Converts HEX to RGB          |
| `rgbToHex`      | rgb: RGB       | string | Converts RGB to HEX          |
| `rgbToHsl`      | rgb: RGB       | HSL    | Converts RGB to HSL          |
| `hslToRgb`      | hsl: HSL       | RGB    | Converts HSL to RGB          |
| `rgbToHsv`      | rgb: RGB       | HSV    | Converts RGB to HSV          |
| `hsvToRgb`      | hsv: HSV       | RGB    | Converts HSV to RGB          |
| `rgbToHsi`      | rgb: RGB       | HSI    | Converts RGB to HSI          |
| `hsiToRgb`      | hsi: HSI       | RGB    | Converts HSI to RGB          |
| `rgbToHwb`      | rgb: RGB       | HWB    | Converts RGB to HWB          |
| `hwbToRgb`      | hwb: HWB       | RGB    | Converts HWB to RGB          |
| `rgbToCmyk`     | rgb: RGB       | CMYK   | Converts RGB to CMYK         |
| `cmykToRgb`     | cmyk: CMYK     | RGB    | Converts CMYK to RGB         |
| `rgbToXyz`      | rgb: RGB       | XYZ    | Converts RGB to XYZ (D65)    |
| `xyzToRgb`      | xyz: XYZ       | RGB    | Converts XYZ to RGB (D65)    |
| `rgbToXyzD50`   | rgb: RGB       | XYZ    | Converts RGB to XYZ (D50)    |
| `xyzD50ToRgb`   | xyz: XYZ       | RGB    | Converts XYZ (D50) to RGB    |
| `xyzD65ToD50`   | xyz: XYZ       | XYZ    | Converts XYZ from D65 to D50 |
| `xyzD50ToD65`   | xyz: XYZ       | XYZ    | Converts XYZ from D50 to D65 |
| `rgbToLab`      | rgb: RGB       | LAB    | Converts RGB to LAB (D65)    |
| `labToRgb`      | lab: LAB       | RGB    | Converts LAB to RGB (D65)    |
| `rgbToLabD50`   | rgb: RGB       | LAB    | Converts RGB to LAB (D50)    |
| `labD50ToRgb`   | lab: LAB       | RGB    | Converts LAB (D50) to RGB    |
| `rgbToLch`      | rgb: RGB       | LCH    | Converts RGB to LCH          |
| `lchToRgb`      | lch: LCH       | RGB    | Converts LCH to RGB          |
| `rgbToOklab`    | rgb: RGB       | Oklab  | Converts RGB to Oklab        |
| `oklabToRgb`    | oklab: Oklab   | RGB    | Converts Oklab to RGB        |
| `rgbToOklch`    | rgb: RGB       | Oklch  | Converts RGB to Oklch        |
| `oklchToRgb`    | oklch: Oklch   | RGB    | Converts Oklch to RGB        |
| `rgbToHPLuv`    | rgb: RGB       | HPLuv  | Converts RGB to HPLuv        |
| `hpluvToRgb`    | hpluv: HPLuv   | RGB    | Converts HPLuv to RGB        |
| `rgbToHSLuv`    | rgb: RGB       | HSLuv  | Converts RGB to HSLuv        |
| `hsluvToRgb`    | hsluv: HSLuv   | RGB    | Converts HSLuv to RGB        |
| `rgbToCIExyY`   | rgb: RGB       | CIExyY | Converts RGB to CIE xyY      |
| `ciexyYToRgb`   | ciexyY: CIExyY | RGB    | Converts CIE xyY to RGB      |
| `rgbToCIELuv`   | rgb: RGB       | CIELuv | Converts RGB to CIE Luv      |
| `cieLuvToRgb`   | cieLuv: CIELuv | RGB    | Converts CIE Luv to RGB      |
| `rgbToYuv`      | rgb: RGB       | YUV    | Converts RGB to YUV          |
| `yuvToRgb`      | yuv: YUV       | RGB    | Converts YUV to RGB          |
| `rgbToSrgb`     | rgb: RGB       | RGB    | Converts RGB to sRGB         |
| `srgbToRgb`     | rgb: RGB       | RGB    | Converts sRGB to RGB         |
| `rgbToAdobeRGB` | rgb: RGB       | RGB    | Converts RGB to Adobe RGB    |
| `adobeRGBToRGB` | rgb: RGB       | RGB    | Converts Adobe RGB to RGB    |

<br>

#### Harmony Functions

<br>

| Function                   | Parameters           | Return Type                  | Description                                    |
|----------------------------|:--------------------:|:----------------------------:|:----------------------------------------------:|
| `complementary`            | color: Color         | [Color, Color]               | Generates a complementary harmony              |
| `analogous`                | color: Color, angle? | [Color, Color, Color]        | Generates an analogous harmony                 |
| `triadic`                  | color: Color         | [Color, Color, Color]        | Generates a triadic harmony                    |
| `tetradic`                 | color: Color, angle? | [Color, Color, Color, Color] | Generates a tetradic harmony                   |
| `splitComplementary`       | color: Color, angle? | [Color, Color, Color]        | Generates a split-complementary harmony        |
| `doubleSplitComplementary` | color: Color, angle? | [Color, Color, Color, Color, Color] | Generates a double split-complementary harmony |
| `square`                   | color: Color         | [Color, Color, Color, Color] | Generates a square harmony                     |
| `monochromatic`            | color: Color, count? | Color[]                      | Generates a monochromatic harmony              |
| `shades`                   | color: Color, count? | Color[]                      | Generates shades of the color                  |
| `tints`                    | color: Color, count? | Color[]                      | Generates tints of the color                   |
| `tones`                    | color: Color, count? | Color[]                      | Generates tones of the color                   |

<br>

#### Manipulation Functions

<br>

| Function           | Parameters                   | Return Type | Description                         |
|--------------------|:----------------------------:|:-----------:|:-----------------------------------:|
| `adjustLightness`  | color: Color, amount: number | Color       | Adjusts the lightness of the color  |
| `adjustSaturation` | color: Color, amount: number | Color       | Adjusts the saturation of the color |
| `adjustHue`        | color: Color, amount: number | Color       | Adjusts the hue of the color        |
| `adjustAlpha`      | color: Color, amount: number | Color       | Adjusts the alpha of the color      |
| `invert`           | color: Color                 | Color       | Inverts the color                   |
| `grayscale`        | color: Color                 | Color       | Converts the color to grayscale     |
| `mix`              | color1: Color, color2: Color, amount: number | Color | Mixes two colors          |

<br>

### Types

<br>
<div align="left">

```typescript
type RGB = { r: number; g: number; b: number; a?: number };
type SRGB = { r: number; g: number; b: number };
type HSL = { h: number; s: number; l: number; a?: number };
type HSV = { h: number; s: number; v: number; a?: number };
type CMYK = { c: number; m: number; y: number; k: number };
type LAB = { l: number; a: number; b: number };
type LCH = { l: number; c: number; h: number };
type XYZ = { x: number; y: number; z: number };
type YUV = { y: number; u: number; v: number };
type Oklab = { L: number; a: number; b: number };
type Oklch = { L: number; C: number; h: number };
type HPLuv = { h: number; p: number; l: number };
type HSLuv = { h: number; s: number; l: number };
type CIExyY = { x: number; y: number; Y: number };
type CIELuv = { L: number; u: number; v: number };
type HSI = { h: number; s: number; i: number };
type HWB = { h: number; w: number; b: number };
type AdobeRGB = { r: number; g: number; b: number };
```

</div>
<br>

---

## Examples

These practical examples demonstrate how to use various features of color-core to solve common color-related tasks. Feel free to adapt these examples to your specific needs.
<br>

### Color Manipulation

<br>
<div align="left">

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

// Get color name
color.getName().then(name => console.log(name)); // 'Red'

// Get color information
color.getInfo().then(info => console.log(info));
// Returns: { name, hex, rgb, hsl, luminance, requestedHex }

// Check brightness and if the color is light
console.log(color.getBrightness()); // 76.245
console.log(color.isLight()); // false
```

</div>
---

## Advanced Usage

The advanced usage section covers more complex scenarios, including working with less common color spaces and generating sophisticated color harmonies. These examples showcase the depth of `color-core`'s capabilities.
<br>

### Working with Different Color Spaces

<br>
<div align="left">

```typescript
import { Color } from 'color-core';

// Create a color in Oklab space
const oklabColor = new Color({ L: 0.627955, a: 0.224863, b: 0.125846 });
console.log(oklabColor.toHex()); // '#ff0000'

// Convert to CIE xyY
const xyYColor = oklabColor.toCIExyY();
console.log(xyYColor); // { x: 0.64, y: 0.33, Y: 0.2126 }

// Create a color in HSLuv space
const hsluvColor = new Color({ h: 12.177, s: 100, l: 53.237 });
console.log(hsluvColor.toRgb()); // { r: 255, g: 0, b: 0 }

// Convert to Adobe RGB
const adobeRGBColor = hsluvColor.toAdobeRGB();
console.log(adobeRGBColor); // { r: 255, g: 0, b: 0 }
```

</div>
<br>

### Color Harmonies

<br>
<div align="left">

```typescript
import { Color } from 'color-core';

const baseColor = new Color('#ff0000');

// Generate complementary color
const [complement] = baseColor.complementary();
console.log(complement.toHex()); // '#00ffff'

// Generate analogous colors
const [analog1, analog2] = baseColor.analogous();
console.log(analog1.toHex(), analog2.toHex()); // '#ff8000' '#ff0080'

// Generate triadic colors
const [triad1, triad2] = baseColor.triadic();
console.log(triad1.toHex(), triad2.toHex()); // '#00ff00' '#0000ff'

// Generate tetradic colors
const [tetra1, tetra2, tetra3] = baseColor.tetradic();
console.log(tetra1.toHex(), tetra2.toHex(), tetra3.toHex()); // '#80ff00' '#00ffff' '#8000ff'

// Generate split-complementary colors
const [split1, split2] = baseColor.splitComplementary();
console.log(split1.toHex(), split2.toHex()); // '#00ff80' '#0080ff'

// Generate shades
const shades = baseColor.shades(5);
shades.forEach(shade => console.log(shade.toHex()));
// '#ff0000' '#cc0000' '#990000' '#660000' '#330000'

// Generate tints
const tints = baseColor.tints(5);
tints.forEach(tint => console.log(tint.toHex()));
// '#ff0000' '#ff3333' '#ff6666' '#ff9999' '#ffcccc'
```

</div>
<br>

As you become more familiar with color-core, you'll likely discover additional ways to leverage its functionality in your projects. The library's extensive color space support and manipulation tools provide a robust foundation for a wide range of color-related tasks.

---

## Versioning

<br>

This project follows [Semantic Versioning](https://semver.org/). For the versions available, see the [tags on this repository](https://github.com/iamlite/color-core/tags).

<br>

---

## Contributing

<br>

Contributions are welcome and greatly appreciated!

<br>

---

## License

<br>

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<br>

---

## Support

<br>

If you're having any problem, please [raise an issue](https://github.com/iamlite/color-core/issues/new) on GitHub and I will be happy to help.

<br>

---

## Acknowledgements

<br>

[HSLuv & HPLuv Conversions](https://www.hsluv.org/) by [Alexei Boronine](https://github.com/boronine)

[Oklab & Oklch Math Used](https://bottosson.github.io/posts/oklab/) by [Björn Ottosson](https://bottosson.github.io/posts/oklab/)

[Color Name API](https://github.com/meodai/color-name-api) by [meodai](https://github.com/meodai)

<br>

---

<h1>Code Coverage</h1>

<br>

<img alt="codecov" src="https://codecov.io/gh/iamlite/color-core/graphs/sunburst.svg?token=MBMKJU55OY"></img>

<br>

Built with ❤️ by <a href="https://github.com/iamlite">iamlite</a>

<br>

[Back to top :arrow_up:](#top)

</div>
