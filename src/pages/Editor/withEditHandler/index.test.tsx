import React, { FC } from 'react';
import { render, cleanup, act } from '@testing-library/react';
import withEditHandler from './index';
import { RESIZE_MARGIN } from '@src/constants';
import data from '@src/data';
import { current } from '@src/common/current';

afterEach(cleanup);

// mock local storage
const mockLocalStorage = {
  clear: jest.fn(),
  removeItem: jest.fn(),
  getAll: jest.fn(),
  getItem: jest.fn(),
  setItem: jest.fn(),
};

Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

describe('withEditHandler', () => {
  // helper function to render component
  const Component: FC = () => <div>test</div>;
  const NewComponent = withEditHandler(Component);
  const renderNewComponent = (props: any = {}) => {
    const element = {
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
    data.set(element);
    // set current element to this element to simulate selection
    current.setElement(element);
    return render(<NewComponent element={element} parent={null} {...props} />);
  };

  // helper function to resize element using mouse
  // this will trigger mouse down and mouse move events
  const resizeElementWithMouse = (
    element: HTMLElement,
    mouseX: number,
    mouseY: number
  ) => {
    element.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

    document.dispatchEvent(
      new MouseEvent('mousemove', {
        bubbles: true,
        clientX: mouseX,
        clientY: mouseY,
      })
    );
  };

  // helper function to indicate that resizing is done
  // this will trigger mouse up event
  // the reason we split resizing into two functions is to avoid a race condition between mouse move and mouse up
  const finishResize = () => {
    document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
  };

  it('should return a new component with edit handler wrapper & resizer', () => {
    const { getByTestId } = renderNewComponent();
    expect(getByTestId('edit-handler-wrapper')).toBeInTheDocument();
    expect(getByTestId('left-width-resizer')).toBeInTheDocument();
    expect(getByTestId('right-width-resizer')).toBeInTheDocument();
    expect(getByTestId('top-height-resizer')).toBeInTheDocument();
    expect(getByTestId('bottom-height-resizer')).toBeInTheDocument();
  });

  it('should resize the width and save the data to local storage when width resizer is moved', () => {
    const { getByTestId } = renderNewComponent();

    const editHandlerWrapper = getByTestId('edit-handler-wrapper');
    const rightWidthResizer = getByTestId('right-width-resizer');
    const leftWidthResizer = getByTestId('left-width-resizer');

    let style = window.getComputedStyle(editHandlerWrapper);
    expect(style.width).toEqual('100px');
    expect(style.height).toEqual('100px');

    let mousePositionX = 200;
    let mousePositionY = 100;
    act(() => {
      resizeElementWithMouse(rightWidthResizer, mousePositionX, mousePositionY);
    });
    finishResize();

    let newWidth = mousePositionX + RESIZE_MARGIN;
    style = window.getComputedStyle(editHandlerWrapper);
    expect(style.width).toEqual(`${newWidth}px`);
    expect(style.height).toEqual('100px');
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'pageData',
      JSON.stringify(data.get())
    );

    mousePositionX = 150;
    act(() => {
      resizeElementWithMouse(leftWidthResizer, mousePositionX, mousePositionY);
    });
    finishResize();

    newWidth = mousePositionX - RESIZE_MARGIN;
    style = window.getComputedStyle(editHandlerWrapper);
    expect(style.width).toEqual(`-${newWidth}px`);
    expect(style.height).toEqual('100px');
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'pageData',
      JSON.stringify(data.get())
    );
  });

  it('should resize the height and save the data to local storage when height resizer is moved', () => {
    const { getByTestId } = renderNewComponent();

    const bottomHeightResizer = getByTestId('bottom-height-resizer');
    const topHeightResizer = getByTestId('top-height-resizer');
    const editHandlerWrapper = getByTestId('edit-handler-wrapper');

    let style = window.getComputedStyle(editHandlerWrapper);
    expect(style.width).toEqual('100px');
    expect(style.height).toEqual('100px');

    let mousePositionX = 100;
    let mousePositionY = 100;
    act(() => {
      resizeElementWithMouse(
        bottomHeightResizer,
        mousePositionX,
        mousePositionY
      );
    });
    finishResize();

    let newHeight = mousePositionY + RESIZE_MARGIN;
    style = window.getComputedStyle(editHandlerWrapper);
    expect(style.width).toEqual('100px');
    expect(style.height).toEqual(`${newHeight}px`);
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'pageData',
      JSON.stringify(data.get())
    );

    mousePositionY = 150;
    act(() => {
      resizeElementWithMouse(topHeightResizer, mousePositionX, mousePositionY);
    });
    finishResize();

    newHeight = mousePositionY - RESIZE_MARGIN;
    style = window.getComputedStyle(editHandlerWrapper);
    expect(style.width).toEqual('100px');
    expect(style.height).toEqual(`-${newHeight}px`);
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'pageData',
      JSON.stringify(data.get())
    );
  });
});
