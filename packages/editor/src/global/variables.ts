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
  INPUT_ERROR_BORDER: () => '#db4f4f',
  WHITE_TEXT: () => 'rgba(245, 245, 245, 0.78)',
  HOVER_BACKGROUND_TOGGLE_CONTROL: () => '#404040',
  SELECTED: () => '#8b3dff',
  get CONTROL_BACKGROUND() {
    return '#404040';
  },
  get CONTROL_SECONDARY_BACKGROUND() {
    return '#2f2e2e';
  },
  get SCROLLBAR_BACKGROUND() {
    return '#2f2e2e';
  },
  get SCROLLBAR_THUMB() {
    return '#767474';
  },
  get PRIMARY() {
    return '#4bcccc';
  },
  get PRIMARY_HOVER() {
    return '#56e1e1';
  },
  get MENU() {
    return '#2a2a2a';
  },
  get MENU_HOVER() {
    return 'rgba(86,225,225,0.2)';
  },
  get ERROR() {
    return '#db4f4f';
  },
};
