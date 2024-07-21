# Function: createDivergingScale()

> **createDivergingScale**(`options`): `DivergingScale`

Creates a diverging color scale between three colors.

A diverging color scale is a series of colors that transition from one color
to a middle color, then to a third color. This is useful for representing
continuous data that has a meaningful middle point or zero value.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | `DivergingScaleOptions` | The options for creating the diverging scale. |

## Returns

`DivergingScale`

A DivergingScale (array of Color objects) representing the diverging scale.

## Example

```ts
const scale = createDivergingScale({
  startColor: new Color('#ff0000'),
  midColor: new Color('#ffffff'),
  endColor: new Color('#0000ff'),
  steps: 5
});
// Returns: [Color('#ff0000'), Color('#ff7f7f'), Color('#ffffff'), Color('#7f7fff'), Color('#0000ff')]
```

## Throws

If steps is less than 3.

## Defined in

packages/color-core/src/scales/components/diverging-scale.ts:24
