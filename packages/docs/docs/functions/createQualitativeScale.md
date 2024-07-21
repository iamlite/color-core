# Function: createQualitativeScale()

> **createQualitativeScale**(`numberOfColors`): [`Color`](../classes/Color.md)[]

Creates a qualitative color scale.

This function generates a set of distinct colors that are easily distinguishable from each other,
which is useful for representing categorical data.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `numberOfColors` | `number` | The number of distinct colors to generate. |

## Returns

[`Color`](../classes/Color.md)[]

An array of distinct Color objects.

## Example

```ts
const categoricalColors = createQualitativeScale(5);
// Returns an array of 5 distinct Color objects
```

## Defined in

packages/color-core/src/scales/components/qualitative-scale.ts:18
