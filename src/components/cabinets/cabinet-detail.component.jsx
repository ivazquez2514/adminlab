import { ReactComponent as LaminillasIcon } from '../../assets/svg/laminillas.svg';

const CabinetDetail = () => {
    return (
        <div className="w-full">
            <div className="w-full flex text-gray-500 border-b-2 border-gray-500 text-center py-4 px-2">
                <div className="w-1/12">Tipo</div>
                <div className="w-2/12">No. Expediente</div>
                <div className="w-2/12">No. Gabinete</div>
                <div className="w-1/12">Fila</div>
                <div className="w-2/12">Columna</div>
                <div className="w-1/12">Tercio</div>
                <div className="w-3/12">Fecha</div>
            </div>
            {
                [1,2,3].map(item => (
                    <div className="w-full flex text-center bg-white rounded my-4 shadow-lg py-10 px-2 text-xl">
                        <div className="w-1/12">
                            <LaminillasIcon className="w-full h-24" />
                        </div>
                        <div className="w-2/12 text-blue-500 flex justify-center items-center">132132132</div>
                        <div className="w-2/12 flex justify-center items-center">2</div>
                        <div className="w-1/12 flex justify-center items-center">F</div>
                        <div className="w-2/12 flex justify-center items-center">2</div>
                        <div className="w-1/12 flex justify-center items-center">a</div>
                        <div className="w-3/12 flex justify-center items-center">Hoy 4:50 p.m.</div>
                    </div>
                ))}
        </div>
    );
};

export default CabinetDetail;