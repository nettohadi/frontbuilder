import React from 'react';
import {
  BrowserRouter as Router,
  Routes as ReactRoutes,
  Route,
} from 'react-router-dom';

import Editor from '@src/pages/Editor';
import Previewer from '@src/pages/Previewer';

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
