import { ElementType } from '@src/types';
import debounce from 'lodash.debounce';

let initialData: ElementType = {
  id: '1',
  type: 'Box',
  isFunctionComponent: true,
  props: {
    className: 'fr-box droppable',
    style: {
      padding: '20px',
      height: '40px',
      width: '400px',
      display: 'flex',
      flexDirection: 'row',
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
    initialData = value;
    localStorage.setItem('pageData', JSON.stringify(_data));
  },
  persistToLocalStorage: () => {
    localStorage.setItem('pageData', JSON.stringify(_data));
    console.log('persisted to local storage');
  },
  clearLocalStorage: () => {
    localStorage.removeItem('pageData');
  },
};

export default data;
