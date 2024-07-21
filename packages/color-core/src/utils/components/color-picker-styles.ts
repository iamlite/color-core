import React from 'react';

const defaultStyles = {
    container: {
        style: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            boxSizing: 'border-box' as const,
        } as React.CSSProperties,
        className: 'color-picker-container'
    },
    colorPicker: {
        style: {
            boxSizing: 'border-box' as const,
            display: 'flex',
            flexDirection: 'column' as const,
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
        } as React.CSSProperties,
        className: 'color-picker'
    },
    saturationValueArea: {
        style: {
            width: '100%',
            height: 'calc(100% - 60px)',
            position: 'relative' as const,
            cursor: 'crosshair',
            overflow: 'hidden',
        } as React.CSSProperties,
        className: 'saturation-value-area'
    },
    saturationValueCursor: {
        style: {
            position: 'absolute' as const,
            width: '12px',
            height: '12px',
            border: '2px solid #fff',
            borderRadius: '50%',
            boxShadow: '0 0 0 1px rgba(0,0,0,0.2)',
            transform: 'translate(-50%, -50%)',
        } as React.CSSProperties,
        className: 'saturation-value-cursor'
    },
    hueSlider: {
        style: {
            width: '100%',
            marginTop: '10px',
            position: 'relative' as const,
            cursor: 'pointer',
            overflow: 'hidden',
            background: 'linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)',
        } as React.CSSProperties,
        className: 'hue-slider'
    },
    hueSliderCursor: {
        style: {
            position: 'absolute' as const,
            width: '6px',
            height: '100%',
            background: '#fff',
            border: '1px solid rgba(0,0,0,0.2)',
            boxShadow: '0 0 2px rgba(0,0,0,0.2)',
            transform: 'translateX(-50%)',
        } as React.CSSProperties,
        className: 'hue-slider-cursor'
    },
    colorInputs: {
        style: {
            display: 'flex',
            alignItems: 'center',
            marginTop: '15px',
            width: '100%',
        } as React.CSSProperties,
        className: 'color-inputs'
    },
    hexInput: {
        style: {
            flex: 1,
            marginRight: '10px',
            padding: '8px',
        } as React.CSSProperties,
        className: 'hex-input'
    },
    colorPreview: {
        style: {
            width: '40px',
            height: '40px',
        } as React.CSSProperties,
        className: 'color-preview'
    },
};

export default defaultStyles;