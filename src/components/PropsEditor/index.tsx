import React from 'react';
import { FaPaintBrush } from 'react-icons/fa';
import { BsMouseFill } from 'react-icons/bs';
import { GiFallingStar } from 'react-icons/gi';

import './index.css';
import { current } from '@src/common/current';
import getControlForProp from '@components/PropsEditor/controls';
import * as S from './styles';
import { updateElementProp, updateElementStyle } from '@src/global/element';
import { useRender } from '@src/hooks';
import data from '@src/data';
import { ElementType } from '@src/types';

const PropsEditor = () => {
  const updateAllControls = useRender();
  const rerenderElement = current.getRerender() || (() => {});
  const initialSelection = data.get() as ElementType;
  const currentElement: ElementType =
    current.getElement() || initialSelection || {};
  const { props = {} }: any = currentElement;

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

  const setProp = (
    newProp: any = {},
    shouldRerenderAllControls: boolean = false
  ) => {
    if (newProp && Object.keys(newProp).length) {
      updateElementProp(current.getElement(), newProp);
    }

    rerenderElement();
    if (shouldRerenderAllControls) {
      updateAllControls();
    }
  };

  const getControls = (propNames: any, groupLabel: string = '') => {
    const controls: any[] = [];

    propNames.forEach((name: string, index: number) => {
      const { control: Control, label } = getControlForProp(name);
      const propCanBeShown = !currentElement.hiddenProps?.includes(name);

      if (Control && propCanBeShown) {
        controls.push(
          <Control
            setStyle={setStyle}
            setProp={setProp}
            name={name}
            value={props[name] || ''}
            label={label}
            key={index}
          />
        );
      }
    });

    return controls.length ? (
      <>
        {groupLabel && <S.StylesGroup>{groupLabel}</S.StylesGroup>}
        <S.StylesContainer>{controls}</S.StylesContainer>
      </>
    ) : (
      <></>
    );
  };

  const renderPropGroups = () => {
    const propNames = Object.keys(props);
    const propGroups = currentElement.propGroups || {};
    const groupLabels: string[] = Object.keys(propGroups || {});

    return groupLabels.map((label: string) => {
      const propsToGet = propGroups[label] || [];
      const filteredProps = propsToGet.filter((propName: string) =>
        propNames.includes(propName)
      );
      return getControls(filteredProps, label);
    });
  };

  return (
    <div className="style-wrapper">
      <div>
        <S.PropTabsContainer>
          <S.PropTab selected={true}>
            <FaPaintBrush />
          </S.PropTab>
          <S.PropTab>
            <BsMouseFill />
          </S.PropTab>
          <S.PropTab>
            <GiFallingStar />
          </S.PropTab>
        </S.PropTabsContainer>
      </div>
      <S.HeadingContainer>
        <h3>Style</h3>
      </S.HeadingContainer>
      <div
        style={{
          display: 'flex',
          justifyContent: 'start',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        {renderPropGroups()}
      </div>
    </div>
  );
};

export default PropsEditor;
