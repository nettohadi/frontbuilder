import { ScreenWidthType } from "@frontbuilder/editor/src/types";

export const MEASUREMENT = {
  LEFT_PANEL_WIDTH: () => "250px",
  RIGHT_PANEL_WIDTH: () => "250px",
  CANVAS_WIDTH: () => "calc(100% - 500px)",
  get DESKTOP_SCREEN() {
    return "100%" as ScreenWidthType;
  },
  get TABLET_SCREEN() {
    return "768px" as ScreenWidthType;
  },
  get MOBILE_SCREEN() {
    return "450px" as ScreenWidthType;
  },
};
