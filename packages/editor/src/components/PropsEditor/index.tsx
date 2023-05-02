import React, { Dispatch, SetStateAction, useEffect } from 'react';

import { current } from '@src/common/current';
import getControlForProp from '@src/components/PropsEditor/controls';
import * as S from './styles';
import { updateElementProp } from '@src/global/element';
import { useRender } from '@src/hooks';
import data from '@src/data';
import { ElementType } from '@frontbuilder/renderer';
import TextControl from '@src/components/PropsEditor/controls/TextControl';
import {
  getCommonPropGroups,
  populatePropsBasedOnScreenWidth,
} from '@src/utils/helperFunctions';
import LabelControl from '@components/PropsEditor/controls/LabelControl';
import { HiChevronRight, HiChevronDown } from 'react-icons/hi';
import { useHotkeys } from 'react-hotkeys-hook';

const PropsEditor = () => {
  const updateAllControls = useRender();
  const initialSelection = data.get() as ElementType;
  const currentElement: ElementType =
    current.getElement() || initialSelection || null;

  // Register hotkeys for opening and closing the props editor
  const [showAllProps, setShowAllProps] = React.useState(false);
  useRegisterHotkeys(setShowAllProps);

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
        <PropBox
          initialOpen={groupLabel === 'Display'}
          openAll={showAllProps}
          groupLabel={groupLabel}
          key={currentElement.uuid}
        >
          {controls}
        </PropBox>
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
        <div>
          <S.PropContainer open>
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
        </div>
        {renderPropGroups()}
      </S.PropsContainer>
    </S.PropEditorContainer>
  );
};

export default PropsEditor;

const PropBox = ({ children, initialOpen, groupLabel, openAll }: any) => {
  const [open, setOpen] = React.useState(initialOpen);
  const toggleOpen = () => setOpen(!open);

  useEffect(() => {
    if (groupLabel === 'Display') return;
    setOpen(openAll);
  }, [openAll, groupLabel]);

  return (
    <>
      {groupLabel && (
        <S.StylesGroup onClick={toggleOpen}>
          {groupLabel}
          {open ? (
            <HiChevronDown
              size={17}
              onClick={() => setOpen(false)}
              className={'chevron'}
            />
          ) : (
            <HiChevronRight
              size={17}
              onClick={() => setOpen(true)}
              className={'chevron'}
            />
          )}
        </S.StylesGroup>
      )}
      <S.PropContainer open={open}>{children}</S.PropContainer>
    </>
  );
};

const useRegisterHotkeys = (
  setShowAllProps: Dispatch<SetStateAction<boolean>>
) => {
  useHotkeys('cmd+1', (e: KeyboardEvent) => {
    e.preventDefault();
    setShowAllProps(false);
  });
  useHotkeys('ctrl+1', (e: KeyboardEvent) => {
    e.preventDefault();
    setShowAllProps(false);
  });

  useHotkeys('cmd+2', (e: KeyboardEvent) => {
    e.preventDefault();
    setShowAllProps(true);
  });
  useHotkeys('ctrl+2', (e: KeyboardEvent) => {
    e.preventDefault();
    setShowAllProps(true);
  });
};
