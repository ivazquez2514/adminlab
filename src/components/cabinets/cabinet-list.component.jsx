import React, { useState } from 'react';

const CabinetList = () => {
    const [listType, setListType] = useState('LAMELLAS');

    return (
        <div>
            <div className="w-full bg-gray-400 p-1 rounded-lg font-bold text-gray-500 text-lg mb-4">
                <button
                    className={`${listType === 'LAMELLAS' ? 'bg-white shadow-lg text-black' : ''} w-1/2 py-2 font-bold py-3 rounded-lg`}
                    onClick={() => setListType('LAMELLAS')}>
                    Gabinetes de Laminillas
                </button>
                <button
                    className={`${listType === 'BLOCKS' ? 'bg-white shadow-lg text-black' : ''} w-1/2 py-2 font-bold py-3 rounded-lg`}
                    onClick={() => setListType('BLOCKS')}>
                    Gabinetes de Bloques
                </button>
            </div>
            <div className="w-full md:flex gap-3 px-10 md:px-0 relative">
                <div className="py-4 px-6 bg-white shadow-lg absolute left-0 rounded-lg">1</div>
                <div className="py-4 px-6 bg-white shadow-lg absolute right-0 rounded-lg">2</div>
                {
                    [1,2,3].map(item => <ListItem key={item} item={item} />)
                }
            </div>
        </div>
    );
};

const ListItem = React.memo(({item}) => (
    <div className="w-full md:w-1/3 bg-white rounded-lg shadow-lg">
        <div className="p-4 flex justify-center items-center text-blue-500 my-4">Icono</div>
        <div className="p-4 flex flex-col justify-center items-center">
            <p className="text-3xl text-blue-500 font-semibold">GABINETE {item}</p>
            <span className="text-center text-gray-400 font-normal">
                Núm. de expedientes: <br/>
                0
            </span>
        </div>
    </div>
));

export default CabinetList;