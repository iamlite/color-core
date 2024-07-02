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
import { CMYK, HSL, HSV, LAB, LCH, RGB } from './types';

export class Color {
    private _rgb: RGB;

    constructor(color: string | RGB | HSL | HSV | CMYK | LAB | LCH) {
        if (typeof color === 'string') {
            this._rgb = hexToRgb(color);
        } else if ('r' in color && 'g' in color && 'b' in color) {
            this._rgb = color;
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
    }

    // Conversion methods
    toRgb(): RGB { return this._rgb; }
    toHex(): string { return rgbToHex(this._rgb); }
    toHsl(): HSL { return rgbToHsl(this._rgb); }
    toHsv(): HSV { return rgbToHsv(this._rgb); }
    toCmyk(): CMYK { return rgbToCmyk(this._rgb); }
    toLab(): LAB { return rgbToLab(this._rgb); }
    toLch(): LCH { return rgbToLch(this._rgb); }

    // Utility methods
    toString(): string {
        return this.toHex();
    }

    equals(other: Color): boolean {
        const rgb1 = this.toRgb();
        const rgb2 = other.toRgb();
        return rgb1.r === rgb2.r && rgb1.g === rgb2.g && rgb1.b === rgb2.b;
    }

    // TODO: Add more utility methods here, such as:
    // - lighten(amount: number): Color
    // - darken(amount: number): Color
    // - saturate(amount: number): Color
    // - desaturate(amount: number): Color
    // - mix(color: Color, amount: number): Color
}
