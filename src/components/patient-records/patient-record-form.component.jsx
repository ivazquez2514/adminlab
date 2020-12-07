import React, { useState, useEffect, useCallback } from 'react';
import { withRouter, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FormTitlesEnum, FormActions } from '../../enums';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { CABINET_LIST, EXPEDIENT_GET } from '../../api/queries';
import { EXPEDIENT_CREATE, EXPEDIENT_UPDATE, EXPEDIENT_DELETE } from '../../api/mutations';
import { useOnlyNumbers } from '../../hooks';
import { types } from '../notification/notification.component';

import {
    NumberPicker,
    ConfirmDialog,
    AlertDialog
} from '../';

export const letters = [
    { name: 'A', value: 1 },
    { name: 'B', value: 2 },
    { name: 'C', value: 3 },
    { name: 'D', value: 4 },
    { name: 'E', value: 5 },
    { name: 'F', value: 6 },
    { name: 'G', value: 7 },
    { name: 'H', value: 8 },
    { name: 'I', value: 9 },
    { name: 'J', value: 10 },
    { name: 'K', value: 11 },
    { name: 'L', value: 12 },
    { name: 'M', value: 13 },
    { name: 'N', value: 14 },
    { name: 'Ñ', value: 15 },
    { name: 'O', value: 16 },
    { name: 'P', value: 17 },
    { name: 'Q', value: 18 },
    { name: 'R', value: 19 },
    { name: 'S', value: 20 },
    { name: 'T', value: 21 },
    { name: 'U', value: 22 },
    { name: 'V', value: 23 },
    { name: 'W', value: 24 },
    { name: 'X', value: 25 },
    { name: 'Y', value: 26 },
    { name: 'Z', value: 27 },
];

