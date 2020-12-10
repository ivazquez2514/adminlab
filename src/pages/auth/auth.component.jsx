import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import background from '../../assets/images/auth.png';
import {ReactComponent as Logo} from '../../assets/svg/logo.svg';

import {
    AskSession,
    SignIn
} from '../../components';

const AuthPage = ({user}) => {
    return (
        <div style={{ background: `url('${background}')` }} className="min-w-screen min-h-screen bg-blue-700 flex flex-col justify-center items-center text-white px-4 md:px-0">
            <div className="w-full md:w-3/4">
                <div className="flex flex-col items-center">
                    <Logo className="max-w-full"/>
                    <h1 className="text-center text-md md:text-xl -mt-12">Sistema de Administración de laminillas y bloques.</h1>
                    <h2 className="text-center text-md md:text-xl mt-1 md:mt-3 font-bold uppdercase">Anatomía patologíca</h2>
                </div>
                
                <Switch>
                    {
                        user
                        ? <Route path="/auth/ask-session" component={AskSession} />
                        : <Route path="/auth/sign-in" component={SignIn} />
                    }
                    <Redirect to={user ? '/auth/ask-session' : '/auth/sign-in'} />
                </Switch>
            </div>
        </div>
    );
};

const mapStateToProps = (st) => ({
    user: st.auth.authenticatedUser
});

export default connect(mapStateToProps)(AuthPage);