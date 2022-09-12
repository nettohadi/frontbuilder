import React from 'react';
import {
  BrowserRouter as Router,
  Routes as ReactRoutes,
  Route,
} from 'react-router-dom';

import Editor from '@src/Routes/Editor';
import Previewer from '@src/Routes/Previewer';

export default function Routes() {
  return (
    <Router>
      <ReactRoutes>
        <Route path="/editor" element={<Editor />} />
        <Route path="/preview" element={<Previewer />} />
        <Route path="/" element={<Previewer />} />
      </ReactRoutes>
    </Router>
  );
}
