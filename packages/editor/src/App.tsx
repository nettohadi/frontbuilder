import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { registerElements } from '@frontbuilder/renderer';

import './Global.css';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light-border.css';
import Routes from '@src/Routes';
import WithEditHandler from '@src/pages/Editor/withEditHandler';

const queryClient = new QueryClient();

function App() {
  if (window.location.href.includes('preview')) {
    registerElements();
  } else {
    registerElements(WithEditHandler);
  }
  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
    </QueryClientProvider>
  );
}

export default App;
