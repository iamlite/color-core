import { HPLuv, LCH, RGB } from '../../../types';
import { hpluvToLch, hpluvToRgb, lchToHpluv, rgbToHPLuv } from '../hpluv';

describe('HPLuv <-> RGB Conversions', () => {
    describe('hpluvToRgb', () => {
        it('should convert HPLuv to RGB', () => {
            const hpluv: HPLuv = { h: 12.177, p: 426.746, l: 53.23 };
            const expectedRGB: RGB = { r: 255, g: 0, b: 0 };
            const result = hpluvToRgb(hpluv);

            expect(result.r).toBeCloseTo(expectedRGB.r);
            expect(result.g).toBeCloseTo(expectedRGB.g);
            expect(result.b).toBeCloseTo(expectedRGB.b);
        });

        it('should handle blue color correctly', () => {
            const hpluv: HPLuv = { h: 265.874, p: 513.412, l: 32.300 };
            const expectedRGB: RGB = { r: 0, g: 0, b: 255 };
            const result = hpluvToRgb(hpluv);

            expect(result.r).toBeCloseTo(expectedRGB.r,);
            expect(result.g).toBeCloseTo(expectedRGB.g);
            expect(result.b).toBeCloseTo(expectedRGB.b);
        });

        it('should handle green color correctly', () => {
            const hpluv: HPLuv = { h: 127.715, p: 490.145, l: 87.735 };
            const expectedRGB: RGB = { r: 0, g: 255, b: 0 };
            const result = hpluvToRgb(hpluv);

            expect(result.r).toBeCloseTo(expectedRGB.r);
            expect(result.g).toBeCloseTo(expectedRGB.g);
            expect(result.b).toBeCloseTo(expectedRGB.b);
        });

        it('should handle black color correctly', () => {
            const hpluv: HPLuv = { h: 0, p: 0, l: 0 };
            const expectedRGB: RGB = { r: 0, g: 0, b: 0 };
            const result = hpluvToRgb(hpluv);

            expect(result).toEqual(expectedRGB);
        });

        it('should handle white color correctly', () => {
            const hpluv: HPLuv = { h: 0, p: 0, l: 100 };
            const expectedRGB: RGB = { r: 255, g: 255, b: 255 };
            const result = hpluvToRgb(hpluv);

            expect(result).toEqual(expectedRGB);
        });
    });

    describe('rgbToHPLuv', () => {
        it('should convert RGB to HPLuv correctly', () => {
            const rgb: RGB = { r: 255, g: 0, b: 0 };
            const expectedHPLuv: HPLuv = { h: 12.17, p: 426.746, l: 53.237 };
            const result = rgbToHPLuv(rgb);

            expect(result.h).toBeCloseTo(expectedHPLuv.h, 0);
            expect(result.p).toBeCloseTo(expectedHPLuv.p, 0);
            expect(result.l).toBeCloseTo(expectedHPLuv.l, 0);
        });

        it('should handle black color correctly', () => {
            const rgb: RGB = { r: 0, g: 0, b: 0 };
            const expectedHPLuv: HPLuv = { h: 0, p: 0, l: 0 };
            const result = rgbToHPLuv(rgb);

            expect(result).toEqual(expectedHPLuv);
        });

        it('should handle white color correctly', () => {
            const rgb: RGB = { r: 255, g: 255, b: 255 };
            const expectedHPLuv: HPLuv = { h: 0, p: 0, l: 100 };
            const result = rgbToHPLuv(rgb);

            expect(result).toEqual(expectedHPLuv);
        });
    });

    describe('Bidirectional Conversion', () => {
        it('should convert RGB to HPLuv and back to RGB accurately', () => {
            const originalRGB: RGB = { r: 128, g: 64, b: 192 };
            const hpluv = rgbToHPLuv(originalRGB);
            const convertedRGB = hpluvToRgb(hpluv);

            expect(convertedRGB.r).toBeCloseTo(originalRGB.r, 0);
            expect(convertedRGB.g).toBeCloseTo(originalRGB.g, 0);
            expect(convertedRGB.b).toBeCloseTo(originalRGB.b, 0);
        });

        it('should convert HPLuv to RGB and back to HPLuv accurately', () => {
            const originalHPLuv: HPLuv = { h: 12, p: 426, l: 53 };
            const rgb = hpluvToRgb(originalHPLuv);
            const convertedHPLuv = rgbToHPLuv(rgb);

            expect(convertedHPLuv.h).toBeCloseTo(originalHPLuv.h, 0);
            expect(convertedHPLuv.p).toBeCloseTo(originalHPLuv.p, -.5);
            expect(convertedHPLuv.l).toBeCloseTo(originalHPLuv.l, 0);
        });



        describe('hpluvToLch', () => {
            it('should handle very high lightness correctly', () => {
                const hpluv: HPLuv = { h: 100, p: 50, l: 100 };
                const expectedLCH: LCH = { l: 100, c: 0, h: 100 };
                const result = hpluvToLch(hpluv);

                expect(result).toEqual(expectedLCH);
            });

            it('should handle very low lightness correctly', () => {
                const hpluv: HPLuv = { h: 100, p: 50, l: 0 };
                const expectedLCH: LCH = { l: 0, c: 0, h: 100 };
                const result = hpluvToLch(hpluv);

                expect(result).toEqual(expectedLCH);
            });
        });

        describe('lchToHpluv', () => {
            it('should handle very high lightness correctly', () => {
                const lch: LCH = { l: 100, c: 50, h: 100 };
                const expectedHPLuv: HPLuv = { h: 100, p: 0, l: 100 };
                const result = lchToHpluv(lch);

                expect(result).toEqual(expectedHPLuv);
            });

            it('should handle very low lightness correctly', () => {
                const lch: LCH = { l: 0, c: 50, h: 100 };
                const expectedHPLuv: HPLuv = { h: 100, p: 0, l: 0 };
                const result = lchToHpluv(lch);

                expect(result).toEqual(expectedHPLuv);
            });
        });
    });
});
