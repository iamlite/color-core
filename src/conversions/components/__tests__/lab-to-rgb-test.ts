import { RGB } from '../../../types';
import { labToRgb } from '../lab-to-rgb';

function isRgbClose(rgb1: RGB, rgb2: RGB, tolerance: number = 5): boolean {
  return Math.abs(rgb1.r - rgb2.r) <= tolerance &&
    Math.abs(rgb1.g - rgb2.g) <= tolerance &&
    Math.abs(rgb1.b - rgb2.b) <= tolerance;
}

describe('labToRgb', () => {
  it('should convert LAB to RGB correctly for primary colors', () => {
    expect(isRgbClose(labToRgb({ l: 53.23, a: 80.11, b: 67.22 }), { r: 255, g: 0, b: 0 }, 2)).toBe(true);
    expect(isRgbClose(labToRgb({ l: 87.73, a: -86.18, b: 83.18 }), { r: 0, g: 255, b: 0 }, 2)).toBe(true);
    expect(isRgbClose(labToRgb({ l: 32.30, a: 79.20, b: -107.86 }), { r: 0, g: 0, b: 255 }, 2)).toBe(true);
  });

  it('should convert LAB to RGB correctly for black and white', () => {
    expect(isRgbClose(labToRgb({ l: 0, a: 0, b: 0 }), { r: 0, g: 0, b: 0 }, 1)).toBe(true);
    expect(isRgbClose(labToRgb({ l: 100, a: 0, b: 0 }), { r: 255, g: 255, b: 255 }, 1)).toBe(true);
  });

  it('should handle intermediate values correctly', () => {
    expect(isRgbClose(labToRgb({ l: 50, a: 0, b: 0 }), { r: 119, g: 119, b: 119 }, 2)).toBe(true);
    expect(isRgbClose(labToRgb({ l: 50, a: 10, b: -20 }), { r: 119, g: 115, b: 153 }, 5)).toBe(true);
    expect(isRgbClose(labToRgb({ l: 75, a: 25, b: 50 }), { r: 251, g: 165, b: 92 }, 5)).toBe(true);
  });

  it('should handle edge cases', () => {
    expect(isRgbClose(labToRgb({ l: 50, a: 127, b: 127 }), { r: 255, g: 0, b: 0 }, 10)).toBe(true);
    expect(isRgbClose(labToRgb({ l: 50, a: -128, b: -128 }), { r: 0, g: 169, b: 255 }, 10)).toBe(true);
  });

  it('should throw an error for invalid input types', () => {
    expect(() => labToRgb('not an object' as any)).toThrow('Input must be an object');
    expect(() => labToRgb({ l: '50', a: 10, b: -20 } as any)).toThrow('LAB values must be numbers');
  });

  it('should clamp RGB values to 0-255 range', () => {
    expect(isRgbClose(labToRgb({ l: 200, a: 500, b: 500 }), { r: 255, g: 0, b: 0 }, 1)).toBe(true);
    expect(isRgbClose(labToRgb({ l: -100, a: -500, b: -500 }), { r: 0, g: 141, b: 255 }, 1)).toBe(true);
  });

  it('should handle LAB values at the boundaries', () => {
    expect(isRgbClose(labToRgb({ l: 0, a: -128, b: -128 }), { r: 0, g: 64, b: 194 }, 5)).toBe(true);
    expect(isRgbClose(labToRgb({ l: 100, a: 127, b: 127 }), { r: 255, g: 70, b: 0 }, 5)).toBe(true);
  });
});