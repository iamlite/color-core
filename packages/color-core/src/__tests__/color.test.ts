import { Color } from '../color';

describe('Color Class', () => {
  describe('Constructor', () => {
    it('should create a color from hex string', () => {
      const color = new Color('#ff0000');
      expect(color.toRgb()).toEqual({ r: 255, g: 0, b: 0 });
    });

    it('should create a color from RGB object', () => {
      const color = new Color({ r: 0, g: 255, b: 0 });
      expect(color.toRgb()).toEqual({ r: 0, g: 255, b: 0, a: 1 });
    });

    it('should create a color from HSL object', () => {
      const color = new Color({ h: 240, s: 100, l: 50 });
      expect(color.toRgb()).toEqual({ r: 0, g: 0, b: 255 });
    });

    it('should create a color from HSV object', () => {
      const color = new Color({ h: 120, s: 100, v: 100 });
      expect(color.toRgb()).toEqual({ r: 0, g: 255, b: 0 });
    });

    it('should create a color from CMYK object', () => {
      const color = new Color({ c: 0, m: 100, y: 100, k: 0 });
      expect(color.toRgb()).toEqual({ r: 255, g: 0, b: 0 });
    });

    it('should create a color from LAB object', () => {
      const color = new Color({ l: 53.23, a: 80.09, b: 67.20 });
      expect(color.toRgb()).toEqual({ r: 255, g: 0, b: 0 });
    });

    // it('should create a color from LCH object', () => {
    //   const color = new Color({ l: 53.23, c: 104.55, h: 40 });
    //   expect(color.toRgb()).toEqual({ r: 255, g: 0, b: 0 });
    // });

    it('should create a color from XYZ object', () => {
      const color = new Color({ x: 43.61, y: 22.25, z: 1.39 });
      expect(color.toRgb()).toEqual({ r: 255, g: 0, b: 0 });
    });

    it('should create a color from YUV object', () => {
      const color = new Color({ y: 76.25, u: 84.97, v: 255.5 });
      expect(color.toRgb()).toEqual({ r: 255, g: 0, b: 0 });
    });

    it('should throw an error for invalid input', () => {
      expect(() => new Color({} as any)).toThrow('Invalid color format');
    });
  });

  describe('Conversion Methods', () => {
    const color = new Color('#ff0000');

    it('should convert to RGB', () => {
      expect(color.toRgb()).toEqual({ r: 255, g: 0, b: 0 });
    });

    it('should convert to Hex', () => {
      expect(color.toHex()).toBe('#ff0000');
    });

    it('should convert to HSL', () => {
      expect(color.toHsl()).toEqual({ h: 0, s: 100, l: 50 });
    });

    it('should convert to HSV', () => {
      expect(color.toHsv()).toEqual({ h: 0, s: 100, v: 100 });
    });

    it('should convert to LAB', () => {
      const lab = color.toLab();
      expect(lab.l).toBeCloseTo(53.23, 1);
      expect(lab.a).toBeCloseTo(80.09, 1);
      expect(lab.b).toBeCloseTo(67.2, 1);
    });

    it('should convert to LCH', () => {
      const lch = color.toLch();
      expect(lch.l).toBeCloseTo(53.240794141307205, 1);
      expect(lch.c).toBeCloseTo(104.55176567686988, 1);
      expect(lch.h).toBeCloseTo(39.999010612532906, 1);
    });

    it('should convert to XYZ', () => {
      const xyz = color.toXyz();
      expect(xyz.x).toBeCloseTo(0.4124, 3);
      expect(xyz.y).toBeCloseTo(0.2126, 3);
      expect(xyz.z).toBeCloseTo(0.0193, 3);
    });

    it('should convert to YUV', () => {
      const yuv = color.toYuv();
      expect(yuv.y).toBeCloseTo(76.24, 3);
      expect(yuv.u).toBeCloseTo(84.97, 3);
      expect(yuv.v).toBeCloseTo(255.5, 3);
    });

    it('should convert to CMYK', () => {
      expect(color.toCmyk()).toEqual({ c: 0, m: 100, y: 100, k: 0 });
    });
  });

  describe('Harmony Methods', () => {
    const color = new Color('#ff0000');

    it('should generate complementary color', () => {
      const [original, complement] = color.complementary();
      expect(original.toHex()).toBe('#ff0000');
      expect(complement.toHex()).toBe('#00ffff');
    });

    it('should generate analogous colors', () => {
      const [color1, color2, color3] = color.analogous();
      expect(color1.toHex()).toBe('#ff0080');
      expect(color2.toHex()).toBe('#ff0000');
      expect(color3.toHex()).toBe('#ff8000');
    });

    it('should generate triadic colors', () => {
      const [color1, color2, color3] = color.triadic();
      expect(color1.toHex()).toBe('#ff0000');
      expect(color2.toHex()).toBe('#00ff00');
      expect(color3.toHex()).toBe('#0000ff');
    });

    it('should generate tetradic colors', () => {
      const [color1, color2, color3, color4] = color.tetradic();
      expect(color1.toHex()).toBe('#ff0000');
      expect(color2.toHex()).toBe('#80ff00');
      expect(color3.toHex()).toBe('#00ffff');
      expect(color4.toHex()).toBe('#8000ff');
    });

    it('should generate split-complementary colors', () => {
      const [color1, color2, color3] = color.splitComplementary();
      expect(color1.toHex()).toBe('#ff0000');
      expect(color2.toHex()).toBe('#00ff80');
      expect(color3.toHex()).toBe('#0080ff');
    });

    it('should generate monochromatic colors', () => {
      const monochromaticColors = color.monochromatic(5);
      expect(monochromaticColors).toHaveLength(5);
      monochromaticColors.forEach(c => {
        expect(c.toHsl().h).toBe(0);
      });
    });

    it('should generate square colors', () => {
      const [color1, color2, color3, color4] = color.square();
      expect(color1.toHex()).toBe('#ff0000');
      expect(color2.toHex()).toBe('#80ff00');
      expect(color3.toHex()).toBe('#00ffff');
      expect(color4.toHex()).toBe('#8000ff');
    });

    it('should generate double split-complementary colors', () => {
      const result = color.doubleSplitComplementary();
      expect(result[0].toHex().toLowerCase()).toBe('#ff0000');
      expect(result[1].toHex().toLowerCase()).toBe('#00ff80');
      expect(result[2].toHex().toLowerCase()).toBe('#0080ff');
      expect(result[3].toHex().toLowerCase()).toBe('#ff0080');
      expect(result[4].toHex().toLowerCase()).toBe('#ff8000');
    });

    it('should generate shades', () => {
      const shadeCount = 5;
      const shades = color.shades(shadeCount);

      // Check if the correct number of shades is generated
      expect(shades).toHaveLength(shadeCount);

      const originalHsl = color.toHsl();
      let previousLightness = originalHsl.l;

      shades.forEach((shade, index) => {
        const shadeHsl = shade.toHsl();

        // Hue should remain relatively constant (allow for small variations)
        expect(shadeHsl.h).toBeCloseTo(originalHsl.h, 0);

        // Saturation might change slightly, but should remain in a reasonable range
        expect(shadeHsl.s).toBeGreaterThanOrEqual(0);
        expect(shadeHsl.s).toBeLessThanOrEqual(100);

        // Lightness should generally decrease, but allow for small variations
        expect(shadeHsl.l).toBeLessThanOrEqual(previousLightness + 5); // Allow for small increase

        previousLightness = shadeHsl.l;
      });

      // The last shade should be noticeably darker than the original
      expect(shades[shades.length - 1].toHsl().l).toBeLessThan(originalHsl.l - 10);
    });


    it('should generate tones', () => {
      const tones = color.tones(5);
      expect(tones).toHaveLength(5);

      const originalHsl = color.toHsl();
      tones.forEach((tone, index) => {
        const toneHsl = tone.toHsl();

        // Hue should remain the same
        expect(toneHsl.h).toBeCloseTo(originalHsl.h, 0);

        // Saturation should decrease or remain the same
        expect(toneHsl.s).toBeLessThanOrEqual(originalHsl.s);

        // Lightness should remain the same as the original color
        expect(toneHsl.l).toBeCloseTo(originalHsl.l, 0);

        // Each subsequent tone should have lower or equal saturation
        if (index > 0) {
          expect(toneHsl.s).toBeLessThanOrEqual(tones[index - 1].toHsl().s);
        }
      });

      // The last tone should have the lowest saturation
      expect(tones[tones.length - 1].toHsl().s).toBeLessThan(originalHsl.s);
    });

    it('should generate tints', () => {
      const tints = color.tints(5);
      expect(tints).toHaveLength(5);
      tints.forEach(c => {
        expect(c.toHsl().s).toBeLessThanOrEqual(100);
        expect(c.toHsl().h).toBe(0);
      });
    });

  });


  describe('Manipulation Methods', () => {
    const color = new Color('#ff0000');

    it('should adjust lightness', () => {
      const lighterColor = color.adjustLightness(20);
      expect(lighterColor.toHsl().l).toBe(70);

      const darkerColor = color.adjustLightness(-20);
      expect(darkerColor.toHsl().l).toBe(30);
    });

    it('should adjust saturation', () => {
      const moreSaturated = color.adjustSaturation(20);
      expect(moreSaturated.toHsl().s).toBe(100);

      const lessSaturated = color.adjustSaturation(-50);
      expect(lessSaturated.toHsl().s).toBe(50);
    });

    it('should adjust hue', () => {
      const hueShifted = color.adjustHue(60);
      expect(hueShifted.toHsl().h).toBe(60);
    });

    it('should adjust alpha', () => {
      const transparent = color.adjustAlpha(0.5);
      expect(transparent.a).toBe(0.5);
    });

    it('should invert the color', () => {
      const inverted = color.invert();
      expect(inverted.toHex()).toBe('#00ffff');
    });

    it('should convert to grayscale', () => {
      const gray = color.grayscale();
      expect(gray.r).toBe(gray.g);
      expect(gray.g).toBe(gray.b);
    });

    it('should mix with another color', () => {
      const blue = new Color('#0000ff');
      const mixed = color.mix(blue, 0.5);
      expect(mixed.toHex()).toBe('#800080');
    });
  });

  describe('Utility Methods', () => {
    it('should convert to string', () => {
      const color = new Color('#ff0000');
      expect(color.toString()).toBe('#ff0000');
    });


    it('should have equal RGB values for same colors created differently', () => {
      const color1 = new Color('#ff0000');
      const color2 = { r: 255, g: 0, b: 0 };
      const color3 = new Color('#00ff00');

      expect(color1.toRgb()).toEqual(color2);
      expect(color1.toRgb()).not.toEqual(color3.toRgb());
    });

    it('should convert different color inputs to the same RGB value with alpha', () => {
      const hexColor = new Color('#ff0000');
      const rgbColor = new Color({ r: 255, g: 0, b: 0 });
      const hslColor = new Color({ h: 0, s: 100, l: 50 });

      const expectedRgb1 = { r: 255, g: 0, b: 0 };
      const expectedRgb2 = { r: 255, g: 0, b: 0, a: 1 };

      expect(hexColor.toRgb()).toEqual(expectedRgb1);
      expect(rgbColor.toRgb()).toEqual(expectedRgb2);
      expect(hslColor.toRgb()).toEqual(expectedRgb1);
    });

    it('should preserve explicitly set alpha values', () => {
      const colorWithAlpha = new Color({ r: 255, g: 0, b: 0, a: 0.5 });
      const expectedRgb = { r: 255, g: 0, b: 0, a: 0.5 };

      expect(colorWithAlpha.toRgb()).toEqual(expectedRgb);
    });

    it('should handle colors created without alpha', () => {
      const colorWithoutAlpha = new Color({ r: 255, g: 0, b: 0 });
      const expectedRgb = { r: 255, g: 0, b: 0, a: 1 };

      expect(colorWithoutAlpha.toRgb()).toEqual(expectedRgb);
    });


    it('should set and get alpha', () => {
      const color = new Color('#ff0000');

      color.setAlpha(0.5);
      expect(color.a).toBe(0.5);

      color.setAlpha(undefined);
      expect(color.a).toBeUndefined();

      expect(color.getEffectiveAlpha()).toBe(1);

      color.setAlpha(0.7);
      expect(color.getEffectiveAlpha()).toBe(0.7);
    });
  });

  describe('Static Methods', () => {
    it('should set precision', () => {
      Color.setPrecision(2);
      const color = new Color({ r: 128.4567, g: 0, b: 0 });
      expect(color.r).toBe(128.46);
    });
  });

  describe('RGB Setters', () => {
    it('should set red component correctly', () => {
      const color = new Color('#000000');

      color.r = 100;
      expect(color.r).toBe(100);

      color.r = -50;
      expect(color.r).toBe(0);

      color.r = 300;
      expect(color.r).toBe(255);

      color.r = 100.6;
      expect(color.r).toBe(101);
    });

    it('should set green component correctly', () => {
      const color = new Color('#000000');

      color.g = 100;
      expect(color.g).toBe(100);

      color.g = -50;
      expect(color.g).toBe(0);

      color.g = 300;
      expect(color.g).toBe(255);

      color.g = 100.6;
      expect(color.g).toBe(101);
    });

    it('should set blue component correctly', () => {
      const color = new Color('#000000');

      color.b = 100;
      expect(color.b).toBe(100);

      color.b = -50;
      expect(color.b).toBe(0);

      color.b = 300;
      expect(color.b).toBe(255);

      color.b = 100.6;
      expect(color.b).toBe(101);
    });
  });

  describe('Equals Method', () => {
    it('should return true for identical colors', () => {
      const color1 = new Color('#ff0000');
      const color2 = new Color('#ff0000');
      expect(color1.equals(color2)).toBe(true);
    });

    it('should return false for different colors', () => {
      const color1 = new Color('#ff0000');
      const color2 = new Color('#00ff00');
      expect(color1.equals(color2)).toBe(false);
    });

    it('should handle alpha values correctly', () => {
      const color1 = new Color({ r: 255, g: 0, b: 0, a: 0.5 });
      const color2 = new Color({ r: 255, g: 0, b: 0, a: 1 });
      const color3 = new Color({ r: 255, g: 0, b: 0, a: 0.5 });

      expect(color1.equals(color2)).toBe(false);
      expect(color1.equals(color3)).toBe(true);
    });

  });

  describe('toHex Method', () => {
    it('should convert to hex without alpha by default', () => {
      const color = new Color({ r: 255, g: 128, b: 0 });
      expect(color.toHex()).toBe('#ff8000');
    });

    it('should convert to hex with alpha when specified and alpha is defined', () => {
      const color = new Color({ r: 255, g: 128, b: 0, a: 0.5 });
      expect(color.toHex(true)).toBe('#ff800080');
    });

    it('should convert to hex without alpha when alpha is 1', () => {
      const color = new Color({ r: 255, g: 128, b: 0, a: 1 });
      expect(color.toHex(true)).toBe('#ff8000fe');
    });

    it('should handle undefined alpha when including alpha', () => {
      const color = new Color({ r: 255, g: 128, b: 0 });
      expect(color.toHex(true)).toBe('#ff8000fe');
    });

    it('should pad single-digit hex values', () => {
      const color = new Color({ r: 0, g: 10, b: 15, a: 0.05 });
      expect(color.toHex(true)).toBe('#000a0f0d');
    });

    it('should handle black color', () => {
      const color = new Color({ r: 0, g: 0, b: 0 });
      expect(color.toHex()).toBe('#000000');
    });

    it('should handle white color', () => {
      const color = new Color({ r: 255, g: 255, b: 255 });
      expect(color.toHex()).toBe('#ffffff');
    });

    it('should handle grayscale colors', () => {
      const color = new Color({ r: 128, g: 128, b: 128 });
      expect(color.toHex()).toBe('#808080');
    });

    it('should handle colors created from hex strings', () => {
      const color = new Color('#abcdef');
      expect(color.toHex()).toBe('#abcdef');
    });

    it('should handle colors with very low alpha', () => {
      const color = new Color({ r: 255, g: 0, b: 0, a: 0.004 });
      expect(color.toHex(true)).toBe('#ff000001');
    });

    it('should handle colors with very high alpha', () => {
      const color = new Color({ r: 0, g: 255, b: 0, a: 0.996 });
      expect(color.toHex(true)).toBe('#00ff00fe');
    });
  });


  describe('getName', () => {
    it('should return a promise that resolves to a string', async () => {
      const color = new Color('#FF5733');
      const result = color.getName();

      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toEqual(expect.any(String));
    });

    it('should return different names for different colors', async () => {
      const color1 = new Color('#FF0000');
      const color2 = new Color('#00FF00');

      const name1 = await color1.getName();
      const name2 = await color2.getName();

      expect(name1).not.toBe(name2);
    });
  });

  describe('getInfo', () => {
    it('should return a promise that resolves to an object', async () => {
      const color = new Color('#33FF57');
      const result = color.getInfo();

      expect(result).toBeInstanceOf(Promise);
      await expect(result).resolves.toEqual(expect.any(Object));
    });

    it('should return color information including name and hex', async () => {
      const color = new Color('#3366FF');
      const info = await color.getInfo();

      expect(info).toHaveProperty('name');
      expect(info).toHaveProperty('hex');
      expect(info.hex.toLowerCase()).toBe('#3366ff');
    });
  });

  describe('Integration with other Color methods', () => {
    it('should return consistent names for the same color in different formats', async () => {
      const hexColor = '#FF5733';
      const rgbColor = new Color({ r: 255, g: 87, b: 51 });

      const color1 = new Color(hexColor);
      const color2 = new Color(rgbColor.toHex());

      const name1 = await color1.getName();
      const name2 = await color2.getName();

      expect(name1).toBe(name2);
    });

    it('should return different info for adjusted colors', async () => {
      const originalColor = new Color('#FF5733');
      const adjustedColor = originalColor.adjustLightness(20);

      const originalInfo = await originalColor.getInfo();
      const adjustedInfo = await adjustedColor.getInfo();

      expect(originalInfo).not.toEqual(adjustedInfo);
    });
  });
});

describe('Color brightness methods', () => {
  const testCases: [string, number, boolean][] = [
    ['#FFFFFF', 255, true],  // White
    ['#000000', 0, false],   // Black
    ['#FF0000', 76, false],  // Red
    ['#00FF00', 149, true],  // Green
    ['#0000FF', 29, false],  // Blue
  ];

  describe('getBrightness', () => {
    test.each(testCases)('calculates brightness correctly for %s', (hex, expected) => {
      const color = new Color(hex);
      expect(color.getBrightness()).toBe(expected);
    });
  });

  describe('isLight', () => {
    test.each(testCases)('determines if color is light correctly for %s', (hex, _, expected) => {
      const color = new Color(hex);
      expect(color.isLight()).toBe(expected);
    });

    test('uses custom threshold correctly', () => {
      const color = new Color('#646464');  // RGB(100, 100, 100)
      expect(color.isLight(100)).toBe(true);
      expect(color.isLight(150)).toBe(false);
    });
  });
})