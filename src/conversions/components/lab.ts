/**
 * Conversion functions between LAB, XYZ, and RGB color spaces.
 * Implements conversions as specified by CIE standards.
 */

import { LAB, RGB, WhitePoint, XYZ } from '../../types';
import { D50, D65 } from './constants';
import { rgbToXyz, rgbToXyzD50, xyzToRgb } from './xyz';

// CIE standard values
const epsilon = 216 / 24389; // Intent of the CIE standard
const kappa = 24389 / 27;   // Intent of the CIE standard

/**
 * Converts XYZ to LAB color space.
 * @param xyz - The XYZ color values.
 * @param whitePoint - The white point to use (default: 'D65').
 * @returns The LAB color values.
 */
export function xyzToLab(xyz: XYZ, whitePoint: WhitePoint = 'D65'): LAB {
  const wp = whitePoint === 'D50' ? D50 : D65;
  let { x, y, z } = xyz;

  // Normalize XYZ values against reference white
  const xr = x / wp.x;
  const yr = y / wp.y;
  const zr = z / wp.z;

  // Apply the LAB conversion formula
  const fx = xr > epsilon ? Math.cbrt(xr) : (kappa * xr + 16) / 116;
  const fy = yr > epsilon ? Math.cbrt(yr) : (kappa * yr + 16) / 116;
  const fz = zr > epsilon ? Math.cbrt(zr) : (kappa * zr + 16) / 116;

  const L = 116 * fy - 16;
  const a = 500 * (fx - fy);
  const b = 200 * (fy - fz);

  return { l: L, a, b };
}

/**
 * Converts LAB to XYZ color space.
 * @param lab - The LAB color values.
 * @param whitePoint - The white point to use (default: 'D65').
 * @returns The XYZ color values.
 */
export function labToXyz(lab: LAB, whitePoint: WhitePoint = 'D65'): XYZ {
  const wp = whitePoint === 'D50' ? D50 : D65;
  const { l: L, a, b } = lab;

  const fy = (L + 16) / 116;
  const fx = a / 500 + fy;
  const fz = fy - b / 200;

  const xr = fx ** 3 > epsilon ? fx ** 3 : (116 * fx - 16) / kappa;
  const yr = L > kappa * epsilon ? ((L + 16) / 116) ** 3 : L / kappa;
  const zr = fz ** 3 > epsilon ? fz ** 3 : (116 * fz - 16) / kappa;

  return {
    x: xr * wp.x,
    y: yr * wp.y,
    z: zr * wp.z,
    whitePoint
  };
}

/**
 * Converts RGB to LAB color space.
 * @param rgb - The RGB color values.
 * @param whitePoint - The white point to use (default: 'D65').
 * @returns The LAB color values.
 */
export function rgbToLab(rgb: RGB, whitePoint: WhitePoint = 'D65'): LAB {
  const xyz = rgbToXyz(rgb, whitePoint);
  return xyzToLab(xyz, whitePoint);
}

/**
 * Converts LAB to RGB color space.
 * @param lab - The LAB color values.
 * @param whitePoint - The white point to use (default: 'D65').
 * @returns The RGB color values.
 */
export function labToRgb(lab: LAB, whitePoint: WhitePoint = 'D65'): RGB {
  const xyz = labToXyz(lab, whitePoint);
  return xyzToRgb(xyz, whitePoint);
}

/**
 * Converts RGB to LAB color space using the D50 white point.
 * @param rgb - The RGB color values.
 * @returns The LAB color values using the D50 white point.
 */
export function rgbToLabD50(rgb: RGB): LAB {
  const xyzD50 = rgbToXyzD50(rgb);
  return xyzToLab(xyzD50, 'D50');
}

/**
 * Converts LAB to RGB color space using the D50 white point.
 * @param lab - The LAB color values.
 * @returns The RGB color values.
 */
export function labD50ToRgb(lab: LAB): RGB {
  const xyzD50 = labToXyz(lab, 'D50');
  return xyzToRgb(xyzD50, 'D50');
}
