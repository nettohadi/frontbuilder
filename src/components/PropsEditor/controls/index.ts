import ColorControl from '@components/PropsEditor/controls/ColorControl';
import SizeControl from '@components/PropsEditor/controls/SizeControl';
import TextControl from '@components/PropsEditor/controls/TextControl';
import { ControlComponentType } from '@src/types';
import JustifyControl from '@components/PropsEditor/controls/JustifyControl/JustifyControl';
import AlignControl from '@components/PropsEditor/controls/AlignControl/AlignControl';
import FlexDirectionControl from '@components/PropsEditor/controls/FlexDirectionControl';
import SpacingControl from '@components/PropsEditor/controls/SpacingControl';

const propsToControls: {
  [key: string]: { label: string; control: ControlComponentType };
} = {
  flexDirection: { label: 'Direction', control: FlexDirectionControl },
  justifyContent: { label: 'Justify', control: JustifyControl },
  alignItems: { label: 'Align', control: AlignControl },
  backgroundColor: { label: 'color', control: ColorControl },
  color: { label: 'color', control: ColorControl },
  height: { label: 'height', control: SizeControl },
  width: { label: 'width', control: SizeControl },
  padding: { label: 'padding', control: SpacingControl },
  borderRadius: { label: 'corner', control: SizeControl },
  margin: { label: 'margin', control: SpacingControl },
  fontWeight: { label: 'weight', control: TextControl },
};

const getControlForProp = (prop: string) => {
  return propsToControls[prop] || { label: prop, control: null };
};

export default getControlForProp;
