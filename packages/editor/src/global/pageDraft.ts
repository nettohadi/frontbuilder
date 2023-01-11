import { ElementType } from '@frontbuilder/renderer';
import pages from '@src/api/pages';

let listeners: any[] = [];
let isLoading: boolean | null = null;
let isError: any = null;

const pageDraft = {
  save: async (pageId: string, draft: ElementType | string) => {
    if (isLoading) return;
    try {
      isLoading = true;
      isError = null;
      notifyListeners();
      await pages.updateDraft(pageId, draft);
    } catch (e) {
      isError = e;
    } finally {
      isLoading = false;
      notifyListeners();
    }
  },
  subscribe(listener: () => void) {
    if (!listeners.includes(listener)) {
      listeners.push(listener);
    }
  },
  unsubscribe(listener: () => void) {
    listeners = listeners.filter((l) => l !== listener);
  },
  get isLoading() {
    return isLoading;
  },
  get isError() {
    return isError;
  },
};

const notifyListeners = () => {
  listeners.forEach((listener: any) => {
    if (listener && typeof listener === 'function') {
      listener();
    }
  });
};

export default pageDraft;
