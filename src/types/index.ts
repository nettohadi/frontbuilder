export type ElementType = {
  id: string;
  type: string;
  name?: string;
  uuid?: string;
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
  'data-testid'?: string;
  tags?: string[];
  [key: string]: any;
};

export type ParentType = ElementType | null | undefined;

export interface customElementProp {
  element: ElementType;
  parent: ElementType | null;
  className?: string;
}

type ControlComponentProps = {
  setProp: ({}) => void;
  name: string;
  value: string;
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
