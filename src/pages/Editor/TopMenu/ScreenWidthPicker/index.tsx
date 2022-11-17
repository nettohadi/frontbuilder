import * as S from './styles';
import { FaDesktop, FaMobileAlt, FaTabletAlt } from 'react-icons/fa';
import { useEditor } from '@src/hooks/useEditor';
import { current } from '@src/common/current';
import { ScreenWidthType } from '@src/types';
import { MEASUREMENT } from '@src/global/variables';
import { useEffect, useState } from 'react';
let canvas: any = null;

const ScreenWidthPicker = () => {
  const [computedWidth, setComputedWidth] = useState(0);
  const renderEditor = useEditor();
  const { DESKTOP_SCREEN, MOBILE_SCREEN, TABLET_SCREEN } = MEASUREMENT;
  const handleSelect = (screenWidth: ScreenWidthType = '100%') => {
    current.screenWidth = screenWidth;
    renderEditor();
  };

  useEffect(() => {
    canvas = document.getElementById('canvas');
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const rect = canvas.getBoundingClientRect();
      if (canvas && rect) {
        setComputedWidth(rect.width);
      }
    }, 230);
    // eslint-disable-next-line
  }, [current.screenWidth]);

  return (
    <>
      <S.DeviceScreens
        selected={current.isDesktopScreen}
        onClick={() => handleSelect(DESKTOP_SCREEN)}
      >
        <FaDesktop />
      </S.DeviceScreens>
      <S.DeviceScreens
        selected={current.isTabletScreen}
        onClick={() => handleSelect(TABLET_SCREEN)}
      >
        <FaTabletAlt />
      </S.DeviceScreens>
      <S.DeviceScreens
        selected={current.isMobileScreen}
        onClick={() => handleSelect(MOBILE_SCREEN)}
      >
        <FaMobileAlt />
      </S.DeviceScreens>
      <S.ScreenSize>W: {computedWidth || ''} PX</S.ScreenSize>
    </>
  );
};

export default ScreenWidthPicker;
