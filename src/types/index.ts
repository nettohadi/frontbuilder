export type ElementType = {
  id: string;
  type: string;
  props: {
    [key: string]: any;
  };
  children: ElementType[] | string[];
  isFunctionComponent?: boolean;
  contentIsEditable?: boolean;
  className?: string;
  hiddenProps?: string[];
  propGroups?: {
    [key: string]: string[];
  };
};

export type ParentType = ElementType | null | undefined;

export interface customElementProp {
  element: ElementType;
  parent: ElementType | null;
}

type ControlComponentProps = {
  setStyle: ({}) => void;
  setProp: ({}) => void;
  name: string;
  value: string;
  label: string;
};
export type ControlComponentType = (
  props: ControlComponentProps
) => JSX.Element;

export type ControlProps = {
  setStyle: (newStyle?: any, shouldRerenderAllControls?: boolean) => void;
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
