import { Color } from '../../../color';
import { hexToRgb } from '../../../conversions/components/hex-to-rgb';
import { triadic } from '../triadic';

// Helper function to compare RGB values within a tolerance
function expectRgbWithin(receivedHex: string, expectedHex: string, tolerance: number = 1) {
    const receivedRgb = hexToRgb(receivedHex);
    const expectedRgb = hexToRgb(expectedHex);
    expect(Math.abs(receivedRgb.r - expectedRgb.r)).toBeLessThanOrEqual(tolerance);
    expect(Math.abs(receivedRgb.g - expectedRgb.g)).toBeLessThanOrEqual(tolerance);
    expect(Math.abs(receivedRgb.b - expectedRgb.b)).toBeLessThanOrEqual(tolerance);
}

describe('triadic', () => {
    it('should generate two triadic colors', () => {
        const color = new Color('#FF0000');
        const [baseColor, color1, color2] = triadic(color);
        expectRgbWithin(baseColor.toHex(), '#FF0000');
        expectRgbWithin(color1.toHex(), '#00FF00');
        expectRgbWithin(color2.toHex(), '#0000FF');
    });

    it('should handle colors with different lightness', () => {
        const color = new Color('#d5f8b9');
        const [baseColor, color1, color2] = triadic(color);
        expectRgbWithin(baseColor.toHex(), '#d5f8b9');
        expectRgbWithin(color1.toHex(), '#b9d5f8');
        expectRgbWithin(color2.toHex(), '#f8b9d5');
    });

    it('should handle colors with different saturation', () => {
        const color = new Color('#00ff1d');
        const [baseColor, color1, color2] = triadic(color);
        expectRgbWithin(baseColor.toHex(), '#00ff1d');
        expectRgbWithin(color1.toHex(), '#1d00ff');
        expectRgbWithin(color2.toHex(), '#ff1d00');
    });
});
