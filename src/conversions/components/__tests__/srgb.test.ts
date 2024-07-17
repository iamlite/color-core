import { RGB } from '../../../types';
import { rgbToSrgb, srgbToRgb } from '../srgb';

describe('sRGB <-> RGB Conversions', () => {
    describe('rgbToSrgb', () => {
        it('should convert RGB to sRGB correctly', () => {
            expect(rgbToSrgb({ r: 255, g: 0, b: 0 })).toEqual({ r: 1, g: 0, b: 0 });
            expect(rgbToSrgb({ r: 0, g: 255, b: 0 })).toEqual({ r: 0, g: 1, b: 0 });
            expect(rgbToSrgb({ r: 0, g: 0, b: 255 })).toEqual({ r: 0, g: 0, b: 1 });
            expect(rgbToSrgb({ r: 255, g: 255, b: 255 })).toEqual({ r: 1, g: 1, b: 1 });
            expect(rgbToSrgb({ r: 0, g: 0, b: 0 })).toEqual({ r: 0, g: 0, b: 0 });
        });

        it('should throw error for invalid input', () => {
            expect(() => rgbToSrgb('invalid' as any)).toThrow('Input must be an object');
            expect(() => rgbToSrgb({ r: 'invalid', g: 0, b: 0 } as any)).toThrow('RGB values must be numbers');
            expect(() => rgbToSrgb({ r: -1, g: 0, b: 0 })).toThrow('RGB values must be between 0 and 255');
        });
    });

    describe('srgbToRgb', () => {
        it('should convert sRGB to RGB correctly', () => {
            expect(srgbToRgb({ r: 1, g: 0, b: 0 })).toEqual({ r: 255, g: 0, b: 0 });
            expect(srgbToRgb({ r: 0, g: 1, b: 0 })).toEqual({ r: 0, g: 255, b: 0 });
            expect(srgbToRgb({ r: 0, g: 0, b: 1 })).toEqual({ r: 0, g: 0, b: 255 });
            expect(srgbToRgb({ r: 1, g: 1, b: 1 })).toEqual({ r: 255, g: 255, b: 255 });
            expect(srgbToRgb({ r: 0, g: 0, b: 0 })).toEqual({ r: 0, g: 0, b: 0 });
        });

        it('should throw error for invalid input', () => {
            expect(() => srgbToRgb(123 as any)).toThrow('Input must be an object');
            expect(() => srgbToRgb({ r: 'invalid', g: 0, b: 0 } as any)).toThrow('sRGB values must be numbers');
            expect(() => srgbToRgb({ r: -1, g: 0, b: 0 })).toThrow('sRGB values must be between 0 and 1');
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
        ];

        testCases.forEach((rgb) => {
            it(`should convert RGB ${JSON.stringify(rgb)} to sRGB and back correctly`, () => {
                const srgb = rgbToSrgb(rgb);
                const convertedRgb = srgbToRgb(srgb);
                expect(convertedRgb).toEqual(rgb);
            });
        });
    });
});
