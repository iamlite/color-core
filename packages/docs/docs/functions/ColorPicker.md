# Function: ColorPicker()

> **ColorPicker**(`props`, `deprecatedLegacyContext`?): `ReactNode`

A customizable color picker component for Next.js projects.

This component provides a user interface for selecting colors, including:
- A saturation-value area for picking the color's saturation and brightness
- A hue slider for selecting the base hue
- An input field for entering hex color values
- A color preview box

The component is highly customizable through props, allowing for custom styling
and dimensions to fit various design requirements.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `props` | [`ColorPickerProps`](../interfaces/ColorPickerProps.md) | - |
| `deprecatedLegacyContext`? | `any` | **Deprecated** **See** [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods) |

## Returns

`ReactNode`

## Example

```jsx
<ColorPicker
  initialColor={{ r: 255, g: 0, b: 0 }}
  onChange={(color) => console.log(color)}
  width={300}
  height={200}
/>
```

## See

[ColorPickerProps](../interfaces/ColorPickerProps.md) for detailed prop descriptions

## Defined in

[packages/color-core/src/utils/components/color-picker.tsx:74](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/utils/components/color-picker.tsx#L74)
