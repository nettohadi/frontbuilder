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
  margin: SizeControl,
};

const getControlForProp = (prop: string) => {
  return propsToControls[prop] || null;
};

export default getControlForProp;

const propsLabel: any = {
  backgroundColor: 'color',
  backgroundImage: 'image',
  backgroundSize: 'size',
  borderRadius: 'radius',
};

export const getLabelForProp = (prop: string) => {
  return propsLabel[prop] || prop;
};
