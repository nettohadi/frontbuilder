import React, { useContext } from 'react';
import './index.css';
import { current } from '@src/common/current';
import TextControl from './controls/TextControl';
import SizeControl from './controls/SizeControl';
import ColorControl from './controls/ColorControl';
import PageData from '@src/context';
import getControlForProp from '@components/PropsEditor/controls';
import debounce from 'lodash.debounce';
import data from '@src/data';

const PropsEditor = () => {
  const rerenderElement = current.getRerender() || (() => {});
  const { style = {} }: any = current.getElement()?.props || {};

  const setStyle = (newStyle: any) => {
    const props: any = current.getElement()?.props || {};
    props.style = { ...props.style, ...newStyle };
    data.persistToLocalStorage();
    rerenderElement();
  };

  const debouncedSetStyle = debounce(setStyle, 0);
  const getControls = (style: any) => {
    const controls: any[] = [];
    Object.keys(style).forEach((key: string, index: number) => {
      const Control = getControlForProp(key);
      if (Control)
        controls.push(
          <Control
            setStyle={debouncedSetStyle}
            name={key}
            value={style[key]}
            label={key}
            key={index}
          />
        );
    });
    return controls;
  };

  return (
    <div className="style-wrapper">
      <h1>Style Panel</h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'start',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        {getControls(style)}
      </div>
    </div>
  );
};

export default PropsEditor;

const controls: any = {
  TextControl,
  SizeControl,
  ColorControl,
};
