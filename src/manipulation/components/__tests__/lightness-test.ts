import { Color } from '../../../color';
import { adjustLightness } from '../lightness';

describe('adjustLightness function', () => {
    it('should adjust lightness by a positive amount', () => {
        const color = new Color('#ff0000');
        const adjustedColor = adjustLightness(color, 20);

    });

    it('should adjust lightness by a negative amount', () => {
        const color = new Color('#00ff00');
        const adjustedColor = adjustLightness(color, -20);
        expect(adjustedColor.toHex().toLowerCase()).toBe('#009900');
    });

    it('should not change the color when adjusting lightness by 0', () => {
        const color = new Color('#0000ff');
        const adjustedColor = adjustLightness(color, 0);
        expect(adjustedColor.toHex().toLowerCase()).toBe('#0000ff');
    });
});