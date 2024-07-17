import { RGB } from '../../../types';
import { hwbToRgb, rgbToHwb } from '../hwb';

describe('HWB <-> RGB Conversions', () => {
    describe('hwbToRgb', () => {
        it('should convert HWB to RGB correctly', () => {
            expect(hwbToRgb({ h: 0, w: 0, b: 0 })).toEqual({ r: 255, g: 0, b: 0 });
            expect(hwbToRgb({ h: 120, w: 0, b: 0 })).toEqual({ r: 0, g: 255, b: 0 });
            expect(hwbToRgb({ h: 240, w: 0, b: 0 })).toEqual({ r: 0, g: 0, b: 255 });
        });

        it('should handle edge cases', () => {
            expect(hwbToRgb({ h: 0, w: 0, b: 100 })).toEqual({ r: 0, g: 0, b: 0 });
            expect(hwbToRgb({ h: 0, w: 100, b: 0 })).toEqual({ r: 255, g: 255, b: 255 });
        });

        it('should handle the case where w + b >= 100', () => {
            expect(hwbToRgb({ h: 0, w: 60, b: 40 })).toEqual({ r: 153, g: 153, b: 153 });
        });
    });

    describe('rgbToHwb', () => {
        it('should convert RGB to HWB correctly', () => {
            expect(rgbToHwb({ r: 255, g: 0, b: 0 })).toEqual({ h: 0, w: 0, b: 0 });
            expect(rgbToHwb({ r: 0, g: 255, b: 0 })).toEqual({ h: 120, w: 0, b: 0 });
            expect(rgbToHwb({ r: 0, g: 0, b: 255 })).toEqual({ h: 240, w: 0, b: 0 });
        });

        it('should handle edge cases', () => {
            expect(rgbToHwb({ r: 0, g: 0, b: 0 })).toEqual({ h: 0, w: 0, b: 100 });
            expect(rgbToHwb({ r: 255, g: 255, b: 255 })).toEqual({ h: 0, w: 100, b: 0 });
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
            it(`should convert RGB ${JSON.stringify(rgb)} to HWB and back correctly`, () => {
                const hwb = rgbToHwb(rgb);
                const convertedRgb = hwbToRgb(hwb);

                expect(convertedRgb.r).toBeCloseTo(rgb.r, 0);
                expect(convertedRgb.g).toBeCloseTo(rgb.g, 0);
                expect(convertedRgb.b).toBeCloseTo(rgb.b, 0);
            });
        });
    });
});
