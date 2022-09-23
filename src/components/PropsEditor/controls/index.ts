import ColorControl from '@components/PropsEditor/controls/ColorControl';
import SizeControl from '@components/PropsEditor/controls/SizeControl';
import { ControlComponentType } from '@src/types';

const propsToControls: {
  [key: string]: ControlComponentType;
} = {
  backgroundColor: ColorControl,
  color: ColorControl,
  height: SizeControl,
  width: SizeControl,
  padding: SizeControl,
  borderRadius: SizeControl,
};

const getControlForProp = (prop: string) => {
  return propsToControls[prop] || null;
};

export default getControlForProp;
