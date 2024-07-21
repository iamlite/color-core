import { Oklch, RGB, rawOklch } from '../../../types';
import { oklchToRgb, rgbToOklch, rgbToRawOklch } from '../oklch';

describe('Oklch <-> RGB Conversions', () => {
    const testCases: [RGB, Oklch, rawOklch][] = [
        [{ r: 255, g: 0, b: 0 }, { L: 62.80, C: 25.7683, h: 29.23 }, { L: 0.627956, C: 0.25768, h: 29.2337 }],
        [{ r: 0, g: 255, b: 0 }, { L: 86.64, C: 29.482, h: 142.50 }, { L: 0.866439, C: 0.29482, h: 142.4954 }],
        [{ r: 0, g: 0, b: 255 }, { L: 45.20, C: 31.3214, h: 264.05 }, { L: 0.452014, C: 0.313214, h: 264.0518 }],
        [{ r: 255, g: 255, b: 255 }, { L: 100.00, C: 0.0000, h: 0.00 }, { L: 1, C: 0, h: 0 }],
        [{ r: 0, g: 0, b: 0 }, { L: 0.00, C: 0.0000, h: 0.00 }, { L: 0, C: 0, h: 0 }],
        [{ r: 128, g: 128, b: 128 }, { L: 59.99, C: 0.0000, h: 0.00 }, { L: 0.5999, C: 0, h: 0 }],
    ];

    describe('rgbToOklch', () => {
        test.each(testCases)('converts RGB %j to Oklch %j', (rgb, expectedOklch) => {
            const result = rgbToOklch(rgb);
            expect(result.L).toBeCloseTo(expectedOklch.L, 2);
            expect(result.C).toBeCloseTo(expectedOklch.C, 2);
            expect(result.h).toBeCloseTo(expectedOklch.h, 2);
        });

        it('handles fractional RGB values', () => {
            const rgb: RGB = { r: 45.75, g: 180.5, b: 250.25 };
            const result = rgbToOklch(rgb);
            expect(result).toEqual(expect.any(Object));
            expect(result.L).toBeCloseTo(73.32, 2);
            expect(result.C).toBeCloseTo(14.887, 2);
            expect(result.h).toBeCloseTo(237.58, 2);
        });

        it('handles grayscale colors', () => {
            const rgb: RGB = { r: 128, g: 128, b: 128 };
            const result = rgbToOklch(rgb);
            expect(result.C).toBeCloseTo(0, 4);
            expect(result.h).toBe(0);
        });
    });

    describe('rgbToRawOklch', () => {
        test.each(testCases)('converts RGB %j to raw Oklch %j', (rgb, _, expectedRaw) => {
            const result = rgbToRawOklch(rgb);
            expect(result.L).toBeCloseTo(expectedRaw.L, 4);
            expect(result.C).toBeCloseTo(expectedRaw.C, 4);
            expect(result.h).toBeCloseTo(expectedRaw.h, 2);
        });

        it('handles fractional RGB values', () => {
            const rgb: RGB = { r: 45.75, g: 180.5, b: 250.25 };
            const result = rgbToRawOklch(rgb);
            expect(result).toEqual(expect.any(Object));
            expect(result.L).toBeCloseTo(0.73317, 5);
            expect(result.C).toBeCloseTo(0.14888, 5);
            expect(result.h).toBeCloseTo(237.58, 2);
        });
    });

    describe('oklchToRgb', () => {
        test.each(testCases)('converts Oklch %j to RGB %j', (expectedRgb, oklch) => {
            const result = oklchToRgb(oklch);
            expect(result.r).toBeCloseTo(expectedRgb.r, 0);
            expect(result.g).toBeCloseTo(expectedRgb.g, 0);
            expect(result.b).toBeCloseTo(expectedRgb.b, 0);
        });

        it('handles conversion of dark colors', () => {
            const oklch: Oklch = { L: 10, C: 10, h: 180 };
            const result = oklchToRgb(oklch);
            expect(result.r).toBeGreaterThanOrEqual(0);
            expect(result.r).toBeLessThanOrEqual(255);
            expect(result.g).toBeGreaterThanOrEqual(0);
            expect(result.g).toBeLessThanOrEqual(255);
            expect(result.b).toBeGreaterThanOrEqual(0);
            expect(result.b).toBeLessThanOrEqual(255);
        });

        test('throws error for non-object input', () => {
            expect(() => oklchToRgb(null as unknown as Oklch)).toThrow('Input must be an object');
        });

        test('throws error for invalid Oklch object', () => {
            expect(() => oklchToRgb({ L: 'a', C: 0.2, h: 0.1 } as unknown as Oklch)).toThrow('Oklch values must be numbers');
            expect(() => oklchToRgb({ L: 0.5, C: 'b', h: 0.1 } as unknown as Oklch)).toThrow('Oklch values must be numbers');
            expect(() => oklchToRgb({ L: 0.5, C: 0.2, h: 'c' } as unknown as Oklch)).toThrow('Oklch values must be numbers');
        });

        it('handles hue wrap-around', () => {
            const oklch1: Oklch = { L: 50, C: 10, h: 360 };
            const oklch2: Oklch = { L: 50, C: 10, h: 0 };
            const result1 = oklchToRgb(oklch1);
            const result2 = oklchToRgb(oklch2);
            expect(result1.r).toBeCloseTo(result2.r, 0);
            expect(result1.g).toBeCloseTo(result2.g, 0);
            expect(result1.b).toBeCloseTo(result2.b, 0);
        });
    });

    describe('Bidirectional Conversion', () => {
        test.each(testCases)('RGB to Oklch to RGB: %j', (rgb) => {
            const oklch = rgbToOklch(rgb);
            const result = oklchToRgb(oklch);
            expect(result.r).toBeCloseTo(rgb.r, 0);
            expect(result.g).toBeCloseTo(rgb.g, 0);
            expect(result.b).toBeCloseTo(rgb.b, 0);
        });

        it('handles random RGB values', () => {
            for (let i = 0; i < 100; i++) {
                const rgb: RGB = {
                    r: Math.floor(Math.random() * 256),
                    g: Math.floor(Math.random() * 256),
                    b: Math.floor(Math.random() * 256)
                };
                const oklch = rgbToOklch(rgb);
                const result = oklchToRgb(oklch);
                expect(result.r).toBeCloseTo(rgb.r, 0);
                expect(result.g).toBeCloseTo(rgb.g, 0);
                expect(result.b).toBeCloseTo(rgb.b, 0);
            }
        });
    });
});