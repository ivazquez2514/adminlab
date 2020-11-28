import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FormTitlesEnum } from '../../enums';
import { useQuery, useMutation } from '@apollo/client';
import { CABINET_LIST } from '../../api/queries';
import { EXPEDIENT_CREATE } from '../../api/mutations';
import { useOnlyNumbers } from '../../hooks';
import { types } from '../notification/notification.component'

import {
    NumberPicker
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

const PatientRecordForm = ({history, setActiveForm, setNotification}) => {
    const {validateFn: validateNumbersFn} = useOnlyNumbers();
    const {register, errors, handleSubmit, setValue} = useForm();
    const [listType, setListType] = useState('LAMELLAS');
    const [lamellaCabinetSelected, setLamellaCabinetSelected] = useState(null);
    const [blockCabinetSelected, setBlockCabinetSelected] = useState(null);
    const [lamellasList, setLamellasList] = useState([]);
    const [blocksList, setBlocksList] = useState([]);
    const {data} = useQuery(CABINET_LIST);
    const [expedientCreate] = useMutation(EXPEDIENT_CREATE);

    if (data && data.cabinetList && data.cabinetList.length && lamellasList.length === 0) {
        setLamellasList([...data.cabinetList].filter(item => 'Laminillas' === item.cabinetType));
        setBlocksList([...data.cabinetList].filter(item => 'Bloques' === item.cabinetType));
    }

    const handleCabinetChange = (e) => {
        if (listType === 'LAMELLAS') {
            setValue('rowLamellas', '');
            setValue('columnLamellas', '');
            setValue('thirdLamellas', '');
            setLamellaCabinetSelected(lamellasList.find(item => item.id === e.target.value));
        } else {
            setValue('rowBlocks', '');
            setValue('columnBlocks', '');
            setValue('thirdBlocks', '');
            setBlockCabinetSelected(blocksList.find(item => item.id === e.target.value));
            console.log(blocksList.find(item => item.id === e.target.value), e.target.value);
        }
    }

    const handleColumnBlur = (e) => {
        const value = Number(e.target.value);
        if (listType === 'LAMELLAS' && (value > lamellaCabinetSelected.columns || value === 0)) {
            setValue('columnLamellas', '1');
        } else {
            setValue('columnBlocks', '1');
        }

    }

    const getSwitchClasses = (type) => {
        if (errors[`cabinetItems${type}`] || errors[`cabinetId${type}`] || errors[`row${type}`] || errors[`column${type}`]) {
            return `${listType === type.toUpperCase() ? 'bg-white shadow-lg border-2 border-red-500' : ''} text-red-500`
        } else if (listType === type.toUpperCase()) {
            return 'bg-white shadow-lg text-blue-500';
        }
    }

    const onSubmit = (data) => {
        console.log('Submit');
        data = {
            expedient: {
                id: '1',
                caseNumber: data.caseNumber,
                lamellaCoordinates: {
                    cabinetId: lamellaCabinetSelected.id,
                    cabinetItems: Number(data.cabinetItemsLamellas),
                    row: Number(data.rowLamellas),
                    column: Number(data.columnLamellas),
                    third: data.thirdLamellas,
                    expedientId: '1',
                    updatedAt: new Date()
                },
                blockCoordinates: {
                    cabinetId: blockCabinetSelected.id,
                    cabinetItems: Number(data.cabinetItemsBlocks),
                    row: Number(data.rowBlocks),
                    column: Number(data.columnBlocks),
                    third: data.thirdBlocks,
                    expedientId: '1',
                    updatedAt: new Date()
                }
            }
        };

        expedientCreate({ variables: data })
            .then(response => {
                console.log(response);
                setNotification({
                    message: 'El expediente ha sido creado exitosamente.',
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
        setActiveForm({
            title: FormTitlesEnum.PATIENT_RECORD,
            backUrl: '../../'
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
                    className={`${errors?.caseNumber ? 'border-red-500 placeholder-red-500' : 'border-gray-500'} appearance-none font-medium text-center text-gray-500 block w-full bg-gray-200 border-2 rounded-lg py-3 md:py-5 px-5 mb-3 leading-tight focus:outline-none focus:bg-white text-xl md:text-3xl`}
                    type="text"
                    id="caseNumber"
                    name="caseNumber"
                    onKeyPress={validateNumbersFn}
                    ref={register({required: true})}
                    placeholder="Escribir el número de caso..."
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
            <div className={`${listType === 'LAMELLAS' ? '' : 'hidden'} w-full flex flex-col md:flex-row gap-6 mt-6`}>
                <div className="w-full md:w-2/6">
                    <NumberPicker
                        label="No. Laminillas"
                        error={errors?.rowLamellas}
                        inputProps={{
                            ref: register({required: true}),
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
                        onChange={handleCabinetChange}
                        ref={register({required: true})}>
                        <option value="">Selecciona una opción</option>
                        {lamellasList.map(item => <option key={item.id} value={item.id}>{item.cabinetNumber}</option>)}
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
                        ref={register({required: true})}
                        disabled={lamellaCabinetSelected === null || lamellaCabinetSelected === undefined}>
                        <option value="">Selecciona una opción</option>
                        {(lamellaCabinetSelected ? letters.slice(0, lamellaCabinetSelected.rows) : []).map(item => <option key={item.value} value={item.value}>{item.name}</option>)}
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
                        disabled={lamellaCabinetSelected === null || lamellaCabinetSelected === undefined}
                        ref={register({required: true})} />
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
                        disabled={lamellaCabinetSelected === null || lamellaCabinetSelected === undefined}
                        ref={register({required: true})}>
                        <option value="">Selecciona una opción</option>
                        {letters.slice(0, 3).map(item => <option key={item.value} value={item.name}>{item.name}</option>)}
                    </select>
                </div>
            </div>
            <div className={`${listType === 'BLOCKS' ? '' : 'hidden'} w-full flex flex-col md:flex-row gap-6 mt-6`}>
                <div className="w-full md:w-2/6">
                    <NumberPicker
                        label="No. Bloques"
                        inputProps={{
                            ref: register({required: true}),
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
                        ref={register({required: true})}>
                        <option value="">Selecciona una opcion</option>
                        {blocksList.map(item => <option key={item.id} value={item.id}>{item.cabinetNumber}</option>)}
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
                        ref={register({required: true})}>
                        <option value="">Selecciona una opción</option>
                        {(blockCabinetSelected ? letters.slice(0, blockCabinetSelected.rows) : []).map(item => <option key={item.value} value={item.value}>{item.name}</option>)}
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
                        onKeyPress={validateNumbersFn}
                        ref={register({required: true})} />
                </div>
                <div className="w-full md:w-1/6">
                    <label className="block tracking-wide font-bold mb-2 text-gray-500" htmlFor="thirdBlocks">
                        Tercio
                    </label>
                    <select
                        className={`${errors?.thirdBlocks ? 'border-red-500 placeholder-red-500' : 'border-gray-500'} appearance-none font-medium text-center text-gray-500 block w-full bg-gray-200 border-2 rounded-lg py-3 md:py-5 px-5 mb-3 leading-tight focus:outline-none focus:bg-white text-xl md:text-3xl`}
                        id="thirdBlocks"
                        name="thirdBlocks"
                        ref={register({required: true})}>
                        <option value="">Selecciona una opción</option>
                        {letters.slice(0, 3).map(item => <option key={item.value} value={item.name}>{item.name}</option>)}
                    </select>
                </div>
            </div>
            <div className="w-full mt-10 flex text-white gap-8 bottom-0">
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
            </div>
        </form>
    );
};

const mapDispatchToProps = (dispatch) => ({
    setActiveForm: dispatch.ui.setActiveForm,
    setNotification: dispatch.ui.setNotification,
})

export default connect(null, mapDispatchToProps)(withRouter(PatientRecordForm));