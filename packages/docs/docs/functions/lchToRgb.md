# Function: lchToRgb()

> **lchToRgb**(`lch`, `whitePoint`): [`RGB`](../type-aliases/RGB.md)

Converts LCH color to RGB color.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `lch` | [`LCH`](../type-aliases/LCH.md) | `undefined` | The LCH color values. |
| `whitePoint` | `WhitePoint` | `'D65'` | The white point to use (default: 'D65'). |

## Returns

[`RGB`](../type-aliases/RGB.md)

The RGB color values.

## Defined in

[packages/color-core/src/conversions/components/lch.ts:119](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/conversions/components/lch.ts#L119)
