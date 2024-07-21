/**
 * Conversion functions between RGB and XYZ color spaces.
 * Supports both D65 (default) and D50 white points.
 */

import { RGB, WhitePoint, XYZ } from "../../types";

/**
 * Converts RGB to XYZ color space.
 * @param rgb - The RGB color values.
 * @param whitePoint - The white point to use (default: 'D65').
 * @returns The XYZ color values (normalized to 0-1 range).
 */
export function rgbToXyz(rgb: RGB, whitePoint: WhitePoint = 'D65'): XYZ {
  let { r, g, b } = rgb;

  // Normalize RGB values
  r = r / 255;
  g = g / 255;
  b = b / 255;

  // Apply gamma correction
  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  // Use the appropriate matrix based on the white point
  let matrix;
  if (whitePoint === 'D50') {
    matrix = [
      [0.4360747, 0.3850649, 0.1430804],
      [0.2225045, 0.7168786, 0.0606169],
      [0.0139322, 0.0971045, 0.7141733]
    ];
  } else {
    // D65 (default)
    matrix = [
      [0.4124564, 0.3575761, 0.1804375],
      [0.2126729, 0.7151522, 0.0721750],
      [0.0193339, 0.1191920, 0.9503041]
    ];
  }

  // Apply the conversion matrix
  const x = r * matrix[0][0] + g * matrix[0][1] + b * matrix[0][2];
  const y = r * matrix[1][0] + g * matrix[1][1] + b * matrix[1][2];
  const z = r * matrix[2][0] + g * matrix[2][1] + b * matrix[2][2];

  return { x, y, z, whitePoint };
}

/**
 * Converts XYZ to RGB color space.
 * @param xyz - The XYZ color values (assumed to be in 0-1 range).
 * @param whitePoint - The white point to use (default: 'D65').
 * @returns The RGB color values.
 */
export function xyzToRgb(xyz: XYZ, whitePoint: WhitePoint = 'D65'): RGB {
  let { x, y, z } = xyz;

  // Use the appropriate matrix based on the white point
  let matrix;
  if (whitePoint === 'D50') {
    matrix = [
      [3.1338561, -1.6168667, -0.4906146],
      [-0.9787684, 1.9161415, 0.0334540],
      [0.0719453, -0.2289914, 1.4052427]
    ];
  } else {
    // D65 (default)
    matrix = [
      [3.2404542, -1.5371385, -0.4985314],
      [-0.9692660, 1.8760108, 0.0415560],
      [0.0556434, -0.2040259, 1.0572252]
    ];
  }

  // Apply the conversion matrix
  let r = x * matrix[0][0] + y * matrix[0][1] + z * matrix[0][2];
  let g = x * matrix[1][0] + y * matrix[1][1] + z * matrix[1][2];
  let b = x * matrix[2][0] + y * matrix[2][1] + z * matrix[2][2];

  // Reverse gamma correction
  r = r > 0.0031308 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : 12.92 * r;
  g = g > 0.0031308 ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : 12.92 * g;
  b = b > 0.0031308 ? 1.055 * Math.pow(b, 1 / 2.4) - 0.055 : 12.92 * b;

  // Convert to 0-255 range and clamp values
  return {
    r: Math.max(0, Math.min(255, Math.round(r * 255))),
    g: Math.max(0, Math.min(255, Math.round(g * 255))),
    b: Math.max(0, Math.min(255, Math.round(b * 255)))
  };
}

/**
 * Converts XYZ from D65 to D50 white point.
 * @param xyz - The XYZ color values with D65 white point.
 * @returns The XYZ color values with D50 white point.
 */
export function xyzD65ToD50(xyz: XYZ): XYZ {
  const matrix = [
    [1.0478112, 0.0228866, -0.0501270],
    [0.0295424, 0.9904844, -0.0170491],
    [-0.0092345, 0.0150436, 0.7521316]
  ];

  const { x, y, z } = xyz;
  const xD50 = x * matrix[0][0] + y * matrix[0][1] + z * matrix[0][2];
  const yD50 = x * matrix[1][0] + y * matrix[1][1] + z * matrix[1][2];
  const zD50 = x * matrix[2][0] + y * matrix[2][1] + z * matrix[2][2];

  return { x: xD50, y: yD50, z: zD50, whitePoint: 'D50' };
}

/**
 * Converts XYZ from D50 to D65 white point.
 * @param xyz - The XYZ color values with D50 white point.
 * @returns The XYZ color values with D65 white point.
 */
export function xyzD50ToD65(xyz: XYZ): XYZ {
  const matrix = [
    [0.9555766, -0.0230393, 0.0631636],
    [-0.0282895, 1.0099416, 0.0210077],
    [0.0122982, -0.0204830, 1.3299098]
  ];

  const { x, y, z } = xyz;
  const xD65 = x * matrix[0][0] + y * matrix[0][1] + z * matrix[0][2];
  const yD65 = x * matrix[1][0] + y * matrix[1][1] + z * matrix[1][2];
  const zD65 = x * matrix[2][0] + y * matrix[2][1] + z * matrix[2][2];

  return { x: xD65, y: yD65, z: zD65, whitePoint: 'D65' };
}

/**
 * Converts RGB to XYZ color space using the D50 white point.
 * @param rgb - The RGB color values.
 * @returns The XYZ color values (normalized to 0-1 range) using the D50 white point.
 */
export function rgbToXyzD50(rgb: RGB): XYZ {
  const xyzD65 = rgbToXyz(rgb, 'D65');
  return xyzD65ToD50(xyzD65);
}

/**
 * Converts XYZ with D50 white point to RGB color space.
 * @param xyz - The XYZ color values (assumed to be in 0-1 range) with D50 white point.
 * @returns The RGB color values.
 */
export function xyzD50ToRgb(xyz: XYZ): RGB {
  const xyzD65 = xyzD50ToD65(xyz);
  return xyzToRgb(xyzD65, 'D65');
}