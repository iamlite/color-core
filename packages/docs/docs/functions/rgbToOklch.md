# Function: rgbToOklch()

> **rgbToOklch**(`rgb`): [`Oklch`](../type-aliases/Oklch.md)

Converts RGB values to formatted Oklch color space.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rgb` | [`RGB`](../type-aliases/RGB.md) | An object with r, g, and b properties. |

## Returns

[`Oklch`](../type-aliases/Oklch.md)

An object with L (percentage), C and h (full numbers) properties.

## Throws

If the input is not a valid RGB object or if RGB values are out of range.

## Defined in

[packages/color-core/src/conversions/components/oklch.ts:16](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/conversions/components/oklch.ts#L16)
