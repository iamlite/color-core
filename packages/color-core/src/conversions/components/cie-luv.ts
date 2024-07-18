import { LUV, RGB, XYZ } from '../../types';
import { D65, constants as c } from './constants';
import { rgbToXyz, xyzToRgb } from './xyz';

function calculateUPrime(X: number, Y: number, Z: number): number {
    const denominator = X + 15 * Y + 3 * Z;
    return denominator === 0 ? 0 : (4 * X) / denominator;
}

function calculateVPrime(X: number, Y: number, Z: number): number {
    const denominator = X + 15 * Y + 3 * Z;
    return denominator === 0 ? 0 : (9 * Y) / denominator;
}

export function rgbToCIELuv(rgb: RGB): LUV {
    const xyz = rgbToXyz(rgb);
    return xyzToCIELuv(xyz);
}

export function xyzToCIELuv(xyz: XYZ): LUV {
    const { x: X, y: Y, z: Z } = xyz;
    const yr = Y / D65.y;

    // Calculate L
    const L = yr > c.epsilonlow ? 116 * Math.pow(yr, 1 / 3) - 16 : c.kappa * yr;

    // Calculate u' and v' for both the color and the reference white
    const uPrime = calculateUPrime(X, Y, Z);
    const vPrime = calculateVPrime(X, Y, Z);
    const uPrimeR = calculateUPrime(D65.x, D65.y, D65.z);
    const vPrimeR = calculateVPrime(D65.x, D65.y, D65.z);

    // Calculate u and v
    const u = 13 * L * (uPrime - uPrimeR);
    const v = 13 * L * (vPrime - vPrimeR);

    return { L, u, v };
}

export function cieLuvToRgb(luv: LUV): RGB {
    const xyz = cieLuvToXyz(luv);
    return xyzToRgb(xyz);
}

export function cieLuvToXyz(luv: LUV): XYZ {
    const { L, u, v } = luv;

    if (L === 0) {
        return { x: 0, y: 0, z: 0, whitePoint: 'D65' };
    }

    const uPrimeR = calculateUPrime(D65.x, D65.y, D65.z);
    const vPrimeR = calculateVPrime(D65.x, D65.y, D65.z);

    const uPrime = (u / (13 * L)) + uPrimeR;
    const vPrime = (v / (13 * L)) + vPrimeR;

    const Y = L > c.kappa * c.epsilonlow
        ? Math.pow((L + 16) / 116, 3)
        : L / c.kappa;

    const X = Y * ((9 * uPrime) / (4 * vPrime));
    const Z = Y * ((12 - 3 * uPrime - 20 * vPrime) / (4 * vPrime));

    return {
        x: Math.max(0, X),
        y: Math.max(0, Y),
        z: Math.max(0, Z),
        whitePoint: 'D65'
    };
}