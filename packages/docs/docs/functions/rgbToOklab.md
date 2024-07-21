# Function: rgbToOklab()

> **rgbToOklab**(`rgb`): [`Oklab`](../type-aliases/Oklab.md)

Converts RGB values to Oklab color space.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rgb` | [`RGB`](../type-aliases/RGB.md) | An object with r, g, and b properties. |

## Returns

[`Oklab`](../type-aliases/Oklab.md)

An object with L, a, and b properties.

## Throws

If the input is not a valid RGB object or if RGB values are out of range.

## Defined in

[packages/color-core/src/conversions/components/oklab.ts:37](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/conversions/components/oklab.ts#L37)
