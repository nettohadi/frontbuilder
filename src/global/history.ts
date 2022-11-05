import { ElementType } from '@src/types';
import data from '@src/data';
import { copyObject } from '@src/utils/helperFunctions';

let currentIndex = 0;
let listeners: any[] = [];
const elementStates: ElementType[] = [];
const MAX_COUNT = 10;

const history = {
  push: (prevState: ElementType, currentState: ElementType) =>
    pushToStates(prevState, currentState),
  undo: () => {
    if (currentIndex === 0) return;

    decrementIndex();
    const state = elementStates[currentIndex];
    if (!state) return;
    data.set(copyObject(state));
  },
  redo: () => {
    if (currentIndex === elementStates.length - 1) return;

    incrementIndex();
    const state = elementStates[currentIndex];
    if (!state) return;
    data.set(copyObject(state));
  },
  get currentIndex() {
    return currentIndex;
  },
  get count() {
    return elementStates.length;
  },
  capture: (func: () => void) => {
    const prevState = copyObject(data.get());
    func();
    const currentState = copyObject(data.get());

    pushToStates(prevState, currentState);
  },
  subscribe(listener: () => void) {
    // check if the listener already pushed
    if (listeners.includes(listener)) return;
    listeners.push(listener);
  },
};

const pushToStates = (prevState: ElementType, currentState: ElementType) => {
  // if we are not at the end of the state array, we need to remove all the
  // states that are after the current index
  removeEntriesAfterTheCurrentIndex(elementStates);

  if (elementStates.length === MAX_COUNT) {
    // remove one from the beginning
    elementStates.unshift();
  }

  // only store previous state on the first push
  if (elementStates.length === 0) elementStates.push(prevState);

  elementStates.push(currentState);

  currentIndex = elementStates.length - 1;

  notifyListeners();
};

const removeEntriesAfterTheCurrentIndex = (elementStates: ElementType[]) => {
  if (currentIndex < elementStates.length - 1) {
    elementStates.splice(currentIndex + 1, elementStates.length - currentIndex);
  }
};

const incrementIndex = () => {
  currentIndex = Math.min(currentIndex + 1, elementStates.length - 1);
};

const decrementIndex = () => {
  currentIndex = currentIndex - 1;
  currentIndex = currentIndex < -1 ? -1 : currentIndex;
};

const notifyListeners = () => {
  listeners.forEach((listener) => listener?.());
};

export default history;
