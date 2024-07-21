import { RGB } from '../../../types';
import { hsvToRgb, rgbToHsv } from '../hsv';

describe('HSV <-> RGB Conversions', () => {
  describe('hsvToRgb', () => {
    it('should convert HSV to RGB correctly', () => {
      expect(hsvToRgb({ h: 0, s: 100, v: 100 })).toEqual({ r: 255, g: 0, b: 0 });
      expect(hsvToRgb({ h: 120, s: 100, v: 100 })).toEqual({ r: 0, g: 255, b: 0 });
      expect(hsvToRgb({ h: 240, s: 100, v: 100 })).toEqual({ r: 0, g: 0, b: 255 });
      expect(hsvToRgb({ h: 0, s: 0, v: 100 })).toEqual({ r: 255, g: 255, b: 255 });
      expect(hsvToRgb({ h: 0, s: 0, v: 0 })).toEqual({ r: 0, g: 0, b: 0 });
    });

    it('should handle edge cases', () => {
      expect(hsvToRgb({ h: 360, s: 100, v: 100 })).toEqual({ r: 255, g: 0, b: 0 });
      expect(hsvToRgb({ h: 180, s: 50, v: 50 })).toEqual({ r: 64, g: 128, b: 128 });
    });

    it('should handle the case where h falls in the range for case 1', () => {
      expect(hsvToRgb({ h: 60, s: 100, v: 100 })).toEqual({ r: 255, g: 255, b: 0 });
    });

    it('should throw error for invalid input', () => {
      expect(() => hsvToRgb('invalid' as any)).toThrow('Input must be an object');
      expect(() => hsvToRgb({ h: 'invalid', s: 0, v: 0 } as any)).toThrow('HSV values must be numbers');
      expect(() => hsvToRgb({ h: -1, s: 0, v: 0 })).toThrow('Invalid HSV values: h must be [0, 360], s and v must be [0, 100]');
      expect(() => hsvToRgb({ h: 0, s: 101, v: 0 })).toThrow('Invalid HSV values: h must be [0, 360], s and v must be [0, 100]');
      expect(() => hsvToRgb({ h: 0, s: 0, v: 101 })).toThrow('Invalid HSV values: h must be [0, 360], s and v must be [0, 100]');
    });
  });

  describe('rgbToHsv', () => {
    it('should convert RGB to HSV correctly', () => {
      expect(rgbToHsv({ r: 255, g: 0, b: 0 })).toEqual({ h: 0, s: 100, v: 100 });
      expect(rgbToHsv({ r: 0, g: 255, b: 0 })).toEqual({ h: 120, s: 100, v: 100 });
      expect(rgbToHsv({ r: 0, g: 0, b: 255 })).toEqual({ h: 240, s: 100, v: 100 });
      expect(rgbToHsv({ r: 255, g: 255, b: 255 })).toEqual({ h: 0, s: 0, v: 100 });
      expect(rgbToHsv({ r: 0, g: 0, b: 0 })).toEqual({ h: 0, s: 0, v: 0 });
    });

    it('should handle edge cases', () => {
      expect(rgbToHsv({ r: 128, g: 128, b: 128 })).toEqual({ h: 0, s: 0, v: 50 });
    });

    it('should throw error for invalid input', () => {
      expect(() => rgbToHsv('invalid' as any)).toThrow('Input must be an object');
      expect(() => rgbToHsv({ r: 'invalid', g: 0, b: 0 } as any)).toThrow('RGB values must be numbers');
      expect(() => rgbToHsv({ r: -1, g: 0, b: 0 })).toThrow('RGB values must be between 0 and 255');
      expect(() => rgbToHsv({ r: 0, g: 256, b: 0 })).toThrow('RGB values must be between 0 and 255');
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
      it(`should convert RGB ${JSON.stringify(rgb)} to HSV and back correctly`, () => {
        const hsv = rgbToHsv(rgb);
        const convertedRgb = hsvToRgb(hsv);

        // Use a tolerance for floating-point comparisons
        expect(convertedRgb.r).toBeCloseTo(rgb.r, 0);
        expect(convertedRgb.g).toBeCloseTo(rgb.g, 0);
        expect(convertedRgb.b).toBeCloseTo(rgb.b, 0);
      });
    });
  });
});
