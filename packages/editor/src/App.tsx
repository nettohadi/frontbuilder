import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { registerElements } from '@frontbuilder/renderer';

import './Global.css';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light-border.css';
import Routes from '@src/Routes';
import WithEditHandler from '@src/pages/Editor/withEditHandler';
import { Toaster } from 'react-hot-toast';
import { COLORS } from '@src/global/variables';

const queryClient = new QueryClient();

function App() {
  if (window.location.href.includes('preview')) {
    registerElements();
  } else {
    registerElements(WithEditHandler);
  }
  return (
    <QueryClientProvider client={queryClient}>
      <Toast />
      <Routes />
    </QueryClientProvider>
  );
}

export default App;

const Toast = () => {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          backgroundColor: COLORS.INPUT_BACKGROUND(),
          color: 'whitesmoke',
        },
      }}
    />
  );
};
