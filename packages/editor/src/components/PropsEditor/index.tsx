import React from 'react';

import { current } from '@src/common/current';
import getControlForProp from '@src/components/PropsEditor/controls';
import * as S from './styles';
import { updateElementProp } from '@src/global/element';
import { useRender } from '@src/hooks';
import data from '@src/data';
import { ElementType } from '@frontbuilder/renderer';
import TextControl from '@src/components/PropsEditor/controls/TextControl';
import { getCommonPropGroups } from '@src/utils/helperFunctions';
import getNewPropsForElement from '@src/global/newPropsForElement';
import LabelControl from '@components/PropsEditor/controls/LabelControl';

const PropsEditor = () => {
  const updateAllControls = useRender();
  const initialSelection = data.get() as ElementType;
  const currentElement: ElementType =
    current.getElement() || initialSelection || null;
  if (!currentElement) return null;

  const props = populatePropsBasedOnScreenWidth(currentElement);

  const setProp = (
    newProp: any = {},
    shouldRerenderAllControls: boolean = false
  ) => {
    if (newProp && Object.keys(newProp).length) {
      updateElementProp(current.getElement(), newProp);
    }

    current.getRerender()();
    if (shouldRerenderAllControls) {
      updateAllControls();
    }
  };

  const getControls = (
    propNames: any,
    groupLabel: string = '',
    controlIndex: number
  ) => {
    const controls: any[] = [];

    propNames.forEach((name: string, index: number) => {
      const { control: Control, label } = getControlForProp(name);
      const propCanBeShown = !currentElement.hiddenProps?.includes(name);

      if (Control && propCanBeShown) {
        controls.push(
          <Control
            setProp={setProp}
            name={name}
            value={
              props[name] !== null && props[name] !== undefined
                ? props[name]
                : ''
            }
            label={label}
            key={index}
          />
        );
      }
    });

    return controls.length ? (
      <div key={controlIndex}>
        {groupLabel && <S.StylesGroup>{groupLabel}</S.StylesGroup>}
        <S.PropContainer>{controls}</S.PropContainer>
      </div>
    ) : null;
  };

  const renderPropGroups = () => {
    const propNames = Object.keys(props);
    const propGroups = currentElement.propGroups || getCommonPropGroups();
    const groupLabels: string[] = Object.keys(propGroups || {});

    return groupLabels.map((label: string, index: number) => {
      const propsToGet = propGroups[label] || [];
      const filteredProps = propsToGet.filter((propName: string) =>
        propNames.includes(propName)
      );
      return getControls(filteredProps, label, index);
    });
  };

  return (
    <S.PropEditorContainer>
      <S.PropsContainer>
        <div />
        <S.PropContainer>
          {currentElement.props.name?.toLowerCase() !== 'root' && (
            <TextControl
              setProp={setProp}
              name="name"
              value={currentElement.props.name}
              label="Name"
            />
          )}
          <LabelControl
            setProp={undefined}
            name="uuid"
            value={currentElement.uuid}
            label="ID"
          />
        </S.PropContainer>
        {renderPropGroups()}
      </S.PropsContainer>
    </S.PropEditorContainer>
  );
};

export default PropsEditor;

const populatePropsBasedOnScreenWidth = (element: ElementType) => {
  const { mdScreen, smScreen, ...otherProps }: any = element.props;
  const newProps = getNewPropsForElement(element.type);

  let props = otherProps;
  if (current.isTabletScreen) {
    props = { ...props, ...mdScreen };
  }
  if (current.isMobileScreen) {
    props = { ...props, ...mdScreen, ...smScreen };
  }

  return { ...newProps, ...props };
};
