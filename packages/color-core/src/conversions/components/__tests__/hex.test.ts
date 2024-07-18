import { RGB } from '../../../types';
import { hexToRgb, rgbToHex } from '../hex';

describe('Hex <-> RGB Conversions', () => {
  describe('rgbToHex', () => {
    it('should convert RGB to hex correctly', () => {
      expect(rgbToHex({ r: 255, g: 0, b: 0 })).toBe('#ff0000');
      expect(rgbToHex({ r: 0, g: 255, b: 0 })).toBe('#00ff00');
      expect(rgbToHex({ r: 0, g: 0, b: 255 })).toBe('#0000ff');
      expect(rgbToHex({ r: 255, g: 255, b: 255 })).toBe('#ffffff');
      expect(rgbToHex({ r: 0, g: 0, b: 0 })).toBe('#000000');
    });

    it('should handle alpha channel correctly', () => {
      expect(rgbToHex({ r: 255, g: 0, b: 0, a: 0.5 }, true)).toBe('#ff000080');
      expect(rgbToHex({ r: 0, g: 255, b: 0, a: 1 }, true)).toBe('#00ff00fe');
      expect(rgbToHex({ r: 0, g: 0, b: 255, a: 0 }, true)).toBe('#0000ff01');
    });

    it('should throw error for invalid input', () => {
      expect(() => rgbToHex('invalid' as any)).toThrow('Input must be an object');
      expect(() => rgbToHex({ r: 'invalid', g: 0, b: 0 } as any)).toThrow('RGB values must be numbers');
      expect(() => rgbToHex({ r: -1, g: 0, b: 0 })).toThrow('RGB values must be between 0 and 255');
      expect(() => rgbToHex({ r: 0, g: 0, b: 0, a: 2 }, true)).toThrow('Alpha value must be a number between 0 and 1');
    });
  });

  describe('hexToRgb', () => {
    it('should convert hex to RGB correctly', () => {
      expect(hexToRgb('#ff0000')).toEqual({ r: 255, g: 0, b: 0 });
      expect(hexToRgb('#00ff00')).toEqual({ r: 0, g: 255, b: 0 });
      expect(hexToRgb('#0000ff')).toEqual({ r: 0, g: 0, b: 255 });
      expect(hexToRgb('#ffffff')).toEqual({ r: 255, g: 255, b: 255 });
      expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 });
    });

    it('should handle short hex format', () => {
      expect(hexToRgb('#f00')).toEqual({ r: 255, g: 0, b: 0 });
      expect(hexToRgb('#0f0')).toEqual({ r: 0, g: 255, b: 0 });
      expect(hexToRgb('#00f')).toEqual({ r: 0, g: 0, b: 255 });
    });

    it('should handle alpha channel correctly', () => {
      expect(hexToRgb('#ff0000ff')).toEqual({ r: 255, g: 0, b: 0, a: 1 });
      expect(hexToRgb('#00ff0080')).toEqual({ r: 0, g: 255, b: 0, a: 0.502 });
      expect(hexToRgb('#0000ff00')).toEqual({ r: 0, g: 0, b: 255, a: 0 });
    });

    it('should throw error for invalid input', () => {
      expect(() => hexToRgb(123 as any)).toThrow('Input must be a string');
      expect(() => hexToRgb('#gggggg')).toThrow('Invalid hex color format');
      expect(() => hexToRgb('#12345')).toThrow('Invalid hex color format');
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
    ];

    testCases.forEach((rgb) => {
      it(`should convert RGB ${JSON.stringify(rgb)} to hex and back correctly`, () => {
        const hex = rgbToHex(rgb);
        const convertedRgb = hexToRgb(hex);
        expect(convertedRgb).toEqual(rgb);
      });
    });

    const alphaTestCases: RGB[] = [
      { r: 255, g: 0, b: 0, a: 1 },
      { r: 0, g: 255, b: 0, a: 0.5 },
      { r: 0, g: 0, b: 255, a: 0 },
    ];

    alphaTestCases.forEach((rgb) => {
      it(`should convert RGB with alpha ${JSON.stringify(rgb)} to hex and back correctly`, () => {
        const hex = rgbToHex(rgb, true);
        const convertedRgb = hexToRgb(hex);
        expect(convertedRgb.r).toEqual(rgb.r);
        expect(convertedRgb.g).toEqual(rgb.g);
        expect(convertedRgb.b).toEqual(rgb.b);
        expect(convertedRgb.a).toBeCloseTo(rgb.a!, 2);
      });
    });
  });
});
