import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { useOnlyNumbers } from '../../hooks';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FormTitlesEnum } from '../../enums';

import {
    NumberPicker
} from '../';

const PatientRecordForm = ({history, setActiveForm}) => {
    const {validateFn} = useOnlyNumbers();
    const {register, errors, handleSubmit} = useForm();
    const [listType, setListType] = useState('LAMELLAS');

    const onSubmit = (data) => {
        console.log(data);
    }

    useEffect(() => {
        setActiveForm({
            title: FormTitlesEnum.PATIENT_RECORD,
            backUrl: './'
        })

        return () => {
            setActiveForm(null)
        }
    }, []);

    return (
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full">
                <label className="block tracking-wide font-bold mb-2 text-gray-500" htmlFor="username">
                    No. de Caso
                </label>
                <input
                    className={`${errors?.username ? 'border-red-500 placeholder-red-500' : 'border-gray-500'} appearance-none font-medium text-center text-gray-500 block w-full bg-gray-200 border-2 rounded-lg py-3 md:py-5 px-5 mb-3 leading-tight focus:outline-none focus:bg-white text-xl md:text-3xl`}
                    type="text"
                    id="caseNumber"
                    name="caseNumber"
                    onKeyPress={validateFn}
                    ref={register({required: true})}
                    placeholder="Escribir el número de caso..." />
            </div>
            <hr className="border-1 border-gray-500 mt-6 mb-8"/>
            <div className="w-full bg-gray-400 p-1 rounded-lg font-bold text-gray-500 text-lg mb-4">
                <button
                    type="button"
                    className={`${listType === 'LAMELLAS' ? 'bg-white shadow-lg text-blue-500' : ''} w-1/2 py-2 font-bold py-3 rounded-lg focus:outline-none`}
                    onClick={() => setListType('LAMELLAS')}>
                    Gabinetes de Laminillas
                </button>
                <button
                    type="button"
                    className={`${listType === 'BLOCKS' ? 'bg-white shadow-lg text-blue-500' : ''} w-1/2 py-2 font-bold py-3 rounded-lg focus:outline-none`}
                    onClick={() => setListType('BLOCKS')}>
                    Gabinetes de Bloques
                </button>
            </div>
            <div className="w-full flex flex-col md:flex-row gap-6 mt-6">
                <div className="w-full md:w-2/6">
                    <NumberPicker
                        label="No. Laminillas"
                        inputProps={{
                            ref: register({required: true}),
                            name: "lamellasNumber",
                            placeholder: "0",
                            tabIndex: "1"
                        }} />
                </div>
                <div className="w-full md:w-1/6">
                    <label className="block tracking-wide font-bold mb-2 text-gray-500" htmlFor="cabinet">
                        Gabinete
                    </label>
                    <input
                        className={`${errors?.username ? 'border-red-500 placeholder-red-500' : 'border-gray-500'} appearance-none font-medium text-center text-gray-500 block w-full bg-gray-200 border-2 rounded-lg py-3 md:py-5 px-5 mb-3 leading-tight focus:outline-none focus:bg-white text-xl md:text-3xl`}
                        id="cabinet"
                        type="text"
                        name="cabinet"
                        onKeyPress={validateFn}
                        ref={register({required: true})} />
                </div>
                <div className="w-full md:w-1/6">
                    <label className="block tracking-wide font-bold mb-2 text-gray-500" htmlFor="row">
                        Fila
                    </label>
                    <input
                        className={`${errors?.username ? 'border-red-500 placeholder-red-500' : 'border-gray-500'} appearance-none font-medium text-center text-gray-500 block w-full bg-gray-200 border-2 rounded-lg py-3 md:py-5 px-5 mb-3 leading-tight focus:outline-none focus:bg-white text-xl md:text-3xl`}
                        id="row"
                        type="text"
                        name="row"
                        onKeyPress={validateFn}
                        ref={register({required: true})} />
                </div>
                <div className="w-full md:w-1/6">
                    <label className="block tracking-wide font-bold mb-2 text-gray-500" htmlFor="column">
                        Columna
                    </label>
                    <input
                        className={`${errors?.username ? 'border-red-500 placeholder-red-500' : 'border-gray-500'} appearance-none font-medium text-center text-gray-500 block w-full bg-gray-200 border-2 rounded-lg py-3 md:py-5 px-5 mb-3 leading-tight focus:outline-none focus:bg-white text-xl md:text-3xl`}
                        type="text"
                        id="column"
                        name="column"
                        onKeyPress={validateFn}
                        ref={register({required: true})} />
                </div>
                <div className="w-full md:w-1/6">
                    <label className="block tracking-wide font-bold mb-2 text-gray-500" htmlFor="third">
                        Tercio
                    </label>
                    <input
                        className={`${errors?.username ? 'border-red-500 placeholder-red-500' : 'border-gray-500'} appearance-none font-medium text-center text-gray-500 block w-full bg-gray-200 border-2 rounded-lg py-3 md:py-5 px-5 mb-3 leading-tight focus:outline-none focus:bg-white text-xl md:text-3xl`}
                        type="text"
                        id="third"
                        name="third"
                        onKeyPress={validateFn}
                        ref={register({required: true})} />
                </div>
            </div>
            <div className="w-full mt-10 flex text-white gap-8 bottom-0">
                <button
                    type="button"
                    className="bg-red-600 w-1/2 rounded-lg py-2 text-4xl md:text-5xl"
                    onClick={() => history.push('../')}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <button
                    type="submit"
                    className="bg-green-500 w-1/2 rounded-lg py-2 text-4xl md:text-5xl">
                </button>
                    <FontAwesomeIcon icon={faCheck} />
            </div>
        </form>
    );
};

const mapDispatchToProps = (dispatch) => ({
    setActiveForm: dispatch.ui.setActiveForm,
    setNotification: dispatch.ui.setNotification,
})

export default connect(null, mapDispatchToProps)(withRouter(PatientRecordForm));