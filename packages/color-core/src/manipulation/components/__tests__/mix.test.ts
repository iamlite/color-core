import { Color } from '../../../color';
import { mix } from '../mix';

describe('mix', () => {
    it('should correctly mix two colors with equal proportion', () => {
        const color1 = new Color({ r: 255, g: 0, b: 0 });
        const color2 = new Color({ r: 0, g: 0, b: 255 });
        const mixedColor = mix(color1, color2, 0.5);
        expect(mixedColor.toRgb()).toEqual({ r: 128, g: 0, b: 128, a: 1 });
    });

    it('should return the first color when amount is 0', () => {
        const color1 = new Color({ r: 255, g: 0, b: 0 });
        const color2 = new Color({ r: 0, g: 255, b: 0 });
        const mixedColor = mix(color1, color2, 0);
        expect(mixedColor.toRgb()).toEqual({ r: 255, g: 0, b: 0, a: 1 });
    });

    it('should return the second color when amount is 1', () => {
        const color1 = new Color({ r: 255, g: 0, b: 0 });
        const color2 = new Color({ r: 0, g: 255, b: 0 });
        const mixedColor = mix(color1, color2, 1);
        expect(mixedColor.toRgb()).toEqual({ r: 0, g: 255, b: 0, a: 1 });
    });

    it('should correctly handle fractional mixing', () => {
        const color1 = new Color({ r: 200, g: 0, b: 0 });
        const color2 = new Color({ r: 0, g: 100, b: 0 });
        const mixedColor = mix(color1, color2, 0.25);
        expect(mixedColor.toRgb()).toEqual({ r: 150, g: 25, b: 0, a: 1 });
    });

    it('should include alpha of 1 when mixing colors without explicit alpha', () => {
        const color1 = new Color({ r: 255, g: 0, b: 0 });
        const color2 = new Color({ r: 0, g: 255, b: 0 });
        const mixedColor = mix(color1, color2, 0.5);
        expect(mixedColor.toRgb().a).toBe(1);
    });

    it('should correctly mix alpha values when both colors have alpha', () => {
        const color1 = new Color({ r: 255, g: 0, b: 0, a: 0.5 });
        const color2 = new Color({ r: 0, g: 255, b: 0, a: 1 });
        const mixedColor = mix(color1, color2, 0.5);
        expect(mixedColor.toRgb().a).toBeCloseTo(0.75, 2);
    });

    it('should treat undefined alpha as 1 when mixing with a color that has alpha', () => {
        const color1 = new Color({ r: 255, g: 0, b: 0 });
        const color2 = new Color({ r: 0, g: 255, b: 0, a: 0.5 });
        const mixedColor = mix(color1, color2, 0.5);
        expect(mixedColor.toRgb().a).toBeCloseTo(0.75, 2);
    });

    it('should handle invalid amount values by using 0', () => {
        const color1 = new Color({ r: 255, g: 0, b: 0 });
        const color2 = new Color({ r: 0, g: 255, b: 0 });
        const mixedColor = mix(color1, color2, NaN);
        expect(mixedColor.toRgb()).toEqual({ r: 255, g: 0, b: 0, a: 1 });
    });

    it('should clamp amount values to the range [0, 1]', () => {
        const color1 = new Color({ r: 255, g: 0, b: 0 });
        const color2 = new Color({ r: 0, g: 255, b: 0 });
        expect(mix(color1, color2, -0.5).toRgb()).toEqual({ r: 255, g: 0, b: 0, a: 1 });
        expect(mix(color1, color2, 1.5).toRgb()).toEqual({ r: 0, g: 255, b: 0, a: 1 });
    });

    it('should mix colors when only the first color has alpha', () => {
        const color1 = new Color({ r: 255, g: 0, b: 0, a: 0.5 });
        const color2 = new Color({ r: 0, g: 255, b: 0 });
        const mixedColor = mix(color1, color2, 0.5);
        expect(mixedColor.toRgb()).toEqual({ r: 128, g: 128, b: 0, a: 0.75 });
    });

    it('should mix colors when only the second color has alpha', () => {
        const color1 = new Color({ r: 255, g: 0, b: 0 });
        const color2 = new Color({ r: 0, g: 255, b: 0, a: 0.5 });
        const mixedColor = mix(color1, color2, 0.5);
        expect(mixedColor.toRgb()).toEqual({ r: 128, g: 128, b: 0, a: 0.75 });
    });

    it('should mix colors with different alpha values', () => {
        const color1 = new Color({ r: 255, g: 0, b: 0, a: 0.3 });
        const color2 = new Color({ r: 0, g: 255, b: 0, a: 0.7 });
        const mixedColor = mix(color1, color2, 0.5);
        expect(mixedColor.toRgb()).toEqual({ r: 128, g: 128, b: 0, a: 0.5 });
    });

    it('should handle alpha mixing with extreme amount values', () => {
        const color1 = new Color({ r: 255, g: 0, b: 0, a: 0.2 });
        const color2 = new Color({ r: 0, g: 255, b: 0, a: 0.8 });
        expect(mix(color1, color2, 0).toRgb().a).toBeCloseTo(0.2, 2);
        expect(mix(color1, color2, 1).toRgb().a).toBeCloseTo(0.8, 2);
    });

    it('should use default alpha 1 when both colors have undefined alpha', () => {
        const color1 = new Color({ r: 255, g: 0, b: 0 });
        const color2 = new Color({ r: 0, g: 255, b: 0 });
        // Explicitly set alpha to undefined
        (color1 as any)._rgb.a = undefined;
        (color2 as any)._rgb.a = undefined;

        const mixedColor = mix(color1, color2, 0.5);
        expect(mixedColor.toRgb()).toEqual({ r: 128, g: 128, b: 0, a: 1 });
    });

    it('should use default alpha 1 for undefined alpha when mixing with a color that has alpha', () => {
        const color1 = new Color({ r: 255, g: 0, b: 0 });
        const color2 = new Color({ r: 0, g: 255, b: 0, a: 0.5 });
        // Explicitly set alpha to undefined for color1
        (color1 as any)._rgb.a = undefined;

        const mixedColor = mix(color1, color2, 0.5);
        expect(mixedColor.toRgb()).toEqual({ r: 128, g: 128, b: 0, a: 0.75 });
    });

    it('should handle mixing when one color has alpha 0 and the other has undefined alpha', () => {
        const color1 = new Color({ r: 255, g: 0, b: 0, a: 0 });
        const color2 = new Color({ r: 0, g: 255, b: 0 });
        // Explicitly set alpha to undefined for color2
        (color2 as any)._rgb.a = undefined;

        const mixedColor = mix(color1, color2, 0.5);
        expect(mixedColor.toRgb()).toEqual({ r: 128, g: 128, b: 0, a: 0.5 });
    });

});