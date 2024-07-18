import { constants } from '../constants';
import {
  calcMaxChromaHpluv,
  calculateBoundingLines,
  distanceFromOrigin,
  distanceFromOriginAngle,
  lchToLuv,
  lToY,
  luvToLch,
  luvToXyz,
  xyzToLuv,
  yToL
} from '../helpers';

describe('Color Conversion Tests', () => {
  test('lToY conversion for low lightness', () => {
    const l = 5;
    const expectedY = constants.refY * l / constants.kappa;
    expect(lToY(l)).toBeCloseTo(expectedY, 5);
  });

  test('lToY conversion for high lightness', () => {
    const l = 50;
    const expectedY = constants.refY * Math.pow((l + 16) / 116, 3);
    expect(lToY(l)).toBeCloseTo(expectedY, 5);
  });

  test('yToL conversion for low Y', () => {
    const y = 0.005;
    const expectedL = y * constants.kappa / constants.refY;
    expect(yToL(y)).toBeCloseTo(expectedL, 5);
  });

  test('yToL conversion for high Y', () => {
    const y = 0.1;
    const expectedL = 116 * Math.pow(y / constants.refY, 1 / 3) - 16;
    expect(yToL(y)).toBeCloseTo(expectedL, 5);
  });

  describe('distanceFromOrigin', () => {
    it('should calculate distance correctly', () => {
      expect(distanceFromOrigin(2, 3)).toBeCloseTo(1.3416, 4);
    });
  });

  describe('Distance from Origin Tests', () => {
    test('distanceFromOrigin for positive intercept', () => {
      const slope = 2;
      const intercept = 3;
      const expectedDistance = Math.abs(intercept) / Math.sqrt(Math.pow(slope, 2) + 1);
      expect(distanceFromOrigin(slope, intercept)).toBeCloseTo(expectedDistance);
    });

    test('distanceFromOrigin for negative intercept', () => {
      const slope = -1;
      const intercept = -4;
      const expectedDistance = Math.abs(intercept) / Math.sqrt(Math.pow(slope, 2) + 1);
      expect(distanceFromOrigin(slope, intercept)).toBeCloseTo(expectedDistance);
    });

    test('distanceFromOriginAngle for positive distance', () => {
      const slope = 1;
      const intercept = 2;
      const angle = Math.PI / 4;
      const expectedDistance = intercept / (Math.sin(angle) - slope * Math.cos(angle));
      if (expectedDistance > 0) {
        expect(distanceFromOriginAngle(slope, intercept, angle)).toBeCloseTo(expectedDistance, 5);
      } else {
        expect(distanceFromOriginAngle(slope, intercept, angle)).toBe(Infinity);
      }
    });

    test('distanceFromOriginAngle for negative distance', () => {
      const slope = 1;
      const intercept = -2;
      const angle = Math.PI / 4;
      const result = distanceFromOriginAngle(slope, intercept, angle);
      const expectedDistance = intercept / (Math.sin(angle) - slope * Math.cos(angle));
      expect(result).toBeCloseTo(expectedDistance, 5);
    });

    test('distanceFromOriginAngle for zero angle', () => {
      const slope = 1;
      const intercept = 2;
      const angle = 0;
      const result = distanceFromOriginAngle(slope, intercept, angle);
      expect(result).toBe(Infinity);
    });


    test('should return Infinity when the denominator is zero', () => {
      const slope = 1;
      const intercept = 1;
      const angle = Math.atan(1); // This makes sin(angle) - slope * cos(angle) = 0

      const result = distanceFromOriginAngle(slope, intercept, angle);
      expect(result).toBe(Infinity);
    });

    it('should return Infinity when d is negative', () => {
      const slope = -1;
      const intercept = -1;
      const angle = Math.atan(1); // This makes sin(angle) - slope * cos(angle) > 0 but d will be negative

      const result = distanceFromOriginAngle(slope, intercept, angle);
      expect(result).toBe(Infinity);
    });

    it('should return Infinity when the denominator is zero (angle causes denominator to be zero)', () => {
      const slope = 1;
      const intercept = 1;
      const angle = Math.PI / 4; // This makes sin(angle) - slope * cos(angle) = 0

      const result = distanceFromOriginAngle(slope, intercept, angle);
      expect(result).toBe(Infinity);
    });

    it('should return Infinity when the denominator is zero (angle causes denominator to be zero)', () => {
      const slope = 1;
      const intercept = 1;
      const angle = Math.PI / 4; // This makes sin(angle) - slope * cos(angle) = 0

      const result = distanceFromOriginAngle(slope, intercept, angle);
      expect(result).toBe(Infinity);
    });

    it('should handle cases where slope and angle cause zero denominator', () => {
      const slope = Math.tan(Math.PI / 4); // slope = 1, angle = 45 degrees, denominator = 0
      const intercept = 5;
      const angle = Math.PI / 4;

      const result = distanceFromOriginAngle(slope, intercept, angle);
      expect(result).toBe(Infinity);
    });

    it('should handle very small negative d values', () => {
      const slope = 1;
      const intercept = -1e-10; // Very small negative intercept
      const angle = Math.PI / 2; // angle = 90 degrees, denominator = 1

      const result = distanceFromOriginAngle(slope, intercept, angle);
      expect(result).toBe(Infinity);
    });

    it('should handle very small positive d values', () => {
      const slope = 1;
      const intercept = 1e-10; // Very small positive intercept
      const angle = Math.PI / 2; // angle = 90 degrees, denominator = 1

      const result = distanceFromOriginAngle(slope, intercept, angle);
      expect(result).toBeCloseTo(1e-10);
    });



    test('calcMaxChromaHpluv with valid lines', () => {
      const lines = [
        [0.5, 1],
        [0.5, 1],
        [0.5, 1],
        [0.5, 1],
        [0.5, 1],
        [0.5, 1]
      ];
      const result = calcMaxChromaHpluv(lines);
      const expectedValue = 0.89;
      expect(result).toBeCloseTo(expectedValue, 0);
    });

    test('calcMaxChromaHpluv with diverse lines', () => {
      const lines = [
        [1, 2],
        [-1, 1],
        [0.5, -1],
        [-0.5, 0.5],
        [0.3, 0.3],
        [-0.3, -0.3]
      ];
      const distances = lines.map(line => distanceFromOrigin(line[0], line[1]));
      const expectedValue = Math.min(...distances);
      const result = calcMaxChromaHpluv(lines);
      expect(result).toBeCloseTo(expectedValue, 5);
    });

    describe('luvToLch', () => {
      it('should convert LUV to LCH correctly', () => {
        const luv = { L: 50, u: 10, v: 20 };
        const lch = luvToLch(luv);
        expect(lch.l).toBe(50);
        expect(lch.c).toBeCloseTo(22.3607, 4);
        expect(lch.h).toBeCloseTo(63.4349, 4);
      });

      it('should handle zero chroma case', () => {
        const luv = { L: 50, u: 0, v: 0 };
        const lch = luvToLch(luv);
        expect(lch.l).toBe(50);
        expect(lch.c).toBe(0);
        expect(lch.h).toBe(0);
      });
    });

    it('should handle zero luminance case', () => {
      const xyz = { x: 0, y: 0, z: 0 };
      const luv = xyzToLuv(xyz);
      expect(luv).toEqual({ L: 0, u: 0, v: 0 });
    });
  });

  describe('lchToLuv', () => {
    it('should convert LCH to LUV correctly', () => {
      const lch = { l: 50, c: 20, h: 60 };
      const luv = lchToLuv(lch);
      expect(luv.L).toBe(50);
      expect(luv.u).toBeCloseTo(10.0, 4);
      expect(luv.v).toBeCloseTo(17.3205, 4);
    });
  });

  describe('xyzToLuv', () => {
    it('should convert XYZ to LUV correctly', () => {
      const xyz = { x: 0.2, y: 0.3, z: 0.4 };
      const luv = xyzToLuv(xyz);
      expect(luv.L).toBeCloseTo(61.6542, 4);
      expect(luv.u).toBeCloseTo(-49.88308, 4);
      expect(luv.v).toBeCloseTo(-8.570392, 4);
    });


    describe('luvToXyz', () => {
      it('should convert LUV to XYZ correctly', () => {
        const luv = { L: 50, u: 10, v: 20 };
        const xyz = luvToXyz(luv);
        expect(xyz.x).toBeCloseTo(0.17704, 4);
        expect(xyz.y).toBeCloseTo(0.18418, 4);
        expect(xyz.z).toBeCloseTo(0.12718, 4);
      });

      it('should handle zero luminance case', () => {
        const luv = { L: 0, u: 10, v: 20 };
        const xyz = luvToXyz(luv);
        expect(xyz).toEqual({ x: 0, y: 0, z: 0 });
      });
    });

    describe('calculateBoundingLines', () => {
      it('should handle case when sub1 is greater than epsilonlow', () => {
        const l = 50; // Lightness value that makes sub1 > epsilonlow
        const result = calculateBoundingLines(l);

        // Check the structure and type of the result
        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBe(6); // 2 lines per iteration, 3 iterations
        result.forEach(line => {
          expect(line).toBeInstanceOf(Array);
          expect(line.length).toBe(2);
          line.forEach(value => expect(typeof value).toBe('number'));
        });
      });

      it('should handle case when sub1 is less than or equal to epsilonlow', () => {
        const l = 1; // Lightness value that makes sub1 <= epsilonlow
        const result = calculateBoundingLines(l);

        // Check the structure and type of the result
        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBe(6); // 2 lines per iteration, 3 iterations
        result.forEach(line => {
          expect(line).toBeInstanceOf(Array);
          expect(line.length).toBe(2);
          line.forEach(value => expect(typeof value).toBe('number'));
        });
      });
    });



  });
});

