import { ElementType } from '@frontbuilder/renderer';

type ControlComponentProps = {
  setProp: ({}) => void;
  name: string;
  value: string | any;
  label: string;
};
export type ControlComponentType = (
  props: ControlComponentProps
) => JSX.Element;

export type ControlProps = {
  setProp: (newProp?: any, shouldRerenderAllControls?: boolean) => void;
  name: string;
  value: any;
  label: string;
};

export type SpacingType = {
  left: number;
  top: number;
  right: number;
  bottom: number;
  unit: string;
};

export type ScreenWidthType = '100%' | '768px' | '450px';

export type PageType = {
  id?: string;
  name?: string;
  slug?: string;
  user_id?: string;
  website_id?: number;
  draft?: ElementType;
  isDefault?: boolean;
  published?: ElementType | {};
  createdAt?: string;
};

export type WebsiteType = {
  id?: number;
  name?: string;
  slug?: string;
  user_id?: string;
  isDefault?: boolean;
  createdAt?: string;
  favicon?: string;
};
