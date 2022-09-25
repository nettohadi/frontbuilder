import ColorControl from '@components/PropsEditor/controls/ColorControl';
import SizeControl from '@components/PropsEditor/controls/SizeControl';
import TextControl from '@components/PropsEditor/controls/TextControl';
import { ControlComponentType } from '@src/types';

const propsToControls: {
  [key: string]: { label: string; control: ControlComponentType };
} = {
  backgroundColor: { label: 'color', control: ColorControl },
  color: { label: 'color', control: ColorControl },
  height: { label: 'height', control: SizeControl },
  width: { label: 'height', control: SizeControl },
  padding: { label: 'padding', control: SizeControl },
  borderRadius: { label: 'corner', control: SizeControl },
  margin: { label: 'margin', control: SizeControl },
};

const getControlForProp = (prop: string) => {
  return propsToControls[prop] || { label: prop, control: TextControl };
};

export default getControlForProp;
