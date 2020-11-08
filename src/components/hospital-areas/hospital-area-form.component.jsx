import React from 'react';

const HospitalAreaForm = React.memo(() => {
    return (
        <div className="w-full">
            <div className="w-full mb-6">
                <div className="w-full px-3 md:mb-0">
                    <label className="block tracking-wide font-bold mb-2 text-gray-500" for="name">
                        Nombre
                    </label>
                    <input
                        className="appearance-none font-medium block border-gray-500 w-full bg-gray-200 border-2 rounded-lg py-5 px-5 mb-3 leading-tight focus:outline-none focus:bg-white text-3xl"
                        id="name"
                        type="text"
                        placeholder="Asignar un nombre..." />
                </div>
            </div>
            <div className="w-full flex">
                <div className="w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block tracking-wide font-bold mb-2 text-gray-500" for="name">
                        Cantidad de usuarios
                    </label>
                    <input
                        className="appearance-none text-center text-gray-500 font-medium block border-gray-500 w-full bg-gray-200 border-2 rounded-lg py-5 px-5 mb-3 leading-tight focus:outline-none focus:bg-white text-3xl"
                        id="usersQuantity"
                        type="text"
                        name="usersQuantity"
                        value="0"
                        onChange={() => {}} />
                </div>
                <div className="w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block tracking-wide font-bold mb-2 text-gray-500" for="cabinetsLamellaeQuantity">
                        Cantidad de Gabinetes (Laminillas)
                    </label>
                    <input
                        className="appearance-none text-center text-gray-500 font-medium block border-gray-500 w-full bg-gray-200 border-2 rounded-lg py-5 px-5 mb-3 leading-tight focus:outline-none focus:bg-white text-3xl"
                        id="cabinetsLamellaeQuantity"
                        type="text"
                        name="cabinetsLamellaesQuantity"
                        value="0"
                        onChange={() => {}} />
                </div>
                <div className="w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block tracking-wide font-bold mb-2 text-gray-500" for="cabinetsBlocksQuantity">
                        Cantidad de Gabinetes (Bloques)
                    </label>
                    <input
                        className="appearance-none text-center text-gray-500 font-medium block border-gray-500 w-full bg-gray-200 border-2 rounded-lg py-5 px-5 mb-3 leading-tight focus:outline-none focus:bg-white text-3xl"
                        id="cabinetsBlocksQuantity"
                        type="text"
                        name="cabinetsBlocksQuantity"
                        value="0"
                        onChange={() => {}} />
                </div>
            </div>
        </div>
    );
})

export default HospitalAreaForm;