# Function: cmykToRgb()

> **cmykToRgb**(`cmyk`): [`RGB`](../type-aliases/RGB.md)

Converts CMYK values to RGB values.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `cmyk` | [`CMYK`](../type-aliases/CMYK.md) | An object with c, m, y, and k properties. |

## Returns

[`RGB`](../type-aliases/RGB.md)

An object with r, g, and b properties.

## Throws

If the input is not a valid CMYK object or if CMYK values are out of range.

## Defined in

[packages/color-core/src/conversions/components/cmyk.ts:9](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/conversions/components/cmyk.ts#L9)
