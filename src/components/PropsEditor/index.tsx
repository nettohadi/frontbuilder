import React, { useContext } from 'react';
import './index.css';
import { current } from '@src/common/current';
import TextControl from './controls/TextControl';
import SizeControl from './controls/SizeControl';
import ColorControl from './controls/ColorControl';
import PageData from '@src/context';

const PropsEditor = ({ props, setProps }: any) => {
  const rerender = useContext(PageData);
  let { custom = {}, style }: any = current.getElement()?.props || {};

  const setStyle = (newStyle: any) => {
    console.log({ newStyle });
    const props: any = current.getElement()?.props || {};
    props.style = { ...style, ...newStyle };
    rerender();
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
        {Object.keys(custom).map((key: string, index: number) => {
          const prop = custom[key];
          const Control = prop?.control ? controls[prop.control] : null;

          return Control ? (
            <Control
              setStyle={setStyle}
              name={key}
              value={style[key]}
              label={prop.label}
              key={index}
            />
          ) : (
            <></>
          );
        })}
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
