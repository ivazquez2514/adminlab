import React, { useState } from 'react';
import { useStore } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router-dom';
import { Roles, Permissions, FormActions } from '../../enums';

const ROUTES = {
    PATIENT_RECORDS: '/admin/patient-records/new',
    HOSPITAL_AREAS_FORM: '/admin/hospital-areas/new',
    COLLABORATORS_FORM: '/admin/collaborators/new',
    CABINETS_FORM: '/admin/cabinets/new',
};

const Dialog = ({ title, onClose, history }) => {
    const [ selectedOption, setSelectedOption ] = useState('');
    const store = useStore();
    const user = store.getState().auth.authenticatedUser;

    const displayItem = (path) => {
        if (path === ROUTES.COLLABORATORS_FORM) {
            console.log(Permissions.collaborators[user.role], Permissions.collaborators[user.role].includes(FormActions.LIST));
            return Permissions.collaborators[user.role].includes(FormActions.DETAIL)
        } else if (path === ROUTES.HOSPITAL_AREAS_FORM) {
            return Permissions.areas[user.role].includes(FormActions.DETAIL);
        } else if (path === ROUTES.CABINETS_FORM) {
            return Permissions.cabinets[user.role].includes(FormActions.DETAIL)
        } else if (path === ROUTES.PATIENT_RECORDS) {
            return Permissions.patientRecords[user.role].includes(FormActions.DETAIL);
        }
    };

    return (
        <div className="w-screen h-screen transition ease-in-out bg-black bg-opacity-25 absolute z-50 flex justify-center items-center">
            <div className="bg-white rounded shadow-lg m-4 max-w-sm max-h-full overflow-y-auto" style={{minWidth: '300px'}}>
                <div className="p-4 border-b border-gray-400 flex justify-between items-center text-2xl font-medium">
                    <p>{title}</p>
                    <FontAwesomeIcon icon={faTimes} className="cursor-pointer text-xl" onClick={onClose} />
                </div>
                <div className="p-4">
                    {displayItem(ROUTES.PATIENT_RECORDS) && <button
                        onClick={() => setSelectedOption(ROUTES.PATIENT_RECORDS)}
                        className={`${ selectedOption === ROUTES.PATIENT_RECORDS ? 'bg-blue-500 text-white' : 'bg-white text-gray-500' } hover:bg-blue-500 w-full border border-gray-500 hover:text-white rounded-lg py-3 text-xl mb-4 focus:outline-none`}>
                            Expediente de Paciente
                    </button>}
                    {displayItem(ROUTES.COLLABORATORS_FORM) && <button
                        onClick={() => setSelectedOption(ROUTES.COLLABORATORS_FORM)}
                        className={`${ selectedOption === ROUTES.COLLABORATORS_FORM ? 'bg-blue-500 text-white' : 'bg-white text-gray-500' } hover:bg-blue-500 w-full border border-gray-500 hover:text-white rounded-lg py-3 text-xl mb-4 focus:outline-none`}>
                            Colaborador
                    </button>}
                    {displayItem(ROUTES.CABINETS_FORM) && <button
                        onClick={() => setSelectedOption(ROUTES.CABINETS_FORM)}
                        className={`${ selectedOption === ROUTES.CABINETS_FORM ? 'bg-blue-500 text-white' : 'bg-white text-gray-500' } hover:bg-blue-500 w-full border border-gray-500 hover:text-white rounded-lg py-3 text-xl mb-4 focus:outline-none`}>
                            Gabinete
                    </button>}
                    {displayItem(ROUTES.HOSPITAL_AREAS_FORM) && <button
                        onClick={() => setSelectedOption(ROUTES.HOSPITAL_AREAS_FORM)}
                        className={`${ selectedOption === ROUTES.HOSPITAL_AREAS_FORM ? 'bg-blue-500 text-white' : 'bg-white text-gray-500' } hover:bg-blue-500 w-full border border-gray-500 hover:text-white rounded-lg py-3 text-xl mb-4 focus:outline-none`}>
                            Area (Hospital)
                    </button>}
                </div>
                <div className="p-4 flex text-white gap-5">
                    <button
                        onClick={onClose}
                        className="bg-red-500 w-1/2 rounded-lg py-2 text-3xl">
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                    <button
                        onClick={() => {
                            history.push(selectedOption);
                            onClose();
                        }}
                        className="bg-green-500 w-1/2 rounded-lg py-2 text-3xl">
                        <FontAwesomeIcon icon={faCheck} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Dialog);