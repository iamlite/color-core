/**
 * Represents a color in the RGB color space.
 * Values for r, g, and b should be between 0 and 255.
 * The alpha channel 'a' is optional and should be between 0 and 1 if provided.
 */
export type RGB = {
    r: number
    g: number
    b: number
    a?: number
};

/**
 * Represents a color in the HSL color space.
 * 'h' (hue) should be between 0 and 360.
 * 's' (saturation) and 'l' (lightness) should be between 0 and 100.
 * The alpha channel 'a' is optional and should be between 0 and 1 if provided.
 */
export type HSL = {
    h: number
    s: number
    l: number
    a?: number
};

/**
 * Represents a color in the HSV color space.
 * 'h' (hue) should be between 0 and 360.
 * 's' (saturation) and 'v' (value) should be between 0 and 100.
 * The alpha channel 'a' is optional and should be between 0 and 1 if provided.
 */
export type HSV = {
    h: number
    s: number
    v: number
    a?: number
};

/**
 * Represents a color in the CMYK color space.
 * All values should be between 0 and 100, representing percentages.
 */
export type CMYK = {
    c: number
    m: number
    y: number
    k: number
};

/**
 * Represents a color in the LAB color space.
 * 'l' (lightness) is typically between 0 and 100.
 * 'a' and 'b' are typically between -128 and 127.
 */
export type LAB = {
    l: number
    a: number
    b: number
};

/**
 * Represents a color in the LCH color space.
 * 'l' (lightness) is typically between 0 and 100.
 * 'c' (chroma) is typically between 0 and 230.
 * 'h' (hue) is between 0 and 360.
 */
export type LCH = {
    l: number
    c: number
    h: number
};

/**
 * Represents a color in the XYZ color space.
 * Values are typically between 0 and 1.
 */
export type XYZ = {
    x: number
    y: number
    z: number
};

/**
 * Represents a color in the YUV color space.
 * 'y' is between 0 and 1.
 * 'u' and 'v' are typically between -0.5 and 0.5.
 */
export type YUV = {
    y: number
    u: number
    v: number
};

/**
 * Union type representing all supported color spaces.
 */
export type ColorSpace = RGB | HSL | HSV | CMYK | LAB | LCH | XYZ | YUV;

/**
 * Represents a hexadecimal color string.
 * @example "#FF0000" for red
 */
export type HexColor = `#${string}`;

/**
 * Represents any valid color input, including color space objects and hex strings.
 */
export type ColorInput = ColorSpace | HexColor | string;


/**
 * Represents information about a color.
 * @property {string} name - The name of the color.
 * @property {string} hex - The hexadecimal representation of the color.
 * @property {RGB} rgb - The RGB representation of the color.
 * @property {HSL} hsl - The HSL representation of the color.
 * @property {number} luminance - The luminance of the color.
 * @property {string} requestedHex - The hexadecimal representation of the color as requested.
 */
export interface ColorInfo {
    name: string;
    hex: string;
    rgb: RGB;
    hsl: HSL;
    luminance: number;
    requestedHex: string;
}

