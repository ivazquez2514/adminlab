import { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { COLLABORATOR_LIST } from '../../api/queries';
import { RingLoader } from 'react-spinners';

const CollaboratorList = ({history, search, setSearch, setInputRef}) => {
    const { data, loading } = useQuery(COLLABORATOR_LIST);
    let items = [];

    if (data && data.collaboratorList) {
        items = data.collaboratorList;
    }

    const filteredItems = useCallback(() => {
        if (search) {
            return items.filter(item =>
                item.area?.name.includes(search)
                || item.username.includes(search)
                || item.role.includes(search));
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
            <div className="table-head flex flex-col md:flex-row border-b border-gray-500">
                <p className="md:py-4 text-xl text-blue-500">Colaboradores</p>
            </div>
            <div className="table-data">
                <div className="flex justify-center mt-8"><RingLoader
                    size={100}
                    color={"#02b8ff"}
                    loading={loading}/></div>
                {filteredItems().map((item, index) =>
                    <div
                        onClick={() => history.push(`/admin/collaborators/${item.id}`)}
                        key={index}
                        className="row w-full flex flex-wrap md:flex-nowrap py-3 px-3 bg-white shadow-lg rounded my-4 text-gray-500 cursor-pointer">
                        <div className="flex items-center w-full md:w-1/3">
                            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-blue-400 text-white text-lg">{item.username.charAt(0).toUpperCase()}</div>
                            <div className="w-2/3 ml-4">
                                <p className="text-blue-400 text-lg md:text-sm mt-1">{item.username}</p>
                            </div>
                        </div>
                        <div
                            className="w-6/12 md:w-1/3 flex md:justify-center items-center py-2 md:py-0 text-black md:text-gray-500">
                            <span className="md:hidden text-gray-500 ml-16 md:ml-0">Rol:&nbsp;</span>{item.role}
                        </div>
                        <div
                            onClick={() => history.push(`/admin/hospital-areas/${item.area?.id}`)}
                            className="w-6/12 md:w-1/3 flex justify-center items-center text-blue-500 cursor-pointer">{item.area?.name}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CollaboratorList));