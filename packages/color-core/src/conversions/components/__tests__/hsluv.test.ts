import { HSLuv, LCH, RGB } from '../../../types';
import { hsluvToLch, hsluvToRgb, lchToHsluv, rgbToHSLuv } from '../hsluv';

describe('HSLuv <-> RGB Conversions', () => {
    describe('rgbToHSLuv', () => {
        it('should convert RGB to HSLuv correctly', () => {
            const rgb: RGB = { r: 255, g: 0, b: 0 };
            const expectedHSLuv: HSLuv = { h: 12.177050630061103, s: 100, l: 53.23711559542936 };
            const result = rgbToHSLuv(rgb);

            expect(result.h).toBeCloseTo(expectedHSLuv.h, 1);
            expect(result.s).toBeCloseTo(expectedHSLuv.s, 1);
            expect(result.l).toBeCloseTo(expectedHSLuv.l, 1);
        });

        it('should handle black color correctly', () => {
            const rgb: RGB = { r: 0, g: 0, b: 0 };
            const expectedHSLuv: HSLuv = { h: 0, s: 0, l: 0 };
            const result = rgbToHSLuv(rgb);

            expect(result).toEqual(expectedHSLuv);
        });

        it('should handle white color correctly', () => {
            const rgb: RGB = { r: 255, g: 255, b: 255 };
            const expectedHSLuv: HSLuv = { h: 0, s: 0, l: 100 };
            const result = rgbToHSLuv(rgb);

            expect(result).toEqual(expectedHSLuv);
        });

        it('should handle random color correctly', () => {
            const rgb: RGB = { r: 20, g: 50, b: 69 };
            const expectedHSLuv: HSLuv = { h: 237.55142298155351, s: 78.84463301068408, l: 19.472106924337545 };
            const result = rgbToHSLuv(rgb);

            expect(result.h).toBeCloseTo(expectedHSLuv.h, 1);
            expect(result.s).toBeCloseTo(expectedHSLuv.s, 1);
            expect(result.l).toBeCloseTo(expectedHSLuv.l, 1);
        });
    });


    describe('hsluvToRgb', () => {
        it('should convert HSLuv to RGB correctly', () => {
            const hsluv: HSLuv = { h: 12.177050630061103, s: 100, l: 53.23711559542936 };
            const expectedRGB: RGB = { r: 255, g: 0, b: 0 };
            const result = hsluvToRgb(hsluv);

            expect(result).toEqual(expectedRGB);
        });

        it('should handle black color correctly', () => {
            const hsluv: HSLuv = { h: 0, s: 0, l: 0 };
            const expectedRGB: RGB = { r: 0, g: 0, b: 0 };
            const result = hsluvToRgb(hsluv);

            expect(result).toEqual(expectedRGB);
        });

        it('should handle white color correctly', () => {
            const hsluv: HSLuv = { h: 0, s: 0, l: 100 };
            const expectedRGB: RGB = { r: 255, g: 255, b: 255 };
            const result = hsluvToRgb(hsluv);

            expect(result).toEqual(expectedRGB);
        });
    });

    describe('hsluvToLch', () => {
        it('should handle very high lightness correctly', () => {
            const hsluv: HSLuv = { h: 100, s: 50, l: 100 };
            const expectedLCH: LCH = { l: 100, c: 0, h: 100 };
            const result = hsluvToLch(hsluv);

            expect(result).toEqual(expectedLCH);
        });

        it('should handle very low lightness correctly', () => {
            const hsluv: HSLuv = { h: 100, s: 50, l: 0 };
            const expectedLCH: LCH = { l: 0, c: 0, h: 100 };
            const result = hsluvToLch(hsluv);

            expect(result).toEqual(expectedLCH);
        });
    });

    describe('lchToHsluv', () => {
        it('should handle very high lightness correctly', () => {
            const lch: LCH = { l: 100, c: 50, h: 100 };
            const expectedHSLuv: HSLuv = { h: 100, s: 0, l: 100 };
            const result = lchToHsluv(lch);

            expect(result).toEqual(expectedHSLuv);
        });

        it('should handle very low lightness correctly', () => {
            const lch: LCH = { l: 0, c: 50, h: 100 };
            const expectedHSLuv: HSLuv = { h: 100, s: 0, l: 0 };
            const result = lchToHsluv(lch);

            expect(result).toEqual(expectedHSLuv);
        });
    });

    describe('Bidirectional Conversion', () => {
        it('should convert RGB to HSLuv and back to RGB accurately', () => {
            const originalRGB: RGB = { r: 128, g: 64, b: 192 };
            const hsluv = rgbToHSLuv(originalRGB);
            const convertedRGB = hsluvToRgb(hsluv);

            expect(convertedRGB.r).toBeCloseTo(originalRGB.r, 0);
            expect(convertedRGB.g).toBeCloseTo(originalRGB.g, 0);
            expect(convertedRGB.b).toBeCloseTo(originalRGB.b, 0);
        });

        it('should convert HSLuv to RGB and back to HSLuv accurately', () => {
            const originalHSLuv: HSLuv = { h: 270, s: 60, l: 50 };
            const rgb = hsluvToRgb(originalHSLuv);
            const convertedHSLuv = rgbToHSLuv(rgb);

            expect(convertedHSLuv.h).toBeCloseTo(originalHSLuv.h, 0);
            expect(convertedHSLuv.s).toBeCloseTo(originalHSLuv.s, 0);
            expect(convertedHSLuv.l).toBeCloseTo(originalHSLuv.l, 0);
        });
    });
});