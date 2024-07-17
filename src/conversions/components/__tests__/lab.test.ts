import { LAB, RGB, XYZ } from '../../../types';
import { labToRgb, labToXyz, rgbToLab, xyzToLab } from '../lab';

describe('LAB <-> RGB Conversions', () => {
  const testCases: [RGB, LAB][] = [
    [{ r: 255, g: 0, b: 0 }, { l: 53.23, a: 80.09, b: 67.20 }],
    [{ r: 0, g: 255, b: 0 }, { l: 87.74, a: -86.18, b: 83.18 }],
    [{ r: 0, g: 0, b: 255 }, { l: 32.30, a: 79.19, b: -107.86 }],
    [{ r: 255, g: 255, b: 255 }, { l: 100.00, a: 0.00, b: 0.00 }],
    [{ r: 0, g: 0, b: 0 }, { l: 0.00, a: 0.00, b: 0.00 }],
    [{ r: 128, g: 128, b: 128 }, { l: 53.59, a: 0.00, b: 0.00 }],
  ];

  describe('rgbToLab', () => {
    test.each(testCases)('converts RGB %j to LAB %j', (rgb, expectedLab) => {
      const result = rgbToLab(rgb);
      expect(result.l).toBeCloseTo(expectedLab.l, 1);
      expect(result.a).toBeCloseTo(expectedLab.a, 1);
      expect(result.b).toBeCloseTo(expectedLab.b, 1);
    });

    it('handles fractional RGB values', () => {
      const rgb: RGB = { r: 45.75, g: 180.5, b: 250.25 };
      const result = rgbToLab(rgb);
      expect(result).toEqual(expect.any(Object));
      expect(result.l).toBeCloseTo(69.7, 1);
      expect(result.a).toBeCloseTo(-11.62, 1);
      expect(result.b).toBeCloseTo(-44.4, 1);
    });
  });

  describe('labToRgb', () => {
    test.each(testCases)('converts LAB %j to RGB %j', (expectedRgb, lab) => {
      const result = labToRgb(lab);
      expect(result.r).toBeCloseTo(expectedRgb.r, 0);
      expect(result.g).toBeCloseTo(expectedRgb.g, 0);
      expect(result.b).toBeCloseTo(expectedRgb.b, 0);
    });

    it('handles out-of-gamut colors', () => {
      const lab: LAB = { l: 50, a: 100, b: -100 };
      const result = labToRgb(lab);
      expect(result.r).toBeGreaterThanOrEqual(0);
      expect(result.r).toBeLessThanOrEqual(255);
      expect(result.g).toBeGreaterThanOrEqual(0);
      expect(result.g).toBeLessThanOrEqual(255);
      expect(result.b).toBeGreaterThanOrEqual(0);
      expect(result.b).toBeLessThanOrEqual(255);
    });
  });

  describe('Bidirectional Conversion', () => {
    test.each(testCases)('RGB to LAB to RGB: %j', (rgb) => {
      const lab = rgbToLab(rgb);
      const result = labToRgb(lab);
      expect(result.r).toBeCloseTo(rgb.r, 0);
      expect(result.g).toBeCloseTo(rgb.g, 0);
      expect(result.b).toBeCloseTo(rgb.b, 0);
    });

    it('handles random RGB values', () => {
      for (let i = 0; i < 100; i++) {
        const rgb: RGB = {
          r: Math.floor(Math.random() * 256),
          g: Math.floor(Math.random() * 256),
          b: Math.floor(Math.random() * 256)
        };
        const lab = rgbToLab(rgb);
        const result = labToRgb(lab);

        // Check if the result is within ±1 of the original value
        expect(result.r).toBeCloseTo(rgb.r, -.5);
        expect(result.g).toBeCloseTo(rgb.g, -.5);
        expect(result.b).toBeCloseTo(rgb.b, -.5);
      }
    });

    // Constants for white points and other values
    const D50 = { x: 0.9642, y: 1.0000, z: 0.8251 };
    const D65 = { x: 0.95047, y: 1.00000, z: 1.08883 };
    const epsilon = 0.008856;
    const kappa = 903.3;

    describe('xyzToLab', () => {
      test('converts XYZ to LAB correctly with D65 white point', () => {
        const xyz: XYZ = { x: 0.4124564, y: 0.3575761, z: 0.1804375, whitePoint: 'D65' };
        const result = xyzToLab(xyz);
        expect(result).toEqual({
          l: expect.any(Number),
          a: expect.any(Number),
          b: expect.any(Number),
        });
        expect(result.l).toBeCloseTo(66.33, 1);
        expect(result.a).toBeCloseTo(23.64, 1);
        expect(result.b).toBeCloseTo(32.100, 1);
      });

      test('converts XYZ to LAB correctly with D50 white point', () => {
        const xyz: XYZ = { x: 0.4360747, y: 0.3850649, z: 0.1430804, whitePoint: 'D50' };
        const result = xyzToLab(xyz, 'D50');
        expect(result).toEqual({
          l: expect.any(Number),
          a: expect.any(Number),
          b: expect.any(Number),
        });
        expect(result.l).toBeCloseTo(68.39, 1);
        expect(result.a).toBeCloseTo(20.03, 1);
        expect(result.b).toBeCloseTo(33.97, 1);
      });
    });

    describe('labToXyz', () => {
      test('converts LAB to XYZ correctly with D65 white point', () => {
        const lab: LAB = { l: 53.23288, a: 80.10933, b: 67.22006 };
        const result = labToXyz(lab);
        expect(result).toEqual({
          x: expect.any(Number),
          y: expect.any(Number),
          z: expect.any(Number),
          whitePoint: 'D65',
        });
        expect(result.x).toBeCloseTo(0.4124, 1);
        expect(result.y).toBeCloseTo(0.2125, 1);
        expect(result.z).toBeCloseTo(0.019, 1);
      });

      test('converts LAB to XYZ correctly with D50 white point', () => {
        const lab: LAB = { l: 53.23288, a: 80.10933, b: 67.22006 };
        const result = labToXyz(lab, 'D50');
        expect(result).toEqual({
          x: expect.any(Number),
          y: expect.any(Number),
          z: expect.any(Number),
          whitePoint: 'D50',
        });
        expect(result.x).toBeCloseTo(0.4180, 1);
        expect(result.y).toBeCloseTo(0.2125, 1);
        expect(result.z).toBeCloseTo(0.014, 1);
      });
    });


  });
});