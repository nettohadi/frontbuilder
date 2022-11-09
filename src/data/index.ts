import { debounce } from '@src/utils/helperFunctions';

import { ElementType } from '@src/types';

let initialData: ElementType = {
  id: '0.1',
  uuid: '0.1',
  type: 'Box',
  isFunctionComponent: true,
  contentIsEditable: false,
  className: 'fr-box droppable',
  tags: ['fixed-width', 'fixed-height'],
  props: {
    name: 'Root',
    padding: '0px',
    height: 'auto',
    width: '100%',
    display: 'flex',
    backgroundColor: 'rgb(250 250 250 / 1)',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  children: [],
  hiddenProps: ['width', 'height', 'minHeight'],
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
  refresh: () => {
    _data = { ...(_data as ElementType) };
  },
  persistToLocalStorage: debounce(() => {
    localStorage.setItem('pageData', JSON.stringify(_data));
    console.log('persisted to local storage');
  }),
};

export default data;
