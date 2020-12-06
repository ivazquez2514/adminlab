import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const AlertDialog = ({ title, msg, onAccept, close }) => {
    return (
        <div className="w-full h-full transition ease-in-out absolute z-40 flex justify-center items-center">
            <div className="bg-white rounded shadow-lg m-4 max-w-sm max-h-full overflow-y-auto">
                <div className="p-4 border-b border-gray-400 flex justify-between items-center text-2xl font-medium">
                    <p>{title}</p>
                    <FontAwesomeIcon icon={faTimes} className="cursor-pointer text-xl" onClick={close} />
                </div>
                <div className="p-4">
                    <p>{msg}</p>
                </div>
                <div className="p-4 flex text-white">
                    <button
                        type="button"
                        onClick={close}
                        className="bg-red-600 w-full rounded-lg py-2 text-3xl focus:outline-none">
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AlertDialog;