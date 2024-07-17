import { useTheme } from 'next-themes';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

/**
 * Props for the ThemeAwareLogo component.
 * @interface ThemeAwareLogoProps
 * @property {string} lightSrc - The source URL for the light theme logo.
 * @property {string} darkSrc - The source URL for the dark theme logo.
 * @property {number} width - The desired width of the logo image.
 * @property {number} [height] - The desired height of the logo image. If not provided, it will be calculated based on the aspect ratio.
 * @property {string} [alt='Logo'] - The alt text for the logo image.
 * @property {number} [maxWidth] - The maximum width of the logo image.
 * @property {React.CSSProperties} [containerStyle] - Additional styles for the container div.
 */
interface ThemeAwareLogoProps {
  lightSrc: string;
  darkSrc: string;
  width: number;
  height?: number;
  alt?: string;
  maxWidth?: number;
  containerStyle?: React.CSSProperties;
}

/**
 * A self-centering logo component that switches between light and dark theme images.
 *
 * @param {ThemeAwareLogoProps} props - The props for the component.
 * @returns {React.ReactElement} The rendered logo component.
 */
const ThemeAwareLogo: React.FC<ThemeAwareLogoProps> = ({
  lightSrc,
  darkSrc,
  width,
  height,
  alt = 'Logo',
  maxWidth,
  containerStyle = {},
}) => {
  const { theme, resolvedTheme } = useTheme();
  const [logoSrc, setLogoSrc] = useState(lightSrc);

  /**
   * Calculate the height based on the original aspect ratio if not provided.
   * @returns {number} The calculated height of the image.
   */
  const calculateHeight = (): number => {
    if (height) return height;
    const aspectRatio = 3040 / 760; // Original aspect ratio
    return Math.round(width / aspectRatio);
  };

  useEffect(() => {
    // Update logo source when theme changes or on initial load
    setLogoSrc(resolvedTheme === 'dark' || theme === 'dark' ? darkSrc : lightSrc);
  }, [theme, resolvedTheme, lightSrc, darkSrc]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        ...containerStyle,
      }}>
      <div
        style={{
          maxWidth: maxWidth || 'none',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          src={logoSrc}
          width={width}
          height={calculateHeight()}
          alt={alt}
          style={{ width: 'auto', height: 'auto', maxWidth: '100%' }}
        />
      </div>
    </div>
  );
};

export default ThemeAwareLogo;
