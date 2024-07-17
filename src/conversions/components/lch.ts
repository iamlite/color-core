import { LAB, LCH, RGB, WhitePoint, XYZ } from '../../types';
import { constants as cz } from './constants';
import { labToXyz, xyzToLab } from './lab';
import { rgbToXyz, xyzToRgb } from './xyz';



/**
 * Converts LAB color to LCH color.
 * @param lab - The LAB color values.
 * @returns The LCH color values.
 */
export function labToLch(lab: LAB): LCH {
    const { l, a, b } = lab;
    const c = Math.sqrt(a * a + b * b);
    let h = Math.atan2(b, a) * (180 / Math.PI);

    if (h < 0) {
        h += 360;
    }

    // For extremely low chroma, set hue to 0
    if (c < cz.epsilonhigh) {
        h = 0;
    }

    return { l, c, h };
}

/**
 * Converts LCH color to LAB color.
 * @param lch - The LCH color values.
 * @returns The LAB color values.
 */
export function lchToLab(lch: LCH): LAB {
    const { l, c, h } = lch;
    const hRadians = h * (Math.PI / 180);
    return {
        l,
        a: c * Math.cos(hRadians),
        b: c * Math.sin(hRadians)
    };
}

/**
 * Converts XYZ color to LCH color.
 * @param xyz - The XYZ color values.
 * @param whitePoint - The white point to use (default: 'D65').
 * @returns The LCH color values.
 */
export function xyzToLch(xyz: XYZ, whitePoint: WhitePoint = 'D65'): LCH {
    const lab = xyzToLab(xyz, whitePoint);
    return labToLch(lab);
}

/**
 * Converts LCH color to XYZ color.
 * @param lch - The LCH color values.
 * @param whitePoint - The white point to use (default: 'D65').
 * @returns The XYZ color values.
 */
export function lchToXyz(lch: LCH, whitePoint: WhitePoint = 'D65'): XYZ {
    const lab = lchToLab(lch);
    return labToXyz(lab, whitePoint);
}

/**
 * Converts RGB color to LCH color.
 * @param rgb - The RGB color values.
 * @param whitePoint - The white point to use (default: 'D65').
 * @returns The LCH color values.
 */
export function rgbToLch(rgb: RGB, whitePoint: WhitePoint = 'D65'): LCH {
    const EPSILON = 1e-4;

    // Handle black separately
    if (rgb.r === 0 && rgb.g === 0 && rgb.b === 0) {
        return { l: 0, c: 0, h: 0 };
    }

    const xyz = rgbToXyz(rgb, whitePoint);
    const lab = xyzToLab(xyz, whitePoint);

    let { l, a, b } = lab;
    let c = Math.sqrt(a * a + b * b);
    let h = Math.atan2(b, a) * (180 / Math.PI);

    // Normalize hue to 0-360 range
    if (h < 0) {
        h += 360;
    }

    // Force hue to 0 if the lightness is 100
    if (Math.abs(l - 100) < EPSILON) {
        h = 0;
    }

    // Handle very low chroma
    if (c < EPSILON) {
        c = 0;
        h = 0;
    }

    // Ensure l is within 0-100 range
    l = Math.max(0, Math.min(100, l));


    return { l, c, h };
}



/**
 * Converts LCH color to RGB color.
 * @param lch - The LCH color values.
 * @param whitePoint - The white point to use (default: 'D65').
 * @returns The RGB color values.
 */
export function lchToRgb(lch: LCH, whitePoint: WhitePoint = 'D65'): RGB {

    let { l, c, h } = lch;

    // Ensure l is within 0-100 range
    l = Math.max(0, Math.min(100, l));

    // Handle black
    if (l === 0) {
        return { r: 0, g: 0, b: 0 };
    }

    // Handle white or near-white
    if (Math.abs(l - 100) < cz.epsilonM && c < cz.epsilonM) {
        return { r: 255, g: 255, b: 255 };
    }

    // Ensure c is non-negative
    c = Math.max(0, c);

    // Normalize h to 0-360 range
    h = ((h % 360) + 360) % 360;

    // Convert LCH to LAB
    const hRadians = h * (Math.PI / 180);
    const a = c * Math.cos(hRadians);
    const b = c * Math.sin(hRadians);

    const lab: LAB = { l, a, b };
    const xyz = labToXyz(lab, whitePoint);
    const rgb = xyzToRgb(xyz, whitePoint);

    // Clamp RGB values to 0-255 range
    return {
        r: Math.round(Math.max(0, Math.min(255, rgb.r))),
        g: Math.round(Math.max(0, Math.min(255, rgb.g))),
        b: Math.round(Math.max(0, Math.min(255, rgb.b)))
    };
}