# Function: hslToRgb()

> **hslToRgb**(`hsl`): [`RGB`](../type-aliases/RGB.md)

Converts HSL values to RGB values.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `hsl` | [`HSL`](../type-aliases/HSL.md) | An object with h, s, and l properties. |

## Returns

[`RGB`](../type-aliases/RGB.md)

An object with r, g, and b properties.

## Throws

If the input is not a valid HSL object or if HSL values are out of range.

## Defined in

[packages/color-core/src/conversions/components/hsl.ts:9](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/conversions/components/hsl.ts#L9)
