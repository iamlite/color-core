import { HSLuv, LCH, RGB } from '../../types';
import { calcMaxChromaHsluv, lchToLuv, luvToLch, luvToXyz, xyzToLuv, } from './helpers';
import { rgbToXyz, xyzToRgb } from './xyz';
/**
 * Rounds an RGB value to the nearest integer and clamps it between 0 and 255.
 * @param value - The RGB value to round and clamp.
 * @returns The rounded and clamped RGB value.
 */
function roundAndClampRgb(value: number): number {
    return Math.max(0, Math.min(255, Math.round(value)));
}

/**
 * Converts HSLuv color to RGB.
 * @param hsluv - The HSLuv color to convert.
 * @returns The converted RGB color.
 */
export function hsluvToRgb(hsluv: HSLuv): RGB {
    // Handle edge cases
    if (hsluv.l === 0) return { r: 0, g: 0, b: 0 };
    if (hsluv.l === 100) return { r: 255, g: 255, b: 255 };

    const lch = hsluvToLch(hsluv);
    const luv = lchToLuv(lch);
    const xyz = luvToXyz(luv);
    const rgb = xyzToRgb(xyz);

    // Round and clamp RGB values
    return {
        r: roundAndClampRgb(rgb.r),
        g: roundAndClampRgb(rgb.g),
        b: roundAndClampRgb(rgb.b)
    };
}

/**
 * Converts RGB color to HSLuv.
 * @param rgb - The RGB color to convert.
 * @returns The converted HSLuv color.
 */
export function rgbToHSLuv(rgb: RGB): HSLuv {
    // Handle edge cases
    if (rgb.r === 0 && rgb.g === 0 && rgb.b === 0) return { h: 0, s: 0, l: 0 };
    if (rgb.r === 255 && rgb.g === 255 && rgb.b === 255) return { h: 0, s: 0, l: 100 };

    const xyz = rgbToXyz(rgb);
    const luv = xyzToLuv(xyz);
    const lch = luvToLch(luv);
    return lchToHsluv(lch);
}

/**
 * Converts HSLuv to LCH.
 * @param hsluv - The HSLuv color to convert.
 * @returns The converted LCH color.
 */
export function hsluvToLch(hsluv: HSLuv): LCH {
    if (hsluv.l > 99.9999999) {
        return { l: 100, c: 0, h: hsluv.h };
    }
    if (hsluv.l < 0.00000001) {
        return { l: 0, c: 0, h: hsluv.h };
    }
    const l = hsluv.l;
    const max = calcMaxChromaHsluv(l, hsluv.h);
    const c = max / 100 * hsluv.s;
    return { l, c, h: hsluv.h };
}

/**
 * Converts LCH to HSLuv.
 * @param lch - The LCH color to convert.
 * @returns The converted HSLuv color.
 */
export function lchToHsluv(lch: LCH): HSLuv {
    if (lch.l > 99.9999999) {
        return { h: lch.h, s: 0, l: 100 };
    }
    if (lch.l < 0.00000001) {
        return { h: lch.h, s: 0, l: 0 };
    }
    const max = calcMaxChromaHsluv(lch.l, lch.h);
    const s = lch.c / max * 100;
    return { h: lch.h, s: Math.min(s, 100), l: lch.l };
}