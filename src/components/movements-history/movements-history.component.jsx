import React from 'react'

const MovementHistory = React.memo(() => {

    const items = [1, 2, 3, 4];

    return (
        <div>
            <div className="table-head flex flex-col md:flex-row md:justify-between border-b border-gray-500">
                <p className="md:py-4 text-xl text-blue-500">Historial de movimientos</p>
                <p className="pb-2 md:py-4 text-gray-500">Última actualización: 27 Octubre, 2020 3:40 p.m.</p>
            </div>
            <div className="table-data">
                {items.map((item, index) =>
                    <div key={index} className="row w-full flex flex-wrap md:flex-nowrap py-3 px-3 bg-white shadow-lg rounded my-4 text-gray-500 ">
                        <div className="flex w-full md:w-3/12">
                            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-blue-400 text-white text-lg">M</div>
                            <div className="w-2/3 ml-4">
                                <p className="text-blue-400 text-lg md:text-sm mt-1">Mauricio Suarez Ramirez</p>
                                <p className="text-gray-500 text-md md:text-xs -mt-1">ULAB001</p>
                            </div>
                        </div>
                        <div className="w-6/12 md:w-2/12 flex md:justify-center items-center py-2 md:py-0 text-black">
                            <span class="md:hidden text-gray-500 ml-16 md:ml-0">Rol:&nbsp;</span>Admin
                        </div>
                        <div className="w-6/12 md:w-2/12 flex justify-center items-center py-2 md:py-0 text-black">
                            <span class="md:hidden text-gray-500">Acción:&nbsp;</span>Modificación
                        </div>
                        <div className="w-6/12 md:w-3/12 flex justify-center items-center">
                            <span className="ml-16">En &nbsp;<span className="text-blue-500 underline">No. 1231238821381</span></span>
                        </div>
                        <div className="w-6/12 md:w-2/12 flex justify-center items-center">Hoy 4:50 p.m.</div>
                    </div>
                )}
            </div>
        </div>
    );
});

export default MovementHistory;