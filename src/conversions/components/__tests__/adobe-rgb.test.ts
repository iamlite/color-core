import { RGB } from '../../../types';
import { adobeRGBToRGB, rgbToAdobeRGB } from '../adobe-rgb';

describe('Adobe RGB <-> RGB Conversions', () => {
    describe('rgbToAdobeRGB', () => {
        it('should convert RGB to Adobe RGB correctly', () => {
            const red = rgbToAdobeRGB({ r: 255, g: 0, b: 0 });
            expect(red.ar).toBeCloseTo(0.8586, 2);
            expect(red.ag).toBeCloseTo(0, 2);
            expect(red.ab).toBeCloseTo(0, 2);

            const green = rgbToAdobeRGB({ r: 0, g: 255, b: 0 });
            expect(green.ar).toBeCloseTo(0.565, 2);
            expect(green.ag).toBeCloseTo(1, 2);
            expect(green.ab).toBeCloseTo(0.2344, 2);

            const blue = rgbToAdobeRGB({ r: 0, g: 0, b: 255 });
            expect(blue.ar).toBeCloseTo(0, 2);
            expect(blue.ag).toBeCloseTo(0, 2);
            expect(blue.ab).toBeCloseTo(0.9811, 2);
        });

        it('should handle edge cases', () => {
            const black = rgbToAdobeRGB({ r: 0, g: 0, b: 0 });
            expect(black.ar).toBeCloseTo(0, 2);
            expect(black.ag).toBeCloseTo(0, 2);
            expect(black.ab).toBeCloseTo(0, 2);

            const white = rgbToAdobeRGB({ r: 255, g: 255, b: 255 });
            expect(white.ar).toBeCloseTo(1, 2);
            expect(white.ag).toBeCloseTo(1, 2);
            expect(white.ab).toBeCloseTo(1, 2);
        });
    });

    describe('adobeRGBToRGB', () => {
        it('should convert Adobe RGB to RGB correctly', () => {
            const red = adobeRGBToRGB({ ar: 0.8586, ag: 0, ab: 0 });
            expect(red.r).toBe(255);
            expect(red.g).toBe(0);
            expect(red.b).toBe(0);

            const green = adobeRGBToRGB({ ar: 0.565, ag: 1, ab: 0.2344 });
            expect(green.r).toBe(0);
            expect(green.g).toBe(255);
            expect(green.b).toBe(0);

            const blue = adobeRGBToRGB({ ar: 0, ag: 0, ab: 0.9811 });
            expect(blue.r).toBe(0);
            expect(blue.g).toBe(0);
            expect(blue.b).toBe(255);
        });

        it('should handle edge cases', () => {
            const black = adobeRGBToRGB({ ar: 0, ag: 0, ab: 0 });
            expect(black.r).toBe(0);
            expect(black.g).toBe(0);
            expect(black.b).toBe(0);

            const white = adobeRGBToRGB({ ar: 1, ag: 1, ab: 1 });
            expect(white.r).toBe(255);
            expect(white.g).toBe(255);
            expect(white.b).toBe(255);
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
            it(`should convert RGB ${JSON.stringify(rgb)} to Adobe RGB and back correctly`, () => {
                const adobeRGB = rgbToAdobeRGB(rgb);
                const convertedRgb = adobeRGBToRGB(adobeRGB);

                expect(convertedRgb.r).toBeCloseTo(rgb.r, 0);
                expect(convertedRgb.g).toBeCloseTo(rgb.g, 0);
                expect(convertedRgb.b).toBeCloseTo(rgb.b, 0);
            });
        });
    });
});
