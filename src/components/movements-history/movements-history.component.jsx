import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GENERAL_LOG_LIST } from '../../api/queries';
import { RingLoader } from 'react-spinners';

const MovementHistory = React.memo(({logout, history, search, setSearch, setInputRef}) => {
    const {data, error, loading} = useQuery(GENERAL_LOG_LIST);
    let items = [];
    
    if (data && data.generalLogList) {
        items = data.generalLogList;
        /* [...new Set(data.generalLogList.map(item => item.generalId))]
            .map(item => ({
                ...data.generalLogList.find(log => log.generalId === item)
            })); */
    }

    if (error) {
        localStorage.removeItem('adminlab-auth');
        logout();
    }

    const formatDate = (date) => {
        return new Intl.DateTimeFormat('en-MX').format(new Date())
    }

    const getEntityNameByType = (item) => {
        switch (item.logType) {
            case 'GABINETE':
                return `Gabinete-${item.cabinet.cabinetType === 'Laminillas' ? 'L' : 'B'} ` + item.cabinet.cabinetNumber;
            case 'EXPEDIENTE':
                return '#' + item.expedient.caseNumber;
            case 'COLABORADOR':
                return item.collaborator.username;
            case 'AREA':
                return 'Area ' + item.area.name;
        }
    }

    const filteredItems = useCallback(() => {
        if (search) {
            return items.filter(item =>
                item.logType.toLowerCase().includes(search.toLowerCase())
                || formatDate(item.updatedAt).includes(search.toLowerCase())
                || item.actionType.toLowerCase().includes(search.toLowerCase())
                || item.generalId.toLowerCase().includes(search.toLowerCase())
                || item.owner.username.toLowerCase().includes(search.toLowerCase())
                || item.owner.role.toLowerCase().includes(search.toLowerCase()));
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
            <div className="table-head flex flex-col md:flex-row md:justify-between border-b border-gray-500">
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
                        <div className="flex items-center w-full md:w-3/12">
                            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-blue-400 text-white text-lg">{item.owner.username.slice(0, 1).toUpperCase()}</div>
                            <div className="w-2/3 ml-4">
                                <p className="text-blue-400 text-lg md:text-sm mt-1">{item.owner.username}</p>
                                <p className="text-gray-500 text-md md:text-xs -mt-1">{item.owner.role}</p>
                            </div>
                        </div>
                        <div className="w-6/12 md:w-2/12 flex md:justify-center items-center py-2 md:py-0 text-black">
                            <span className="md:hidden text-gray-500 ml-16 md:ml-0">Rol:&nbsp;</span>{item.logType}
                        </div>
                        <div className="w-6/12 md:w-2/12 flex justify-center items-center py-2 md:py-0 text-black">
                            <span className="md:hidden text-gray-500">Acción:&nbsp;</span>{item.actionType}
                        </div>
                        <div className="w-6/12 md:w-3/12 flex justify-center items-center">
                            <span className="ml-16"><span className="text-blue-500 underline">{getEntityNameByType(item)}</span></span>
                        </div>
                        <div className="w-6/12 md:w-2/12 flex justify-center items-center">{formatDate(item.updatedAt)}</div>
                    </div>
                )}
            </div>
        </div>
    );
});

const mapStateToProps = (dispatch) => ({
    search: dispatch.ui.searchbar
});

const mapDispatchToProps = (dispatch) => ({
    logout: dispatch.auth.logout,
    setSearch: dispatch.ui.setSearch,
    setInputRef: dispatch.ui.setInputRef
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MovementHistory));