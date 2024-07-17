import { RGB, XYZ } from '../../../types';
import { rgbToXyz, xyzD50ToD65, xyzD65ToD50, xyzToRgb } from '../xyz';

describe('XYZ Conversions', () => {
    const rgbTestCases: [RGB, XYZ][] = [
        [{ r: 255, g: 0, b: 0 }, { x: 0.41239079926595934, y: 0.21263900587151027, z: 0.01933081871559182, whitePoint: 'D65' }],
        [{ r: 0, g: 255, b: 0 }, { x: 0.357584339383878, y: 0.715168678767756, z: 0.11919477979462598, whitePoint: 'D65' }],
        [{ r: 0, g: 0, b: 255 }, { x: 0.1804807884018343, y: 0.07219231536073371, z: 0.9505321522496607, whitePoint: 'D65' }],
        [{ r: 255, g: 255, b: 255 }, { x: 0.9504559270516717, y: 1, z: 1.0890577507598784, whitePoint: 'D65' }],
        [{ r: 0, g: 0, b: 0 }, { x: 0, y: 0, z: 0, whitePoint: 'D65' }],
    ];

    describe('rgbToXyz (D65)', () => {
        test.each(rgbTestCases)('converts RGB %j to XYZ %j', (rgb, expectedXyz) => {
            const result = rgbToXyz(rgb);
            expect(result.x).toBeCloseTo(expectedXyz.x, 2);
            expect(result.y).toBeCloseTo(expectedXyz.y, 2);
            expect(result.z).toBeCloseTo(expectedXyz.z, 2);
            expect(result.whitePoint).toBe('D65');
        });
    });

    describe('xyzToRgb (D65)', () => {
        test.each(rgbTestCases)('converts XYZ %j to RGB %j', (expectedRgb, xyz) => {
            const result = xyzToRgb(xyz);
            expect(result.r).toBeCloseTo(expectedRgb.r);
            expect(result.g).toBeCloseTo(expectedRgb.g);
            expect(result.b).toBeCloseTo(expectedRgb.b);
        });
    });

    describe('Bidirectional Conversion', () => {
        test.each(rgbTestCases)('RGB to XYZ to RGB: %j', (rgb) => {
            const lab = rgbToXyz(rgb);
            const result = xyzToRgb(lab);
            expect(result.r).toBeCloseTo(rgb.r, 5);
            expect(result.g).toBeCloseTo(rgb.g, 5);
            expect(result.b).toBeCloseTo(rgb.b, 5);
        });
    });


    describe('XYZ D65 to D50 conversion', () => {
        const d65ToD50TestCases: [XYZ, XYZ][] = [
            [{ x: 0.41239079926595934, y: 0.21263900587151027, z: 0.01933081871559182, whitePoint: 'D65' }, { x: 0.4360657468742693, y: 0.22249317711056518, z: 0.01392392146316938, whitePoint: 'D50' }],
            [{ x: 0.7699751386498374, y: 0.9278076846392663, z: 0.13852559851021778, whitePoint: 'D65' }, { x: 0.8212172564644291, y: 0.9393801902050478, z: 0.11100524569457954, whitePoint: 'D50' }],
        ];

        test.each(d65ToD50TestCases)('converts XYZ D65 %j to XYZ D50 %j', (xyzD65, expectedXyzD50) => {
            const result = xyzD65ToD50(xyzD65);
            expect(result.x).toBeCloseTo(expectedXyzD50.x, 2);
            expect(result.y).toBeCloseTo(expectedXyzD50.y, 2);
            expect(result.z).toBeCloseTo(expectedXyzD50.z, 2);
            expect(result.whitePoint).toBe('D50');
        });
    });

    describe('XYZ D50 to D65 conversion', () => {
        const d50ToD65TestCases: [XYZ, XYZ][] = [
            [{ x: 0.4360657468742693, y: 0.22249317711056518, z: 0.01392392146316938, whitePoint: 'D50' }, { x: 0.41239079926595934, y: 0.21263900587151027, z: 0.01933081871559182, whitePoint: 'D65' }],
            [{ x: 0.8212172564644291, y: 0.9393801902050478, z: 0.11100524569457954, whitePoint: 'D50' }, { x: 0.7699751386498374, y: 0.9278076846392663, z: 0.13852559851021778, whitePoint: 'D65' }],
        ];

        test.each(d50ToD65TestCases)('converts XYZ D50 %j to XYZ D65 %j', (xyzD50, expectedXyzD65) => {
            const result = xyzD50ToD65(xyzD50);
            expect(result.x).toBeCloseTo(expectedXyzD65.x, 2);
            expect(result.y).toBeCloseTo(expectedXyzD65.y, 2);
            expect(result.z).toBeCloseTo(expectedXyzD65.z, 2);
            expect(result.whitePoint).toBe('D65');
        });
    });

    // Test RGB to XYZ conversion with D50 white point
    test('rgbToXyz conversion with D50 white point', () => {
        const rgb: RGB = { r: 255, g: 0, b: 0 };
        const expectedXyz: XYZ = { x: 0.4360747, y: 0.2225045, z: 0.0139322, whitePoint: 'D50' };

        const result = rgbToXyz(rgb, 'D50');

        expect(result.x).toBeCloseTo(expectedXyz.x, 5);
        expect(result.y).toBeCloseTo(expectedXyz.y, 5);
        expect(result.z).toBeCloseTo(expectedXyz.z, 5);
        expect(result.whitePoint).toBe(expectedXyz.whitePoint);
    });

    // Test XYZ to RGB conversion with D50 white point
    test('xyzToRgb conversion with D50 white point', () => {
        const xyz: XYZ = { x: 0.4360747, y: 0.2225045, z: 0.0139322, whitePoint: 'D50' };
        const expectedRgb: RGB = { r: 255, g: 0, b: 0 };

        const result = xyzToRgb(xyz, 'D50');

        expect(result.r).toBeCloseTo(expectedRgb.r, 0);
        expect(result.g).toBeCloseTo(expectedRgb.g, 0);
        expect(result.b).toBeCloseTo(expectedRgb.b, 0);
    });
})