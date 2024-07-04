import { cmykToRgb, hexToRgb, hslToRgb, hsvToRgb, labToRgb, lchToRgb, rgbToCmyk, rgbToHsl, rgbToHsv, rgbToLab, rgbToLch, rgbToXyz, rgbToYuv, xyzToRgb, yuvToRgb } from './conversions';
import { analogous, complementary, compound, doubleSplitComplementary, monochromatic, shades, splitComplementary, square, tetradic, tints, tones, triadic } from './harmony';
import { adjustAlpha, adjustHue, adjustLightness, adjustSaturation, grayscale, invert, mix } from './manipulation';
import { CMYK, HSL, HSV, LAB, LCH, RGB, XYZ, YUV } from './types';

/**
 * Represents a color with various color space representations and manipulation methods.
 */
export class Color {
    private _rgb: RGB;
    private static PRECISION = 6;

    /**
     * Creates a new Color instance.
     * @param color - The color value to initialize with. Can be a string (hex) or an object representing various color spaces.
     */
    constructor(color: string | RGB | HSL | HSV | CMYK | LAB | LCH | XYZ | YUV) {
        if (typeof color === 'string') {
            this._rgb = hexToRgb(color);
        } else if ('r' in color && 'g' in color && 'b' in color) {
            this._rgb = { ...color, a: color.a ?? 1 };
        } else if ('x' in color && 'y' in color && 'z' in color) {
            this._rgb = xyzToRgb(color as XYZ);
        } else if ('y' in color && 'u' in color && 'v' in color) {
            this._rgb = yuvToRgb(color as YUV);
        } else if ('h' in color && 's' in color && 'l' in color) {
            this._rgb = hslToRgb(color as HSL);
        } else if ('h' in color && 's' in color && 'v' in color) {
            this._rgb = hsvToRgb(color as HSV);
        } else if ('c' in color && 'm' in color && 'y' in color && 'k' in color) {
            this._rgb = cmykToRgb(color as CMYK);
        } else if ('l' in color && 'a' in color && 'b' in color) {
            this._rgb = labToRgb(color as LAB);
        } else if ('l' in color && 'c' in color && 'h' in color) {
            this._rgb = lchToRgb(color as LCH);
        } else {
            throw new Error('Invalid color format');
        }
        this._rgb = this.roundObject(this._rgb);
    }

    /**
    * Rounds a given number to the specified precision.
    * 
    * @param num - The number to be rounded.
    * @returns The rounded number.
    */
    private roundNumber(num: number): number {
        return Number(num.toFixed(Color.PRECISION));
    }
    /**
     * Rounds the numeric values in the given object to a specified precision.
     * @template T - The type of the object.
     * @param obj - The object containing numeric values to be rounded.
     * @returns A new object with the numeric values rounded to the specified precision.
     */
    private roundObject<T extends object>(obj: T): T {
        return Object.fromEntries(
            Object.entries(obj).map(([key, value]) => [
                key,
                typeof value === 'number' ? this.roundNumber(value) : value
            ])
        ) as T;
    }

    // Getters and setters
    /** Gets the red component of the color. */
    get r(): number { return this._rgb.r; }
    /** Gets the green component of the color. */
    get g(): number { return this._rgb.g; }
    /** Gets the blue component of the color. */
    get b(): number { return this._rgb.b; }
    /** Gets the alpha component of the color. */
    get a(): number { return this._rgb.a ?? 1; }

    /** Sets the red component of the color. */
    set r(value: number) { this._rgb.r = Math.max(0, Math.min(255, Math.round(value))); }
    /** Sets the green component of the color. */
    set g(value: number) { this._rgb.g = Math.max(0, Math.min(255, Math.round(value))); }
    /** Sets the blue component of the color. */
    set b(value: number) { this._rgb.b = Math.max(0, Math.min(255, Math.round(value))); }
    /** Sets the alpha component of the color. */
    set a(value: number) { this._rgb.a = Math.max(0, Math.min(1, value)); }

