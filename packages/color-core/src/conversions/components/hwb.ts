import { HWB, RGB } from '../../types';
import { hsvToRgb, rgbToHsv } from './hsv';

/**
 * Converts HWB values to RGB color space.
 * @param {HWB} hwb - The HWB color to convert.
 * @returns {RGB} The color in RGB space.
 */
export function hwbToRgb(hwb: HWB): RGB {
    const { h, w, b } = hwb;

    // Handle black and white cases
    if (w + b >= 100) {
        const gray = Math.round(w / (w + b) * 255);
        return { r: gray, g: gray, b: gray };
    }

    const s = 100 - (w / (100 - b)) * 100;
    const v = 100 - b;
    return hsvToRgb({ h, s, v });
}

/**
 * Converts RGB values to HWB color space.
 * @param {RGB} rgb - The RGB color to convert.
 * @returns {HWB} The color in HWB space.
 */
export function rgbToHwb(rgb: RGB): HWB {
    const hsv = rgbToHsv(rgb);
    const w = (1 - hsv.s / 100) * hsv.v / 100 * 100;
    const b = 100 - hsv.v;
    return { h: hsv.h, w, b };
}
