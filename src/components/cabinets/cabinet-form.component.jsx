import React from 'react';

const CabinetForm = React.memo(() => {
    return (
        <div className="w-full">
            <div className="w-full mb-6 flex">
                <div className="w-1/2 px-3">
                    <label className="block tracking-wide font-bold mb-2 text-gray-500" for="name">
                        Tipo de gabinete
                    </label>
                    <select
                        className="appearance-none font-medium text-gray-500 block border-gray-500 w-full bg-gray-200 border-2 rounded-lg py-5 px-5 mb-3 leading-tight focus:outline-none focus:bg-white text-3xl"
                        id="area"
                        name="area"
                        placeholder="Seleccionar Área (Hospital)">
                        <option value="">Seleccionar tipo</option>
                    </select>
                </div>
                <div className="w-1/2 px-3">
                    <label className="block tracking-wide font-bold mb-2 text-gray-500" for="name">
                        Cantidad de modulos
                    </label>
                    <input
                        className="appearance-none text-center text-gray-500 font-medium block border-gray-500 w-full bg-gray-200 border-2 rounded-lg py-5 px-5 mb-3 leading-tight focus:outline-none focus:bg-white text-3xl"
                        id="usersQuantity"
                        type="text"
                        name="usersQuantity"
                        value="0"
                        onChange={() => {}} />
                </div>
            </div>
            <div className="w-full flex">
                <div className="w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block tracking-wide font-bold mb-2 text-gray-500" for="name">
                        Capacidad de cajón
                    </label>
                    <input
                        className="appearance-none text-center text-gray-500 font-medium block border-gray-500 w-full bg-gray-200 border-2 rounded-lg py-5 px-5 mb-3 leading-tight focus:outline-none focus:bg-white text-3xl"
                        id="usersQuantity"
                        type="text"
                        name="usersQuantity"
                        value="0"
                        onChange={() => {}} />
                </div>
            </div>
        </div>
    );
})

export default CabinetForm;