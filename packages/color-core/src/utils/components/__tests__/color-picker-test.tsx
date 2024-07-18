import '@testing-library/jest-dom';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import ColorPicker from '../color-picker';

jest.useFakeTimers();

// Helper function to create a mock MouseEvent
function createMockMouseEvent(x: number, y: number, target: HTMLDivElement): React.MouseEvent<HTMLDivElement> {
  return {
    clientX: x,
    clientY: y,
    target: target,
    currentTarget: target,
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
    nativeEvent: {
      offsetX: x,
      offsetY: y,
    },
    bubbles: true,
    cancelable: true,
    button: 0,
    buttons: 1,
    altKey: false,
    ctrlKey: false,
    metaKey: false,
    shiftKey: false,
    type: 'mousedown',
  } as unknown as React.MouseEvent<HTMLDivElement>;
}

describe('ColorPicker', () => {
  it('renders without crashing', () => {
    render(<ColorPicker />);
    expect(screen.getByTestId('color-picker-container')).toBeInTheDocument();
  });

  it('displays the initial color', () => {
    const initialColor = { r: 255, g: 0, b: 0 };
    render(<ColorPicker initialColor={initialColor} />);
    expect(screen.getByRole('textbox')).toHaveValue('#ff0000');
  });

  it('calls onChange when color is changed via input', async () => {
    const onChange = jest.fn();
    render(<ColorPicker onChange={onChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '#00ff00' } });

    jest.runAllTimers();

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({ r: 0, g: 255, b: 0 });
    });
  });

  it('updates the color preview when hex input changes', () => {
    render(<ColorPicker />);

    const input = screen.getByRole('textbox');
    const preview = screen.getByTestId('color-preview');

    fireEvent.change(input, { target: { value: '#0000ff' } });

    expect(preview).toHaveStyle('background-color: #0000ff');
  });

  it('handles invalid hex input gracefully', () => {
    render(<ColorPicker />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'invalid' } });

    // The input should not change for invalid input
    expect(input).not.toHaveValue('invalid');
  });

  it('updates color when clicking on the saturation-value area', async () => {
    const onChange = jest.fn();
    render(<ColorPicker onChange={onChange} />);

    const svArea = screen.getByTestId('saturation-value-area');
    fireEvent.mouseDown(svArea, { clientX: 50, clientY: 50 });

    jest.runAllTimers();

    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
    });
  });

  it('updates color when clicking on the hue slider', async () => {
    const onChange = jest.fn();
    render(<ColorPicker onChange={onChange} />);

    const hueSlider = screen.getByTestId('hue-slider');
    fireEvent.mouseDown(hueSlider, { clientX: 50, clientY: 0 });

    jest.runAllTimers();

    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
    });
  });

  it('updates color continuously when dragging on saturation-value area', async () => {
    const onChange = jest.fn();
    render(<ColorPicker onChange={onChange} />);

    const svArea = screen.getByTestId('saturation-value-area');
    fireEvent.mouseDown(svArea, { clientX: 0, clientY: 0 });
    fireEvent.mouseMove(svArea, { clientX: 50, clientY: 50, buttons: 1 });
    fireEvent.mouseMove(svArea, { clientX: 100, clientY: 100, buttons: 1 });

    jest.runAllTimers();

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });

  it('updates color continuously when dragging on hue slider', async () => {
    const onChange = jest.fn();
    render(<ColorPicker onChange={onChange} />);

    const hueSlider = screen.getByTestId('hue-slider');
    fireEvent.mouseDown(hueSlider, { clientX: 0, clientY: 0 });
    fireEvent.mouseMove(hueSlider, { clientX: 50, clientY: 0, buttons: 1 });
    fireEvent.mouseMove(hueSlider, { clientX: 100, clientY: 0, buttons: 1 });

    jest.runAllTimers();

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });

  it('applies custom styles', () => {
    const customStyle = { border: '2px solid red' };
    render(<ColorPicker style={customStyle} />);

    const picker = screen.getByTestId('color-picker');
    expect(picker).toHaveStyle('border: 2px solid red');
  });

  it('respects width and height props', () => {
    render(
      <ColorPicker
        width={400}
        height={300}
      />
    );

    const picker = screen.getByTestId('color-picker');
    expect(picker).toHaveStyle('width: 400px; height: 300px');
  });

  it('applies default class names when not provided', () => {
    render(<ColorPicker />);
    const container = screen.getByTestId('color-picker-container');
    const picker = screen.getByTestId('color-picker');
    const svArea = screen.getByTestId('saturation-value-area');
    const hueSlider = screen.getByTestId('hue-slider');
    const input = screen.getByRole('textbox');
    const preview = screen.getByTestId('color-preview');

    expect(container).toHaveClass('color-picker-container');
    expect(picker).toHaveClass('color-picker');
    expect(svArea).toHaveClass('saturation-value-area');
    expect(hueSlider).toHaveClass('hue-slider');
    expect(input).toHaveClass('hex-input');
    expect(preview).toHaveClass('color-preview');
  });

  it('applies custom class names when provided', () => {
    render(
      <ColorPicker
        className='custom-picker'
        saturationValueAreaClassName='custom-sv-area'
        saturationValueCursorClassName='custom-sv-cursor'
        hueSliderClassName='custom-hue-slider'
        hueSliderCursorClassName='custom-hue-cursor'
        inputClassName='custom-input'
        previewClassName='custom-preview'
        containerClassName='custom-container'
      />
    );

    expect(screen.getByTestId('color-picker-container')).toHaveClass('custom-container');
    expect(screen.getByTestId('color-picker')).toHaveClass('custom-picker');
    expect(screen.getByTestId('saturation-value-area')).toHaveClass('custom-sv-area');
    expect(screen.getByTestId('hue-slider')).toHaveClass('custom-hue-slider');
    expect(screen.getByRole('textbox')).toHaveClass('custom-input');
    expect(screen.getByTestId('color-preview')).toHaveClass('custom-preview');
  });

  it('applies custom container style', () => {
    const customContainerStyle = { padding: '20px' };
    render(<ColorPicker containerStyle={customContainerStyle} />);
    expect(screen.getByTestId('color-picker-container')).toHaveStyle('padding: 20px');
  });

  it('uses default hue slider height when not provided', () => {
    render(<ColorPicker />);
    const hueSlider = screen.getByTestId('hue-slider');
    expect(hueSlider).toHaveStyle('height: 20px');
  });

  it('handles saturation-value change when ref is available', async () => {
    const onChange = jest.fn();
    render(<ColorPicker onChange={onChange} />);

    const svArea = screen.getByTestId('saturation-value-area');
    // Mock getBoundingClientRect with a complete DOMRect object
    svArea.getBoundingClientRect = jest.fn(() => ({
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      top: 0,
      right: 100,
      bottom: 100,
      left: 0,
      toJSON: () => {},
    }));

    fireEvent.mouseDown(svArea, { clientX: 50, clientY: 50 });

    jest.runAllTimers();

    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
    });
  });

  it('handles hue change when ref is available', async () => {
    const onChange = jest.fn();
    render(<ColorPicker onChange={onChange} />);

    const hueSlider = screen.getByTestId('hue-slider');
    // Mock getBoundingClientRect with a complete DOMRect object
    hueSlider.getBoundingClientRect = jest.fn(() => ({
      x: 0,
      y: 0,
      width: 360,
      height: 20,
      top: 0,
      right: 360,
      bottom: 20,
      left: 0,
      toJSON: () => {},
    }));

    fireEvent.mouseDown(hueSlider, { clientX: 180 });

    jest.runAllTimers();

    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
    });
  });

  it('applies all custom class names', () => {
    render(
      <ColorPicker
        className='custom-picker'
        saturationValueAreaClassName='custom-sv-area'
        saturationValueCursorClassName='custom-sv-cursor'
        hueSliderClassName='custom-hue-slider'
        hueSliderCursorClassName='custom-hue-cursor'
        inputClassName='custom-input'
        previewClassName='custom-preview'
        containerClassName='custom-container'
      />
    );

    expect(screen.getByTestId('color-picker-container')).toHaveClass('custom-container');
    expect(screen.getByTestId('color-picker')).toHaveClass('custom-picker');
    expect(screen.getByTestId('saturation-value-area')).toHaveClass('custom-sv-area');
    expect(screen.getByTestId('hue-slider')).toHaveClass('custom-hue-slider');
    expect(screen.getByRole('textbox')).toHaveClass('custom-input');
    expect(screen.getByTestId('color-preview')).toHaveClass('custom-preview');

    // Check for cursor classes
    const svArea = screen.getByTestId('saturation-value-area');
    expect(svArea.firstElementChild).toHaveClass('custom-sv-cursor');

    const hueSlider = screen.getByTestId('hue-slider');
    expect(hueSlider.firstElementChild).toHaveClass('custom-hue-cursor');
  });

  it('uses custom hue slider height', () => {
    render(<ColorPicker hueSliderHeight={30} />);
    const hueSlider = screen.getByTestId('hue-slider');
    expect(hueSlider).toHaveStyle('height: 30px');
  });

  it('handles saturation-value change with mouse move', async () => {
    const onChange = jest.fn();
    render(<ColorPicker onChange={onChange} />);

    const svArea = screen.getByTestId('saturation-value-area');
    svArea.getBoundingClientRect = jest.fn(() => ({
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      top: 0,
      left: 0,
      right: 100,
      bottom: 100,
      toJSON: () => {},
    }));

    fireEvent.mouseDown(svArea, { clientX: 0, clientY: 0 });
    fireEvent.mouseMove(svArea, { clientX: 50, clientY: 50, buttons: 1 });

    jest.runAllTimers();

    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
    });
  });

  it('handles hue change with mouse move', async () => {
    const onChange = jest.fn();
    render(<ColorPicker onChange={onChange} />);

    const hueSlider = screen.getByTestId('hue-slider');
    hueSlider.getBoundingClientRect = jest.fn(() => ({
      x: 0,
      y: 0,
      width: 360,
      height: 20,
      top: 0,
      left: 0,
      right: 360,
      bottom: 20,
      toJSON: () => {},
    }));

    fireEvent.mouseDown(hueSlider, { clientX: 0 });
    fireEvent.mouseMove(hueSlider, { clientX: 180, buttons: 1 });

    jest.runAllTimers();

    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
    });
  });

  it('handles saturation-value change with mouse move', async () => {
    const onChange = jest.fn();
    render(<ColorPicker onChange={onChange} />);

    const svArea = screen.getByTestId('saturation-value-area');
    const rect = svArea.getBoundingClientRect();

    fireEvent.mouseDown(svArea, {
      clientX: rect.left + 1,
      clientY: rect.top + 1,
    });
    fireEvent.mouseMove(svArea, {
      clientX: rect.left + rect.width / 2,
      clientY: rect.top + rect.height / 2,
      buttons: 1,
    });

    jest.runAllTimers();

    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
    });
  });

  it('handles hue change with mouse move', async () => {
    const onChange = jest.fn();
    render(<ColorPicker onChange={onChange} />);

    const hueSlider = screen.getByTestId('hue-slider');
    const rect = hueSlider.getBoundingClientRect();

    fireEvent.mouseDown(hueSlider, {
      clientX: rect.left,
      clientY: rect.top,
    });
    fireEvent.mouseMove(hueSlider, {
      clientX: rect.left + rect.width / 2,
      clientY: rect.top,
      buttons: 1,
    });

    jest.runAllTimers();

    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
    });
  });

  it('handles saturation-value change correctly', () => {
    const onChange = jest.fn();
    const { container } = render(<ColorPicker onChange={onChange} />);

    const svArea = container.querySelector('[data-testid="saturation-value-area"]') as HTMLDivElement;
    svArea.getBoundingClientRect = jest.fn(() => ({
      left: 0,
      top: 0,
      width: 200,
      height: 200,
      right: 200,
      bottom: 200,
      x: 0,
      y: 0,
      toJSON: () => {},
    }));

    act(() => {
      const mockEvent = createMockMouseEvent(100, 100, svArea);
      (ColorPicker as any).testHandlers.handleSaturationValueChange(mockEvent);
    });

    jest.runAllTimers();

    expect(onChange).toHaveBeenCalled();
  });

  it('handles hue change correctly', () => {
    const onChange = jest.fn();
    const { container } = render(<ColorPicker onChange={onChange} />);

    const hueSlider = container.querySelector('[data-testid="hue-slider"]') as HTMLDivElement;
    hueSlider.getBoundingClientRect = jest.fn(() => ({
      left: 0,
      top: 0,
      width: 360,
      height: 20,
      right: 360,
      bottom: 20,
      x: 0,
      y: 0,
      toJSON: () => {},
    }));

    act(() => {
      const mockEvent = createMockMouseEvent(180, 10, hueSlider);
      (ColorPicker as any).testHandlers.handleHueChange(mockEvent);
    });

    jest.runAllTimers();

    expect(onChange).toHaveBeenCalled();
  });

  it('updates the color on hue slider drag', async () => {
    const onChange = jest.fn();
    render(<ColorPicker onChange={onChange} />);
    const hueSlider = screen.getByTestId('hue-slider') as HTMLDivElement; // Ensure this matches your actual DOM

    expect(hueSlider).not.toBeNull(); // Make sure the element is found

    // Simulate dragging the mouse across the hue slider
    act(() => {
      const startEvent = createMockMouseEvent(10, 0, hueSlider);
      fireEvent.mouseDown(hueSlider, startEvent);
      fireEvent.mouseMove(hueSlider, { clientX: 50 }); // Adjust this if needed
      fireEvent.mouseUp(hueSlider);
    });

    await waitFor(() => {
      // This ensures that all promises and state updates have been processed
      expect(onChange).toHaveBeenCalledWith(expect.anything()); // :D
    });
  });
  it('does nothing when refs are null', () => {
    // Store the original useRef
    const originalUseRef = React.useRef;

    // Mock useRef only for this test
    React.useRef = jest.fn(() => ({ current: null }));

    const onChange = jest.fn();
    const { getByTestId } = render(<ColorPicker onChange={onChange} />);
    const saturationArea = getByTestId('saturation-value-area');

    fireEvent.mouseDown(saturationArea, { clientX: 100, clientY: 100 });

    // Expect onChange not to be called
    expect(onChange).not.toHaveBeenCalled();

    // Restore the original useRef after the test
    React.useRef = originalUseRef;
  });
  it('handles null refs safely', () => {
    render(<ColorPicker />);
    const saturationValueArea = screen.getByTestId('saturation-value-area');

    // Assuming the saturationValueArea might not always have a ref attached
    // depending on certain conditions (like props or state conditions not met)
    fireEvent.mouseDown(saturationValueArea, { clientX: 10, clientY: 10 });

    // Observations or assertions to see if function handles the null ref gracefully
    // This could be checking for errors, or that certain callbacks are not called
    expect(() => {
      fireEvent.mouseMove(saturationValueArea, { clientX: 20, clientY: 20 });
      fireEvent.mouseUp(saturationValueArea);
    }).not.toThrow();
  });
});
