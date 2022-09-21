export type ElementType = {
  id: string;
  type: string;
  props: {
    [key: string]: string | object;
    style: {
      [key: string]: string;
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
