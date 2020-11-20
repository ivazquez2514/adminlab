import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useMutation } from '@apollo/client';
import { AREA_CREATE } from '../../api/mutations';
import { FormTitlesEnum } from '../../enums';
import { types } from '../notification/notification.component';

const HospitalAreaForm = React.memo(({history, setActiveForm, setNotification}) => {
    const { register, handleSubmit, errors } = useForm();
    const [ areaCreate ] = useMutation(AREA_CREATE);

    const onSubmit = (data) => {
        console.log({
            name: data.name,
            usersQuantity: Number(data.usersQuantity),
            cabinetBlocksQuantity: Number(data.cabinetBlocksQuantity),
            cabinetLamellasQuantity: Number(data.cabinetLamellasQuantity)
        });
        areaCreate({variables: {area: {
            name: data.name,
            usersQuantity: Number(data.usersQuantity),
            cabinetBlocksQuantity: Number(data.cabinetBlocksQuantity),
            cabinetLamellasQuantity: Number(data.cabinetLamellasQuantity)
        }}})
            .then(response => {
                console.log(response);
                setNotification({
                    message: 'El area ha sido creada exitosamente.',
                    type: types.SUCCESS
                });
                history.push('/admin/movements-history');
            }).catch(error => {
                setNotification({
                    message: 'Un error ha ocurrido. Favor de intentarlo de nuevo.',
                    type: types.ERRORR
                });
                console.log(error);
            });
    }


    useEffect(() => {
        setActiveForm({
            title: FormTitlesEnum.HOSPITAL_AREA,
            backUrl: './'
        });

        return () => {
            setActiveForm(null);
        };
    }, [])

    return (
        <form className="w-full h-full relative" onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full md:mb-6">
                <div className="w-full px-3 md:mb-0">
                    <label className="block tracking-wide font-bold mb-2 text-gray-500" htmlFor="name">
                        Nombre
                    </label>
                    <input
                        className={`${errors.name ? 'border-red-500 placeholder-red-500' : 'border-gray-500'} appearance-none font-medium block w-full bg-gray-200 border-2 rounded-lg py-3 md:py-5 px-5 mb-3 leading-tight focus:outline-none focus:bg-white text-xl md:text-3xl`}
                        id="name"
                        name="name"
                        type="text"
                        ref={register({required: true})}
                        placeholder="Asignar un nombre..." />
                </div>
            </div>
            <div className="w-full md:flex">
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block tracking-wide font-bold mb-2 text-gray-500" htmlFor="name">
                        Cantidad de usuarios
                    </label>
                    <input
                        className={`${errors.usersQuantity ? 'border-red-500 placeholder-red-500' : 'border-gray-500'} appearance-none font-medium block w-full bg-gray-200 border-2 rounded-lg py-3 md:py-5 px-5 mb-3 leading-tight focus:outline-none focus:bg-white text-xl md:text-3xl`}
                        id="usersQuantity"
                        name="usersQuantity"
                        type="text"
                        placeholder="0"
                        ref={register({required: true})}
                        onChange={() => {}} />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block tracking-wide font-bold mb-2 text-gray-500" htmlFor="cabinetLamellasQuantity">
                        Cantidad de Gabinetes (Laminillas)
                    </label>
                    <input
                        className={`${errors.cabinetLamellasQuantity ? 'border-red-500 placeholder-red-500' : 'border-gray-500'} appearance-none font-medium block w-full bg-gray-200 border-2 rounded-lg py-3 md:py-5 px-5 mb-3 leading-tight focus:outline-none focus:bg-white text-xl md:text-3xl`}
                        id="cabinetLamellasQuantity"
                        type="text"
                        name="cabinetLamellasQuantity"
                        placeholder="0"
                        ref={register({required: true})}
                        onChange={() => {}} />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block tracking-wide font-bold mb-2 text-gray-500" htmlFor="cabinetBlocksQuantity">
                        Cantidad de Gabinetes (Bloques)
                    </label>
                    <input
                        className={`${errors.cabinetBlocksQuantity ? 'border-red-500 placeholder-red-500' : 'border-gray-500'} appearance-none font-medium block w-full bg-gray-200 border-2 rounded-lg py-3 md:py-5 px-5 mb-3 leading-tight focus:outline-none focus:bg-white text-xl md:text-3xl`}
                        id="cabinetBlocksQuantity"
                        type="text"
                        name="cabinetBlocksQuantity"
                        placeholder="0"
                        ref={register({required: true})}
                        onChange={() => {}} />
                </div>
            </div>
            <div className="w-full px-4 mt-10 flex text-white gap-8 absolute md:relative bottom-0">
                <button
                    type="button"
                    className="bg-red-600 w-1/2 rounded-lg py-2 text-4xl md:text-5xl"
                    onClick={() => history.push('./')}>
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
})

const mapDispatchToProps = (dispatch) => ({
    setActiveForm: dispatch.ui.setActiveForm,
    setNotification: dispatch.ui.setNotification,
});

export default connect(null, mapDispatchToProps)(withRouter(HospitalAreaForm));