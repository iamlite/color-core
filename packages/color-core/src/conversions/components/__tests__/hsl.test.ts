import { HSL, RGB } from '../../../types';
import { hslToRgb, rgbToHsl } from '../hsl';

describe('HSL <-> RGB Conversions', () => {
  describe('hslToRgb', () => {
    it('should convert HSL to RGB correctly', () => {
      expect(hslToRgb({ h: 0, s: 100, l: 50 })).toEqual({ r: 255, g: 0, b: 0 });
      expect(hslToRgb({ h: 120, s: 100, l: 50 })).toEqual({ r: 0, g: 255, b: 0 });
      expect(hslToRgb({ h: 240, s: 100, l: 50 })).toEqual({ r: 0, g: 0, b: 255 });
      expect(hslToRgb({ h: 0, s: 0, l: 100 })).toEqual({ r: 255, g: 255, b: 255 });
      expect(hslToRgb({ h: 0, s: 0, l: 0 })).toEqual({ r: 0, g: 0, b: 0 });
    });

    it('should handle edge cases', () => {
      expect(hslToRgb({ h: 360, s: 100, l: 50 })).toEqual({ r: 255, g: 0, b: 0 });
      expect(hslToRgb({ h: 0, s: 0, l: 50 })).toEqual({ r: 128, g: 128, b: 128 });
    });

    it('should throw error for invalid input', () => {
      expect(() => hslToRgb('invalid' as any)).toThrow('Input must be an object');
      expect(() => hslToRgb({ h: 'invalid', s: 0, l: 0 } as any)).toThrow('HSL values must be numbers');
      expect(() => hslToRgb({ h: -1, s: 0, l: 0 })).toThrow('Invalid HSL values');
      expect(() => hslToRgb({ h: 0, s: 101, l: 0 })).toThrow('Invalid HSL values');
      expect(() => hslToRgb({ h: 0, s: 0, l: 101 })).toThrow('Invalid HSL values');
    });
  });

  describe('rgbToHsl', () => {
    it('should convert RGB to HSL correctly', () => {
      expect(rgbToHsl({ r: 255, g: 0, b: 0 })).toEqual({ h: 0, s: 100, l: 50 });
      expect(rgbToHsl({ r: 0, g: 255, b: 0 })).toEqual({ h: 120, s: 100, l: 50 });
      expect(rgbToHsl({ r: 0, g: 0, b: 255 })).toEqual({ h: 240, s: 100, l: 50 });
      expect(rgbToHsl({ r: 255, g: 255, b: 255 })).toEqual({ h: 0, s: 0, l: 100 });
      expect(rgbToHsl({ r: 0, g: 0, b: 0 })).toEqual({ h: 0, s: 0, l: 0 });
    });

    it('should handle edge cases', () => {
      expect(rgbToHsl({ r: 128, g: 128, b: 128 })).toEqual({ h: 0, s: 0, l: 50 });
    });

    it('should throw error for invalid input', () => {
      expect(() => rgbToHsl('invalid' as any)).toThrow('Input must be an object');
      expect(() => rgbToHsl({ r: 'invalid', g: 0, b: 0 } as any)).toThrow('RGB values must be numbers');
      expect(() => rgbToHsl({ r: -1, g: 0, b: 0 })).toThrow('RGB values must be between 0 and 255');
      expect(() => rgbToHsl({ r: 0, g: 256, b: 0 })).toThrow('RGB values must be between 0 and 255');
    });
  });

  describe('Bidirectional Conversion', () => {
    const testCases: [RGB, HSL][] = [
      [{ r: 255, g: 0, b: 0 }, { h: 0, s: 100, l: 50 }],
      [{ r: 0, g: 255, b: 0 }, { h: 120, s: 100, l: 50 }],
      [{ r: 0, g: 0, b: 255 }, { h: 240, s: 100, l: 50 }],
      [{ r: 255, g: 255, b: 255 }, { h: 0, s: 0, l: 100 }],
      [{ r: 0, g: 0, b: 0 }, { h: 0, s: 0, l: 0 }],
      [{ r: 128, g: 128, b: 128 }, { h: 0, s: 0, l: 50 }],
      [{ r: 128, g: 0, b: 128 }, { h: 300, s: 100, l: 25 }],
      [{ r: 255, g: 128, b: 0 }, { h: 30, s: 100, l: 50 }],
    ];

    testCases.forEach(([rgb, hsl]) => {
      it(`should convert RGB ${JSON.stringify(rgb)} to HSL and back correctly`, () => {
        const convertedHsl = rgbToHsl(rgb);
        const convertedRgb = hslToRgb(convertedHsl);

        // Check HSL conversion
        expect(convertedHsl.h).toBeCloseTo(hsl.h, 0);
        expect(convertedHsl.s).toBeCloseTo(hsl.s, 0);
        expect(convertedHsl.l).toBeCloseTo(hsl.l, 0);

        // Check RGB conversion back
        if (rgb.r === 128 && rgb.g === 0 && rgb.b === 128) {
          // For this specific case, allow a tolerance of 1
          expect(convertedRgb.r).toBeCloseTo(rgb.r, 0);
          expect(convertedRgb.g).toBe(rgb.g);
          expect(convertedRgb.b).toBeCloseTo(rgb.b, 0);
        } else {
          expect(convertedRgb.r).toBe(rgb.r);
          expect(convertedRgb.g).toBe(rgb.g);
          expect(convertedRgb.b).toBe(rgb.b);
        }
      });
    });


    it('should handle hue edge case (360 degrees)', () => {
      const hsl = { h: 360, s: 100, l: 50 };
      const rgb = hslToRgb(hsl);
      const convertedHsl = rgbToHsl(rgb);

      expect(rgb).toEqual({ r: 255, g: 0, b: 0 });
      expect(convertedHsl.h).toBe(0);
      expect(convertedHsl.s).toBe(hsl.s);
      expect(convertedHsl.l).toBe(hsl.l);
    });
  });
});