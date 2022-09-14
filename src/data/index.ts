import { ElementType } from '@src/types';

const initialData: ElementType = {
  id: '1',
  type: 'div',
  props: {
    className: 'element',
    style: {
      padding: '20px',
      backgroundColor: 'white',
      color: 'black',
      height: '100%',
      width: '90%',
    },
  },
  children: [
    {
      id: '2',
      type: 'Box',
      isFunctionComponent: true,
      props: {
        className: '',
        style: {
          padding: '20px',
          backgroundColor: 'red',
          color: 'white',
          height: '40px',
          width: '90%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
      },
      children: ['I am a box'],
    },
    {
      id: '3',
      type: 'Button',
      isFunctionComponent: true,
      props: {
        className: 'element',
        style: {
          padding: '0px',
          backgroundColor: 'white',
          color: 'black',
          height: '100%',
          width: '100px',
        },
      },
      children: ['Hello World'],
    },
  ],
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