const PatientRecordForm = ({history, setActiveForm, setNotification, formAction, setFormAction}) => {
    const {validateFn: validateNumbersFn} = useOnlyNumbers();
    const {register, errors, handleSubmit, setValue, reset, watch} = useForm();
    const [listType, setListType] = useState('LAMELLAS');
    const [lamellaCabinetSelected, setLamellaCabinetSelected] = useState(null);
    const [blockCabinetSelected, setBlockCabinetSelected] = useState(null);
    const {data} = useQuery(CABINET_LIST);
    const [expedientCreate] = useMutation(EXPEDIENT_CREATE);
    const { id } = useParams();
    const [getExpedient, { data: patientRecordData }] = useLazyQuery(EXPEDIENT_GET);
    const [patientRecord, setPatientRecord] = useState(null);
    const [expedientUpdate] = useMutation(EXPEDIENT_UPDATE);
    const [deleteExpedient] = useMutation(EXPEDIENT_DELETE);
    const [showAlert, setShowAlert] = useState(false);

    const getCabinetListByType = useCallback((type) => {
        return data ? data.cabinetList.filter(item => type === item.cabinetType) : [];
    }, [data])
    
    useEffect(() => {
        if (patientRecordData && data) {
            setPatientRecord(patientRecordData.expedientGet);
            reset({
                caseNumber: patientRecordData.expedientGet?.caseNumber,
                cabinetItemsLamellas: patientRecordData.expedientGet?.lamellaCoordinates?.cabinetItems,
                cabinetIdLamellas: patientRecordData.expedientGet?.lamellaCoordinates?.cabinetId,
                rowLamellas: patientRecordData.expedientGet?.lamellaCoordinates?.row,
                columnLamellas: patientRecordData.expedientGet?.lamellaCoordinates?.column,
                thirdLamellas: patientRecordData.expedientGet?.lamellaCoordinates?.third,
                cabinetItemsBlocks: patientRecordData.expedientGet?.blockCoordinates?.cabinetItems,
                cabinetIdBlocks: patientRecordData.expedientGet?.blockCoordinates?.cabinetId,
                rowBlocks: patientRecordData.expedientGet?.blockCoordinates?.row,
                columnBlocks: patientRecordData.expedientGet?.blockCoordinates?.column,
                thirdBlocks: patientRecordData.expedientGet?.blockCoordinates?.third,
            });
            setLamellaCabinetSelected(getCabinetListByType('Laminillas').find(item => item.id === patientRecordData.expedientGet?.lamellaCoordinates?.cabinetId));
            setBlockCabinetSelected(getCabinetListByType('Bloques').find(item => item.id === patientRecordData.expedientGet?.blockCoordinates?.cabinetId));
        }
    }, [patientRecordData, data])

    const handleCabinetChange = (e) => {
        if (listType === 'LAMELLAS') {
            setValue('rowLamellas', '');
            setValue('columnLamellas', '');
            setValue('thirdLamellas', '');
            setLamellaCabinetSelected(getCabinetListByType('Laminillas').find(item => item.id === e.target.value));
        } else {
            setValue('rowBlocks', '');
            setValue('columnBlocks', '');
            setValue('thirdBlocks', '');
            setBlockCabinetSelected(getCabinetListByType('Bloques').find(item => item.id === e.target.value));
        }
    }

    const handleColumnBlur = (e) => {
        const value = Number(e.target.value);
        if (listType === 'LAMELLAS' && (value > lamellaCabinetSelected?.columns || value === 0)) {
            setValue('columnLamellas', '1');
        }

    }

    const getSwitchClasses = (type) => {
        if (errors[`cabinetItems${type}`] || errors[`cabinetId${type}`] || errors[`row${type}`] || errors[`column${type}`]) {
            return `${listType === type.toUpperCase() ? 'bg-white shadow-lg border-2 border-red-500' : ''} text-red-500`
        } else if (listType === type.toUpperCase()) {
            return 'bg-white shadow-lg text-blue-500';
        }
    }

    const deleteExpedientHandler = () => {
        deleteExpedient({variables: {id}})
            .then(response => {
                console.log(response);
                setFormAction(FormActions.DETAIL)
                setNotification({
                    message: 'El expediente ha sido eliminada exitosamente.',
                    type: types.SUCCESS
                });
                history.push('../../../');
            }).catch(error => {
                setNotification({
                    message: 'Un error ha ocurrido. Favor de intentarlo de nuevo.',
                    type: types.ERROR
                });
                console.log(error);
            });
    }

    console.log(watch());

    const isComplete = (data) => {
        let result;
        if (data.cabinetItemsLamellas && data.rowLamellas && data.columnLamellas
            && data.thirdLamellas) {
                result = {
                    lamellaCoordinates: {
                        cabinetId: lamellaCabinetSelected.id,
                        cabinetItems: Number(data.cabinetItemsLamellas),
                        row: Number(data.rowLamellas),
                        column: Number(data.columnLamellas),
                        third: data.thirdLamellas,
                        expedientId: id ? patientRecord.id : undefined,
                        updatedAt: new Date()
                    }
                }
        }
        
        if (data.cabinetItemsBlocks && data.rowBlocks && data.columnBlocks
            && data.thirdBlocks) {
                result = {
                    ...result,
                    blockCoordinates: {
                        cabinetId: blockCabinetSelected.id,
                        cabinetItems: Number(data.cabinetItemsBlocks),
                        row: Number(data.rowBlocks),
                        column: Number(data.columnBlocks),
                        third: data.thirdBlocks,
                        expedientId: id ? patientRecord.id : undefined,
                        updatedAt: new Date()
                    }
                }
        }

        return result;
    }

    const onSubmit = (data) => {
        const validationResult = isComplete(data);
        if (!validationResult) {
            setShowAlert(true);
            return;
        }

        data = {
            expedient: {
                id: id ? patientRecord.id : undefined,
                caseNumber: data.caseNumber,
                ...validationResult
                /* lamellaCoordinates: {
                    cabinetId: lamellaCabinetSelected.id,
                    cabinetItems: Number(data.cabinetItemsLamellas),
                    row: Number(data.rowLamellas),
                    column: Number(data.columnLamellas),
                    third: data.thirdLamellas,
                    expedientId: id ? patientRecord.id : undefined,
                    updatedAt: new Date()
                },
                blockCoordinates: {
                    cabinetId: blockCabinetSelected.id,
                    cabinetItems: Number(data.cabinetItemsBlocks),
                    row: Number(data.rowBlocks),
                    column: Number(data.columnBlocks),
                    third: data.thirdBlocks,
                    expedientId: id ? patientRecord.id : undefined,
                    updatedAt: new Date()
                } */
            }
        };

        const fn = id ? expedientUpdate : expedientCreate;
        fn({ variables: data })
            .then(response => {
                console.log(response);
                setNotification({
                    message: `El expediente ha sido ${id ? 'editado' : 'creado'} exitosamente.`,
                    type: types.SUCCESS
                });
                history.push('../../');
            }).catch(error => {
                console.error(error);
                setNotification({
                    message: 'Un error ha ocurrido. Favor de intentarlo de nuevo.',
                    type: types.ERROR
                });
            });
    }

    useEffect(() => {
        if (id && id !== 'new') {
            getExpedient({ variables: {id} });
            setFormAction(FormActions.DETAIL);
        }
    }, [id])

    useEffect(() => {
        setActiveForm({
            title: id && id !== 'new' ? FormTitlesEnum[`PATIENT_RECORD${formAction ? `_${formAction}` : ''}`] : FormTitlesEnum.PATIENT_RECORD,
            backUrl: '/admin'
        })

        return () => {
            setActiveForm(null);
            setFormAction(null);
        }
    }, []);

    return (
        <form className="w-full relative" onSubmit={handleSubmit(onSubmit)}>
            {formAction === FormActions.DELETE && <ConfirmDialog
                title="Eliminar Expediente"
                msg="¿Estas seguro que quieres eliminar este expediente?"
                onAccept={deleteExpedientHandler}
                onCancel={() => setFormAction(FormActions.DETAIL)}/>}
            {showAlert && <AlertDialog
                title="Alerta"
                msg="No puedes guardar un expediente vacio."
                close={() => setShowAlert(false)}/>}
            <div className="w-full">
                <label className="block tracking-wide font-bold mb-2 text-gray-500" htmlFor="username">
                    No. de Caso
                </label>
                <input
                    className={`${errors?.caseNumber ? 'border-red-500 placeholder-red-500' : 'border-gray-500'} appearance-none font-medium text-center text-gray-500 block w-full bg-gray-200 border-2 rounded-lg py-3 md:py-5 px-5 mb-3 leading-tight focus:outline-none focus:bg-white text-xl md:text-3xl`}
                    type="text"
                    id="caseNumber"
                    name="caseNumber"
                    disabled={formAction === FormActions.DETAIL}
                    onKeyPress={validateNumbersFn}
                    ref={register({required: true})}
                    placeholder="Ingresar el número de expediente"
                    autoComplete="off" />
            </div>
            <hr className="border-1 border-gray-500 mt-6 mb-8"/>
            <div className="w-full bg-gray-400 p-1 rounded-lg font-bold text-gray-500 text-lg mb-4 gap-4">
                <button
                    type="button"
                    className={`${getSwitchClasses('Lamellas')} w-1/2 py-2 font-bold py-3 rounded-lg focus:outline-none`}
                    onClick={() => setListType('LAMELLAS')}>
                    Gabinetes de Laminillas
                </button>
                <button
                    type="button"
                    className={`${getSwitchClasses('Blocks')} w-1/2 py-2 font-bold py-3 rounded-lg focus:outline-none`}
                    onClick={() => setListType('BLOCKS')}>
                    Gabinetes de Bloques
                </button>
            </div>
            {<div className={`${listType !== 'LAMELLAS' && 'hidden'} w-full flex flex-col md:flex-row gap-6 mt-6`}>
                <div className="w-full md:w-2/6">
                    <NumberPicker
                        label="No. Laminillas"
                        error={errors?.rowLamellas}
                        defaultValue={patientRecordData?.expedientGet?.lamellaCoordinates?.cabinetItems || 0}
                        inputProps={{
                            ref: register(),
                            name: "cabinetItemsLamellas",
                            placeholder: "0",
                            tabIndex: "1"
                        }} />
                </div>
                <div className="w-full md:w-1/6">
                    <label className="block tracking-wide font-bold mb-2 text-gray-500" htmlFor="cabinetIdLamellas">
                        Gabinete
                    </label>
                    <select
                        className={`${errors?.cabinetIdLamellas ? 'border-red-500 placeholder-red-500' : 'border-gray-500'} appearance-none font-medium text-center text-gray-500 block w-full bg-gray-200 border-2 rounded-lg py-3 md:py-5 px-5 mb-3 leading-tight focus:outline-none focus:bg-white text-xl md:text-3xl`}
                        id="cabinetIdLamellas"
                        name="cabinetIdLamellas"
                        disabled={formAction === FormActions.DETAIL}
                        onChange={handleCabinetChange}
                        ref={register()}>
                        <option value="">Elegir una opción</option>
                        {getCabinetListByType('Laminillas').map(item => <option key={`a${item.id}`} value={item.id}>{item.cabinetNumber}</option>)}
                    </select>
                </div>
                <div className="w-full md:w-1/6">
                    <label className="block tracking-wide font-bold mb-2 text-gray-500" htmlFor="rowLamellas">
                        Fila
                    </label>
                    <select
                        className={`${errors?.rowLamellas ? 'border-red-500 placeholder-red-500' : 'border-gray-500'} appearance-none font-medium text-center text-gray-500 block w-full bg-gray-200 border-2 rounded-lg py-3 md:py-5 px-5 mb-3 leading-tight focus:outline-none focus:bg-white text-xl md:text-3xl`}
                        id="rowLamellas"
                        name="rowLamellas"
                        disabled={formAction === FormActions.DETAIL}
                        ref={register()}
                        // disabled={lamellaCabinetSelected === null || lamellaCabinetSelected === undefined}
                        >
                        <option value="">Elegir una opción</option>
                        {(lamellaCabinetSelected ? letters.slice(0, lamellaCabinetSelected.rows) : []).map(item => <option key={`b${item.value}`} value={item.value}>{item.name}</option>)}
                    </select>
                </div>
                <div className="w-full md:w-1/6">
                    <label className="block tracking-wide font-bold mb-2 text-gray-500" htmlFor="columnLamellas">
                        Columna
                    </label>
                    <input
                        className={`${errors?.columnLamellas ? 'border-red-500 placeholder-red-500' : 'border-gray-500'} appearance-none font-medium text-center text-gray-500 block w-full bg-gray-200 border-2 rounded-lg py-3 md:py-5 px-5 mb-3 leading-tight focus:outline-none focus:bg-white text-xl md:text-3xl`}
                        type="text"
                        id="columnLamellas"
                        name="columnLamellas"
                        onKeyPress={validateNumbersFn}
                        onBlur={handleColumnBlur}
                        autoComplete="off"
                        disabled={formAction === FormActions.DETAIL}
                        // disabled={lamellaCabinetSelected === null || lamellaCabinetSelected === undefined}
                        ref={register()} />
                </div>
                <div className="w-full md:w-1/6">
                    <label className="block tracking-wide font-bold mb-2 text-gray-500" htmlFor="thirdLamellas">
                        Tercio
                    </label>
                    <select
                        className={`${errors?.thirdLamellas ? 'border-red-500 placeholder-red-500' : 'border-gray-500'} appearance-none font-medium text-center text-gray-500 block w-full bg-gray-200 border-2 rounded-lg py-3 md:py-5 px-5 mb-3 leading-tight focus:outline-none focus:bg-white text-xl md:text-3xl`}
                        id="thirdLamellas"
                        name="thirdLamellas"
                        onKeyPress={validateNumbersFn}
                        disabled={formAction === FormActions.DETAIL}
                        // disabled={lamellaCabinetSelected === null || lamellaCabinetSelected === undefined}
                        ref={register()}>
                        <option value="">Elegir una opción</option>
                        {[{name: 'a', value: 1}, {name: 'b', value: 2}, {name: 'c', value: 3}].map(item => <option key={`lamella${item.value}`} value={item.name}>{item.name}</option>)}
                    </select>
                </div>
            </div>}
            {/* BLOCKS */}
            {<div className={`${listType !== 'BLOCKS' && 'hidden'} w-full flex flex-col md:flex-row gap-6 mt-6`}>
                <div className="w-full md:w-2/6">
                    <NumberPicker
                        label="No. Bloques"
                        disabled={formAction === FormActions.DETAIL}
                        defaultValue={patientRecordData?.expedientGet?.blockCoordinates?.cabinetItems || 0}
                        inputProps={{
                            ref: register(),
                            name: "cabinetItemsBlocks",
                            placeholder: "0",
                            tabIndex: "1"
                        }} />
                </div>
                <div className="w-full md:w-1/6">
                    <label className="block tracking-wide font-bold mb-2 text-gray-500" htmlFor="cabinetIdBlocks">
                        Gabinete
                    </label>
                    <select
                        className={`${errors?.cabinetIdBlocks ? 'border-red-500 placeholder-red-500' : 'border-gray-500'} appearance-none font-medium text-center text-gray-500 block w-full bg-gray-200 border-2 rounded-lg py-3 md:py-5 px-5 mb-3 leading-tight focus:outline-none focus:bg-white text-xl md:text-3xl`}
                        id="cabinetIdBlocks"
                        name="cabinetIdBlocks"
                        onChange={handleCabinetChange}
                        disabled={formAction === FormActions.DETAIL}
                        ref={register()}>
                        <option value="">Elegir una opción</option>
                        {getCabinetListByType('Bloques').map(item => <option key={`c${item.id}`} value={item.id}>{item.cabinetNumber}</option>)}
                    </select>
                </div>
                <div className="w-full md:w-1/6">
                    <label className="block tracking-wide font-bold mb-2 text-gray-500" htmlFor="rowBlocks">
                        Fila
                    </label>
                    <select
                        className={`${errors?.rowBlocks ? 'border-red-500 placeholder-red-500' : 'border-gray-500'} appearance-none font-medium text-center text-gray-500 block w-full bg-gray-200 border-2 rounded-lg py-3 md:py-5 px-5 mb-3 leading-tight focus:outline-none focus:bg-white text-xl md:text-3xl`}
                        id="rowBlocks"
                        name="rowBlocks"
                        disabled={formAction === FormActions.DETAIL}
                        ref={register()}>
                        <option value="">Elegir una opción</option>
                        {(blockCabinetSelected ? letters.slice(0, blockCabinetSelected.rows) : []).map(item => <option key={`d${item.value}`} value={item.value}>{item.name}</option>)}
                    </select>
                </div>
                <div className="w-full md:w-1/6">
                    <label className="block tracking-wide font-bold mb-2 text-gray-500" htmlFor="columnBlocks">
                        Columna
                    </label>
                    <input
                        className={`${errors?.columnBlocks ? 'border-red-500 placeholder-red-500' : 'border-gray-500'} appearance-none font-medium text-center text-gray-500 block w-full bg-gray-200 border-2 rounded-lg py-3 md:py-5 px-5 mb-3 leading-tight focus:outline-none focus:bg-white text-xl md:text-3xl`}
                        type="text"
                        id="columnBlocks"
                        name="columnBlocks"
                        autoComplete="off"
                        disabled={formAction === FormActions.DETAIL}
                        onKeyPress={validateNumbersFn}
                        ref={register()} />
                </div>
                <div className="w-full md:w-1/6">
                    <label className="block tracking-wide font-bold mb-2 text-gray-500" htmlFor="thirdBlocks">
                        Tercio
                    </label>
                    <select
                        className={`${errors?.thirdBlocks ? 'border-red-500 placeholder-red-500' : 'border-gray-500'} appearance-none font-medium text-center text-gray-500 block w-full bg-gray-200 border-2 rounded-lg py-3 md:py-5 px-5 mb-3 leading-tight focus:outline-none focus:bg-white text-xl md:text-3xl`}
                        id="thirdBlocks"
                        name="thirdBlocks"
                        disabled={formAction === FormActions.DETAIL}
                        ref={register()}>
                        <option value="">Elegir una opción</option>
                        {[{name: 'a', value: 1}, {name: 'b', value: 2}, {name: 'c', value: 3}].map(item => <option key={`block${item.value}`} value={item.name}>{item.name}</option>)}
                    </select>
                </div>
            </div>}
            {[null, '', FormActions.UPDATE].includes(formAction) && <div className="w-full mt-10 flex text-white gap-8 bottom-0">
                <button
                    type="button"
                    className="bg-red-600 w-1/2 rounded-lg py-2 text-4xl md:text-5xl"
                    onClick={() => history.push('../../')}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <button
                    type="submit"
                    className="bg-green-500 w-1/2 rounded-lg py-2 text-4xl md:text-5xl">
                    <FontAwesomeIcon icon={faCheck} />
                </button>
            </div>}
        </form>
    );
};

const mapStateToProps = (state) => ({
    formAction: state.ui.formAction
});

const mapDispatchToProps = (dispatch) => ({
    setActiveForm: dispatch.ui.setActiveForm,
    setNotification: dispatch.ui.setNotification,
    setFormAction: dispatch.ui.setFormAction,
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PatientRecordForm));