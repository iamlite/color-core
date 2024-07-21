# Function: rgbToLch()

> **rgbToLch**(`rgb`, `whitePoint`): [`LCH`](../type-aliases/LCH.md)

Converts RGB color to LCH color.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `rgb` | [`RGB`](../type-aliases/RGB.md) | `undefined` | The RGB color values. |
| `whitePoint` | `WhitePoint` | `'D65'` | The white point to use (default: 'D65'). |

## Returns

[`LCH`](../type-aliases/LCH.md)

The LCH color values.

## Defined in

[packages/color-core/src/conversions/components/lch.ts:73](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/conversions/components/lch.ts#L73)
