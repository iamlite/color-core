# Function: hsvToRgb()

> **hsvToRgb**(`hsv`): [`RGB`](../type-aliases/RGB.md)

Converts HSV values to RGB values.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `hsv` | [`HSV`](../type-aliases/HSV.md) | An object with h, s, and v properties. |

## Returns

[`RGB`](../type-aliases/RGB.md)

An object with r, g, and b properties.

## Throws

If the input is not a valid HSV object or if HSV values are out of range.

## Defined in

[packages/color-core/src/conversions/components/hsv.ts:9](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/conversions/components/hsv.ts#L9)
