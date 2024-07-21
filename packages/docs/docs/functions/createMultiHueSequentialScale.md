# Function: createMultiHueSequentialScale()

> **createMultiHueSequentialScale**(`colorStops`, `steps`): [`Color`](../classes/Color.md)[]

Creates a multi-hue sequential color scale.

This function generates a color scale that smoothly transitions through multiple colors.
It's useful for representing continuous data with multiple stages or phases.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `colorStops` | [`Color`](../classes/Color.md)[] | An array of Color objects representing color stops in the scale. |
| `steps` | `number` | The total number of colors to generate in the scale. |

## Returns

[`Color`](../classes/Color.md)[]

An array of Color objects representing the multi-hue sequential scale.

## Example

```ts
const multiHueScale = createMultiHueSequentialScale([
  new Color('#ff0000'),  // Red
  new Color('#00ff00'),  // Green
  new Color('#0000ff')   // Blue
], 10);
// Returns an array of 10 Color objects transitioning from red to green to blue
```

## Defined in

packages/color-core/src/scales/components/multi-hue-sequential-scale.ts:21
