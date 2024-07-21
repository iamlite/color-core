import { RGB } from '../../../types';
import { calculateBrightness, isLightColor } from '../../components/brightness';

describe('Brightness functions', () => {
    const testCases: [RGB, number][] = [
        [{ r: 255, g: 255, b: 255 }, 255], // White
        [{ r: 0, g: 0, b: 0 }, 0],         // Black
        [{ r: 255, g: 0, b: 0 }, 76],      // Red
        [{ r: 0, g: 255, b: 0 }, 149],     // Green
        [{ r: 0, g: 0, b: 255 }, 29],      // Blue
    ];

    describe('calculateBrightness', () => {
        test.each(testCases)('calculates brightness correctly for %p', (color, expected) => {
            expect(calculateBrightness(color)).toBe(expected);
        });
    });

    describe('isLightColor', () => {
        test.each(testCases)('determines if color is light correctly for %p', (color, brightness) => {
            expect(isLightColor(color)).toBe(brightness > 128);
        });

        test('uses custom threshold correctly', () => {
            const color: RGB = { r: 100, g: 100, b: 100 };
            expect(isLightColor(color, 100)).toBe(true);
            expect(isLightColor(color, 150)).toBe(false);
        });
    });
});
