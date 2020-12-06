import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons'
import { faKey, faKeyboard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMutation } from '@apollo/client';
import { COLLABORATOR_LOGIN } from '../../api/mutations';
import { useForm } from 'react-hook-form';

import {
    InputIcon
} from '../';

const SignIn = ({authenticate, history}) => {
    const { register, handleSubmit, errors } = useForm();
    const [ collaboratorLogin ] = useMutation(COLLABORATOR_LOGIN);

    const onSubmit = (data) => {
        collaboratorLogin({variables: {...data}})
            .then(response => {
                localStorage.setItem('adminlab-auth', JSON.stringify({
                    collaborator: response.data.collaboratorLogin.collaborator,
                    token: response.data.collaboratorLogin.token
                }));
                authenticate(response.data.collaboratorLogin.collaborator);
                history.push('/admin');
            }).catch(error => {
                console.log(error);
            })
    };

    return (
        <>
            <h4 className="text-2xl md:text-3xl font-bold mt-8 md:mt-12">Inicia sesión</h4>
            <p className="mb-8 font-thin text-sm">Ingresa tus datos correctamente para poder entrar.</p>
            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-wrap -mx-3 mb-4 md:mb-6">
                    <InputIcon
                        icon={faUserCircle}
                        label="ID de usuario"
                        error={errors.username !== undefined}
                        iconProps={{
                            placeholder: "Ingresa un ID válido",
                            ref: register({required: true}),
                            id: "username",
                            name: "username",
                            style:{height: '60px'},
                            autocomplete: 'off'
                        }} />
                    <InputIcon
                        icon={faKey}
                        label="Clave"
                        error={errors.password !== undefined}
                        iconProps={{
                            placeholder: "Ingresa tus 6 dígitos",
                            ref: register({required: true}),
                            id: "password",
                            name: "password",
                            style:{height: '60px'},
                            autocomplete: 'off'
                        }} />

                    <div className="keyboard-container text-center mt-2 md:mt-10 w-full">
                        <button
                            style={{height: '60px'}}
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-400 text-white shadow-md active:shadow-none font-bold outline-none py-2 rounded w-4/5 md:w-2/5 text-3xl">
                            <FontAwesomeIcon icon={faKeyboard} />
                        </button>

                        <p className="text-white text-lg mt-16 font-light">¿Problemas para entrar? <a className="text-blue-900 font-bold">&nbsp;Contacta al administrador</a></p>
                    </div>
                </div>
            </form>
        </>
    );
}
  
const mapDispatchToProps = (dispatch) => ({
    authenticate: credentials => dispatch.auth.authenticate(credentials)
});

export default connect(null, mapDispatchToProps)(withRouter(SignIn));