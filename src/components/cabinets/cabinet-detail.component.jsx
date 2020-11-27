import { useEffect } from 'react';
import { connect } from 'react-redux';
import { ReactComponent as LaminillasIcon } from '../../assets/svg/laminillas.svg';
import BlocksIcon from '../../assets/images/gabinete_bloques.png';

const CabinetDetail = ({cabinet, setCabinet}) => {

    const formatDate = (date) => {
        return new Intl.DateTimeFormat('en-MX').format(new Date())
    }

    useEffect(() => {
        return () => {
            setCabinet(null);
        };
    });

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
                (cabinet ? cabinet.expedients : []).map(item => (
                    <div key={item.id} className="w-full flex text-center bg-white rounded my-4 shadow-lg py-10 px-2 text-xl">
                        <div className="w-1/12">
                            {cabinet.cabinetType === 'Laminillas' ? <LaminillasIcon className="w-full h-24" /> : <img src={BlocksIcon} alt="Gabinete de bloque icono" className="w-1/4 md:w-2/3" />}
                        </div>
                        <div className="w-2/12 text-blue-500 flex justify-center items-center">{cabinet.cabinetType === 'Laminillas' ? item.lamellaCoordinates.expedientId : item.blockCoordinates.expedientId}</div>
                        <div className="w-2/12 flex justify-center items-center">{cabinet.cabinetNumber}</div>
                        <div className="w-1/12 flex justify-center items-center">{cabinet.cabinetType === 'Laminillas' ? item.lamellaCoordinates.row : item.blockCoordinates.row}</div>
                        <div className="w-2/12 flex justify-center items-center">{cabinet.cabinetType === 'Laminillas' ? item.lamellaCoordinates.column : item.blockCoordinates.column}</div>
                        <div className="w-1/12 flex justify-center items-center">{cabinet.cabinetType === 'Laminillas' ? item.lamellaCoordinates.third : item.blockCoordinates.third}</div>
                        <div className="w-3/12 flex justify-center items-center">{formatDate(cabinet.cabinetType === 'Laminillas' ? item.lamellaCoordinates.updatedAt : item.blockCoordinates.updatedAt)}</div>
                    </div>
                ))}
        </div>
    );
};

const mapStateToProps = (state) => ({
    cabinet: state.cabinet.cabinet
});

const mapDispatchToProps = (dispatch) => ({
    setCabinet: dispatch.cabinet.setCabinet
});

export default connect(mapStateToProps, mapDispatchToProps)(CabinetDetail);