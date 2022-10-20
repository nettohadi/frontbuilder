import React, { useEffect, useState } from 'react';
import {
  MdFormatAlignLeft,
  MdFormatBold,
  MdFormatItalic,
  MdFormatStrikethrough,
  MdFormatUnderlined,
  MdFormatSize,
} from 'react-icons/md';

import FloatingMenu from '@components/FloatingMenu';
import * as S from './styles';
import { rgbToRgbString } from '@src/utils/helperFunctions';
import ColorPicker from '@components/ColorPicker';
import { current } from '@src/common/current';
import { updateElementProp } from '@src/global/element';

declare const Medium: any;

const ColorControl = ({
  applyColor,
}: {
  applyColor: (color: string) => void;
}) => {
  const [visible, setVisible] = useState(false);
  const [color, setColor] = useState('#000000');

  const ColorPickerMenus = () => (
    <div
      onMouseDown={(e: any) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <ColorPicker
        color={color}
        onChange={(selectedColor: any) => {
          setColor(rgbToRgbString(selectedColor?.rgb));
          applyColor(rgbToRgbString(selectedColor?.rgb));
        }}
      />
    </div>
  );
  return (
    <FloatingMenu
      content={<ColorPickerMenus />}
      visible={visible}
      onClickOutside={() => setVisible(false)}
      animation="shift-away"
    >
      <S.MenuItem
        onMouseDown={(e: any) => {
          setVisible((s) => !s);
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <S.ColorButton color={color} />
      </S.MenuItem>
    </FloatingMenu>
  );
};

let el: any;
let medium: any;

const highlight = function () {
  if (document.activeElement !== el) {
    el.focus();
    medium.select();
  }
};

const ContentEditMenu = ({ visible }: { visible: boolean }) => {
  const Content = () => {
    return (
      <S.MenusContainer>
        <ColorControl applyColor={setColor} />
        <S.MenuItem>
          <MdFormatAlignLeft />
        </S.MenuItem>
        <S.MenuItem onMouseDown={setBold}>
          <MdFormatBold />
        </S.MenuItem>
        <S.MenuItem onMouseDown={setItalic}>
          <MdFormatItalic />
        </S.MenuItem>
        <S.MenuItem onMouseDown={setStrikethrough}>
          <MdFormatStrikethrough />
        </S.MenuItem>
        <S.MenuItem onMouseDown={setUnderline}>
          <MdFormatUnderlined />
        </S.MenuItem>
        <S.MenuItem>
          <MdFormatSize />
        </S.MenuItem>
      </S.MenusContainer>
    );
  };

  useEffect(() => {
    el = document.querySelector('.selected > .element') as HTMLElement;

    if (!visible && medium) medium.destroy();
    if (!el || !current.isEditingTextContent()) return;

    medium = new Medium({
      element: el,
      mode: Medium.richMode,
      autofocus: true,
      placeholder: '',
      attributes: null,
      tags: null,
      pasteAsText: false,
    });

    return () => medium.destroy();
  }, [visible]);

  const setUnderline = (e: any) => {
    applyStyle('u');
    e.stopPropagation();
    e.preventDefault();
  };

  const setBold = (e: any) => {
    applyStyle('b');
    e.stopPropagation();
    e.preventDefault();
  };

  // set Italic
  const setItalic = (e: any) => {
    applyStyle('i');
    e.stopPropagation();
    e.preventDefault();
  };

  // set Strikethrough
  const setStrikethrough = (e: any) => {
    applyStyle('strike');
    e.stopPropagation();
    e.preventDefault();
  };

  // set Color
  const setColor = (color: string) => {
    applyStyle('span', `color: ${color};`);
    return false;
  };

  const applyStyle = (tag: string = '', style: string = '') => {
    if (!tag.length) return;

    highlight();
    medium.invokeElement(tag, { style });

    const element = current.getElement();
    if (!element) return;

    updateElementProp(element, {
      textContent: el.innerHTML,
    });
  };

  return (
    <FloatingMenu content={<Content />} visible={visible}>
      <S.Placer />
    </FloatingMenu>
  );
};

export default ContentEditMenu;
