import { Color } from '../../../color';
import { adjustSaturation } from '../saturation';

describe('adjustSaturation', () => {
    it('should increase the saturation of a color', () => {
        const color = new Color({ h: 180, s: 50, l: 50 }); // Some mid-range color
        const adjustedColor = adjustSaturation(color, 20);
        expect(adjustedColor.toHsl().s).toBe(70); // Increased by 20
    });

    it('should decrease the saturation of a color', () => {
        const color = new Color({ h: 180, s: 50, l: 50 });
        const adjustedColor = adjustSaturation(color, -30);
        expect(adjustedColor.toHsl().s).toBe(20); // Decreased by 30
    });

    it('should not allow saturation to exceed 100', () => {
        const color = new Color({ h: 180, s: 90, l: 50 });
        const adjustedColor = adjustSaturation(color, 20); // Attempt to increase beyond 100
        expect(adjustedColor.toHsl().s).toBe(100); // Should clamp at 100
    });

    it('should not allow saturation to drop below 0', () => {
        const color = new Color({ h: 180, s: 10, l: 50 });
        const adjustedColor = adjustSaturation(color, -20); // Attempt to decrease below 0
        expect(adjustedColor.toHsl().s).toBe(0); // Should clamp at 0
    });

    it('should return the same color when the adjustment amount is zero', () => {
        const color = new Color({ h: 180, s: 50, l: 50 });
        const adjustedColor = adjustSaturation(color, 0); // No change
        expect(adjustedColor.toHsl().s).toBe(50);
    });
});
