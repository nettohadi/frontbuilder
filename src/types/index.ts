export type ElementType = {
  id: string;
  type: string;
  props: {
    [key: string]: string | object;
    style: {
      [key: string]: any;
    };
  };
  children: ElementType[] | string[];
  isFunctionComponent?: boolean;
};

export type ParentType = ElementType | null | undefined;

export interface customElementProp {
  element: ElementType;
  parent: ElementType | null;
}

type ControlComponentProps = {
  setStyle: ({}) => void;
  name: string;
  value: string;
  label: string;
};
export type ControlComponentType = (
  props: ControlComponentProps
) => JSX.Element;

export type ControlProps = {
  setStyle: (newStyle: any, shouldRerenderAllControls?: boolean) => void;
  name: string;
  value: any;
  label: string;
};
