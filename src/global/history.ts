import { ElementType } from '@src/types';
import data from '@src/data';

let currentIndex = 0;
const undoes: ElementType[] = [];
const redoes: ElementType[] = [];
const MAX_COUNT = 30;

const history = {
  push: (undo: ElementType, redo: ElementType) =>
    pushToUndoesRedoes(undo, redo),
  undo: () => {
    if (currentIndex < 0) return;
    data.set(undoes[currentIndex]);
    decrementIndex();
  },
  redo: () => {
    if (currentIndex == undoes.length - 1) return;
    incrementIndex();
    data.set(redoes[currentIndex]);
  },
  get currentIndex() {
    return currentIndex;
  },
  get count() {
    return undoes.length;
  },
  capture: (func: () => void) => {
    const undo = JSON.parse(JSON.stringify(data.get()));
    func();
    const redo = JSON.parse(JSON.stringify(data.get()));

    pushToUndoesRedoes(undo, redo);
  },
};

const pushToUndoesRedoes = (undo: ElementType, redo: ElementType) => {
  // if we are not at the end of the undoes array, we need to remove all the
  // undoes that are after the current index
  removeEntriesAfterTheCurrentIndex(undoes, redoes);

  if (undoes.length === MAX_COUNT) {
    // remove one from the beginning
    undoes.shift();
    redoes.shift();
  }

  undoes.push(undo);
  redoes.push(redo);

  currentIndex = undoes.length - 1;
};

const removeEntriesAfterTheCurrentIndex = (undoes: any[], redoes: any[]) => {
  if (currentIndex < undoes.length - 1) {
    undoes.splice(currentIndex + 1, undoes.length - currentIndex);
    redoes.splice(currentIndex + 1, redoes.length - currentIndex);
  }
};

const incrementIndex = () => {
  currentIndex = Math.min(currentIndex + 1, undoes.length - 1);
};

const decrementIndex = () => {
  currentIndex = currentIndex - 1;
  currentIndex = currentIndex < -1 ? -1 : currentIndex;
};

export default history;
