import { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { AREA_LOG_LIST } from '../../api/queries';
import { RingLoader } from 'react-spinners';

const HospitalAreaList = ({history, search, setSearch, setInputRef}) => {
    const { data, loading } = useQuery(AREA_LOG_LIST);
    let items = [];

    if (data && data.areaLogList) {
        items = data.areaLogList;
    }

    const formatDate = (date) => {
        return new Intl.DateTimeFormat('en-MX').format(new Date())
    }

    const filteredItems = useCallback(() => {
        if (search) {
            return items.filter(item =>
                item.area?.name.toLowerCase().includes(search.toLowerCase())
                || (`${item.area.usersQuantity} Colaboradores`).toLowerCase().includes(search.toLowerCase())
                || (`${item.area.cabinetLamellasQuantity} G. Laminillas`).toLowerCase().includes(search.toLowerCase())
                || (`${item.area.cabinetBlocksQuantity} G. Bloques`).toLowerCase().includes(search.toLowerCase())
                || formatDate(item.createdAt).includes(search.toLowerCase())
            );
        }

        return items;
    }, [search, items]);

    useEffect(() => {
        return () => {
            setInputRef(null);
            setSearch('');
        }
    }, []);

    return (
        <div style={{height: 'calc(100vh - 200px)'}} className="overflow-y-auto list-container">
            <div className="table-head flex flex-col md:flex-row justify-between border-b border-gray-500">
                <p className="md:py-4 text-xl text-blue-500">Historial de movimientos</p>
                <p className="pb-2 md:py-4 text-gray-500">{items && items.length && formatDate(items[0].updatedAt) || ''}</p>
            </div>
            <div className="table-data">
                <div className="flex justify-center mt-8"><RingLoader
                    size={100}
                    color={"#02b8ff"}
                    loading={loading}/></div>
                {filteredItems().map((item, index) =>
                    <div key={index} className="row w-full flex flex-wrap md:flex-nowrap py-3 px-3 bg-white shadow-lg rounded my-4 text-gray-500 ">
                        <div
                            onClick={() => history.push(`/admin/hospital-areas/${item.area?.id}`)}
                            className="flex items-center w-full w-full md:w-1/5 mb-2 md:mb-0">
                            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-blue-400 text-white text-lg">{item.area?.name.slice(0, 1).toUpperCase()}</div>
                            <div className="w-2/3 ml-4">
                                <p className="text-blue-400 text-lg md:text-sm mt-1">{item.area?.name}</p>
                            </div>
                        </div>
                        <div className="w-6/12 md:w-1/5 flex justify-center items-center">{item.area?.usersQuantity} Colaboradores</div>
                        <div className="w-6/12 md:w-1/5 flex justify-center items-center">{item.area?.cabinetLamellasQuantity} G. Laminillas</div>
                        <div className="w-6/12 md:w-1/5 flex justify-center items-center">{item.area?.cabinetBlocksQuantity} G. Bloques</div>
                        <div className="w-6/12 md:w-1/5 flex justify-center items-center">{formatDate(item.createdAt)}</div>
                    </div>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = (st) => ({
    search: st.ui.searchbar
});

const mapDispatchToProps = (dispatch) => ({
    setSearch: dispatch.ui.setSearch,
    setInputRef: dispatch.ui.setInputRef,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HospitalAreaList));