import { Oklab, RGB } from '../../../types';
import { oklabToRgb, rgbToOklab } from '../oklab';

describe('Oklab <-> RGB Conversions', () => {
    const testCases: [RGB, Oklab][] = [
        [{ r: 255, g: 0, b: 0 }, { L: 0.6279557, a: 0.22486289, b: 0.1258729 }],
        [{ r: 0, g: 255, b: 0 }, { L: 0.8662082, a: -0.2338522, b: 0.1794759 }],
        [{ r: 0, g: 0, b: 255 }, { L: 0.4520137, a: -0.0324140, b: -0.3122330 }],
        [{ r: 255, g: 255, b: 255 }, { L: 1, a: 0, b: 0 }],
        [{ r: 0, g: 0, b: 0 }, { L: 0, a: 0, b: 0 }],
        [{ r: 128, g: 128, b: 128 }, { L: 0.5957975, a: 0, b: 0 }],
    ];

    describe('rgbToOklab', () => {
        test.each(testCases)('converts RGB %j to Oklab %j', (rgb, expectedOklab) => {
            const result = rgbToOklab(rgb);
            expect(result.L).toBeCloseTo(expectedOklab.L, 2);
            expect(result.a).toBeCloseTo(expectedOklab.a, 2);
            expect(result.b).toBeCloseTo(expectedOklab.b, 2);
        });

        it('handles fractional RGB values', () => {
            const rgb: RGB = { r: 45.75, g: 180.5, b: 250.25 };
            const result = rgbToOklab(rgb);
            expect(result).toEqual(expect.any(Object));
            expect(result.L).toBeCloseTo(0.7309925, 2);
            expect(result.a).toBeCloseTo(-0.0904666, 1);
            expect(result.b).toBeCloseTo(-0.1754434, 1);
        });

        it('throws error for invalid RGB object', () => {
            expect(() => rgbToOklab({} as RGB)).toThrow('RGB values must be numbers');
        });

        it('throws error for out of range RGB values', () => {
            expect(() => rgbToOklab({ r: 256, g: 0, b: 0 })).toThrow('RGB values must be between 0 and 255');
        });


        test('throws error for non-object input', () => {
            expect(() => rgbToOklab(null as unknown as RGB)).toThrow('Input must be an object');
            expect(() => rgbToOklab('invalid' as unknown as RGB)).toThrow('Input must be an object');
        });

        test('throws error for invalid RGB object', () => {
            expect(() => rgbToOklab({ r: 'a', g: 0, b: 0 } as unknown as RGB)).toThrow('RGB values must be numbers');
            expect(() => rgbToOklab({ r: 255, g: 'b', b: 0 } as unknown as RGB)).toThrow('RGB values must be numbers');
            expect(() => rgbToOklab({ r: 255, g: 0, b: 'c' } as unknown as RGB)).toThrow('RGB values must be numbers');
        });

        test('throws error for out-of-range RGB values', () => {
            expect(() => rgbToOklab({ r: -1, g: 0, b: 0 })).toThrow('RGB values must be between 0 and 255');
            expect(() => rgbToOklab({ r: 256, g: 0, b: 0 })).toThrow('RGB values must be between 0 and 255');
            expect(() => rgbToOklab({ r: 0, g: -1, b: 0 })).toThrow('RGB values must be between 0 and 255');
            expect(() => rgbToOklab({ r: 0, g: 256, b: 0 })).toThrow('RGB values must be between 0 and 255');
            expect(() => rgbToOklab({ r: 0, g: 0, b: -1 })).toThrow('RGB values must be between 0 and 255');
            expect(() => rgbToOklab({ r: 0, g: 0, b: 256 })).toThrow('RGB values must be between 0 and 255');
        });


    });

    describe('oklabToRgb', () => {
        test.each(testCases)('converts Oklab %j to RGB %j', (expectedRgb, oklab) => {
            const result = oklabToRgb(oklab);
            expect(result.r).toBeCloseTo(expectedRgb.r, -.5);
            expect(result.g).toBeCloseTo(expectedRgb.g, -.5);
            expect(result.b).toBeCloseTo(expectedRgb.b, -.5);
        });

        it('handles conversion of dark colors', () => {
            const oklab: Oklab = { L: 0.1, a: 0.01, b: -0.02 };
            const result = oklabToRgb(oklab);
            expect(result.r).toBeGreaterThanOrEqual(0);
            expect(result.r).toBeLessThanOrEqual(255);
            expect(result.g).toBeGreaterThanOrEqual(0);
            expect(result.g).toBeLessThanOrEqual(255);
            expect(result.b).toBeGreaterThanOrEqual(0);
            expect(result.b).toBeLessThanOrEqual(255);
        });

        it('throws error for invalid Oklab object', () => {
            expect(() => oklabToRgb({} as Oklab)).toThrow('Oklab values must be numbers');
        });
    });

    describe('Bidirectional Conversion', () => {
        test.each(testCases)('RGB to Oklab to RGB: %j', (rgb) => {
            const oklab = rgbToOklab(rgb);
            const result = oklabToRgb(oklab);
            expect(result.r).toBeCloseTo(rgb.r, 0);
            expect(result.g).toBeCloseTo(rgb.g, 0);
            expect(result.b).toBeCloseTo(rgb.b, 0);
        });

        it('handles random RGB values', () => {
            for (let i = 0; i < 100; i++) {
                const rgb: RGB = {
                    r: Math.floor(Math.random() * 256),
                    g: Math.floor(Math.random() * 256),
                    b: Math.floor(Math.random() * 256)
                };
                const oklab = rgbToOklab(rgb);
                const result = oklabToRgb(oklab);
                expect(result.r).toBeCloseTo(rgb.r, 0);
                expect(result.g).toBeCloseTo(rgb.g, 0);
                expect(result.b).toBeCloseTo(rgb.b, 0);
            }
        });
    });
    test('throws error for non-object input', () => {
        expect(() => oklabToRgb(null as unknown as Oklab)).toThrow('Input must be an object');
        expect(() => oklabToRgb('invalid' as unknown as Oklab)).toThrow('Input must be an object');
    });

    test('throws error for invalid Oklab object', () => {
        expect(() => oklabToRgb({ L: 'a', a: 0.2, b: 0.1 } as unknown as Oklab)).toThrow('Oklab values must be numbers');
        expect(() => oklabToRgb({ L: 0.5, a: 'b', b: 0.1 } as unknown as Oklab)).toThrow('Oklab values must be numbers');
        expect(() => oklabToRgb({ L: 0.5, a: 0.2, b: 'c' } as unknown as Oklab)).toThrow('Oklab values must be numbers');
    });

});
