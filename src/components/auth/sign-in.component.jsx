import React from 'react';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons'
import { faKey, faKeyboard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    InputIcon
} from '../';

const SignIn = () => {

    return (
        <form class="w-full">
            <div class="flex flex-wrap -mx-3 mb-6">
                <InputIcon
                    icon={faUserCircle}
                    label="ID de usuario"
                    placeholder="Ingresa un ID válido" />
                <InputIcon
                    icon={faKey}
                    label="Clave"
                    placeholder="Ingresa tus 6 dígitos" />

                <div className="keyboard-container text-center mt-10 w-full">
                    <button class="bg-blue-500 hover:bg-blue-600 text-white shadow-md active:shadow-none font-bold outline-none py-2 rounded w-2/5 text-3xl">
                        <FontAwesomeIcon icon={faKeyboard} />
                    </button>
                </div>
            </div>
        </form>
    );
}

export default SignIn;