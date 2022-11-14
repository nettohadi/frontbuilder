import { ScreenWidthType } from '@src/types';

export const MEASUREMENT = {
  LEFT_PANEL_WIDTH: () => '250px',
  RIGHT_PANEL_WIDTH: () => '250px',
  CANVAS_WIDTH: () => 'calc(100% - 500px)',
  get DESKTOP_SCREEN() {
    return '100%' as ScreenWidthType;
  },
  get TABLET_SCREEN() {
    return '768px' as ScreenWidthType;
  },
  get MOBILE_SCREEN() {
    return '450px' as ScreenWidthType;
  },
};

export const COLORS = {
  INACTIVE_ICON: () => '#FFFFFFA8',
  ACTIVE_ICON: () => 'white',
  INPUT_BACKGROUND: () => '#212121',
  INPUT_BORDER: () => 'black',
  WHITE_TEXT: () => 'rgba(245, 245, 245, 0.78)',
  HOVER_BACKGROUND_TOGGLE_CONTROL: () => '#404040',
  SELECTED: () => '#8b3dff',
};
