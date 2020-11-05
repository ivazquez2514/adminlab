import React from 'react';

import {
    SignIn
} from '../../components';

const AuthPage = () => (
    <div className="min-w-screen min-h-screen bg-blue-700 flex flex-col justify-center items-center text-white px-4 md:px-0">
        <div className="w-full md:w-2/3">
            <h1 className="text-center text-xl">Sistema de Administración de laminillas y bloques.</h1>

            <h4 className="text-3xl font-bold mt-12">Inicia sesión</h4>
            <p className="mb-8 font-thin">Ingresa tus datos correctamente para poder entrar.</p>
            
            <SignIn />
        </div>
    </div>
)

export default AuthPage;