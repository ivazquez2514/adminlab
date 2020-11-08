import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'

import {
  AuthPage,
  AdminPage
} from './pages';

import './assets/styles/tailwind.css';
import './App.css';

function App() {
  return (
    <div className="App min-h-screen min-w-screen font-poppins">
      <Switch>
        <Route path="/auth" component={AuthPage} />
        <Route path="/admin" component={AdminPage} />
        <Redirect to="/admin" />
      </Switch>
    </div>
  );
}

export default App;
