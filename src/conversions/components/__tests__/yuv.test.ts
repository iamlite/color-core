import { RGB } from '../../../types';
import { rgbToYuv, yuvToRgb } from '../yuv';

describe('YUV <-> RGB Conversions', () => {
    describe('rgbToYuv', () => {
        it('should convert RGB to YUV correctly', () => {
            expect(rgbToYuv({ r: 255, g: 0, b: 0 })).toEqual({ y: 76.24, u: 84.97, v: 255.5 });
            expect(rgbToYuv({ r: 0, g: 255, b: 0 })).toEqual({ y: 149.69, u: 43.53, v: 21.23 });
            expect(rgbToYuv({ r: 0, g: 0, b: 255 })).toEqual({ y: 29.07, u: 255.5, v: 107.27 });
            expect(rgbToYuv({ r: 255, g: 255, b: 255 })).toEqual({ y: 255, u: 128, v: 128 });
            expect(rgbToYuv({ r: 0, g: 0, b: 0 })).toEqual({ y: 0, u: 128, v: 128 });
        });

        it('should throw error for invalid input', () => {
            expect(() => rgbToYuv('invalid' as any)).toThrow('Input must be an object');
            expect(() => rgbToYuv({ r: 'invalid', g: 0, b: 0 } as any)).toThrow('RGB values must be numbers');
            expect(() => rgbToYuv({ r: -1, g: 0, b: 0 })).toThrow('RGB values must be between 0 and 255');
        });
    });

    describe('yuvToRgb', () => {
        it('should convert YUV to RGB correctly', () => {
            expect(yuvToRgb({ y: 76.25, u: 84.97, v: 255.5 })).toEqual({ r: 255, g: 0, b: 0 });
            expect(yuvToRgb({ y: 149.69, u: 43.53, v: 21.23 })).toEqual({ r: 0, g: 255, b: 0 });
            expect(yuvToRgb({ y: 29.07, u: 255.5, v: 107.27 })).toEqual({ r: 0, g: 0, b: 255 });
            expect(yuvToRgb({ y: 255, u: 128, v: 128 })).toEqual({ r: 255, g: 255, b: 255 });
            expect(yuvToRgb({ y: 0, u: 128, v: 128 })).toEqual({ r: 0, g: 0, b: 0 });
        });

        it('should throw error for invalid input', () => {
            expect(() => yuvToRgb(123 as any)).toThrow('Input must be an object');
            expect(() => yuvToRgb({ y: 'invalid', u: 0, v: 0 } as any)).toThrow('YUV values must be numbers');
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
            it(`should convert RGB ${JSON.stringify(rgb)} to YUV and back correctly`, () => {
                const yuv = rgbToYuv(rgb);
                const convertedRgb = yuvToRgb(yuv);
                expect(convertedRgb).toEqual(rgb);
            });
        });
    });
});
