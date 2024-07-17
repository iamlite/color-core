/**
 * Represents a color in the RGB color space.
 * Values for r, g, and b should be between 0 and 255.
 * The alpha channel 'a' is optional and should be between 0 and 1 if provided.
 */
export type RGB = {
    r: number;
    g: number;
    b: number;
    a?: number;
};

/**
 * Represents a color in the HSL color space.
 * 'h' (hue) should be between 0 and 360.
 * 's' (saturation) and 'l' (lightness) should be between 0 and 100.
 * The alpha channel 'a' is optional and should be between 0 and 1 if provided.
 */
export type HSL = {
    h: number;
    s: number;
    l: number;
    a?: number;
};

/**
 * Represents a color in the HSV color space.
 * 'h' (hue) should be between 0 and 360.
 * 's' (saturation) and 'v' (value) should be between 0 and 100.
 * The alpha channel 'a' is optional and should be between 0 and 1 if provided.
 */
export type HSV = {
    h: number;
    s: number;
    v: number;
    a?: number;
};

/**
 * Represents a color in the CMYK color space.
 * All values should be between 0 and 100, representing percentages.
 */
export type CMYK = {
    c: number;
    m: number;
    y: number;
    k: number;
};

/**
 * Represents a color in the LAB color space.
 * 'l' (lightness) is typically between 0 and 100.
 * 'a' and 'b' are typically between -128 and 127.
 */
export type LAB = {
    l: number;
    a: number;
    b: number;
    whitePoint?: WhitePoint;
};

/**
 * Represents a color in the LCH color space.
 * 'l' (lightness) is typically between 0 and 100.
 * 'c' (chroma) is typically between 0 and 230.
 * 'h' (hue) is between 0 and 360.
 */
export type LCH = {
    l: number;
    c: number;
    h: number;
    alpha?: number;
};


/**
 * Represents a color in the XYZ color space, 
 * with an optional white point.
 */

export interface XYZ {
    x: number;
    y: number;
    z: number;
    whitePoint?: WhitePoint;
}

export type WhitePoint = 'D50' | 'D65';

/**
 * Represents a color in the YUV color space.
 * 'y' is between 0 and 1.
 * 'u' and 'v' are typically between -0.5 and 0.5.
 */
export type YUV = {
    y: number;
    u: number;
    v: number;
};

/**
 * Represents a color in the Oklab color space.
 * 'L' is the lightness component (0 to 1).
 * 'a' is the green-red component (usually -0.4 to 0.4).
 * 'b' is the blue-yellow component (usually -0.4 to 0.4).
 */
export type Oklab = {
    L: number;
    a: number;
    b: number;
};

/**
 * Represents a color in the Oklch color space.
 * 'L' is the lightness component (1-100%).
 * 'C' is the chroma component (1-100).
 * 'h' is the hue component (0 to 360).
 */
export type Oklch = {
    L: number;
    C: number;
    h: number;
};

/**
 * Represents a color in the raw Oklch color space.
 * 'L' is the lightness component (0 to 1).
 * 'C' is the chroma component (0 to 0.4).
 * 'h' is the hue component (0 to 360).
 */
export type rawOklch = {
    L: number;
    C: number;
    h: number;
};

/**
 * Represents a color in the LUV color space.
 * 'l' is the lightness component (0 to 100).
 * 'u' and 'v' are the chromaticity coordinates.
 */
export type LUV = {
    L: number;
    u: number;
    v: number;
};

/**
 * Represents a color in the HSLuv color space.
 * 'h' is the hue component (0 to 360).
 * 's' is the saturation component (0 to 100).
 * 'l' is the lightness component (0 to 100).
 */
export type HSLuv = {
    h: number;
    s: number;
    l: number;
};

/**
 * Represents a color in the HPLuv color space.
 * 'h' is the hue component (0 to 360).
 * 'p' is the perceived saturation component (0 to 100).
 * 'l' is the lightness component (0 to 100).
 */
export type HPLuv = {
    h: number;
    p: number;
    l: number;
};

/**
 * Represents a color in the CIE xyY color space.
 * 'x' and 'y' are the chromaticity coordinates.
 * 'Y' is the luminance component.
 */
export type CIExyY = {
    x: number;
    y: number;
    Y: number;
};



/**
 * Represents a color in the sRGB color space.
 * Values are typically between 0 and 255.
 */
export type SRGB = {
    sr: number;
    sg: number;
    sb: number;
};

/**
 * Represents a color in the HSI color space.
 * 'h' is the hue component (0 to 360).
 * 's' is the saturation component (0 to 100).
 * 'i' is the intensity component (0 to 100).
 */
export type HSI = {
    h: number;
    s: number;
    i: number;
};

/**
 * Represents a color in the HWB color space.
 * 'h' is the hue component (0 to 360).
 * 'w' is the white component (0 to 100).
 * 'b' is the black component (0 to 100).
 */
export type HWB = {
    h: number;
    w: number;
    b: number;
};

/**
 * Represents a color in the Adobe RGB color space.
 * Values are typically between 0 and 255.
 */
export type AdobeRGB = {
    ar: number;
    ag: number;
    ab: number;
};

/**
 * Union type representing all supported color spaces.
 */

export type ColorSpace = RGB | HSL | HSV | CMYK | LAB | LCH | XYZ | YUV | Oklab | Oklch | HSLuv | HPLuv | CIExyY | SRGB | HSI | HWB | AdobeRGB;


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