import { hexToRgb } from './../hex-to-rgb';

describe('hexToRgb', () => {
  it('should convert 6-digit hex to RGB correctly', () => {
    expect(hexToRgb('#FF0000')).toEqual({ r: 255, g: 0, b: 0 });
    expect(hexToRgb('#00FF00')).toEqual({ r: 0, g: 255, b: 0 });
    expect(hexToRgb('#0000FF')).toEqual({ r: 0, g: 0, b: 255 });
    expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 });
    expect(hexToRgb('#FFFFFF')).toEqual({ r: 255, g: 255, b: 255 });
  });

  it('should convert 3-digit hex to RGB correctly', () => {
    expect(hexToRgb('#F00')).toEqual({ r: 255, g: 0, b: 0 });
    expect(hexToRgb('#0F0')).toEqual({ r: 0, g: 255, b: 0 });
    expect(hexToRgb('#00F')).toEqual({ r: 0, g: 0, b: 255 });
  });

  it('should handle lowercase hex values', () => {
    expect(hexToRgb('#ff0000')).toEqual({ r: 255, g: 0, b: 0 });
    expect(hexToRgb('#f00')).toEqual({ r: 255, g: 0, b: 0 });
  });

  it('should handle hex values without #', () => {
    expect(hexToRgb('FF0000')).toEqual({ r: 255, g: 0, b: 0 });
    expect(hexToRgb('F00')).toEqual({ r: 255, g: 0, b: 0 });
  });

  it('should throw an error for invalid input types', () => {
    expect(() => hexToRgb(123 as any)).toThrow('Input must be a string');
  });

  it('should throw an error for invalid hex formats', () => {
    expect(() => hexToRgb('#GG0000')).toThrow('Invalid hex color format');
    expect(() => hexToRgb('#FFFF')).toThrow('Invalid hex color format');
    expect(() => hexToRgb('#FF')).toThrow('Invalid hex color format');
  });
});
