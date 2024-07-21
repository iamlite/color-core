# Function: hexToRgb()

> **hexToRgb**(`hex`): [`RGB`](../type-aliases/RGB.md)

Converts a hex color code to RGB values.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `hex` | `string` | The hex color code. |

## Returns

[`RGB`](../type-aliases/RGB.md)

An object with r, g, and b properties, and an optional a property if the input includes alpha.

## Throws

If the input is not a valid hex color code.

## Defined in

[packages/color-core/src/conversions/components/hex.ts:50](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/conversions/components/hex.ts#L50)
