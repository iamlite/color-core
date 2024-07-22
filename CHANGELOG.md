---

id: changelog
title: Changelog
sidebar_label: Changelog

---

<!-- markdownlint-disable MD024 -->

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.3] - 2024-07-21

### Added

- New color scale functions:
  - Sequential Scale
  - Diverging Scale
  - Multi-Hue Sequential Scale
  - Perceptually Uniform Scale
  - Qualitative Scale

### Changed

- New git structure using a monorepo setup with yarn workspaces
- New documentation site built with Docusaurus v3 + typedoc
- Updated demo site to showcase new color scale functions

## [1.3.1] - 2024-07-17

### Changed

- Updated SRGB type definitions to include prefix to avoid conflicts with other color spaces

## [1.3.0] - 2024-07-17

## BIG UPDATE 🎉

### Added

- [X] Support for AdobeRGB, Oklab, Oklch, HSLuv, HPLuv, CIExyY, CIELuv, HWB, sRGB, and HSI color spaces
- [X] Support for converting between D50 and D65 white points for XYZ and Lab color spaces
- [X] New conversion functions:
  - `rgbToOklab()`, `oklabToRgb()`
  - `rgbToOklch()`, `oklchToRgb()`
  - `rgbToHSLuv()`, `hsluvToRgb()`
  - `rgbToHPLuv()`, `hpluvToRgb()`
  - `rgbToCIExyY()`, `ciexyYToRgb()`
  - `rgbToCIELuv()`, `cieLuvToRgb()`
  - `rgbToHwb()`, `hwbToRgb()`
  - `rgbToHsi()`, `hsiToRgb()`
  - `rgbToSrgb()`, `srgbToRgb()`
  - `adobeRGBToRGB()`, `rgbToAdobeRGB()`
  - `xyzD50ToD65()`, `xyzD65ToD50()`
  - `xyzD50ToRgb()`, `rgbToXyzD50()`
  - `labD50ToRgb()`, `rgbToLabD50()`
- [X] New methods in Color class: `toOklab()`, `toOklch()`, `toHSLuv()`, `toHPLuv()`, `toCIExyY()`, `toCIELuv()`, `toHWB()`, `toHSI()`, `toSrgb()`, `toAdobeRGB()`
- [X] Updated demo site to showcase new color spaces and conversions

### Changed

- NAME CHANGE! 'next-color' is now 'color-core'
- New Demo Site! Built with next-ui :artist:
- Updated type definitions to include Oklab, Oklch, HSLuv, HPLuv, CIExyY, and CIELUV
- Expanded test coverage for new color spaces, refactored tests to be less dumb.
- New calculations for LCH color space to improve accuracy
- New calculations for XYZ and LAB color spaces to account for white point differences

[Documentation](https://color-core.com/docs)

## [1.2.0] - 2024-07-07

### Added

- Color naming functionality: `getColorName()` method to get the closest named color from api.color.pizza based on the provided color
- Brightness calculation:
  - `getBrightness()` method to calculate perceived brightness
  - `isLight()` method to determine if a color is light or dark

### Changed

- Improved performance of color conversion functions
- Refactored color manipulation methods for better readability and maintainability
- Updated demo site with new features and examples
- Improved error handling and type safety
- Improved documentation with more examples and explanations
- Enhanced test coverage
- Added CI/CD pipeline for automated testing and deployment

### Fixed

- Edge case in `mix()` function where alpha values were not being considered correctly
- Precision loss in successive color space conversions
- Addressed potential "Maximum update depth exceeded" error during rapid color picker interactions
- Improved performance of ColorPicker component for better performance during rapid color changes

## [1.1.0] - 2024-07-07

### Fixed

- removed test files from npm package - woops!

## [1.1.0] - 2024-07-07

### Added

- SO many tests! 🎉

### Changed

- Improved performance of RGB to HSL conversion
- Other minor conversion optimizations
- Enhanced type safety for all color manipulation functions
- Updated demo site with new features and examples

### Fixed

- Edge case in `mix()` function where alpha values were not being considered correctly
- Precision loss in successive color space conversions

### Deprecated

- Compound color harmony function in favor of Split-Complementary

### Security

- Updated dependencies to address potential vulnerabilities

### Documentation

- Added examples for all new features in README.md
- Improved API documentation with more detailed explanations and use cases + a new fancy theme

## [1.0.1] - 2024-07-05

### Changed

- Optimized ColorPicker component for better performance during rapid color changes.
- Implemented debouncing for color updates to reduce unnecessary re-renders.

### Added

- useCallback implementation in ColorPicker for improved render efficiency.
- New `hueSliderHeight` prop in ColorPicker for customizable hue slider height.

### Fixed

- Addressed potential "Maximum update depth exceeded" error during rapid color picker interactions.

## [1.0.0] - 2024-07-04

### Added

- New Color Picker functionality
- Unified Color class for easy color manipulations
- Additional color harmony functions:
  - Compound
  - Double Split-Complementary
  - Shades
  - Square
  - Tints
  - Tones
- New color manipulation methods:
  - adjustLightness
  - adjustSaturation
  - adjustHue
  - adjustAlpha
  - invert
  - grayscale
  - mix
- Support for XYZ and YUV color spaces
- Improved type safety and error handling

### Changed

- Upgraded from version 0.2.0 to 1.0.0
- Refactored and optimized existing color conversion and harmony functions
- Enhanced documentation and examples in README.md

### Fixed

- Various bug fixes and performance improvements

## [0.2.0] - 2024-07-03

### Added

- New color harmony functions:
  - Square
  - Double Split-Complementary
  - Compound (Accented Analog)
  - Shades
  - Tints
  - Tones
- Extended Color class with new harmony methods

### Changed

- /

### Fixed

- /

## [0.1.2] - 2024-07-02

### Added

- Color harmony functions:
  - Complementary
  - Analogous
  - Triadic
  - Tetradic (Rectangle)
  - Split-Complementary
  - Monochromatic
- Unified Color class for easy color manipulations
- Demo site showcasing color conversions and harmonies

### Changed

- Improved TypeScript typings for better developer experience
- Enhanced error handling for invalid color inputs

### Fixed

- Edge cases in color conversion algorithms

## [0.1.0] - 2024-07-01

### Added

- Initial release of the color-core library
- Color conversion functions:
  - RGB to/from HEX
  - RGB to/from HSL
  - RGB to/from HSV
  - RGB to/from CMYK
  - RGB to/from LAB
  - RGB to/from LCH
- Basic TypeScript support with type definitions
- Basic error handling for invalid inputs
- Test suite for verifying color conversions

[0.2.0]: https://github.com/iamlite/color-core/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/iamlite/color-core/releases/tag/v0.1.0
