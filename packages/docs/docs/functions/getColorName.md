# Function: getColorName()

> **getColorName**(`color`): `Promise`\<`string`\>

Asynchronously retrieves the name of a color from the Color Pizza API.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `color` | [`Color`](../classes/Color.md) | The color object to get the name for. |

## Returns

`Promise`\<`string`\>

A promise that resolves to the name of the color, or 'Unknown' if an error occurs.

## Defined in

[packages/color-core/src/utils/components/color-naming.ts:114](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/utils/components/color-naming.ts#L114)
