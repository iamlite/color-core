# Function: labToRgb()

> **labToRgb**(`lab`, `whitePoint`): [`RGB`](../type-aliases/RGB.md)

Converts LAB to RGB color space.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `lab` | [`LAB`](../type-aliases/LAB.md) | `undefined` | The LAB color values. |
| `whitePoint` | `WhitePoint` | `'D65'` | The white point to use (default: 'D65'). |

## Returns

[`RGB`](../type-aliases/RGB.md)

The RGB color values.

## Defined in

[packages/color-core/src/conversions/components/lab.ts:84](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/conversions/components/lab.ts#L84)
