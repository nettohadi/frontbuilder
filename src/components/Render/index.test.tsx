import React, { FC } from 'react';
import { render, cleanup } from '@testing-library/react';
import Render from '@components/Render/index';
import { customElementProp, ElementType } from '@src/types';
import { getCustomComponent, registerCustomComponent } from '@src/utils';

afterEach(cleanup);

describe('Render', () => {
  test('renders a div with styles and props', () => {
    const data: ElementType = {
      id: '1',
      type: 'div',
      props: {
        'data-testid': 'test-div',
        className: 'element',
        customprop: 'custom-prop',
        style: {
          padding: '20px',
          backgroundColor: 'white',
          color: 'black',
          height: '100%',
          width: '90%',
        },
      },
      children: ['test render'],
    };
    const { getByTestId, getByText } = render(
      <Render element={data} parent={null} />
    );
    const testDiv = getByTestId('test-div');
    expect(testDiv.nodeName).toEqual('DIV');
    expect(testDiv.style.padding).toEqual('20px');
    expect(testDiv.style.backgroundColor).toEqual('white');
    expect(testDiv.style.color).toEqual('black');
    expect(testDiv.style.height).toEqual('100%');
    expect(testDiv.style.width).toEqual('90%');
    expect(testDiv.getAttribute('class')).toEqual('element');
    expect(testDiv.getAttribute('customprop')).toEqual('custom-prop');
    expect(testDiv).toHaveTextContent('test render');
  });

  test('renders a div with button and span as children', () => {
    const data: ElementType = {
      id: '1',
      type: 'div',
      props: {
        'data-testid': 'test-div',
        className: 'element',
        customprop: 'custom-prop',
        style: {
          height: '100%',
          width: '90%',
        },
      },
      children: [
        {
          id: '2',
          type: 'button',
          props: {
            'data-testid': 'test-button',
            className: 'element',
            customprop: 'custom-prop',
            style: {
              padding: '20px',
              backgroundColor: 'red',
            },
          },
          children: ['test button'],
        },
        {
          id: '3',
          type: 'span',
          props: {
            'data-testid': 'test-span',
            className: 'element',
            customprop: 'custom-prop',
            style: {
              padding: '10px',
              color: 'blue',
            },
          },
          children: ['test span'],
        },
      ],
    };

    const { getByTestId, getByText } = render(
      <Render element={data} parent={null} />
    );

    const testDiv = getByTestId('test-div');
    const testButton = getByTestId('test-button');
    const testSpan = getByTestId('test-span');

    expect(testDiv.nodeName).toEqual('DIV');
    expect(testDiv.style.height).toEqual('100%');
    expect(testDiv.style.width).toEqual('90%');
    expect(testDiv.getAttribute('class')).toEqual('element');
    expect(testDiv.getAttribute('customprop')).toEqual('custom-prop');

    expect(testButton.nodeName).toEqual('BUTTON');
    expect(testButton.style.padding).toEqual('20px');
    expect(testButton.style.backgroundColor).toEqual('red');
    expect(testButton).toHaveTextContent('test button');
    expect(testButton.getAttribute('class')).toEqual('element');
    expect(testButton.getAttribute('customprop')).toEqual('custom-prop');

    expect(testSpan.nodeName).toEqual('SPAN');
    expect(testSpan.style.padding).toEqual('10px');
    expect(testSpan.style.color).toEqual('blue');
    expect(testSpan).toHaveTextContent('test span');
    expect(testSpan.getAttribute('class')).toEqual('element');
    expect(testSpan.getAttribute('customprop')).toEqual('custom-prop');
  });

  test('renders a custom element', () => {
    const CustomElement: FC<customElementProp> = ({ element, parent }) => {
      const { style, ...otherProps } = element.props;
      return (
        <div style={style} {...otherProps}>
          Custom Element
        </div>
      );
    };

    registerCustomComponent('CustomElement', CustomElement);

    const data: ElementType = {
      id: '100',
      type: 'CustomElement',
      isFunctionComponent: true,
      props: {
        'data-testid': 'test-custom-element',
        className: 'custom-element',
        customprop: 'custom-prop',
        style: {
          padding: '20px',
          backgroundColor: 'white',
          color: 'black',
          height: '100%',
          width: '90%',
        },
      },
      children: [],
    };

    const { getByTestId } = render(<Render element={data} parent={null} />);

    const customElement = getByTestId('test-custom-element');
    expect(customElement.nodeName).toEqual('DIV');
    expect(customElement.getAttribute('customprop')).toEqual('custom-prop');
    expect(customElement.getAttribute('class')).toEqual('custom-element');
    expect(customElement.style.padding).toEqual('20px');
    expect(customElement.style.backgroundColor).toEqual('white');
    expect(customElement.style.color).toEqual('black');
    expect(customElement.style.height).toEqual('100%');
    expect(customElement.style.width).toEqual('90%');
    expect(customElement).toHaveTextContent('Custom Element');
  });
});
