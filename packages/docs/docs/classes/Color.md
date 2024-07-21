# Class: Color

The Color class represents a color with various color space representations and manipulation methods.

The class supports multiple color spaces, including RGB, HSL, HSV, CMYK, LAB, LCH, XYZ, and YUV.
It also provides methods for converting between color spaces and generating harmony colors.

The class offers various color manipulation methods, such as adjusting lightness, saturation, hue, and alpha.
It also provides methods for converting colors to different string representations and retrieving information about the color.

The class also includes utility methods for determining the perceived brightness of the color and checking if it is light or dark.

## Constructors

### new Color()

> **new Color**(`color`): [`Color`](Color.md)

Creates a new Color instance.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `color` | `string` \| [`RGB`](../type-aliases/RGB.md) \| [`HSL`](../type-aliases/HSL.md) \| [`HSV`](../type-aliases/HSV.md) \| [`CMYK`](../type-aliases/CMYK.md) \| [`LAB`](../type-aliases/LAB.md) \| [`LCH`](../type-aliases/LCH.md) \| [`XYZ`](../interfaces/XYZ.md) \| [`YUV`](../type-aliases/YUV.md) \| [`Oklab`](../type-aliases/Oklab.md) \| [`Oklch`](../type-aliases/Oklch.md) \| [`LUV`](../type-aliases/LUV.md) \| [`HSLuv`](../type-aliases/HSLuv.md) \| [`HPLuv`](../type-aliases/HPLuv.md) \| [`CIExyY`](../type-aliases/CIExyY.md) \| [`SRGB`](../type-aliases/SRGB.md) \| [`HSI`](../type-aliases/HSI.md) \| [`HWB`](../type-aliases/HWB.md) \| [`AdobeRGB`](../type-aliases/AdobeRGB.md) | The color value to initialize with. Can be a string (hex) or an object representing various color spaces. |

#### Returns

[`Color`](Color.md)

#### Defined in

