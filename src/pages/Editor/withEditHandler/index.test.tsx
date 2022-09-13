import React, { FC } from 'react';
import { render, cleanup, act } from '@testing-library/react';
import withEditHandler from './index';
import { RESIZE_MARGIN } from '@src/constants';

afterEach(cleanup);

describe('withEditHandler', () => {
  const mockElement = {
    id: '1',
    type: 'div',
    props: {
      className: 'element',
      customprop: 'custom-prop',
      style: {
        height: '100px',
        width: '100px',
      },
    },
    children: [],
  };
  const Component: FC = () => <div>test</div>;
  const NewComponent = withEditHandler(Component);

  test('should return a new component with edit handler wrapper & resizer', () => {
    const { getByTestId } = render(
      <NewComponent element={mockElement} parent={null} />
    );
    expect(getByTestId('edit-handler-wrapper')).toBeInTheDocument();
    expect(getByTestId('left-width-resizer')).toBeInTheDocument();
    expect(getByTestId('right-width-resizer')).toBeInTheDocument();
    expect(getByTestId('top-height-resizer')).toBeInTheDocument();
    expect(getByTestId('bottom-height-resizer')).toBeInTheDocument();
  });

  test('width is resized when width resizer is clicked & moved', () => {
    const { getByTestId } = render(
      <NewComponent element={mockElement} parent={null} />
    );

    const rightWidthResizer = getByTestId('right-width-resizer');
    const leftWidthResizer = getByTestId('left-width-resizer');
    const editHandlerWrapper = getByTestId('edit-handler-wrapper');

    expect(editHandlerWrapper.style.width).toEqual('100px');
    expect(editHandlerWrapper.style.height).toEqual('100px');

    let clientX = 200;
    let clientY = 100;
    act(() => {
      rightWidthResizer.dispatchEvent(
        new MouseEvent('mousedown', { bubbles: true })
      );

      document.dispatchEvent(
        new MouseEvent('mousemove', {
          bubbles: true,
          clientX,
          clientY,
        })
      );
      document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    });

    expect(editHandlerWrapper.style.width).toEqual(
      `${clientX + RESIZE_MARGIN}px`
    );
    expect(editHandlerWrapper.style.height).toEqual('100px');

    clientX = 150;
    act(() => {
      leftWidthResizer.dispatchEvent(
        new MouseEvent('mousedown', { bubbles: true })
      );

      document.dispatchEvent(
        new MouseEvent('mousemove', {
          bubbles: true,
          clientX: 150,
          clientY: 100,
        })
      );
      document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    });

    expect(editHandlerWrapper.style.width).toEqual(
      `-${clientX - RESIZE_MARGIN}px`
    );
    expect(editHandlerWrapper.style.height).toEqual('100px');
  });

  test('height is resized when height resizer is clicked & moved', () => {
    const { getByTestId } = render(
      <NewComponent element={mockElement} parent={null} />
    );

    const bottomHeightResizer = getByTestId('bottom-height-resizer');
    const topHeightResizer = getByTestId('top-height-resizer');
    const editHandlerWrapper = getByTestId('edit-handler-wrapper');

    expect(editHandlerWrapper.style.width).toEqual('100px');
    expect(editHandlerWrapper.style.height).toEqual('100px');

    let clientX = 100;
    let clientY = 100;
    act(() => {
      bottomHeightResizer.dispatchEvent(
        new MouseEvent('mousedown', { bubbles: true })
      );

      document.dispatchEvent(
        new MouseEvent('mousemove', {
          bubbles: true,
          clientX,
          clientY,
        })
      );
      document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    });

    expect(editHandlerWrapper.style.width).toEqual('100px');
    expect(editHandlerWrapper.style.height).toEqual(
      `${clientY + RESIZE_MARGIN}px`
    );

    clientY = 150;
    act(() => {
      topHeightResizer.dispatchEvent(
        new MouseEvent('mousedown', { bubbles: true })
      );

      document.dispatchEvent(
        new MouseEvent('mousemove', {
          bubbles: true,
          clientX,
          clientY,
        })
      );
      document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    });

    expect(editHandlerWrapper.style.width).toEqual('100px');
    expect(editHandlerWrapper.style.height).toEqual(
      `-${clientY - RESIZE_MARGIN}px`
    );
  });
});
