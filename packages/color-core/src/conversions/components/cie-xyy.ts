import { CIExyY, RGB, XYZ } from '../../types';
import { rgbToXyz, xyzToRgb } from './xyz';

/**
 * Converts RGB color to CIE xyY color space.
 * @param rgb The RGB color to convert.
 * @returns The color in CIE xyY color space (x and y in 0-1 range, Y in 0-100 range).
 */
export function rgbToCIExyY(rgb: RGB): CIExyY {
    const xyz = rgbToXyz(rgb);
    return xyzToCIExyY(xyz);
}

/**
 * Converts XYZ color to CIE xyY color space.
 * @param xyz The XYZ color to convert (in 0-1 range).
 * @returns The color in CIE xyY color space (x and y in 0-1 range, Y in 0-100 range).
 */
function xyzToCIExyY(xyz: XYZ): CIExyY {
    const { x, y, z } = xyz;
    const sum = x + y + z;

    if (sum === 0) {
        // Special case for black
        return { x: 0, y: 0, Y: 0 };
    }

    return {
        x: x / sum,
        y: y / sum,
        Y: y * 100  // Convert Y to 0-100 range
    };
}

/**
 * Converts CIE xyY color to RGB color space.
 * @param xyy The CIE xyY color to convert (x and y in 0-1 range, Y in 0-100 range).
 * @returns The color in RGB color space.
 */
export function ciexyyToRgb(xyy: CIExyY): RGB {
    const xyz = ciexyyToXyz(xyy);
    return xyzToRgb(xyz);
}

/**
 * Converts CIE xyY color to XYZ color space.
 * @param xyy The CIE xyY color to convert (x and y in 0-1 range, Y in 0-100 range).
 * @returns The color in XYZ color space (in 0-1 range).
 */
function ciexyyToXyz(xyy: CIExyY): XYZ {
    const { x, y, Y } = xyy;

    if (y === 0) {
        // Special case for black
        return { x: 0, y: 0, z: 0, whitePoint: 'D65' };
    }

    const Y_normalized = Y / 100;  // Convert Y back to 0-1 range

    return {
        x: (x * Y_normalized) / y,
        y: Y_normalized,
        z: ((1 - x - y) * Y_normalized) / y,
        whitePoint: 'D65'
    };
}