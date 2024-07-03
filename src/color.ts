import { cmykToRgb } from './conversions/cmyk-to-rgb';
import { hexToRgb } from './conversions/hex-to-rgb';
import { hslToRgb } from './conversions/hsl-to-rgb';
import { hsvToRgb } from './conversions/hsv-to-rgb';
import { labToRgb } from './conversions/lab-to-rgb';
import { lchToRgb } from './conversions/lch-to-rgb';
import { rgbToCmyk } from './conversions/rgb-to-cmyk';
import { rgbToHex } from './conversions/rgb-to-hex';
import { rgbToHsl } from './conversions/rgb-to-hsl';
import { rgbToHsv } from './conversions/rgb-to-hsv';
import { rgbToLab } from './conversions/rgb-to-lab';
import { rgbToLch } from './conversions/rgb-to-lch';
import { rgbToXyz } from './conversions/rgb-to-xyz';
import { rgbToYuv } from './conversions/rgb-to-yuv';
import { xyzToRgb } from './conversions/xyz-to-rgb';
import { yuvToRgb } from './conversions/yuv-to-rgb';
import { analogous } from './harmony/analogous';
import { complementary } from './harmony/complementary';
import { compound } from './harmony/compound';
import { doubleSplitComplementary } from './harmony/double-split-complementary';
import { monochromatic } from './harmony/monochromatic';
import { shades } from './harmony/shades';
import { splitComplementary } from './harmony/split-complementary';
import { square } from './harmony/square';
import { tetradic } from './harmony/tetradic';
import { tints } from './harmony/tints';
import { tones } from './harmony/tones';
import { triadic } from './harmony/triadic';
import { CMYK, HSL, HSV, LAB, LCH, RGB, XYZ, YUV } from './types';

export class Color {
    private _rgb: RGB;
    private static PRECISION = 6;

    constructor(color: string | RGB | HSL | HSV | CMYK | LAB | LCH | XYZ | YUV) {
        if (typeof color === 'string') {
            this._rgb = hexToRgb(color);
        } else if ('r' in color && 'g' in color && 'b' in color) {
            this._rgb = color;
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

    private roundNumber(num: number): number {
        return Number(num.toFixed(Color.PRECISION));
    }

    private roundObject<T extends object>(obj: T): T {
        return Object.fromEntries(
            Object.entries(obj).map(([key, value]) => [
                key,
                typeof value === 'number' ? this.roundNumber(value) : value
            ])
        ) as T;
    }

    // Conversion methods
    toRgb(): RGB { return this._rgb; }
    toHex(): string { return rgbToHex(this._rgb); }
    toHsl(): HSL { return this.roundObject(rgbToHsl(this._rgb)); }
    toHsv(): HSV { return this.roundObject(rgbToHsv(this._rgb)); }
    toLab(): LAB { return this.roundObject(rgbToLab(this._rgb)); }
    toLch(): LCH { return this.roundObject(rgbToLch(this._rgb)); }
    toXyz(): XYZ { return this.roundObject(rgbToXyz(this._rgb)); }
    toYuv(): YUV { return this.roundObject(rgbToYuv(this._rgb)); }
    toCmyk(): CMYK { return this.roundObject(rgbToCmyk(this._rgb)); }

    // Harmony methods
    complementary(): [Color, Color] {
        return complementary(this);
    }

    analogous(angle?: number): [Color, Color, Color] {
        return analogous(this, angle);
    }

    triadic(): [Color, Color, Color] {
        return triadic(this);
    }

    tetradic(angle?: number): [Color, Color, Color, Color] {
        return tetradic(this, angle);
    }

    splitComplementary(angle?: number): [Color, Color, Color] {
        return splitComplementary(this, angle);
    }

    monochromatic(count?: number): Color[] {
        return monochromatic(this, count);
    }

    square(): [Color, Color, Color, Color] {
        return square(this);
    }

    doubleSplitComplementary(angle?: number): [Color, Color, Color, Color] {
        return doubleSplitComplementary(this, angle);
    }

    compound(angle?: number): [Color, Color, Color, Color] {
        return compound(this, angle);
    }

    shades(count?: number): Color[] {
        return shades(this, count);
    }

    tints(count?: number): Color[] {
        return tints(this, count);
    }

    tones(count?: number): Color[] {
        return tones(this, count);
    }

    // Utility methods
    toString(): string {
        return this.toHex();
    }

    equals(other: Color): boolean {
        const rgb1 = this.toRgb();
        const rgb2 = other.toRgb();
        return rgb1.r === rgb2.r && rgb1.g === rgb2.g && rgb1.b === rgb2.b;
    }

    static setPrecision(precision: number): void {
        Color.PRECISION = precision;
    }
    // TODO: Add more utility methods here, such as:
    // - lighten(amount: number): Color
    // - darken(amount: number): Color
    // - saturate(amount: number): Color
    // - desaturate(amount: number): Color
    // - mix(color: Color, amount: number): Color
}