[packages/color-core/src/color.ts:36](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/color.ts#L36)

## Accessors

### a

> `get` **a**(): `number`

> `set` **a**(`value`): `void`

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `number` |

#### Returns

`number`

#### Defined in

[packages/color-core/src/color.ts:91](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/color.ts#L91)

***

### b

> `get` **b**(): `number`

> `set` **b**(`value`): `void`

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `number` |

#### Returns

`number`

#### Defined in

[packages/color-core/src/color.ts:90](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/color.ts#L90)

***

### g

> `get` **g**(): `number`

> `set` **g**(`value`): `void`

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `number` |

#### Returns

`number`

#### Defined in

[packages/color-core/src/color.ts:89](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/color.ts#L89)

***

### r

> `get` **r**(): `number`

> `set` **r**(`value`): `void`

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `number` |

#### Returns

`number`

#### Defined in

[packages/color-core/src/color.ts:88](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/color.ts#L88)

## Methods

### adjustAlpha()

> **adjustAlpha**(`amount`): [`Color`](Color.md)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `amount` | `number` |

#### Returns

[`Color`](Color.md)

#### Defined in

[packages/color-core/src/color.ts:150](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/color.ts#L150)

***

### adjustHue()

> **adjustHue**(`amount`): [`Color`](Color.md)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `amount` | `number` |

#### Returns

[`Color`](Color.md)

#### Defined in

[packages/color-core/src/color.ts:149](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/color.ts#L149)

***

### adjustLightness()

> **adjustLightness**(`amount`): [`Color`](Color.md)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `amount` | `number` |

#### Returns

[`Color`](Color.md)

#### Defined in

[packages/color-core/src/color.ts:147](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/color.ts#L147)

***

### adjustSaturation()

> **adjustSaturation**(`amount`): [`Color`](Color.md)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `amount` | `number` |

#### Returns

[`Color`](Color.md)

#### Defined in

[packages/color-core/src/color.ts:148](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/color.ts#L148)

***

### analogous()

> **analogous**(`angle`?): [[`Color`](Color.md), [`Color`](Color.md), [`Color`](Color.md)]

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `angle`? | `number` |

#### Returns

[[`Color`](Color.md), [`Color`](Color.md), [`Color`](Color.md)]

#### Defined in

[packages/color-core/src/color.ts:134](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/color.ts#L134)

***

### complementary()

> **complementary**(): [[`Color`](Color.md), [`Color`](Color.md)]

#### Returns

[[`Color`](Color.md), [`Color`](Color.md)]

#### Defined in

[packages/color-core/src/color.ts:133](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/color.ts#L133)

***

### doubleSplitComplementary()

> **doubleSplitComplementary**(`angle`?): [[`Color`](Color.md), [`Color`](Color.md), [`Color`](Color.md), [`Color`](Color.md), [`Color`](Color.md)]

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `angle`? | `number` |

#### Returns

[[`Color`](Color.md), [`Color`](Color.md), [`Color`](Color.md), [`Color`](Color.md), [`Color`](Color.md)]

#### Defined in

[packages/color-core/src/color.ts:140](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/color.ts#L140)

***

### equals()

> **equals**(`other`): `boolean`

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `other` | [`Color`](Color.md) |

#### Returns

`boolean`

#### Defined in

[packages/color-core/src/color.ts:170](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/color.ts#L170)

***

### getBrightness()

> **getBrightness**(): `number`

#### Returns

`number`

#### Defined in

[packages/color-core/src/color.ts:166](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/color.ts#L166)

***

### getEffectiveAlpha()

> **getEffectiveAlpha**(): `number`

#### Returns

`number`

#### Defined in

[packages/color-core/src/color.ts:161](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/color.ts#L161)

***

### getInfo()

> **getInfo**(): `Promise`\<`ColorInfo`\>

#### Returns

`Promise`\<`ColorInfo`\>

#### Defined in

[packages/color-core/src/color.ts:164](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/color.ts#L164)

***

### getName()

> **getName**(): `Promise`\<`string`\>

#### Returns

`Promise`\<`string`\>

#### Defined in

[packages/color-core/src/color.ts:163](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/color.ts#L163)

***

### grayscale()

> **grayscale**(): [`Color`](Color.md)

#### Returns

[`Color`](Color.md)

#### Defined in

[packages/color-core/src/color.ts:152](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/color.ts#L152)

***

### invert()

> **invert**(): [`Color`](Color.md)

#### Returns

[`Color`](Color.md)

#### Defined in

[packages/color-core/src/color.ts:151](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/color.ts#L151)

***

### isLight()

> **isLight**(`threshold`): `boolean`

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `threshold` | `number` | `128` |

#### Returns

`boolean`

#### Defined in

[packages/color-core/src/color.ts:168](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/color.ts#L168)

***

### mix()

> **mix**(`color`, `amount`): [`Color`](Color.md)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `color` | [`Color`](Color.md) |
| `amount` | `number` |

#### Returns

[`Color`](Color.md)

#### Defined in

[packages/color-core/src/color.ts:153](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/color.ts#L153)

***

### monochromatic()

> **monochromatic**(`count`?): [`Color`](Color.md)[]

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `count`? | `number` |

#### Returns

[`Color`](Color.md)[]

#### Defined in

[packages/color-core/src/color.ts:138](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/color.ts#L138)

***

### setAlpha()

> **setAlpha**(`value`): [`Color`](Color.md)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `number` |

#### Returns

[`Color`](Color.md)

#### Defined in

[packages/color-core/src/color.ts:160](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/color.ts#L160)

***

### shades()

> **shades**(`count`?): [`Color`](Color.md)[]

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `count`? | `number` |

#### Returns

[`Color`](Color.md)[]

#### Defined in

[packages/color-core/src/color.ts:141](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/color.ts#L141)

***

### splitComplementary()

> **splitComplementary**(`angle`?): [[`Color`](Color.md), [`Color`](Color.md), [`Color`](Color.md)]

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `angle`? | `number` |

#### Returns

[[`Color`](Color.md), [`Color`](Color.md), [`Color`](Color.md)]

#### Defined in

[packages/color-core/src/color.ts:137](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/color.ts#L137)

***

### square()

> **square**(): [[`Color`](Color.md), [`Color`](Color.md), [`Color`](Color.md), [`Color`](Color.md)]

#### Returns

[[`Color`](Color.md), [`Color`](Color.md), [`Color`](Color.md), [`Color`](Color.md)]

#### Defined in

[packages/color-core/src/color.ts:139](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/color.ts#L139)

***

### tetradic()

> **tetradic**(`angle`?): [[`Color`](Color.md), [`Color`](Color.md), [`Color`](Color.md), [`Color`](Color.md)]

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `angle`? | `number` |

#### Returns

[[`Color`](Color.md), [`Color`](Color.md), [`Color`](Color.md), [`Color`](Color.md)]

#### Defined in

[packages/color-core/src/color.ts:136](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/color.ts#L136)

***

### tints()

> **tints**(`count`?): [`Color`](Color.md)[]

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `count`? | `number` |

#### Returns

[`Color`](Color.md)[]

#### Defined in

[packages/color-core/src/color.ts:142](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/color.ts#L142)

***

### toAdobeRGB()

> **toAdobeRGB**(): [`AdobeRGB`](../type-aliases/AdobeRGB.md)

#### Returns

[`AdobeRGB`](../type-aliases/AdobeRGB.md)

#### Defined in

[packages/color-core/src/color.ts:122](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/color.ts#L122)

***

### toCIELuv()

> **toCIELuv**(): [`LUV`](../type-aliases/LUV.md)

#### Returns

[`LUV`](../type-aliases/LUV.md)

#### Defined in

[packages/color-core/src/color.ts:120](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/color.ts#L120)

***

### toCIExyY()

> **toCIExyY**(): [`CIExyY`](../type-aliases/CIExyY.md)

#### Returns

[`CIExyY`](../type-aliases/CIExyY.md)

#### Defined in

[packages/color-core/src/color.ts:121](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/color.ts#L121)

***

### toCmyk()

> **toCmyk**(): [`CMYK`](../type-aliases/CMYK.md)

#### Returns

[`CMYK`](../type-aliases/CMYK.md)

#### Defined in

[packages/color-core/src/color.ts:115](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/color.ts#L115)

***

### toHPLuv()

> **toHPLuv**(): [`HPLuv`](../type-aliases/HPLuv.md)

#### Returns

[`HPLuv`](../type-aliases/HPLuv.md)

#### Defined in

[packages/color-core/src/color.ts:119](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/color.ts#L119)

***

### toHSLuv()

> **toHSLuv**(): [`HSLuv`](../type-aliases/HSLuv.md)

#### Returns

[`HSLuv`](../type-aliases/HSLuv.md)

#### Defined in

[packages/color-core/src/color.ts:118](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/color.ts#L118)

***

### toHex()

> **toHex**(`includeAlpha`): `string`

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `includeAlpha` | `boolean` | `false` |

#### Returns

`string`

#### Defined in

[packages/color-core/src/color.ts:107](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/color.ts#L107)

***

### toHsi()

> **toHsi**(): [`HSI`](../type-aliases/HSI.md)

#### Returns

[`HSI`](../type-aliases/HSI.md)

#### Defined in

[packages/color-core/src/color.ts:111](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/color.ts#L111)

***

### toHsl()

> **toHsl**(): [`HSL`](../type-aliases/HSL.md)

#### Returns

[`HSL`](../type-aliases/HSL.md)

#### Defined in

[packages/color-core/src/color.ts:109](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/color.ts#L109)

***

### toHsv()

> **toHsv**(): [`HSV`](../type-aliases/HSV.md)

#### Returns

[`HSV`](../type-aliases/HSV.md)

#### Defined in

[packages/color-core/src/color.ts:110](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/color.ts#L110)

***

### toHwb()

> **toHwb**(): [`HWB`](../type-aliases/HWB.md)

#### Returns

[`HWB`](../type-aliases/HWB.md)

#### Defined in

[packages/color-core/src/color.ts:112](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/color.ts#L112)

***

### toLab()

> **toLab**(): [`LAB`](../type-aliases/LAB.md)

#### Returns

[`LAB`](../type-aliases/LAB.md)

#### Defined in

[packages/color-core/src/color.ts:125](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/color.ts#L125)

***

### toLabD50()

> **toLabD50**(): [`LAB`](../type-aliases/LAB.md)

#### Returns

[`LAB`](../type-aliases/LAB.md)

#### Defined in

[packages/color-core/src/color.ts:126](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/color.ts#L126)

***

### toLch()

> **toLch**(): [`LCH`](../type-aliases/LCH.md)

#### Returns

[`LCH`](../type-aliases/LCH.md)

#### Defined in

[packages/color-core/src/color.ts:113](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/color.ts#L113)

***

### toOklab()

> **toOklab**(): [`Oklab`](../type-aliases/Oklab.md)

#### Returns

[`Oklab`](../type-aliases/Oklab.md)

#### Defined in

[packages/color-core/src/color.ts:116](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/color.ts#L116)

***

### toOklch()

> **toOklch**(): [`Oklch`](../type-aliases/Oklch.md)

#### Returns

[`Oklch`](../type-aliases/Oklch.md)

#### Defined in

[packages/color-core/src/color.ts:117](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/color.ts#L117)

***

### toRgb()

> **toRgb**(): [`RGB`](../type-aliases/RGB.md)

Converts the color to RGB format.

#### Returns

[`RGB`](../type-aliases/RGB.md)

#### Defined in

[packages/color-core/src/color.ts:102](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/color.ts#L102)

***

### toSrgb()

> **toSrgb**(): [`SRGB`](../type-aliases/SRGB.md)

#### Returns

[`SRGB`](../type-aliases/SRGB.md)

#### Defined in

[packages/color-core/src/color.ts:108](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/color.ts#L108)

***

### toString()

> **toString**(`includeAlpha`): `string`

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `includeAlpha` | `boolean` | `false` |

#### Returns

`string`

#### Defined in

[packages/color-core/src/color.ts:158](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/color.ts#L158)

***

### toXyz()

> **toXyz**(): [`XYZ`](../interfaces/XYZ.md)

#### Returns

[`XYZ`](../interfaces/XYZ.md)

#### Defined in

[packages/color-core/src/color.ts:123](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/color.ts#L123)

***

### toXyzD50()

> **toXyzD50**(): [`XYZ`](../interfaces/XYZ.md)

#### Returns

[`XYZ`](../interfaces/XYZ.md)

#### Defined in

[packages/color-core/src/color.ts:124](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/color.ts#L124)

***

### toYuv()

> **toYuv**(): [`YUV`](../type-aliases/YUV.md)

#### Returns

[`YUV`](../type-aliases/YUV.md)

#### Defined in

[packages/color-core/src/color.ts:114](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/color.ts#L114)

***

### tones()

> **tones**(`count`?): [`Color`](Color.md)[]

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `count`? | `number` |

#### Returns

[`Color`](Color.md)[]

#### Defined in

[packages/color-core/src/color.ts:143](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/color.ts#L143)

***

### triadic()

> **triadic**(): [[`Color`](Color.md), [`Color`](Color.md), [`Color`](Color.md)]

#### Returns

[[`Color`](Color.md), [`Color`](Color.md), [`Color`](Color.md)]

#### Defined in

[packages/color-core/src/color.ts:135](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/color.ts#L135)

***

### setPrecision()

> `static` **setPrecision**(`precision`): `void`

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `precision` | `number` |

#### Returns

`void`

#### Defined in

[packages/color-core/src/color.ts:156](https://github.com/iamlite/color-core-mono-test/blob/d94d70fcd3b8bc32b54a8388048088ead1ff133f/packages/color-core/src/color.ts#L156)
