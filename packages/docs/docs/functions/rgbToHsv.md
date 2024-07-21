# Function: rgbToHsv()

> **rgbToHsv**(`rgb`): [`HSV`](../type-aliases/HSV.md)

Converts RGB values to HSV values.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rgb` | [`RGB`](../type-aliases/RGB.md) | An object with r, g, and b properties. |

## Returns

[`HSV`](../type-aliases/HSV.md)

An object with h, s, and v properties.

## Throws

If the input is not a valid RGB object or if RGB values are out of range.

## Defined in

[packages/color-core/src/conversions/components/hsv.ts:58](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/conversions/components/hsv.ts#L58)
