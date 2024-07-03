# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned Features

- Color palette generation
- Color accessibility functions (contrast ratio, WCAG compliance)
- Color mixing and blending functions
- Support for additional color spaces (e.g., XYZ, YUV)

## [0.2.0] - 2024-07-02

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

- Initial release of the next-color library
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

[Unreleased]: https://github.com/iamlite/next-colors/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/iamlite/next-colors/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/iamlite/next-colors/releases/tag/v0.1.0
