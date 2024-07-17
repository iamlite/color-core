import { LUV, RGB } from '../../../types';
import { cieLuvToRgb, cieLuvToXyz, rgbToCIELuv } from '../cie-luv';

describe('LUV <-> RGB Conversions', () => {
    const testCases: [RGB, LUV][] = [
        [{ r: 255, g: 0, b: 0 }, { L: 53.24, u: 175.01, v: 37.75 }],
        [{ r: 0, g: 255, b: 0 }, { L: 87.73, u: -83.08, v: 107.40 }],
        [{ r: 0, g: 0, b: 255 }, { L: 32.30, u: -9.40, v: -130.33 }],
        [{ r: 255, g: 255, b: 255 }, { L: 100.00, u: 0.00, v: 0.00 }],
        [{ r: 0, g: 0, b: 0 }, { L: 0.00, u: 0.00, v: 0.00 }],
        [{ r: 128, g: 128, b: 128 }, { L: 53.59, u: 0.00, v: 0.00 }],
    ];

    describe('rgbToCIELuv', () => {
        test.each(testCases)('converts RGB %j to LUV %j', (rgb, expectedLuv) => {
            const result = rgbToCIELuv(rgb);
            expect(result.L).toBeCloseTo(expectedLuv.L, 1);
            expect(result.u).toBeCloseTo(expectedLuv.u, 1);
            expect(result.v).toBeCloseTo(expectedLuv.v, 1);
        });

        it('handles fractional RGB values', () => {
            const rgb: RGB = { r: 45.75, g: 180.5, b: 250.25 };
            const result = rgbToCIELuv(rgb);
            expect(result).toEqual(expect.any(Object));
            expect(result.L).toBeCloseTo(69.7, 1);
            expect(result.u).toBeCloseTo(-43.47, 1);
            expect(result.v).toBeCloseTo(-70.54, 1);
        });
    });

    describe('cieLuvToRgb', () => {
        test.each(testCases)('converts LUV %j to RGB %j', (expectedRgb, luv) => {
            const result = cieLuvToRgb(luv);
            expect(result.r).toBeCloseTo(expectedRgb.r, 0);
            expect(result.g).toBeCloseTo(expectedRgb.g, 0);
            expect(result.b).toBeCloseTo(expectedRgb.b, 0);
        });

        it('handles out-of-gamut colors', () => {
            const luv: LUV = { L: 50, u: 200, v: -200 };
            const result = cieLuvToRgb(luv);
            expect(result.r).toBeGreaterThanOrEqual(0);
            expect(result.r).toBeLessThanOrEqual(255);
            expect(result.g).toBeGreaterThanOrEqual(0);
            expect(result.g).toBeLessThanOrEqual(255);
            expect(result.b).toBeGreaterThanOrEqual(0);
            expect(result.b).toBeLessThanOrEqual(255);
        });

        it('handles zero luminance', () => {
            const luv: LUV = { L: 0, u: 0, v: 0 };
            const result = cieLuvToRgb(luv);
            expect(result).toEqual({ r: 0, g: 0, b: 0 });
        });
    });

    describe('Bidirectional Conversion', () => {
        test.each(testCases)('RGB to LUV to RGB: %j', (rgb) => {
            const luv = rgbToCIELuv(rgb);
            const result = cieLuvToRgb(luv);
            expect(result.r).toBeCloseTo(rgb.r, 0);
            expect(result.g).toBeCloseTo(rgb.g, 0);
            expect(result.b).toBeCloseTo(rgb.b, 0);
        });

        it('handles random RGB values', () => {
            for (let i = 0; i < 100; i++) {
                const rgb: RGB = {
                    r: Math.random() * 255,
                    g: Math.random() * 255,
                    b: Math.random() * 255
                };
                const luv = rgbToCIELuv(rgb);
                const result = cieLuvToRgb(luv);
                expect(result.r).toBeCloseTo(rgb.r, -.5);
                expect(result.g).toBeCloseTo(rgb.g, -.5);
                expect(result.b).toBeCloseTo(rgb.b, -.5);
            }
        });
    });
    describe('cieLuvToXyz', () => {
        it('should handle L > c.kappa * c.epsilonlow', () => {
            const luv = { L: 100, u: 10, v: 10 };
            const result = cieLuvToXyz(luv);

            expect(result.x).toBeGreaterThanOrEqual(0);
            expect(result.y).toBeGreaterThanOrEqual(0);
            expect(result.z).toBeGreaterThanOrEqual(0);
        });

        it('should handle L <= c.kappa * c.epsilonlow', () => {
            const luv = { L: 1, u: 10, v: 10 };
            const result = cieLuvToXyz(luv);

            expect(result.x).toBeGreaterThanOrEqual(0);
            expect(result.y).toBeGreaterThanOrEqual(0);
            expect(result.z).toBeGreaterThanOrEqual(0);
        });
    });
});