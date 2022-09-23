import React, { useContext } from 'react';
import './index.css';
import { current } from '@src/common/current';
import TextControl from './controls/TextControl';
import SizeControl from './controls/SizeControl';
import ColorControl from './controls/ColorControl';
import PageData from '@src/context';
import getControlForProp from '@components/PropsEditor/controls';

const PropsEditor = ({ props, setProps }: any) => {
  const rerender = useContext(PageData);
  const { style = {} }: any = current.getElement()?.props || {};
  console.log({ style });

  const setStyle = (newStyle: any) => {
    const props: any = current.getElement()?.props || {};
    props.style = { ...style, ...newStyle };
    rerender();
  };

  const getConctrols = (style: any) => {
    return Object.keys(style).map((key: string, index: number) => {
      const Control = getControlForProp(key);
      return Control ? (
        <Control
          setStyle={setStyle}
          name={key}
          value={style[key]}
          label={key}
          key={index}
        />
      ) : (
        <></>
      );
    });
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
        {getConctrols(style)}
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
