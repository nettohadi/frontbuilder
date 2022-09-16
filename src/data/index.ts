import { ElementType } from '@src/types';

const initialData: ElementType = {
  id: '2',
  type: 'Box',
  isFunctionComponent: true,
  props: {
    className: 'box',
    style: {
      padding: '20px',
      height: '40px',
      width: '90%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
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
  },
  persistToLocalStorage: () => {
    localStorage.setItem('pageData', JSON.stringify(_data));
  },
};

export default data;
