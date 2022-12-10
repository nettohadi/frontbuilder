import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import './Global.css';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light-border.css';
import Routes from '@src/Routes';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
    </QueryClientProvider>
  );
}

export default App;
