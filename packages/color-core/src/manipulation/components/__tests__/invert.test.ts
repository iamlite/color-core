import { Color } from '../../../color';
import { invert } from '../invert';

describe('invert', () => {
    it('should invert the RGB values of a color', () => {
        const color = new Color({ r: 128, g: 128, b: 128, a: 1 });
        const inverted = invert(color);
        expect(inverted.toRgb()).toEqual({ r: 127, g: 127, b: 127, a: 1 });
    });

    it('should handle colors with alpha values', () => {
        const color = new Color({ r: 128, g: 128, b: 128, a: 0.5 });
        const inverted = invert(color);
        expect(inverted.toRgb()).toEqual({ r: 127, g: 127, b: 127, a: 0.5 });
    });

    it('should handle colors with zero RGB values', () => {
        const color = new Color({ r: 0, g: 0, b: 0, a: 1 });
        const inverted = invert(color);
        expect(inverted.toRgb()).toEqual({ r: 255, g: 255, b: 255, a: 1 });
    });

    it('should handle colors with maximum RGB values', () => {
        const color = new Color({ r: 255, g: 255, b: 255, a: 1 });
        const inverted = invert(color);
        expect(inverted.toRgb()).toEqual({ r: 0, g: 0, b: 0, a: 1 });
    });
});