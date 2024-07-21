# Function: createSequentialScale()

> **createSequentialScale**(`options`): `SequentialScale`

Creates a sequential color scale between two colors.

A sequential color scale is a series of colors that transition smoothly
from one color to another. This is useful for representing continuous
data that ranges from low to high values.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | `SequentialScaleOptions` | The options for creating the sequential scale. |

## Returns

`SequentialScale`

A SequentialScale (array of Color objects) representing the sequential scale.

## Example

```ts
const scale = createSequentialScale({
  startColor: new Color('#ff0000'),
  endColor: new Color('#0000ff'),
  steps: 5
});
// Returns: [Color('#ff0000'), Color('#bf003f'), Color('#7f007f'), Color('#3f00bf'), Color('#0000ff')]
```

## Throws

If steps is less than 2.

## Defined in

packages/color-core/src/scales/components/sequential-scale.ts:23
