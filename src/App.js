import React from 'react';
import {Switch, Route} from 'react-router-dom'

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
        {/* <Route path="/auth" component={AuthPage} /> */}
        <Route path="/auth" component={AdminPage} />
      </Switch>
    </div>
  );
}

export default App;
