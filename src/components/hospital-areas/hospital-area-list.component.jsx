import { withRouter } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { AREA_LIST } from '../../api/queries';

const HospitalAreaList = ({history}) => {
    const { data } = useQuery(AREA_LIST);
    let items = [];

    if (data && data.areaList) {
        items = data.areaList;
    }

    const formatDate = (date) => {
        return new Intl.DateTimeFormat('en-MX').format(new Date())
    }

    return (
        <div>
            <div className="table-head flex flex-col md:flex-row border-b border-gray-500">
                <p className="md:py-4 text-xl text-blue-500">Áreas</p>
            </div>
            <div className="table-data">
                {items.map((item, index) =>
                    <div key={index} className="row w-full flex flex-wrap md:flex-nowrap py-3 px-3 bg-white shadow-lg rounded my-4 text-gray-500 ">
                        <div
                            onClick={() => history.push(`/admin/hospital-areas/${item.id}`)}
                            className="w-6/12 md:w-1/3 flex justify-center items-center text-blue-500 cursor-pointer">{item.id}</div>
                        {/* <div className="w-6/12 md:w-1/3 flex md:justify-center items-center py-2 md:py-0 text-black md:text-gray-500">
                            <span className="md:hidden text-gray-500 ml-16 md:ml-0">Rol:&nbsp;</span>{item.name}
                        </div> */}
                        <div className="w-6/12 md:w-1/3 flex justify-center items-center">{item.name}</div>
                        <div className="w-6/12 md:w-1/3 flex justify-center items-center">{formatDate(item.createdAt)}</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default withRouter(HospitalAreaList);