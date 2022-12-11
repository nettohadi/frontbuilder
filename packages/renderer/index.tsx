import React from "react";

import Renderer from "./src/components/Renderer";
export default Renderer;
export {
  registerElements,
  getAllRegisteredElements,
  getDropAndNonDropElements,
} from "./src/utils";
export type { ElementType, ParentType } from "./src/types";
