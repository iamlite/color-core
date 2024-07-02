# Development Guidelines for next-colors

## File Structure

- Each function should be in its own file within the appropriate category folder (conversions, manipulation, harmony, utils).
- Use kebab-case for filenames, e.g., `hex-to-rgb.ts`.

## Function Design

1. Each function should be a pure function with no side effects.
2. Use TypeScript for type safety.
3. Include JSDoc comments for better documentation.

Example:

```typescript
/**
 * Converts a hex color code to RGB values.
 * @param {string} hex - The hex color code.
 * @returns {RGB} An object with r, g, and b properties.
 */
export function hexToRgb(hex: string): RGB {
  // Implementation
}
```

## Exports

1. Export each function as a named export from its file.
2. In `src/index.ts`, re-export all functions:

```typescript
export { hexToRgb } from './conversions/hex-to-rgb';
export { rgbToHex } from './conversions/rgb-to-hex';
// ... other exports
```

## Usage

Users should be able to import functions either individually or all at once:

```typescript
import { hexToRgb, rgbToHex } from 'next-colors';
// ors
import * as nextColors from 'next-colors';
```

## Testing

1. Write unit tests for each function in a corresponding test file.
2. Use the test-site for integration testing and real-world usage examples.

## Documentation

1. Keep the README.md updated with new functions and usage examples.
2. Update the CHANGELOG.md for each new version.
3. Use JSDoc comments in your code for better IDE integration and documentation generation.

## Versioning

Follow Semantic Versioning (SemVer) for version numbers:

- MAJOR version for incompatible API changes,
- MINOR version for backwards-compatible functionality additions,
- PATCH version for backwards-compatible bug fixes.

## Publishing

1. Update version in package.json
2. Update CHANGELOG.md
3. Commit changes
4. Create a git tag for the version
5. Push to GitHub
6. Publish to npm with `npm publish`

Remember to build the project before publishing: `npm run build`
