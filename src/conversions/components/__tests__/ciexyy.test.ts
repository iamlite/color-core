import { CIExyY, RGB } from '../../../types';
import { ciexyyToRgb, rgbToCIExyY } from '../cie-xyy';

describe('CIE xyY <-> RGB Conversions', () => {
    const testCases: [RGB, CIExyY][] = [
        [{ r: 255, g: 0, b: 0 }, { x: 0.6400, y: 0.3300, Y: 21.26 }],
        [{ r: 0, g: 255, b: 0 }, { x: 0.3000, y: 0.6000, Y: 71.52 }],
        [{ r: 0, g: 0, b: 255 }, { x: 0.1500, y: 0.0600, Y: 7.22 }],
        [{ r: 255, g: 255, b: 255 }, { x: 0.3127, y: 0.3290, Y: 100.00 }],
        [{ r: 0, g: 0, b: 0 }, { x: 0, y: 0, Y: 0 }],
        [{ r: 128, g: 128, b: 128 }, { x: 0.3127, y: 0.3290, Y: 21.59 }],
    ];

    describe('rgbToCIExyY', () => {
        test.each(testCases)('converts RGB %j to CIE xyY %j', (rgb, expectedXyy) => {
            const result = rgbToCIExyY(rgb);
            expect(result.x).toBeCloseTo(expectedXyy.x, 2);
            expect(result.y).toBeCloseTo(expectedXyy.y, 2);
            expect(result.Y).toBeCloseTo(expectedXyy.Y, 0);
        });

        it('handles fractional RGB values', () => {
            const rgb: RGB = { r: 45.75, g: 180.5, b: 250.25 };
            const result = rgbToCIExyY(rgb);
            expect(result).toEqual(expect.any(Object));
            expect(result.x).toBeCloseTo(0.20, 2);
            expect(result.y).toBeCloseTo(0.23, 2);
            expect(result.Y).toBeCloseTo(40.34, 0);
        });
    });

    describe('ciexyyToRgb', () => {
        test.each(testCases)('converts CIE xyY %j to RGB %j', (expectedRgb, xyy) => {
            const result = ciexyyToRgb(xyy);
            expect(result.r).toBeCloseTo(expectedRgb.r, 0);
            expect(result.g).toBeCloseTo(expectedRgb.g, 0);
            expect(result.b).toBeCloseTo(expectedRgb.b, 0);
        });

        it('handles zero luminance', () => {
            const xyy: CIExyY = { x: 0.3127, y: 0.3290, Y: 0 };
            const result = ciexyyToRgb(xyy);
            expect(result).toEqual({ r: 0, g: 0, b: 0 });
        });
    });

    describe('Bidirectional Conversion', () => {
        test.each(testCases)('RGB to CIE xyY to RGB: %j', (rgb) => {
            const xyy = rgbToCIExyY(rgb);
            const result = ciexyyToRgb(xyy);
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
                const xyy = rgbToCIExyY(rgb);
                const result = ciexyyToRgb(xyy);
                expect(result.r).toBeCloseTo(rgb.r, -.5);
                expect(result.g).toBeCloseTo(rgb.g, -.5);
                expect(result.b).toBeCloseTo(rgb.b, -.5);
            }
        });
    });
});