    // Conversion methods
    /** Converts the color to RGB format. */
    toRgb(): RGB { return { ...this._rgb }; }
    /** 
     * Converts the color to Hex format. 
     * @param includeAlpha - Whether to include the alpha channel in the hex string.
     */
    toHex(includeAlpha: boolean = false): string {
        const { r, g, b, a } = this._rgb;
        const alphaHex = includeAlpha && a !== undefined && a < 1 ? Math.round(a * 255).toString(16).padStart(2, '0') : '';
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}${alphaHex}`;
    }
    /** Converts the color to HSL format. */
    toHsl(): HSL { return this.roundObject(rgbToHsl(this._rgb)); }
    /** Converts the color to HSV format. */
    toHsv(): HSV { return this.roundObject(rgbToHsv(this._rgb)); }
    /** Converts the color to LAB format. */
    toLab(): LAB { return this.roundObject(rgbToLab(this._rgb)); }
    /** Converts the color to LCH format. */
    toLch(): LCH { return this.roundObject(rgbToLch(this._rgb)); }
    /** Converts the color to XYZ format. */
    toXyz(): XYZ { return this.roundObject(rgbToXyz(this._rgb)); }
    /** Converts the color to YUV format. */
    toYuv(): YUV { return this.roundObject(rgbToYuv(this._rgb)); }
    /** Converts the color to CMYK format. */
    toCmyk(): CMYK { return this.roundObject(rgbToCmyk(this._rgb)); }

    // Harmony methods
    /** Generates a complementary color. */
    complementary(): [Color, Color] {
        return complementary(this);
    }

    /** 
     * Generates analogous colors. 
     * @param angle - The angle between colors.
     */
    analogous(angle?: number): [Color, Color, Color] {
        return analogous(this, angle);
    }

    /** Generates triadic colors. */
    triadic(): [Color, Color, Color] {
        return triadic(this);
    }

    /** 
     * Generates tetradic colors. 
     * @param angle - The angle between color pairs.
     */
    tetradic(angle?: number): [Color, Color, Color, Color] {
        return tetradic(this, angle);
    }

    /** 
     * Generates split-complementary colors. 
     * @param angle - The angle of split.
     */
    splitComplementary(angle?: number): [Color, Color, Color] {
        return splitComplementary(this, angle);
    }

    /** 
     * Generates monochromatic colors. 
     * @param count - The number of colors to generate.
     */
    monochromatic(count?: number): Color[] {
        return monochromatic(this, count);
    }

    /** Generates square colors. */
    square(): [Color, Color, Color, Color] {
        return square(this);
    }

    /** 
     * Generates double split-complementary colors. 
     * @param angle - The angle of split.
     */
    doubleSplitComplementary(angle?: number): [Color, Color, Color, Color] {
        return doubleSplitComplementary(this, angle);
    }

    /** 
     * Generates compound colors. 
     * @param angle - The angle between analogous colors.
     */
    compound(angle?: number): [Color, Color, Color, Color] {
        return compound(this, angle);
    }

    /** 
     * Generates shades of the color. 
     * @param count - The number of shades to generate.
     */
    shades(count?: number): Color[] {
        return shades(this, count);
    }

    /** 
     * Generates tints of the color. 
     * @param count - The number of tints to generate.
     */
    tints(count?: number): Color[] {
        return tints(this, count);
    }

    /** 
     * Generates tones of the color. 
     * @param count - The number of tones to generate.
     */
    tones(count?: number): Color[] {
        return tones(this, count);
    }

    // Manipulation methods


    /**
      * Adjusts the lightness of the color.
      * @param amount - The amount to adjust by, from -100 to 100.
      * @returns A new Color instance with adjusted lightness.
      */
    adjustLightness(amount: number): Color {
        return adjustLightness(this, amount);
    }

    /**
     * Adjusts the saturation of the color.
     * @param amount - The amount to adjust by, from -100 to 100.
     * @returns A new Color instance with adjusted saturation.
     */
    adjustSaturation(amount: number): Color {
        return adjustSaturation(this, amount);
    }

    /**
     * Adjusts the hue of the color.
     * @param amount - The amount to adjust by, in degrees.
     * @returns A new Color instance with adjusted hue.
     */
    adjustHue(amount: number): Color {
        return adjustHue(this, amount);
    }

    /**
     * Adjusts the alpha of the color.
     * @param amount - The new alpha value, from 0 to 1.
     * @returns A new Color instance with adjusted alpha.
     */
    adjustAlpha(amount: number): Color {
        return adjustAlpha(this, amount);
    }

    /**
     * Inverts the color.
     * @returns A new Color instance with inverted RGB values.
     */
    invert(): Color {
        return invert(this);
    }

    /**
     * Converts the color to grayscale.
     * @returns A new Color instance in grayscale.
     */
    grayscale(): Color {
        return grayscale(this);
    }

    /**
     * Mixes the color with another color.
     * @param color - The color to mix with.
     * @param amount - The amount of the other color to mix in, from 0 to 1.
     * @returns A new Color instance representing the mixed color.
     */
    mix(color: Color, amount: number): Color {
        return mix(this, color, amount);
    }

    // Utility methods
    /** 
     * Returns a string representation of the color. 
     * @param includeAlpha - Whether to include the alpha channel in the string representation.
     */
    toString(includeAlpha: boolean = false): string {
        return this.toHex(includeAlpha);
    }

    /** 
     * Checks if this color is equal to another color. 
     * @param other - The color to compare with.
     */
    equals(other: Color): boolean {
        const rgb1 = this.toRgb();
        const rgb2 = other.toRgb();
        return rgb1.r === rgb2.r && rgb1.g === rgb2.g && rgb1.b === rgb2.b && rgb1.a === rgb2.a;
    }

    /** 
     * Sets the precision for number rounding in the Color class. 
     * @param precision - The number of decimal places to round to.
     */
    static setPrecision(precision: number): void {
        Color.PRECISION = precision;
    }
}