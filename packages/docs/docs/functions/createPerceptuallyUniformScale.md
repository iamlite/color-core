# Function: createPerceptuallyUniformScale()

> **createPerceptuallyUniformScale**(`startColor`, `endColor`, `steps`): [`Color`](../classes/Color.md)[]

Creates a perceptually uniform sequential color scale.

This function generates a color scale where the perceived difference between each step is uniform.
It's crucial for accurate representation of data in visualizations.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `startColor` | [`Color`](../classes/Color.md) | The starting color of the scale. |
| `endColor` | [`Color`](../classes/Color.md) | The ending color of the scale. |
| `steps` | `number` | The number of colors to generate in the scale. |

## Returns

[`Color`](../classes/Color.md)[]

An array of Color objects representing the perceptually uniform sequential scale.

## Example

```ts
const uniformScale = createPerceptuallyUniformScale(
  new Color('#ffffcc'),  // Light yellow
  new Color('#800026'),  // Dark red
  7
);
// Returns an array of 7 Color objects with perceptually uniform steps between light yellow and dark red
```

## Defined in

packages/color-core/src/scales/components/perceptually-uniform-scale.ts:24
