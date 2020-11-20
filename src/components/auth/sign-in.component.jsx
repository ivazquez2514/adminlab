import React from 'react';
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

const SignIn = ({authenticate}) => {
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
            }).catch(error => {
                console.log(error);
            })
    };

    return (
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap -mx-3 mb-6">
                <InputIcon
                    icon={faUserCircle}
                    label="ID de usuario"
                    error={errors.username !== undefined}
                    iconProps={{
                        placeholder: "Ingresa un ID válido",
                        ref: register({required: true}),
                        id: "username",
                        name: "username"
                    }} />
                <InputIcon
                    icon={faKey}
                    label="Clave"
                    error={errors.password !== undefined}
                    iconProps={{
                        placeholder: "Ingresa tus 6 dígitos",
                        ref: register({required: true}),
                        id: "password",
                        name: "password"
                    }} />

                <div className="keyboard-container text-center mt-10 w-full">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white shadow-md active:shadow-none font-bold outline-none py-2 rounded w-2/5 text-3xl">
                        <FontAwesomeIcon icon={faKeyboard} />
                    </button>

                    <p className="text-white text-lg mt-16 font-light">¿Problemas para entrar? <a className="text-blue-900 font-bold">&nbsp;Contacta al administrador</a></p>
                </div>
            </div>
        </form>
    );
}
  
const mapDispatchToProps = (dispatch) => ({
    authenticate: credentials => dispatch.auth.authenticate(credentials)
});

export default connect(null, mapDispatchToProps)(SignIn);