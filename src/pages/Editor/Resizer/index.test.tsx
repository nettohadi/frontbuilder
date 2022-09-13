import React, { FC } from 'react';
import { render, cleanup } from '@testing-library/react';
import Resizer from './index';

afterEach(cleanup);

describe('Resizer', () => {
  test('render Resizer', () => {
    const { getByTestId } = render(<Resizer />);
    expect(getByTestId('width-resizer')).toBeInTheDocument();
    expect(getByTestId('height-resizer')).toBeInTheDocument();
  });

  test('call setStyle and getRect', () => {
    const setStyle = jest.fn();
    const getRect = jest.fn();

    getRect.mockImplementation(() => {
      return {
        left: 0,
        top: 0,
      };
    });

    const { getByTestId } = render(
      <Resizer setStyle={setStyle} getRect={getRect} />
    );
    expect(getByTestId('width-resizer')).toBeInTheDocument();
    expect(getByTestId('height-resizer')).toBeInTheDocument();

    const widthResizer = getByTestId('width-resizer');
    widthResizer.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    widthResizer.dispatchEvent(new MouseEvent('mousemove', { bubbles: true }));
    widthResizer.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    expect(setStyle).toBeCalled();
    expect(getRect).toBeCalled();

    const heightResizer = getByTestId('height-resizer');
    heightResizer.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    heightResizer.dispatchEvent(new MouseEvent('mousemove', { bubbles: true }));
    heightResizer.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    expect(setStyle).toBeCalled();
    expect(getRect).toBeCalled();
  });
});
