import React from 'react';
import './index.css';
import { current } from '@src/common/current';
import getControlForProp, {
  getLabelForProp,
} from '@components/PropsEditor/controls';
import debounce from 'lodash.debounce';
import data from '@src/data';
import styled from 'styled-components';

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
  const getControls = (styles: any) => {
    const controls: any[] = [];
    styles.forEach((key: string, index: number) => {
      const Control = getControlForProp(key);
      if (Control)
        controls.push(
          <Control
            setStyle={debouncedSetStyle}
            name={key}
            value={style[key]}
            label={getLabelForProp(key)}
            key={index}
          />
        );
    });
    return controls;
  };

  return (
    <div className="style-wrapper">
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
        <StylesGroup>Background</StylesGroup>
        <StylesContainer>
          {getControls(filterProps(backgroundProps, Object.keys(style)))}
        </StylesContainer>
        <StylesGroup>Spacing</StylesGroup>
        <StylesContainer>
          {getControls(filterProps(spacingProps, Object.keys(style)))}
        </StylesContainer>
        <StylesGroup>Size</StylesGroup>
        <StylesContainer>
          {getControls(filterProps(sizeProps, Object.keys(style)))}
        </StylesContainer>
        <StylesGroup>Typography</StylesGroup>
        <StylesContainer>
          {getControls(filterProps(typographyProps, Object.keys(style)))}
        </StylesContainer>
        <StylesGroup>Border</StylesGroup>
        <StylesContainer>
          {getControls(filterProps(borderProps, Object.keys(style)))}
        </StylesContainer>
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
  return allProps.reduce((acc: any[], prop: any, index: number) => {
    if (propsToGet.includes(prop)) {
      acc.push(prop);
    }
    return acc;
  }, []);
};
