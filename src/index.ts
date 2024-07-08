/**
 * Color conversion functions
 * These functions allow conversion between various color spaces
 */
export {
    cmykToRgb, hexToRgb, hslToRgb, hsvToRgb, labToRgb,
    lchToRgb, rgbToCmyk, rgbToHex, rgbToHsl,
    rgbToHsv, rgbToLab, rgbToLch, rgbToXyz, rgbToYuv, xyzToRgb, yuvToRgb
} from './conversions';

/**
 * Color harmony functions
 * These functions generate color harmonies based on color theory
 */
export {
    analogous, complementary, doubleSplitComplementary,
    monochromatic, shades, splitComplementary, square,
    tetradic, tints, tones, triadic
} from './harmony';

/**
 * Color manipulation functions
 * These functions allow for adjusting various aspects of colors
 */
export {
    adjustAlpha, adjustHue, adjustLightness,
    adjustSaturation, grayscale, invert, mix
} from './manipulation';

/**
 * Color type definitions
 * These types represent colors in various color spaces
 */
export {
    CMYK, ColorInput, ColorSpace, HSL, HSV, HexColor, LAB, LCH, RGB, XYZ, YUV
} from './types';

/**
 * Unified Color Class
 * This class provides a comprehensive way to work with colors
 */
export { Color } from './color';


/**
 * Color Picker Props Type
 * Type definition for the props of the ColorPicker component
 */
export type { ColorPickerProps } from './utils';

/**
 * @description getColorInfo and getColorName
 * Axios functions for color name and information
 * These functions can be used to fetch color name and information from the Color.pizza API
 * 
 * React Color Picker Component:
 * A customizable color picker component for React applications
 * 
 * Default styles for the Color Picker component:
 * These styles can be customized or overridden as neede
 */
export { ColorPicker, defaultColorPickerStyles, getColorInfo, getColorName } from './utils';

