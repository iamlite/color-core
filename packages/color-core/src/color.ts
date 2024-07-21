import {
    adobeRGBToRGB, cieLuvToRgb, ciexyyToRgb, cmykToRgb, hexToRgb, hpluvToRgb, hsiToRgb, hslToRgb, hsluvToRgb, hsvToRgb, hwbToRgb, labToRgb, lchToRgb, oklabToRgb, oklchToRgb, rgbToAdobeRGB, rgbToCIELuv, rgbToCIExyY, rgbToCmyk, rgbToHex, rgbToHPLuv, rgbToHsi, rgbToHsl, rgbToHSLuv, rgbToHsv, rgbToHwb, rgbToLab, rgbToLabD50, rgbToLch, rgbToOklab, rgbToOklch, rgbToSrgb, rgbToXyz, rgbToXyzD50, rgbToYuv,
    srgbToRgb,
    xyzToRgb, yuvToRgb
} from './conversions';
import {
    analogous, complementary, doubleSplitComplementary, monochromatic, shades, splitComplementary, square, tetradic, tints, tones, triadic,
} from './harmony';
import { adjustAlpha, adjustHue, adjustLightness, adjustSaturation, grayscale, invert, mix } from './manipulation';
import {
    AdobeRGB, CIExyY, CMYK, ColorInfo, HPLuv, HSI, HSL, HSLuv, HSV, HWB, LAB, LCH, LUV, Oklab, Oklch, RGB, SRGB,
    XYZ, YUV
} from './types';
import { calculateBrightness, isLightColor } from './utils';
import { getColorInfo, getColorName } from './utils/components/color-naming';

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
    private _rgb: RGB;
    private static PRECISION = 6;

    /**
     * Creates a new Color instance.
     * @param color - The color value to initialize with. Can be a string (hex) or an object representing various color spaces.
     */
    constructor(color: string | RGB | SRGB | HSL | HSV | CMYK | LAB | LCH | LUV | XYZ | YUV | Oklab | Oklch | HSLuv | HPLuv | CIExyY | HSI | HWB | AdobeRGB) {
        if (typeof color === 'string') {
            this._rgb = hexToRgb(color);

        } else if ('r' in color && 'g' in color && 'b' in color) {
            this._rgb = { ...color, a: color.a ?? 1 };
        } else if ('sr' in color && 'sg' in color && 'sb' in color) {
            this._rgb = srgbToRgb(color as SRGB);
        } else if ('x' in color && 'y' in color && 'z' in color) {
            this._rgb = xyzToRgb(color as XYZ);
        } else if ('l' in color && 'a' in color && 'b' in color) {
            this._rgb = labToRgb(color as LAB);
        } else if ('l' in color && 'c' in color && 'h' in color) {
            this._rgb = lchToRgb(color as LCH);
        } else if ('y' in color && 'u' in color && 'v' in color) {
            this._rgb = yuvToRgb(color as YUV);
        } else if ('L' in color && 'u' in color && 'v' in color) {
            this._rgb = cieLuvToRgb(color as LUV);
        } else if ('L' in color && 'a' in color && 'b' in color) {
            this._rgb = oklabToRgb(color as Oklab);
        } else if ('L' in color && 'C' in color && 'h' in color) {
            this._rgb = oklchToRgb(color as Oklch);
        } else if ('x' in color && 'y' in color && 'Y' in color) {
            this._rgb = ciexyyToRgb(color as CIExyY);
        } else if ('h' in color && 's' in color && 'i' in color) {
            this._rgb = hsiToRgb(color as HSI);
        } else if ('h' in color && 'w' in color && 'b' in color) {
            this._rgb = hwbToRgb(color as HWB);
        } else if ('h' in color && 's' in color && 'l' in color) {
            this._rgb = hslToRgb(color as HSL);
        } else if ('h' in color && 's' in color && 'v' in color) {
            this._rgb = hsvToRgb(color as HSV);
        } else if ('h' in color && 's' in color && 'u' in color) {
            this._rgb = hsluvToRgb(color as HSLuv);
        } else if ('h' in color && 's' in color && 'v' in color) {
            this._rgb = hpluvToRgb(color as HPLuv);
        } else if ('c' in color && 'm' in color && 'y' in color && 'k' in color) {
            this._rgb = cmykToRgb(color as CMYK);
        } else if ('ar' in color && 'ag' in color && 'ab' in color) {
            this._rgb = adobeRGBToRGB(color as AdobeRGB);

        } else { throw new Error('Invalid color format'); }

        if (this._rgb.a === undefined) {
            this._rgb.a = undefined;
        }
        this._rgb = this.roundObject(this._rgb);
    }


    // Getters and setters

    get r(): number { return this._rgb.r; }
    get g(): number { return this._rgb.g; }
    get b(): number { return this._rgb.b; }
    get a(): number | undefined { return this._rgb.a; }


    set r(value: number) { this._rgb.r = Math.max(0, Math.min(255, Math.round(value))); }
    set g(value: number) { this._rgb.g = Math.max(0, Math.min(255, Math.round(value))); }
    set b(value: number) { this._rgb.b = Math.max(0, Math.min(255, Math.round(value))); }
    set a(value: number | undefined) { if (value === undefined) { this._rgb.a = undefined; } else { this._rgb.a = Math.max(0, Math.min(1, value)); } }


    // Conversion methods
    /** Converts the color to RGB format. */
    toRgb(): RGB {
        const { r, g, b, a } = this._rgb;
        return a === undefined ? { r, g, b } : { r, g, b, a };
    }

    toHex(includeAlpha: boolean = false): string { return rgbToHex(this._rgb, includeAlpha); }
    toSrgb(): SRGB { return this.roundObject(rgbToSrgb(this._rgb)); }
    toHsl(): HSL { return this.roundObject(rgbToHsl(this._rgb)); }
    toHsv(): HSV { return this.roundObject(rgbToHsv(this._rgb)); }
    toHsi(): HSI { return this.roundObject(rgbToHsi(this._rgb)); }
    toHwb(): HWB { return this.roundObject(rgbToHwb(this._rgb)); }
    toLch(): LCH { return this.roundObject(rgbToLch(this._rgb)); }
    toYuv(): YUV { return this.roundObject(rgbToYuv(this._rgb)); }
    toCmyk(): CMYK { return this.roundObject(rgbToCmyk(this._rgb)); }
    toOklab(): Oklab { return this.roundObject(rgbToOklab(this._rgb)); }
    toOklch(): Oklch { return this.roundObject(rgbToOklch(this._rgb)); }
    toHSLuv(): HSLuv { return this.roundObject(rgbToHSLuv(this._rgb)); }
    toHPLuv(): HPLuv { return this.roundObject(rgbToHPLuv(this._rgb)); }
    toCIELuv(): LUV { return this.roundObject(rgbToCIELuv(this._rgb)); }
    toCIExyY(): CIExyY { return this.roundObject(rgbToCIExyY(this._rgb)); }
    toAdobeRGB(): AdobeRGB { return this.roundObject(rgbToAdobeRGB(this._rgb)); }
    toXyz(): XYZ { return this.roundObject(rgbToXyz(this._rgb)); }
    toXyzD50(): XYZ { return this.roundObject(rgbToXyzD50(this._rgb)); }
    toLab(): LAB { return this.roundObject(rgbToLab(this._rgb)); }
    toLabD50(): LAB { return this.roundObject(rgbToLabD50(this._rgb)); }



    // Harmony methods


    complementary(): [Color, Color] { return complementary(this); }
    analogous(angle?: number): [Color, Color, Color] { return analogous(this, angle); }
    triadic(): [Color, Color, Color] { return triadic(this); }
    tetradic(angle?: number): [Color, Color, Color, Color] { return tetradic(this); }
    splitComplementary(angle?: number): [Color, Color, Color] { return splitComplementary(this, angle); }
    monochromatic(count?: number): Color[] { return monochromatic(this, count); }
    square(): [Color, Color, Color, Color] { return square(this); }
    doubleSplitComplementary(angle?: number): [Color, Color, Color, Color, Color] { return doubleSplitComplementary(this); }
    shades(count?: number): Color[] { return shades(this, count); }
    tints(count?: number): Color[] { return tints(this, count); }
    tones(count?: number): Color[] { return tones(this, count); }

    // Manipulation methods

    adjustLightness(amount: number): Color { return adjustLightness(this, amount); }
    adjustSaturation(amount: number): Color { return adjustSaturation(this, amount); }
    adjustHue(amount: number): Color { return adjustHue(this, amount); }
    adjustAlpha(amount: number): Color { return adjustAlpha(this, amount); }
    invert(): Color { return invert(this); }
    grayscale(): Color { return grayscale(this); }
    mix(color: Color, amount: number): Color { return mix(this, color, amount); }

    // Utility methods
    static setPrecision(precision: number): void { Color.PRECISION = precision; }

    toString(includeAlpha: boolean = false): string { return this.toHex(includeAlpha); }

    setAlpha(value: number | undefined): Color { this.a = value; return this; }
    getEffectiveAlpha(): number { return this.a ?? 1; }

    async getName(): Promise<string> { return getColorName(this); }
    async getInfo(): Promise<ColorInfo> { return getColorInfo(this); }

    getBrightness(): number { return calculateBrightness(this._rgb); }

    isLight(threshold: number = 128): boolean { return isLightColor(this._rgb, threshold); }

    equals(other: Color): boolean {
        const rgb1 = this.toRgb();
        const rgb2 = other.toRgb();
        return rgb1.r === rgb2.r && rgb1.g === rgb2.g && rgb1.b === rgb2.b && rgb1.a === rgb2.a;
    }

    private roundNumber(num: number): number {
        return Number(num.toFixed(Color.PRECISION));
    }

    private roundObject<T extends object>(obj: T): T {
        return Object.fromEntries(
            Object.entries(obj).map(([key, value]) => [key, typeof value === 'number' ? this.roundNumber(value) : value])
        ) as T;
    }
}
