import React, { useEffect } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faInfoCircle, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

export const types = {
    SUCCESS: 'success',
    INFO: 'info',
    ERROR: 'error',
};



const Notification = ({data, setNotification}) => {

    const getColor = () => {
        switch(data.type) {
            case types.SUCCESS:
                return 'bg-green-500';
                break
            case types.INFO:
                return 'bg-blue-500';
                break
            case types.ERROR:
                return 'bg-red-500';
                break
        }
    };

    const getIcon = () => {
        switch(data.type) {
            case types.SUCCESS:
                return <FontAwesomeIcon icon={faCheckCircle} className="text-xl md:text-3xl mr-6" />;
                break;
            case types.INFO:
                return <FontAwesomeIcon icon={faInfoCircle} className="text-xl md:text-3xl mr-6" />;
                break
            case types.ERROR:
                return <FontAwesomeIcon icon={faExclamationCircle} className="text-xl md:text-3xl mr-6" />;
                break;
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setNotification(null);
        }, 5000);
    }, []);

    return (
        <div className={`${getColor()} p-5 w-full absolute z-50 text-white flex items-center`}>
            {getIcon()}
            <p className="text-normal md:text-lg">{data?.message}</p>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    setNotification: dispatch.ui.setNotification
})

export default connect(null, mapDispatchToProps)(Notification);