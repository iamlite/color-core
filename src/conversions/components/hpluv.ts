import { HPLuv, LCH, RGB } from '../../types';
import { calcMaxChromaHpluv, calculateBoundingLines, lchToLuv, luvToLch, luvToXyz, xyzToLuv, } from './helpers';
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
 * Converts HPLuv color to RGB.
 * @param hpluv - The HPLuv color to convert.
 * @returns The converted RGB color.
 */
export function hpluvToRgb(hpluv: HPLuv): RGB {
    // Handle edge cases
    if (hpluv.l === 0) return { r: 0, g: 0, b: 0 };
    if (hpluv.l === 100) return { r: 255, g: 255, b: 255 };

    const lch = hpluvToLch(hpluv);
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
 * Converts RGB color to HPLuv.
 * @param rgb - The RGB color to convert.
 * @returns The converted HPLuv color.
 */
export function rgbToHPLuv(rgb: RGB): HPLuv {
    // Handle edge cases
    if (rgb.r === 0 && rgb.g === 0 && rgb.b === 0) return { h: 0, p: 0, l: 0 };
    if (rgb.r === 255 && rgb.g === 255 && rgb.b === 255) return { h: 0, p: 0, l: 100 };

    const xyz = rgbToXyz(rgb);
    const luv = xyzToLuv(xyz);
    const lch = luvToLch(luv);
    return lchToHpluv(lch);
}

/**
 * Converts HPLuv to LCH.
 * @param hpluv - The HPLuv color to convert.
 * @returns The converted LCH color.
 */
export function hpluvToLch(hpluv: HPLuv): LCH {
    if (hpluv.l > 99.9999999) {
        return { l: 100, c: 0, h: hpluv.h };
    }
    if (hpluv.l < 0.00000001) {
        return { l: 0, c: 0, h: hpluv.h };
    }
    const l = hpluv.l;
    const lines = calculateBoundingLines(l);
    const max = calcMaxChromaHpluv(lines);
    const c = max / 100 * hpluv.p;
    return { l, c, h: hpluv.h };
}

/**
 * Converts LCH to HPLuv.
 * @param lch - The LCH color to convert.
 * @returns The converted HPLuv color.
 */
export function lchToHpluv(lch: LCH): HPLuv {
    if (lch.l > 99.9999999) {
        return { h: lch.h, p: 0, l: 100 };
    }
    if (lch.l < 0.00000001) {
        return { h: lch.h, p: 0, l: 0 };
    }
    const lines = calculateBoundingLines(lch.l);
    const max = calcMaxChromaHpluv(lines);
    const p = lch.c / max * 100;
    return { h: lch.h, p, l: lch.l };
}