'use client';

import clsx from 'clsx';
import { Color } from 'color-core';
import React, { createContext, useContext, useState } from 'react';

interface ColorContextType {
  color: Color;
  setColor: React.Dispatch<React.SetStateAction<Color>>;
}

const ColorContext = createContext<ColorContextType | undefined>(undefined);

interface ColorContextProviderProps {
  children: React.ReactNode;
  className?: string;
  initialColor?: string;
}

/**
 * ColorContextProvider component that provides color context and applies dynamic background.
 * @param {ColorContextProviderProps} props - The props for the ColorContextProvider.
 * @returns A Provider component for the ColorContext with dynamic background.
 */
export function ColorContextProvider({ children, className, initialColor = 'string' }: ColorContextProviderProps) {
  const [color, setColor] = useState(new Color(initialColor));

  const backgroundStyle = {
    background: `radial-gradient(circle, ${color.toHex()} 0%, #1F293700 100%)`,
  };

  return (
    <ColorContext.Provider value={{ color, setColor }}>
      <div
        className={clsx(className)}
        style={backgroundStyle}>
        {children}
      </div>
    </ColorContext.Provider>
  );
}

/**
 * Custom hook to use the color context.
 * @returns The current color context value.
 * @throws {Error} If used outside of a ColorContextProvider.
 */
export function useColor() {
  const context = useContext(ColorContext);
  if (context === undefined) {
    throw new Error('useColor must be used within a ColorContextProvider');
  }
  return context;
}
