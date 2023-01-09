import React, { useContext, useEffect, useState } from 'react';

import { current } from '@src/common/current';
import PageData from '@src/context';
import { duplicateElement, removeElement } from '@src/global/element';
import { BiMove } from 'react-icons/bi';
import { FiDelete, FiMoreVertical } from 'react-icons/fi';
import * as S from './styles';
import * as G from '@src/styles';
import { BsCommand } from 'react-icons/bs';
import FloatingMenu from '@src/components/FloatingMenu';

const getPosition = (): string => {
  const el = document.querySelector('.edit-handler-wrapper.selected');
  const canvas = document.querySelector('#canvas');
  if (!el || !canvas) return '';

  const elTop = el.getBoundingClientRect().top;
  const canvasTop = canvas.getBoundingClientRect().top;

  return elTop - canvasTop < 25 ? '-1px' : '-22px';
};

const QuickActions = () => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState('');
  const rerender = useContext(PageData);
  const element = current.getElement();
  const parent = current.getParent();

  const handleDelete = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    removeElement(parent, element);
    rerender();
  };

  useEffect(() => {
    setPosition(getPosition());
  }, []);

  const handleDuplicate = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    duplicateElement(parent, element);
    rerender();
  };

  const QuickActionMenus = () => (
    <S.MenusContainer>
      <G.MenuItem onClick={handleDuplicate}>
        <div>Duplicate</div>
        <S.KeyboardShortcutWrapper>
          <BsCommand /> <span>D</span>
        </S.KeyboardShortcutWrapper>
      </G.MenuItem>
      <G.MenuItem onClick={handleDelete}>
        <div>Remove</div>
        <S.KeyboardShortcutWrapper>
          <FiDelete size={15} /> / <span>DEL</span>
        </S.KeyboardShortcutWrapper>
      </G.MenuItem>
    </S.MenusContainer>
  );

  const handleToggleMenu = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setVisible(!visible);
  };

  return (
    <>
      <S.ElementNameTag position={position}>
        <BiMove size="14px" cursor="pointer" />
        <S.ElementName data-testid={`element-name`}>
          {element?.props.name}
        </S.ElementName>
        <FloatingMenu
          content={QuickActionMenus()}
          visible={visible}
          theme={'dark'}
          onClickOutside={() => setVisible(false)}
          showArrow
        >
          <div onClick={handleToggleMenu}>
            <FiMoreVertical size="14px" cursor="pointer" />
          </div>
        </FloatingMenu>
      </S.ElementNameTag>
    </>
  );
};

export default QuickActions;
