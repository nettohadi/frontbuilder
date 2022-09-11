import React from 'react';
import './App.css';
import data from '@src/data';

import Render from '@src/components/Render';
import { current } from '@src/common/current';

function App() {
  const [update, setUpdate] = React.useState(false);

  React.useEffect(() => {
    current.setRerender(() => {
      console.log('call rerender');
      setUpdate(!update);
    });
  }, [update]);

  return (
    <div className="App">
      <Render element={data.get()} parent={null} />
    </div>
  );
}

export default App;
