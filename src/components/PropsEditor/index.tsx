import React from 'react';
import { FaPaintBrush } from 'react-icons/fa';
import { BsMouseFill } from 'react-icons/bs';
import { GiFallingStar } from 'react-icons/gi';

import './index.css';
import { current } from '@src/common/current';
import getControlForProp from '@components/PropsEditor/controls';
import styled from 'styled-components';
import { updateElementStyle } from '@src/global/element';
import { useRender } from '@src/hooks';
import data from '@src/data';
import { ElementType } from '@src/types';

const PropsEditor = () => {
  const updateAllControls = useRender();
  const rerenderElement = current.getRerender() || (() => {});
  const initialSelection = data.get() as ElementType;
  const { style = {} }: any =
    current.getElement()?.props || initialSelection?.props || {};

  const setStyle = (
    newStyle: any = {},
    shouldRerenderAllControls: boolean = false
  ) => {
    if (newStyle && Object.keys(newStyle).length) {
      console.log('propsEditor');
      updateElementStyle(current.getElement(), newStyle);
    }

    rerenderElement();
    if (shouldRerenderAllControls) {
      updateAllControls();
    }
  };

  const getControls = (styles: any, groupLabel: string = '') => {
    const controls: any[] = [];
    styles.forEach((key: string, index: number) => {
      const { control: Control, label } = getControlForProp(key);
      if (Control)
        controls.push(
          <Control
            setStyle={setStyle}
            name={key}
            value={style[key]}
            label={label}
            key={index}
          />
        );
    });
    // return controls;
    return controls.length ? (
      <>
        {groupLabel && <StylesGroup>{groupLabel}</StylesGroup>}
        <StylesContainer>{controls}</StylesContainer>
      </>
    ) : (
      <></>
    );
  };

  const styles = Object.keys(style);

  return (
    <div className="style-wrapper">
      <div>
        <PropTabsContainer>
          <PropTab selected={true}>
            <FaPaintBrush />
          </PropTab>
          <PropTab>
            <BsMouseFill />
          </PropTab>
          <PropTab>
            <GiFallingStar />
          </PropTab>
        </PropTabsContainer>
      </div>
      <HeadingContainer>
        <h3>Style</h3>
      </HeadingContainer>
      <div
        style={{
          display: 'flex',
          justifyContent: 'start',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        {getControls(filterProps(displayProps, styles), 'Children Alignment')}
        {getControls(filterProps(backgroundProps, styles), 'Background')}
        {getControls(filterProps(spacingProps, styles), 'Spacing')}
        {getControls(filterProps(sizeProps, styles), 'Size')}
        {getControls(filterProps(typographyProps, styles), 'Typography')}
        {getControls(filterProps(borderProps, styles), 'Border')}
      </div>
    </div>
  );
};

export default PropsEditor;
const StylesGroup = styled.div`
  display: flex;
  background-color: rgb(43 43 43);
  color: white;
  padding: 8px 6px;
  padding-left: 10px;
  font-size: 14px;
  font-weight: 600;
`;

const HeadingContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 7px;
`;

const StylesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 2px 10px;
`;

const backgroundProps = [
  'backgroundColor',
  'backgroundImage',
  'backgroundSize',
];

const displayProps = [
  'flexDirection',
  'display',
  'alignItems',
  'justifyContent',
];

const borderProps = [
  'border',
  'borderColor',
  'borderRadius',
  'borderStyle',
  'borderWidth',
  'borderTop',
  'borderTopColor',
];

const spacingProps = [
  'padding',
  'paddingTop',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'margin',
  'marginTop',
  'marginBottom',
  'marginLeft',
  'marginRight',
];

const sizeProps = [
  'width',
  'minWidth',
  'maxWidth',
  'height',
  'minHeight',
  'maxHeight',
];

const typographyProps = [
  'color',
  'fontSize',
  'fontWeight',
  'fontFamily',
  'fontStyle',
  'textTransform',
  'textDecoration',
  'textAlign',
  'lineHeight',
  'letterSpacing',
  'wordSpacing',
  'whiteSpace',
  'wordBreak',
  'textOverflow',
  'textShadow',
  'textIndent',
  'textJustify',
  'textRendering',
  'textShadow',
];

const filterProps = (propsToGet: string[], allProps: string[]) => {
  if (propsToGet.length === 0) return allProps;
  // @ts-ignore
  return propsToGet.reduce((acc: any[], prop: any, index: number) => {
    if (allProps.includes(prop)) {
      acc.push(prop);
    }
    return acc;
  }, []);
};

const PropTabsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  background-color: rgb(33 33 33);
`;

const PropTab = styled.div<{ selected?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  width: 50px;
  height: 100%;
  font-size: 20px;
  padding: 7px 7px;
  cursor: pointer;
  color: ${(props) => (props.selected ? 'white' : '#b6b6b6')};
  border-right: 1px solid #404040;
  background-color: ${({ selected }) =>
    selected ? '#404040' : 'rgb(33 33 33)'};

  &:hover {
    color: white;
  }
`;
