# Function: rgbToHex()

> **rgbToHex**(`rgb`, `includeAlpha`?): `string`

Converts RGB values to a hex color code.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `rgb` | [`RGB`](../type-aliases/RGB.md) | `undefined` | An object with r, g, and b properties, and an optional a property. |
| `includeAlpha`? | `boolean` | `false` | Whether to include the alpha channel in the hex string. |

## Returns

`string`

The hex color code.

## Throws

If the input is not a valid RGB object or if RGB values are out of range.

## Defined in

[packages/color-core/src/conversions/components/hex.ts:10](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/conversions/components/hex.ts#L10)
