import React, { FC } from 'react';
import { render, cleanup } from '@testing-library/react';
import Resizer from './index';

afterEach(cleanup);

describe('Resizer', () => {
  test('render Resizer', () => {
    const { getByTestId } = render(<Resizer />);
    expect(getByTestId('left-width-resizer')).toBeInTheDocument();
    expect(getByTestId('right-width-resizer')).toBeInTheDocument();
    expect(getByTestId('top-height-resizer')).toBeInTheDocument();
    expect(getByTestId('bottom-height-resizer')).toBeInTheDocument();
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

    const leftWidthResizer = getByTestId('left-width-resizer');
    const rightWidthResizer = getByTestId('right-width-resizer');
    const topHeightResizer = getByTestId('top-height-resizer');
    const bottomHeightResizer = getByTestId('bottom-height-resizer');

    expect(leftWidthResizer).toBeInTheDocument();
    expect(rightWidthResizer).toBeInTheDocument();
    expect(topHeightResizer).toBeInTheDocument();
    expect(bottomHeightResizer).toBeInTheDocument();

    leftWidthResizer.dispatchEvent(
      new MouseEvent('mousedown', { bubbles: true })
    );
    leftWidthResizer.dispatchEvent(
      new MouseEvent('mousemove', { bubbles: true })
    );
    leftWidthResizer.dispatchEvent(
      new MouseEvent('mouseup', { bubbles: true })
    );

    rightWidthResizer.dispatchEvent(
      new MouseEvent('mousedown', { bubbles: true })
    );
    rightWidthResizer.dispatchEvent(
      new MouseEvent('mousemove', { bubbles: true })
    );
    rightWidthResizer.dispatchEvent(
      new MouseEvent('mouseup', { bubbles: true })
    );

    topHeightResizer.dispatchEvent(
      new MouseEvent('mousedown', { bubbles: true })
    );
    topHeightResizer.dispatchEvent(
      new MouseEvent('mousemove', { bubbles: true })
    );
    topHeightResizer.dispatchEvent(
      new MouseEvent('mouseup', { bubbles: true })
    );

    bottomHeightResizer.dispatchEvent(
      new MouseEvent('mousedown', { bubbles: true })
    );
    bottomHeightResizer.dispatchEvent(
      new MouseEvent('mousemove', { bubbles: true })
    );
    bottomHeightResizer.dispatchEvent(
      new MouseEvent('mouseup', { bubbles: true })
    );

    expect(setStyle).toBeCalledTimes(4);
    expect(getRect).toBeCalledTimes(4);
  });
});
