import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ReactComponent as LaminillasIcon } from '../../assets/svg/laminillas.svg';
import BlocksIcon from '../../assets/images/gabinete_bloques.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@apollo/client';
import { CABINET_LIST } from '../../api/queries';

const CabinetList = ({history, setCabinet}) => {
    const [listType, setListType] = useState('LAMELLAS');
    const [offset, setOffset] = useState(0);
    const {data} = useQuery(CABINET_LIST);
    let list = [];

    if (data && data.cabinetList) {
        list = [...data.cabinetList];
    }

    const getItems = useCallback(() => {
        return list.filter(item => (listType === 'BLOCKS' ? 'Bloques' : 'Laminillas') === item.cabinetType)
            .slice(offset, 3);
    }, [listType, data]);

    return (
        <>
            <div className="w-full bg-gray-400 p-1 rounded-lg font-bold text-gray-500 text-lg mb-4">
                <button
                    className={`${listType === 'LAMELLAS' ? 'bg-white shadow-lg text-black' : ''} w-1/2 py-2 font-bold py-3 rounded-lg focus:outline-none`}
                    onClick={() => {
                        setListType('LAMELLAS');
                        setOffset(0);
                    }}>
                    Gabinetes de Laminillas
                </button>
                <button
                    className={`${listType === 'BLOCKS' ? 'bg-white shadow-lg text-black' : ''} w-1/2 py-2 font-bold py-3 rounded-lg focus:outline-none`}
                    onClick={() => {
                        setListType('BLOCKS');
                        setOffset(0);
                    }}>
                    Gabinetes de Bloques
                </button>
            </div>
            <div className="w-full md:flex gap-3 px-10 md:px-0 relative">
                <button
                    onClick={() => setOffset(offset - 3)}
                    disabled={offset === 0}
                    className="py-4 px-6 bg-white shadow-lg absolute -ml-20 rounded-lg text-2xl focus:outline-none"
                    style={{ top: "50%", marginTop: "-50px" }}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button
                    onClick={() => setOffset(offset + 3)}
                    disabled={(offset + 3) === list.length}
                    className="py-4 px-6 bg-white shadow-lg absolute right-0 -mr-20 rounded-lg text-2xl focus:outline-none"
                    style={{ top: "50%", marginTop: "-50px" }}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
                {
                    getItems().map((item, index) => <ListItem key={index} item={item} history={history} listType={listType} setCabinet={setCabinet} />)
                }
            </div>
        </>
    );
};

const ListItem = React.memo(({item, history, listType, setCabinet}) => (
    <div className="w-full md:w-1/3 bg-white rounded-lg shadow-lg" onClick={() => {
            setCabinet(item);
            history.push(`/admin/cabinets/${item.id}`);
        }}>
        <div className="p-4 flex justify-center items-center text-blue-500 my-4">
            {listType === 'LAMELLAS' ? <LaminillasIcon /> : <img src={BlocksIcon} alt="Gabinete de bloque icono" className="w-1/4 md:w-2/3" />}
        </div>
        <div className="p-4 flex flex-col justify-center items-center">
            <p className="text-3xl text-blue-500 font-semibold">GABINETE {item.cabinetNumber}</p>
            <span className="text-center text-gray-400 font-normal">
                Núm. de expedientes: <br/>
                {item.expedients.length}
            </span>
        </div>
    </div>
));

const mapDispatchToProps = (dispatch) => ({
    setCabinet: dispatch.cabinet.setCabinet
});

export default connect(null, mapDispatchToProps)(withRouter(CabinetList));