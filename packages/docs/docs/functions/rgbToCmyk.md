# Function: rgbToCmyk()

> **rgbToCmyk**(`rgb`): [`CMYK`](../type-aliases/CMYK.md)

Converts RGB values to CMYK values.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rgb` | [`RGB`](../type-aliases/RGB.md) | An object with r, g, and b properties. |

## Returns

[`CMYK`](../type-aliases/CMYK.md)

An object with c, m, y, and k properties.

## Throws

If the input is not a valid RGB object or if RGB values are out of range.

## Defined in

[packages/color-core/src/conversions/components/cmyk.ts:41](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/conversions/components/cmyk.ts#L41)
