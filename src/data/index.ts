import { debounce, getCommonPropGroups } from '@src/utils/helperFunctions';

import { ElementType } from '@src/types';

let initialData: ElementType = {
  id: '0.1',
  type: 'Box',
  isFunctionComponent: true,
  contentIsEditable: false,
  className: 'fr-box droppable',
  props: {
    name: 'Root',
    padding: '20px',
    height: '40px',
    width: '400px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  propGroups: getCommonPropGroups(),
  children: [],
};

let _data: ElementType | string = '';

const data = {
  get: () => {
    if (_data === '') {
      _data = localStorage.getItem('pageData')
        ? JSON.parse(localStorage.getItem('pageData') as string)
        : initialData;
    }
    return _data;
  },
  set: (value: any) => {
    _data = value;
    initialData = value;
    localStorage.setItem('pageData', JSON.stringify(_data));
  },
  persistToLocalStorage: debounce(() => {
    localStorage.setItem('pageData', JSON.stringify(_data));
    console.log('persisted to local storage');
  }),
  clearLocalStorage: () => {
    localStorage.removeItem('pageData');
  },
};

export default data;
