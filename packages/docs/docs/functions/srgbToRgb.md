# Function: srgbToRgb()

> **srgbToRgb**(`srgb`): [`RGB`](../type-aliases/RGB.md)

Converts sRGB color values to RGB color space.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `srgb` | [`SRGB`](../type-aliases/SRGB.md) | The sRGB color to convert. |

## Returns

[`RGB`](../type-aliases/RGB.md)

The color in RGB color space.

## Throws

If the input is not a valid sRGB object or if sRGB values are out of range.

## Defined in

[packages/color-core/src/conversions/components/srgb.ts:45](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/conversions/components/srgb.ts#L45)
