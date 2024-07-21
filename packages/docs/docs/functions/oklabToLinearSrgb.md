# Function: oklabToLinearSrgb()

> **oklabToLinearSrgb**(`L`, `a`, `b`): [`number`, `number`, `number`]

Converts Oklab color values to linear sRGB.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `L` | `number` | The L component of Oklab. |
| `a` | `number` | The a component of Oklab. |
| `b` | `number` | The b component of Oklab. |

## Returns

[`number`, `number`, `number`]

An array of [r, g, b] values in linear sRGB color space (0-1).

## Defined in

[packages/color-core/src/conversions/components/oklab-linear-srgb.ts:10](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/conversions/components/oklab-linear-srgb.ts#L10)
