import { Color } from '../../../color';
import { adjustAlpha } from '../alpha';

describe('adjustAlpha', () => {
    it('should adjust the alpha while keeping RGB components intact', () => {
        const color = new Color({ r: 100, g: 150, b: 200, a: 0.5 });
        const adjustedColor = adjustAlpha(color, 0.8);
        expect(adjustedColor.toRgb()).toEqual({ r: 100, g: 150, b: 200, a: 0.8 });
    });

    it('should handle very small non-zero alpha values', () => {
        const color = new Color({ r: 100, g: 150, b: 200, a: 0.5 });
        const adjustedColor = adjustAlpha(color, 0.00001);
        expect(adjustedColor.toRgb().a).toBeCloseTo(0.00001);
    });

    it('should handle very high almost-one alpha values', () => {
        const color = new Color({ r: 100, g: 150, b: 200, a: 0.5 });
        const adjustedColor = adjustAlpha(color, 0.99999);
        expect(adjustedColor.toRgb().a).toBeCloseTo(0.99999);
    });

    it('should handle non-numeric inputs gracefully', () => {
        const color = new Color({ r: 100, g: 150, b: 200, a: 0.5 });
        // Test with a string that incorrectly mimics a number
        const adjustedColor = adjustAlpha(color, "0.8" as any);
        // Expect no change since the input was invalid
        expect(adjustedColor.toRgb().a).toBe(0.5);
    });

});
