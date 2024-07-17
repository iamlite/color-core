import { linearSrgbToSrgb, srgbToLinearSrgb } from '../linear-srgb-srgb';

describe('linearSrgbToSrgb', () => {
    test('converts linear sRGB to sRGB correctly for low value', () => {
        const result = linearSrgbToSrgb(0.002);
        expect(result).toBeCloseTo(7);
    });

    test('converts linear sRGB to sRGB correctly for high value', () => {
        const result = linearSrgbToSrgb(0.5);
        expect(result).toBeCloseTo(188);
    });

    test('converts linear sRGB to sRGB correctly for value above 0.0031308', () => {
        const result = linearSrgbToSrgb(0.1);
        expect(result).toBeCloseTo(89);
    });

    test('converts linear sRGB to sRGB correctly for maximum value', () => {
        const result = linearSrgbToSrgb(1);
        expect(result).toBe(255);
    });

    test('converts linear sRGB to sRGB correctly for minimum value', () => {
        const result = linearSrgbToSrgb(0);
        expect(result).toBe(0);
    });
});

describe('srgbToLinearSrgb', () => {
    test('throws error for out of range value below 0', () => {
        expect(() => srgbToLinearSrgb(-1)).toThrow('sRGB value must be between 0 and 255');
    });

    test('throws error for out of range value above 255', () => {
        expect(() => srgbToLinearSrgb(256)).toThrow('sRGB value must be between 0 and 255');
    });

    test('converts sRGB to linear sRGB correctly for low value', () => {
        const result = srgbToLinearSrgb(6);
        expect(result).toBeCloseTo(0.002, 3);
    });

    test('converts sRGB to linear sRGB correctly for high value', () => {
        const result = srgbToLinearSrgb(186);
        expect(result).toBeCloseTo(0.49, 1);
    });

    test('converts sRGB to linear sRGB correctly for value above 0.04045', () => {
        const result = srgbToLinearSrgb(39);
        expect(result).toBeCloseTo(0.02, 3);
    });

    test('converts sRGB to linear sRGB correctly for maximum value', () => {
        const result = srgbToLinearSrgb(255);
        expect(result).toBe(1);
    });

    test('converts sRGB to linear sRGB correctly for minimum value', () => {
        const result = srgbToLinearSrgb(0);
        expect(result).toBe(0);
    });
});
