# Function: rgbToXyz()

> **rgbToXyz**(`rgb`, `whitePoint`): [`XYZ`](../interfaces/XYZ.md)

Converts RGB to XYZ color space.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `rgb` | [`RGB`](../type-aliases/RGB.md) | `undefined` | The RGB color values. |
| `whitePoint` | `WhitePoint` | `'D65'` | The white point to use (default: 'D65'). |

## Returns

[`XYZ`](../interfaces/XYZ.md)

The XYZ color values (normalized to 0-1 range).

## Defined in

[packages/color-core/src/conversions/components/xyz.ts:14](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/conversions/components/xyz.ts#L14)
