import React from 'react'

const MovementHistory = React.memo(() => {

    const items = [1, 2, 3, 4];

    return (
        <div>
            <div className="table-head flex justify-between border-b border-gray-500">
                <p className="py-4 text-xl text-blue-500 border-b-2 border-blue-500">Historial de movimientos</p>
                <p className="py-4 text-gray-500">Última actualización:  27 Octubre, 2020 3:40 p.m.</p>
            </div>
            <div className="table-data">
                {items.map((item, index) =>
                    <div key={index} className="row w-full flex py-3 px-3 bg-white shadow-lg rounded my-4">
                        <div className="flex w-3/12">
                            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-blue-400 text-white text-lg">M</div>
                            <div className="user-info ml-3">
                                <p className="text-blue-400 text-sm mt-1">Mauricio Suarez Ramirez</p>
                                <p className="text-gray-500 text-xs -mt-1">ULAB001</p>
                            </div>
                        </div>
                        <div className="w-2/12 flex justify-center items-center">Admin</div>
                        <div className="w-2/12 flex justify-center items-center">Modificación</div>
                        <div className="w-3/12 flex justify-center items-center">
                            En &nbsp;<span className="text-blue-500 underline">No. 1231238821381</span>
                        </div>
                        <div className="w-2/12 flex justify-center items-center">Hoy 4:50 p.m.</div>
                    </div>
                )}
            </div>
        </div>
    );
});

export default MovementHistory;