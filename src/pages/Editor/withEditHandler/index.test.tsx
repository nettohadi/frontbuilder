import React, { FC } from 'react';
import { render, cleanup, act } from '@testing-library/react';
import withEditHandler from './index';

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

  test('should return a new component with editWrapper & resizer', () => {
    const { getByTestId } = render(
      <NewComponent element={mockElement} parent={null} />
    );
    expect(getByTestId('edit-handler-wrapper')).toBeInTheDocument();
    expect(getByTestId('width-resizer')).toBeInTheDocument();
    expect(getByTestId('height-resizer')).toBeInTheDocument();
  });

  test('width is resized when width resizer is clicked & moved', () => {
    const { getByTestId } = render(
      <NewComponent element={mockElement} parent={null} />
    );

    const widthResizer = getByTestId('width-resizer');
    const heightResizer = getByTestId('height-resizer');
    const editHandlerWrapper = getByTestId('edit-handler-wrapper');

    expect(editHandlerWrapper.style.width).toEqual('100px');
    expect(editHandlerWrapper.style.height).toEqual('100px');

    act(() => {
      // test width resizing
      widthResizer.dispatchEvent(
        new MouseEvent('mousedown', { bubbles: true })
      );

      document.dispatchEvent(
        new MouseEvent('mousemove', {
          bubbles: true,
          clientX: 200,
          clientY: 100,
        })
      );
      document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    });

    expect(editHandlerWrapper.style.width).toEqual('200px');
    expect(editHandlerWrapper.style.height).toEqual('100px');
  });

  test('height is resized when height resizer is clicked & moved', () => {
    const { getByTestId } = render(
      <NewComponent element={mockElement} parent={null} />
    );

    const widthResizer = getByTestId('width-resizer');
    const heightResizer = getByTestId('height-resizer');
    const editHandlerWrapper = getByTestId('edit-handler-wrapper');

    expect(editHandlerWrapper.style.width).toEqual('100px');
    expect(editHandlerWrapper.style.height).toEqual('100px');

    act(() => {
      // test height resizing
      heightResizer.dispatchEvent(
        new MouseEvent('mousedown', { bubbles: true })
      );

      document.dispatchEvent(
        new MouseEvent('mousemove', {
          bubbles: true,
          clientX: 100,
          clientY: 300,
        })
      );
      document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    });

    expect(editHandlerWrapper.style.width).toEqual('100px');
    expect(editHandlerWrapper.style.height).toEqual('300px');
  });
});
