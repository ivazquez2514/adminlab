import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Roles } from './enums';

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

  const initialRoute = () => {
    if (authInfo) {
      console.log(`${authInfo?.collaborator?.role === Roles.SuperAdministrador ? '/admin/hospital-areas' : '/admin/movements-history'}`);
      return `${authInfo?.collaborator?.role === Roles.SuperAdministrador ? '/admin/hospital-areas' : '/admin/movements-history'}`;
    } else {
      return '/auth/sign-in';
    }
  }

  document.addEventListener('click', () => {
    localStorage.setItem('adminlab-lastInteraction', new Date().getTime());
  });

  return (
    <div className="App min-h-screen min-w-screen font-poppins">
      <Switch>
        <Route path="/auth" component={AuthPage} />
        <Route path="/admin" component={AdminPage} />
        <Redirect to={initialRoute() || 'auth'} />
      </Switch>
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
