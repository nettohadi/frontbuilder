import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import './Global.css';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light-border.css';
import Routes from '@src/Routes';
import { ButtonTest } from '@frontbuilder/renderer/src';
import { registerElements } from '@src/utils';
import WithEditHandler from '@src/pages/Editor/withEditHandler';

const queryClient = new QueryClient();

function App() {
  registerElements(WithEditHandler);
  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
      <ButtonTest />
    </QueryClientProvider>
  );
}

export default App;
