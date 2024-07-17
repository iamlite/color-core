import { LAB, LCH, RGB, XYZ } from '../../../types';
import { constants as cz } from '../constants';
import { labToLch, lchToLab, lchToRgb, lchToXyz, rgbToLch, xyzToLch } from '../lch';

describe('LCH <-> RGB Conversions', () => {
    describe('lchToRgb', () => {
        it('should convert LCH to RGB correctly', () => {
            expect(lchToRgb({ l: 53.240794141307205, c: 104.55176567686988, h: 39.999010612532906, })).toEqual({ r: 255, g: 0, b: 0 });
            expect(lchToRgb({ l: 87.73472235279792, c: 119.77587390168695, h: 136.01595303206315 })).toEqual({ r: 0, g: 255, b: 0 });
            expect(lchToRgb({ l: 32.297010932850725, c: 133.80761485376166, h: 306.2849380699878 })).toEqual({ r: 0, g: 0, b: 255 });
        });

        it('should handle edge cases', () => {
            expect(lchToRgb({ l: 0, c: 0, h: 0 })).toEqual({ r: 0, g: 0, b: 0 });
            expect(lchToRgb({ l: 100, c: 0, h: 0 })).toEqual({ r: 255, g: 255, b: 255 });
        });

    });

    describe('rgbToLch', () => {
        it('should convert RGB to LCH correctly', () => {
            expect(rgbToLch({ r: 255, g: 0, b: 0 })).toEqual({ l: 53.240794141307205, c: 104.55176567686988, h: 39.999010612532906, });
            expect(rgbToLch({ r: 0, g: 255, b: 0 })).toEqual({ l: 87.73472235279792, c: 119.77587390168695, h: 136.01595303206315 });
            expect(rgbToLch({ r: 0, g: 0, b: 255 })).toEqual({ l: 32.297010932850725, c: 133.80761485376166, h: 306.2849380699878 });
        });

        it('should handle edge cases', () => {
            expect(rgbToLch({ r: 0, g: 0, b: 0 })).toEqual({ l: 0, c: 0, h: 0 });
            expect(rgbToLch({ r: 255, g: 255, b: 255 })).toEqual({ l: 100, c: 0, h: 0 });
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
            it(`should convert RGB ${JSON.stringify(rgb)} to LCH and back correctly`, () => {
                const lch = rgbToLch(rgb);
                const convertedRgb = lchToRgb(lch);

                expect(convertedRgb.r).toBe(rgb.r);
                expect(convertedRgb.g).toBe(rgb.g);
                expect(convertedRgb.b).toBe(rgb.b);
            });
        });

    });

    test('converts LAB to LCH correctly', () => {
        const lab: LAB = { l: 53.23288, a: 80.10933, b: 67.22006 };
        const result = labToLch(lab);
        expect(result).toEqual({
            l: 53.23288,
            c: expect.any(Number),
            h: expect.any(Number),
        });
        expect(result.c).toBeCloseTo(104.5755, 4);
        expect(result.h).toBeCloseTo(40.0001, 4);
    });

    test('ensures hue is positive by adding 360 when h < 0', () => {
        const lab: LAB = { l: 53.23288, a: -80.10933, b: -67.22006 };
        const result = labToLch(lab);
        expect(result.h).toBeGreaterThanOrEqual(0);
    });

    test('sets hue to 0 for extremely low chroma', () => {
        const lab: LAB = { l: 53.23288, a: cz.epsilonhigh / 2, b: cz.epsilonhigh / 2 };
        const result = labToLch(lab);
        expect(result.c).toBeLessThan(cz.epsilonhigh);
        expect(result.h).toBe(0);
    });

    describe('lchToLab', () => {
        test('converts LCH to LAB correctly', () => {
            const lch: LCH = { l: 53.23288, c: 104.5518, h: 40.8539 };
            const result = lchToLab(lch);
            expect(result).toEqual({
                l: 53.23288,
                a: expect.any(Number),
                b: expect.any(Number),
            });
            expect(result.a).toBeCloseTo(79.08089, 4);
            expect(result.b).toBeCloseTo(68.3907, 4);
        });
    });


    describe('xyzToLch', () => {
        test('converts XYZ to LCH correctly with D65 white point', () => {
            const xyz: XYZ = { x: 0.4124564, y: 0.3575761, z: 0.1804375, whitePoint: 'D65' };
            const result = xyzToLch(xyz);
            expect(result).toEqual({
                l: expect.any(Number),
                c: expect.any(Number),
                h: expect.any(Number),
            });
            expect(result.l).toBeCloseTo(66.33, 1);
            expect(result.c).toBeCloseTo(39.87, 1);
            expect(result.h).toBeCloseTo(53.613, 1);
        });

        test('converts XYZ to LCH correctly with D50 white point', () => {
            const xyz: XYZ = { x: 0.4360747, y: 0.3850649, z: 0.1430804, whitePoint: 'D50' };
            const result = xyzToLch(xyz, 'D50');
            expect(result).toEqual({
                l: expect.any(Number),
                c: expect.any(Number),
                h: expect.any(Number),
            });
            expect(result.l).toBeCloseTo(68.39, 1);
            expect(result.c).toBeCloseTo(39.44, 1);
            expect(result.h).toBeCloseTo(59.47, 1);
        });
    });

    describe('lchToXyz', () => {
        test('converts LCH to XYZ correctly with D65 white point', () => {
            const lch: LCH = { l: 53.23288, c: 104.5518, h: 40.8539 };
            const result = lchToXyz(lch);
            expect(result).toEqual({
                x: expect.any(Number),
                y: expect.any(Number),
                z: expect.any(Number),
                whitePoint: 'D65',
            });
            expect(result.x).toBeCloseTo(0.409, 1);
            expect(result.y).toBeCloseTo(0.21, 1);
            expect(result.z).toBeCloseTo(0.018, 1);
        });

        test('converts LCH to XYZ correctly with D50 white point', () => {
            const lch: LCH = { l: 53.23288, c: 104.5518, h: 40.8539 };
            const result = lchToXyz(lch, 'D50');
            expect(result).toEqual({
                x: expect.any(Number),
                y: expect.any(Number),
                z: expect.any(Number),
                whitePoint: 'D50',
            });
            expect(result.x).toBeCloseTo(0.414, 1);
            expect(result.y).toBeCloseTo(0.2125, 1);
            expect(result.z).toBeCloseTo(0.01366, 1);
        });
    });

});