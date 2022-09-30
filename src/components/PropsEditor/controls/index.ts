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
  backgroundColor: { label: 'Color', control: ColorControl },
  color: { label: 'Color', control: ColorControl },
  height: { label: 'Height', control: SizeControl },
  width: { label: 'Width', control: SizeControl },
  padding: { label: 'Padding', control: SpacingControl },
  borderRadius: { label: 'Corner', control: SizeControl },
  margin: { label: 'Margin', control: SpacingControl },
  fontWeight: { label: 'Weight', control: TextControl },
};

const getControlForProp = (prop: string) => {
  return propsToControls[prop] || { label: prop, control: null };
};

export default getControlForProp;
