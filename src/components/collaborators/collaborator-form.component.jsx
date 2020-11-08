import React from 'react';

const CollaboratorForm = React.memo(() => {
    return (
        <div className="w-full">
            <div className="w-full mb-6 flex">
                <div className="w-1/2 px-3">
                    <label className="block tracking-wide font-bold mb-2 text-gray-500" for="name">
                        Área
                    </label>
                    <select
                        className="appearance-none font-medium text-gray-500 block border-gray-500 w-full bg-gray-200 border-2 rounded-lg py-5 px-5 mb-3 leading-tight focus:outline-none focus:bg-white text-3xl"
                        id="area"
                        name="area"
                        placeholder="Seleccionar Área (Hospital)">
                        <option value="">Selecciona una opción</option>
                    </select>
                </div>
                <div className="w-1/2 px-3">
                    <label className="block tracking-wide font-bold mb-2 text-gray-500" for="name">
                        Rol de usuario
                    </label>
                    <select
                        className="appearance-none font-medium block text-gray-500 border-gray-500 w-full bg-gray-200 border-2 rounded-lg py-5 px-5 mb-3 leading-tight focus:outline-none focus:bg-white text-3xl"
                        id="rol"
                        name="rol"
                        placeholder="Seleccionar rol">
                        <option value="">Selecciona una opción</option>
                    </select>
                </div>
            </div>
            <div className="w-full flex">
                <div className="w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block tracking-wide font-bold mb-2 text-gray-500" for="name">
                        ID de usuario
                    </label>
                    <input
                        className="appearance-none text-center text-gray-500 font-medium block border-gray-500 w-full bg-gray-200 border-2 rounded-lg py-5 px-5 mb-3 leading-tight focus:outline-none focus:bg-white text-3xl"
                        id="usersQuantity"
                        type="text"
                        name="usersQuantity"
                        placeholder="Escribir un nombre..."
                        onChange={() => {}} />
                </div>
                <div className="w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block tracking-wide font-bold mb-2 text-gray-500" for="cabinetsLamellaeQuantity">
                        Clave de usuario
                    </label>
                    <input
                        className="appearance-none text-center text-gray-500 font-medium block border-gray-500 w-full bg-gray-200 border-2 rounded-lg py-5 px-5 mb-3 leading-tight focus:outline-none focus:bg-white text-3xl"
                        id="cabinetsLamellaeQuantity"
                        type="text"
                        name="cabinetsLamellaesQuantity"
                        placeholder="Asignar 6 dígitos"
                        onChange={() => {}} />
                </div>
            </div>
        </div>
    );
})

export default CollaboratorForm;