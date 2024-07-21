# Function: linearSrgbToOklab()

> **linearSrgbToOklab**(`r`, `g`, `b`): [`Oklab`](../type-aliases/Oklab.md)

Converts linear sRGB values to Oklab color space.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `r` | `number` | The red channel of linear sRGB (0-1). |
| `g` | `number` | The green channel of linear sRGB (0-1). |
| `b` | `number` | The blue channel of linear sRGB (0-1). |

## Returns

[`Oklab`](../type-aliases/Oklab.md)

An object with L, a, and b properties in Oklab color space.

## Defined in

[packages/color-core/src/conversions/components/oklab-linear-srgb.ts:34](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/conversions/components/oklab-linear-srgb.ts#L34)
