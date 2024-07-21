# Function: xyzToRgb()

> **xyzToRgb**(`xyz`, `whitePoint`): [`RGB`](../type-aliases/RGB.md)

Converts XYZ to RGB color space.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `xyz` | [`XYZ`](../interfaces/XYZ.md) | `undefined` | The XYZ color values (assumed to be in 0-1 range). |
| `whitePoint` | `WhitePoint` | `'D65'` | The white point to use (default: 'D65'). |

## Returns

[`RGB`](../type-aliases/RGB.md)

The RGB color values.

## Defined in

[packages/color-core/src/conversions/components/xyz.ts:58](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/conversions/components/xyz.ts#L58)
