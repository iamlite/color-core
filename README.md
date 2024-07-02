# next-colors

A comprehensive color manipulation library for Next.js and React applications.

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

// Create a color from RGB
const blueColor = new Color({ r: 0, g: 0, b: 255 });
console.log(blueColor.toHex());  // '#0000ff'

// Check equality
const sameRed = new Color({ r: 255, g: 0, b: 0 });
console.log(color.equals(sameRed));  // true
```

### Using Individual Conversion Functions

```typescript
import { hexToRgb, rgbToHsl } from 'next-colors';

const rgb = hexToRgb('#00ff00');
console.log(rgb);  // { r: 0, g: 255, b: 0 }

const hsl = rgbToHsl(rgb);
console.log(hsl);  // { h: 120, s: 100, l: 50 }
```

## API Reference

### Color Class

The `Color` class is the main entry point for color manipulations.

#### Constructor

```typescript
new Color(color: string | RGB | HSL | HSV | CMYK | LAB | LCH)
```

Creates a new Color instance from various color formats.

#### Methods

| Method                 | Return Type | Description                       |
| ---------------------- | ----------- | --------------------------------- |
| `toRgb()`              | RGB         | Converts the color to RGB format  |
| `toHex()`              | string      | Converts the color to HEX format  |
| `toHsl()`              | HSL         | Converts the color to HSL format  |
| `toHsv()`              | HSV         | Converts the color to HSV format  |
| `toCmyk()`             | CMYK        | Converts the color to CMYK format |
| `toLab()`              | LAB         | Converts the color to LAB format  |
| `toLch()`              | LCH         | Converts the color to LCH format  |
| `equals(other: Color)` | boolean     | Checks if two colors are equal    |

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

### Types

```typescript
type RGB = { r: number; g: number; b: number };
type HSL = { h: number; s: number; l: number };
type HSV = { h: number; s: number; v: number };
type CMYK = { c: number; m: number; y: number; k: number };
type LAB = { l: number; a: number; b: number };
type LCH = { l: number; c: number; h: number };
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
