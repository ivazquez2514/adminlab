import { connect } from 'react-redux';
import { ReactComponent as LaminillasIcon } from '../../assets/svg/laminillas.svg';

const CabinetDetail = ({cabinet}) => {
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
                            <LaminillasIcon className="w-full h-24" />
                        </div>
                        <div className="w-2/12 text-blue-500 flex justify-center items-center">{cabinet.cabinetType === 'Laminillas' ? item.lamellaCoordinates.expedientId : item.blockCoordinates.expedientId}</div>
                        <div className="w-2/12 flex justify-center items-center">{cabinet.cabinetNumber}</div>
                        <div className="w-1/12 flex justify-center items-center">{cabinet.cabinetType === 'Laminillas' ? item.lamellaCoordinates.row : item.blockCoordinates.row}</div>
                        <div className="w-2/12 flex justify-center items-center">{cabinet.cabinetType === 'Laminillas' ? item.lamellaCoordinates.column : item.blockCoordinates.column}</div>
                        <div className="w-1/12 flex justify-center items-center">{cabinet.cabinetType === 'Laminillas' ? item.lamellaCoordinates.third : item.blockCoordinates.third}</div>
                        <div className="w-3/12 flex justify-center items-center">Hoy 4:50 p.m.</div>
                    </div>
                ))}
        </div>
    );
};

const mapStateToProps = (state) => ({
    cabinet: state.cabinet.cabinet
});

export default connect(mapStateToProps)(CabinetDetail);