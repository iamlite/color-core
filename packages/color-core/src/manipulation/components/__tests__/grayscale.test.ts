import { Color } from '../../../color';
import { grayscale } from '../grayscale';

describe('grayscale', () => {
    it('should convert a color to grayscale', () => {
        const color = new Color({ r: 100, g: 150, b: 200, a: 1 });
        const grayColor = grayscale(color);
        expect(grayColor.toRgb()).toEqual({ r: 141, g: 141, b: 141, a: 1 });
    });

    it('should not change a color that is already grayscale', () => {
        const color = new Color({ r: 128, g: 128, b: 128, a: 1 });
        const grayColor = grayscale(color);
        expect(grayColor.toRgb()).toEqual({ r: 128, g: 128, b: 128, a: 1 });
    });

    it('should convert a color with different RGB values to grayscale', () => {
        const color = new Color({ r: 50, g: 75, b: 100, a: 1 });
        const grayColor = grayscale(color);
        expect(grayColor.toRgb()).toEqual({ r: 70, g: 70, b: 70, a: 1 });
    });
});
