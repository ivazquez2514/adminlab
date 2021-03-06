import React, { useState, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ReactComponent as LaminillasIcon } from '../../assets/svg/laminillas.svg';
import BlocksIcon from '../../assets/images/gabinete_bloques.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@apollo/client';
import { CABINET_LIST } from '../../api/queries';
import { RingLoader } from 'react-spinners';

const CabinetList = ({history, setCabinet, search, setSearch, setInputRef}) => {
    const [listType, setListType] = useState('LAMELLAS');
    const [offset, setOffset] = useState(0);
    const {data, loading} = useQuery(CABINET_LIST);
    let list = [];

    if (data && data.cabinetList) {
        list = [...data.cabinetList];
    }

    const getTotalItemsCount = (type) => {
        return list
            .filter(item => type === item.cabinetType)
            .filter(item =>
                String(item.cabinetNumber).toLowerCase().includes(search.toLowerCase())
                || String(item.expedients.length).includes(search.toLowerCase())
                || item.expedients.filter(expedient => expedient.caseNumber.toLowerCase().includes(search.toLowerCase())).length > 0)
            .length;
    };

    const getItems = useCallback(() => {
        return list.filter(item => (listType === 'BLOCKS' ? 'Bloques' : 'Laminillas') === item.cabinetType)
            .splice(offset, 3);
    }, [listType, data, offset]);

    const filteredItems = useCallback((type) => {
        if (search) {
            return getItems().filter(item =>
                String(item.cabinetNumber).toLowerCase().includes(search.toLowerCase())
                || String(item.expedients.length).includes(search.toLowerCase())
                || item.expedients.filter(expedient => expedient.caseNumber.toLowerCase().includes(search.toLowerCase())).length > 0);
        }

        return getItems();
    }, [search, list, offset]);

    useEffect(() => {
        return () => {
            setInputRef(null);
            setSearch('');
        }
    }, []);

    return (
        <div className="relative h-full md:flex flex-col items-center justify-center list-container" style={{height: 'calc(100vh - 200px)'}}>
                <div className="w-full bg-gray-400 p-1 rounded-lg font-bold text-gray-500 text-lg mb-4 block md:absolute top-0">
                    <button
                        className={`${listType === 'LAMELLAS' ? 'bg-white shadow-lg text-black' : ''} w-1/2 py-2 font-bold py-3 rounded-lg focus:outline-none`}
                        onClick={() => {
                            setListType('LAMELLAS');
                            setOffset(0);
                        }}>
                        Gabinetes de Laminillas
                        <span className="float-right mr-5">({getTotalItemsCount('Laminillas')})</span>
                    </button>
                    <button
                        className={`${listType === 'BLOCKS' ? 'bg-white shadow-lg text-black' : ''} w-1/2 py-2 font-bold py-3 rounded-lg focus:outline-none`}
                        onClick={() => {
                            setListType('BLOCKS');
                            setOffset(0);
                        }}>
                        Gabinetes de Bloques
                        <span className="float-right mr-5">({getTotalItemsCount('Bloques')})</span>
                    </button>
                </div>
                <div className="flex justify-center mt-8"><RingLoader
                    size={100}
                    color={"#02b8ff"}
                    loading={loading}/></div>
                <div className="w-full gap-3 px-10 md:px-0 relative">
                    <button
                        onClick={() => setOffset(offset - 3)}
                        disabled={offset === 0}
                        className="py-4 px-6 bg-white shadow-lg absolute -ml-5 md:-ml-20 rounded-lg text-2xl focus:outline-none fixed"
                        style={{ top: "50%", marginTop: "-50px" }}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button
                        onClick={() => setOffset(offset + 3)}
                        disabled={(offset + 3) === list.length}
                        className="py-4 px-6 bg-white shadow-lg absolute right-0 mr-5 md:-mr-20 rounded-lg text-2xl focus:outline-none fixed"
                        style={{ top: "50%", marginTop: "-50px" }}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                    <div className="flex flex-col md:flex-row justify-center w-full max-h-full gap-3">
                        {
                            filteredItems().map((item, index) => <ListItem key={index} item={item} history={history} listType={listType} setCabinet={setCabinet} />)
                        }
                    </div>
                </div>
        </div>
    );
};

const ListItem = React.memo(({item, history, listType, setCabinet}) => (
    <div className="w-full md:w-1/3 bg-white rounded-lg shadow-lg" onClick={() => {
            setCabinet(item);
            history.push(`/admin/cabinets/${item.id}`);
        }}>
        <div className="p-4 flex justify-center items-center text-blue-500 my-4">
            {listType === 'LAMELLAS' ? <LaminillasIcon /> : <img src={BlocksIcon} alt="Gabinete de bloque icono" className="w-1/4 md:w-3/6" />}
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

const mapStateToProps = (st) => ({
    search: st.ui.searchbar
});

const mapDispatchToProps = (dispatch) => ({
    setCabinet: dispatch.cabinet.setCabinet,
    setSearch: dispatch.ui.setSearch,
    setInputRef: dispatch.ui.setInputRef,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CabinetList));