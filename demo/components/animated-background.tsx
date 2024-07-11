'use client';

import { Color } from 'color-core';
import React, { useCallback, useEffect, useRef } from 'react';

interface BokehLight {
  x: number;
  y: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
  phase: number;
}

interface AnimatedBackgroundProps {
  color: Color;
  lightCount?: number;
}

/**
 * AnimatedBackground component that creates a floating bokeh effect
 * with improved performance and code structure.
 *
 * @param {AnimatedBackgroundProps} props - The props for the AnimatedBackground.
 * @returns A canvas element with an animated bokeh effect background.
 */
export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ color, lightCount = 50 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const createLight = useCallback(
    (width: number, height: number): BokehLight => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 150 + 100,
      color: color
        .adjustLightness(Math.random() * 40 - 20)
        .adjustSaturation(Math.random() * 20 - 10)
        .toHex(),
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      phase: Math.random() * Math.PI * 2,
    }),
    [color]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let bokehLights: BokehLight[] = [];

    const initLights = () => {
      const { width, height } = canvas;
      bokehLights = Array.from({ length: lightCount }, () => createLight(width, height));
    };

    const drawBokehLight = (light: BokehLight, fadeOpacity: number) => {
      ctx.beginPath();
      ctx.arc(light.x, light.y, light.size, 0, Math.PI * 2);
      ctx.fillStyle = new Color(light.color).setAlpha(fadeOpacity).toString();
      ctx.fill();
    };

    const updateLight = (light: BokehLight) => {
      const { width, height } = canvas;

      light.x += light.vx;
      light.y += light.vy;

      if (light.x < 0 || light.x > width) {
        light.vx *= -1 * (0.9 + Math.random() * 0.2);
        light.x = Math.max(0, Math.min(width, light.x));
      }
      if (light.y < 0 || light.y > height) {
        light.vy *= -1 * (0.9 + Math.random() * 0.2);
        light.y = Math.max(0, Math.min(height, light.y));
      }

      light.phase += 0.02;
      return Math.sin(light.phase) * 0.8 + 0.2;
    };

    const updateAndDrawScene = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bokehLights.forEach((light) => {
        const fadeOpacity = updateLight(light);
        drawBokehLight(light, fadeOpacity);
      });

      animationFrameId = requestAnimationFrame(updateAndDrawScene);
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initLights();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    updateAndDrawScene();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, lightCount, createLight]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
        filter: 'blur(64px)',
        opacity: 0.5,
      }}
    />
  );
};
