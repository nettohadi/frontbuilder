import React from 'react';
import './App.css';

import { current } from '@src/common/current';
import Routes from '@src/Routes';

function App() {
  const [update, setUpdate] = React.useState(false);

  React.useEffect(() => {
    current.setRerender(() => {
      console.log('call rerender');
      setUpdate(!update);
    });
  }, [update]);

  return (
    <>
      <Routes />
    </>
  );
}

export default App;
