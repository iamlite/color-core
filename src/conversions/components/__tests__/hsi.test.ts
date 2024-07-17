import { HSI, RGB } from '../../../types';
import { hsiToRgb, rgbToHsi } from '../hsi';

describe('HSI <-> RGB Conversions', () => {
    describe('hsiToRgb', () => {
        it('should convert HSI to RGB correctly', () => {
            expect(hsiToRgb({ h: 0, s: 100, i: 33.33 })).toEqual({ r: 255, g: 0, b: 0 });
            expect(hsiToRgb({ h: 120, s: 100, i: 33.33 })).toEqual({ r: 0, g: 255, b: 0 });
            expect(hsiToRgb({ h: 240, s: 100, i: 33.33 })).toEqual({ r: 0, g: 0, b: 255 });
        });

        it('should handle edge cases', () => {
            expect(hsiToRgb({ h: 0, s: 0, i: 0 })).toEqual({ r: 0, g: 0, b: 0 });
            expect(hsiToRgb({ h: 0, s: 0, i: 100 })).toEqual({ r: 255, g: 255, b: 255 });
        });

        it('should convert HSI to RGB correctly for hPrime in [1, 2)', () => {
            const hsi: HSI = { h: 90, s: 100, i: 33.33 };
            const expectedRGB: RGB = { r: 85, g: 170, b: 0 };
            const result = hsiToRgb(hsi);

            expect(result.r).toBeCloseTo(expectedRGB.r, 0);
            expect(result.g).toBeCloseTo(expectedRGB.g, 0);
            expect(result.b).toBeCloseTo(expectedRGB.b, 0);
        });

        it('should convert HSI to RGB correctly for hPrime in [5, 6)', () => {
            const hsi: HSI = { h: 330, s: 100, i: 33.33 };
            const expectedRGB: RGB = { r: 170, g: 0, b: 85 };
            const result = hsiToRgb(hsi);

            expect(result.r).toBeCloseTo(expectedRGB.r, 0);
            expect(result.g).toBeCloseTo(expectedRGB.g, 0);
            expect(result.b).toBeCloseTo(expectedRGB.b, 0);
        });
    });


    describe('rgbToHsi', () => {
        it('should convert RGB to HSI correctly', () => {
            const red = rgbToHsi({ r: 255, g: 0, b: 0 });
            expect(red.h).toBeCloseTo(0, 1);
            expect(red.s).toBeCloseTo(100, 1);
            expect(red.i).toBeCloseTo(33.33, 1);

            const green = rgbToHsi({ r: 0, g: 255, b: 0 });
            expect(green.h).toBeCloseTo(120, 1);
            expect(green.s).toBeCloseTo(100, 1);
            expect(green.i).toBeCloseTo(33.33, 1);

            const blue = rgbToHsi({ r: 0, g: 0, b: 255 });
            expect(blue.h).toBeCloseTo(240, 1);
            expect(blue.s).toBeCloseTo(100, 1);
            expect(blue.i).toBeCloseTo(33.33, 1);
        });

        it('should handle edge cases', () => {
            const black = rgbToHsi({ r: 0, g: 0, b: 0 });
            expect(black.h).toBeCloseTo(0, 1);
            expect(black.s).toBeCloseTo(0, 1);
            expect(black.i).toBeCloseTo(0, 1);

            const white = rgbToHsi({ r: 255, g: 255, b: 255 });
            expect(white.h).toBeCloseTo(0, 1);
            expect(white.s).toBeCloseTo(0, 1);
            expect(white.i).toBeCloseTo(100, 1);
        });
    });

    describe('Bidirectional Conversion', () => {
        const testCases: RGB[] = [
            { r: 255, g: 0, b: 0 },
            { r: 0, g: 255, b: 0 },
            { r: 0, g: 0, b: 255 },
            { r: 255, g: 255, b: 255 },
            { r: 0, g: 0, b: 0 },
            { r: 128, g: 128, b: 128 },
            { r: 128, g: 0, b: 128 },
            { r: 255, g: 128, b: 0 },
        ];

        testCases.forEach((rgb) => {
            it(`should convert RGB ${JSON.stringify(rgb)} to HSI and back correctly`, () => {
                const hsi = rgbToHsi(rgb);
                const convertedRgb = hsiToRgb(hsi);

                expect(convertedRgb.r).toBeCloseTo(rgb.r, 0);
                expect(convertedRgb.g).toBeCloseTo(rgb.g, 0);
                expect(convertedRgb.b).toBeCloseTo(rgb.b, 0);
            });
        });
    });
});
