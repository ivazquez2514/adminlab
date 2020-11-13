import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import {
  AuthPage,
  AdminPage
} from './pages';

import './assets/styles/tailwind.css';
import './App.css';

function App({isAuthenticated, authenticatedUser, authenticate}) {

  const authInfo = JSON.parse(localStorage.getItem('adminlab-auth'));
  
  if (authInfo && !isAuthenticated) {
    authenticate(authInfo.collaborator);
  }

  return (
    <div className="App min-h-screen min-w-screen font-poppins">
      {
        isAuthenticated ?
          <Switch>
            <Route path="/admin" component={AdminPage} />
            <Redirect to="/admin" />
          </Switch> :
          <Switch>
            <Route path="/auth" component={AuthPage} />
            <Redirect to="/auth" />
          </Switch>
      }
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  authenticatedUser: state.auth.authenticatedUser
});

const mapDispatchToProps = (dispatch) => ({
  authenticate: credentials => dispatch.auth.authenticate(credentials)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
