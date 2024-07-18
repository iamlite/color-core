import { LCH, LUV, XYZ } from '../../types';
import { constants } from './constants';

/**
 * Calculates the Y value in the CIELAB color space based on the given L value.
 *
 * @param {number} l - The L value representing the lightness.
 * @return {number} The calculated Y value.
 */
export function lToY(l: number): number {
  if (l <= 8) {
    return constants.refY * l / constants.kappa;
  }
  return constants.refY * Math.pow((l + 16) / 116, 3);
}

/**
 * Calculates the lightness value (L) in the CIELAB color space based on the given Y value.
 *
 * @param {number} y - The Y value representing the lightness.
 * @return {number} The calculated lightness value (L).
 */
export function yToL(y: number): number {
  if (y <= constants.epsilonlow) {
    return y * constants.kappa / constants.refY;
  }
  return 116 * Math.pow(y / constants.refY, 1 / 3) - 16;
}

/**
 * Calculates the distance from the origin on a line defined by a slope and intercept.
 *
 * @param {number} slope - The slope of the line.
 * @param {number} intercept - The intercept of the line.
 * @return {number} The distance from the origin.
 */
export function distanceFromOrigin(slope: number, intercept: number): number {
  return Math.abs(intercept) / Math.sqrt(Math.pow(slope, 2) + 1);
}


/**
 * Calculates the distance from the origin on a line defined by a slope and intercept.
 *
 * @param {number} slope - The slope of the line.
 * @param {number} intercept - The intercept of the line.
 * @param {number} angle - The angle of the line in radians.
 * @return {number} The distance from the origin. If the distance is negative, returns Infinity.
 */
export function distanceFromOriginAngle(slope: number, intercept: number, angle: number): number {
  const denominator = Math.sin(angle) - slope * Math.cos(angle);
  if (denominator === 0) {
    return Infinity;
  }
  const d = intercept / denominator;
  return d < 0 ? Infinity : d;
}



/**
 * Calculates the maximum chroma value in the HSLuv color space.
 *
 * @param {number} l - The lightness value.
 * @param {number} h - The hue value.
 * @return {number} The maximum chroma value.
 */
export function calcMaxChromaHsluv(l: number, h: number): number {
  const hueRad = h / 360 * Math.PI * 2;
  const lines = calculateBoundingLines(l);
  const distances = lines.map(line => distanceFromOriginAngle(line[0], line[1], hueRad));
  return Math.min(...distances);
}


/**
 * Calculates the maximum chroma value for a given set of lines in the HPLuv color space.
 *
 * @param {number[][]} lines - An array of lines, each represented by an array of two numbers.
 * @return {number} The maximum chroma value.
 */
export function calcMaxChromaHpluv(lines: number[][]): number {
  const r0 = distanceFromOrigin(lines[0][0], lines[0][1]);
  const r1 = distanceFromOrigin(lines[1][0], lines[1][1]);
  const g0 = distanceFromOrigin(lines[2][0], lines[2][1]);
  const g1 = distanceFromOrigin(lines[3][0], lines[3][1]);
  const b0 = distanceFromOrigin(lines[4][0], lines[4][1]);
  const b1 = distanceFromOrigin(lines[5][0], lines[5][1]);
  return Math.min(r0, r1, g0, g1, b0, b1);
}

/**
 * Calculates the bounding lines for a given lightness value.
 *
 * @param {number} l - The lightness value.
 * @return {number[][]} An array of lines, each represented by an array of two numbers.
 */
export function calculateBoundingLines(l: number): number[][] {
  const sub1 = Math.pow(l + 16, 3) / 1560896;
  const sub2 = sub1 > constants.epsilonlow ? sub1 : l / constants.kappa;
  const lines: number[][] = [];

  for (let i = 0; i < 3; i++) {
    const m1 = constants.m[i][0];
    const m2 = constants.m[i][1];
    const m3 = constants.m[i][2];

    const s1 = sub2 * (284517 * m1 - 94839 * m3);
    const s2 = sub2 * (838422 * m3 + 769860 * m2 + 731718 * m1);
    const s3 = sub2 * (632260 * m3 - 126452 * m2);

    const s0 = s1 / s3;
    const s1_1 = s1 / (s3 + 126452);
    lines.push([s0, s2 * l / s3]);
    lines.push([s1_1, (s2 - 769860) * l / (s3 + 126452)]);
  }

  return lines;
}


/**
 * Converts a color from the LUV color space to the LCH color space.
 *
 * @param {LUV} luv - The LUV color to convert.
 * @return {LCH} The converted LCH color.
 */
export function luvToLch(luv: LUV): LCH {
  const c = Math.sqrt(luv.u * luv.u + luv.v * luv.v);
  let h: number;
  if (c < 0.00000001) {
    h = 0;
  } else {
    h = Math.atan2(luv.v, luv.u) * 180.0 / Math.PI;
    if (h < 0) {
      h = 360 + h;
    }
  }
  return { l: luv.L, c, h };
}


/**
 * Converts XYZ to LUV.
 * @param xyz - The XYZ color to convert.
 * @returns The converted LUV color.
 */
export function xyzToLuv(xyz: XYZ): LUV {
  const divider = xyz.x + 15 * xyz.y + 3 * xyz.z;
  let varU = 4 * xyz.x;
  let varV = 9 * xyz.y;
  if (divider !== 0) {
    varU /= divider;
    varV /= divider;
  } else {
    varU = NaN;
    varV = NaN;
  }
  const l = yToL(xyz.y);
  if (l === 0) {
    return { L: 0, u: 0, v: 0 };
  }
  const u = 13 * l * (varU - constants.refU);
  const v = 13 * l * (varV - constants.refV);
  return { L: l, u, v };
}



/**
 * Converts LCH to LUV.
 * @param lch - The LCH color to convert.
 * @returns The converted LUV color.
 */
export function lchToLuv(lch: LCH): LUV {
  const hrad = lch.h / 180.0 * Math.PI;
  return {
    L: lch.l,
    u: Math.cos(hrad) * lch.c,
    v: Math.sin(hrad) * lch.c
  };
}

/**
 * Converts LUV to XYZ.
 * @param luv - The LUV color to convert.
 * @returns The converted XYZ color.
 */
export function luvToXyz(luv: LUV): XYZ {
  if (luv.L === 0) {
    return { x: 0, y: 0, z: 0 };
  }
  const varU = luv.u / (13 * luv.L) + constants.refU;
  const varV = luv.v / (13 * luv.L) + constants.refV;
  const y = lToY(luv.L);
  const x = 0 - 9 * y * varU / ((varU - 4) * varV - varU * varV);
  const z = (9 * y - 15 * varV * y - varV * x) / (3 * varV);
  return { x, y, z };
}
