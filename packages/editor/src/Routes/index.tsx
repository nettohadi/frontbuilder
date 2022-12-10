import React from 'react';
import {
  BrowserRouter as Router,
  Routes as ReactRoutes,
  Route,
} from 'react-router-dom';

import Editor from '@src/pages/Editor';
import Previewer from '@src/pages/Previewer';
import SignIn from '@src/pages/SignIn';
import SignUp from '@src/pages/SignUp';
import RedirectToEditor from '@src/pages/RedirectToEditor';
import RedirectToPreviewer from '@src/pages/RedirectToPreviewer';

export default function Routes() {
  return (
    <Router>
      <ReactRoutes>
        <Route path="/" element={<RedirectToEditor />} />
        <Route path="/:websiteId/:pageId" element={<Editor />} />
        <Route path="/:websiteId" element={<Editor />} />
        <Route path="/preview" element={<RedirectToPreviewer />} />
        <Route path="/preview/:websiteId/:pageId" element={<Previewer />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </ReactRoutes>
    </Router>
  );
}
