import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FormTitlesEnum } from '../../enums';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons'
import { CABINET_CREATE } from '../../api/mutations'
import { useMutation } from '@apollo/client'
import { types } from '../notification/notification.component'
import { letterOptions } from '../forms/number-picker/number-picker.component';

import { NumberPicker } from "../";

const CABINETS_TYPES = [
    {
        name: 'Laminillas',
        value: 'Laminillas'
    },
    {
        name: 'Bloques',
        value: 'Bloques'
    },
];

const CabinetForm = React.memo(({setActiveForm, history, setNotification}) => {
    const { register, handleSubmit, errors } = useForm();
    const [ cabinetCreate ] = useMutation(CABINET_CREATE);

    const onSubmit = (data) => {
        data = {...data, rows: letterOptions.findIndex(item => item === data.rows)};

        cabinetCreate({
            variables: {
                cabinet: {
                    cabinetType: data.cabinetType,
                    cabinetNumber: Number(data.cabinetNumber),
                    rows: Number(data.rows),
                    columns: Number(data.columns),
                }
            }
        }).then(response => {
            console.log(response);
            setNotification({
                message: 'El gabinete ha sido creado exitosamente.',
                type: types.SUCCESS
            });
            history.push('/admin/movements-history');
        }).catch(error => {
            console.error(error);
            setNotification({
                message: 'Un error ha ocurrido. Favor de intentarlo de nuevo.',
                type: types.ERRORR
            });
        });
    }

    useEffect(() => {
        setActiveForm({
            title: FormTitlesEnum.CABINET,
            backUrl: './'
        })

        return () => {
            setActiveForm(null)
        }
    }, []);

    return (
        <form className="w-full h-full relative" onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full md:mb-6 md:flex">
                <div className="w-full md:w-1/2 px-3">
                    <label className="block tracking-wide font-bold mb-2 text-gray-500" htmlFor="name">
                        Tipo de gabinete
                    </label>
                    <select
                        tabIndex="1"
                        className={`${errors.cabinetType ? 'border-red-500 placeholder-red-500 text-red-500' : 'border-gray-500'} appearance-none font-medium block border-gray-500 w-full bg-gray-200 border-2 rounded-lg py-3 md:py-5 px-5 mb-3 leading-tight focus:outline-none focus:bg-white text-xl md:text-3xl`}
                        id="cabinetType"
                        name="cabinetType"
                        ref={register({required: true})}>
                        <option value="">Seleccionar tipo</option>
                        {CABINETS_TYPES.map(type => <option value={type.value}>{type.name}</option>)}
                    </select>
                </div>
                <div className="w-full md:w-1/2 px-3">
                    <NumberPicker
                        label="No. gabinete"
                        error={errors.cabinetNumber}
                        inputProps={{
                            ref: register({required: true}),
                            name: "cabinetNumber",
                            placeholder: "0",
                            tabIndex: "2"
                        }} />
                </div>
            </div>
            <div className="w-full flex">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <NumberPicker
                        withLetters
                        label="Cantidad de filas"
                        error={errors.rows}
                        inputProps={{
                            ref: register({required: true}),
                            name: "rows",
                            placeholder: "A-Z",
                            tabIndex: "3"
                        }} />
                </div>

                <div className="w-full md:w-1/2">
                    <NumberPicker
                        label="Cantidad de columnas"
                        error={errors.columns}
                        inputProps={{
                            ref: register({required: true}),
                            name: "columns",
                            placeholder: "0",
                            tabIndex: "4"
                        }} />
                </div>
            </div>
            <div className="w-full px-4 mt-10 flex text-white gap-8 absolute md:relative bottom-0">
                <button
                    type="button"
                    className="bg-red-600 w-1/2 rounded-lg py-2 text-4xl md:text-5xl focus:outline-none"
                    onClick={() => history.push('./')}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <button
                    type="submit"
                    className="bg-green-500 w-1/2 rounded-lg py-2 text-4xl md:text-5xl focus:outline-none">
                    <FontAwesomeIcon icon={faCheck} />
                </button>
            </div>
        </form>
    );
})

const mapDispatchToProps = (dispatch) => ({
    setActiveForm: dispatch.ui.setActiveForm,
    setNotification: dispatch.ui.setNotification,
})

export default connect(null, mapDispatchToProps)(withRouter(CabinetForm));