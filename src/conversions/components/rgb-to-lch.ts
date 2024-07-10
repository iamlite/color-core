import { LCH, RGB } from '../../types';
import { rgbToLab } from './rgb-to-lab';

/**
 * Converts RGB color to LCH color space.
 * @param {RGB} rgb - The RGB color to convert.
 * @returns {LCH} The color in LCH color space.
 * @throws {Error} If the input is not a valid RGB object.
 */
export function rgbToLch(rgb: RGB): LCH {
    const lab = rgbToLab(rgb);
    const { l, a, b } = lab;

    const c = Math.sqrt(a * a + b * b);
    let h = Math.atan2(b, a) * (180 / Math.PI);

    if (h < 0) {
        h += 360;
    }

    return { l, c, h };
}
