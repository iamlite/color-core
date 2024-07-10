import { Color } from '../../../color';
import { adjustHue } from '../hue';

describe('adjustHue', () => {
    it('should correctly increase the hue by a given amount', () => {
        const color = new Color('#00ff00'); // Green with hue at 120°
        const adjustedColor = adjustHue(color, 180); // Adding 180° should result in purple
        expect(adjustedColor.toHex().toLowerCase()).toBe('#ff00ff');
    });

    it('should correctly decrease the hue by a given amount', () => {
        const color = new Color('#00ff00'); // Green with hue at 120°
        const adjustedColor = adjustHue(color, -120);
        expect(adjustedColor.toHex().toLowerCase()).toBe('#ff0000'); // Should wrap to Red at 0°
    });

    it('should handle hue adjustments that exceed 360 degrees', () => {
        const color = new Color('#ff0000'); // Red with hue at 0°
        const adjustedColor = adjustHue(color, 720); // Adding 720° should result in no change
        expect(adjustedColor.toHex().toLowerCase()).toBe('#ff0000');
    });

    it('should handle negative hue adjustments that exceed 360 degrees', () => {
        const color = new Color('#ff0000'); // Red
        const adjustedColor = adjustHue(color, -720); // Subtracting 720° should result in no change
        expect(adjustedColor.toHex().toLowerCase()).toBe('#ff0000');
    });

    it('should return the same color when the adjustment amount is zero', () => {
        const color = new Color('#00ff00'); // Green
        const adjustedColor = adjustHue(color, 0); // No change
        expect(adjustedColor.toHex().toLowerCase()).toBe('#00ff00');
    });
});
