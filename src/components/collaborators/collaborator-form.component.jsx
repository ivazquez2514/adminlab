import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation } from '@apollo/client';
import { AREA_LIST } from '../../api/queries';
import { COLLABORATOR_CREATE } from '../../api/mutations';
import { FormTitlesEnum } from '../../enums';
import { types } from '../notification/notification.component';

const ROLES = [
    'ADMIN',
    'MANAGER',
    'USER'
];

const CollaboratorForm = React.memo(({history, setActiveForm, setNotification}) => {
    const { register, handleSubmit, errors } = useForm();
    const { data: areasResponse } = useQuery(AREA_LIST);
    const [ collaboratorCreate ] = useMutation(COLLABORATOR_CREATE);

    let areas = [];

    if (areasResponse) {
        areas = areasResponse.areaList;
    }

    const onSubmit = (data) => {
        collaboratorCreate({variables: {collaborator: {...data}}})
            .then(response => {
                console.log(response);
                setNotification({
                    message: 'El colaborador ha sido creado exitosamente.',
                    type: types.SUCCESS
                });
                history.push('./');
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
            title: FormTitlesEnum.COLLABORATOR,
            backUrl: './'
        });

        return () => {
            setActiveForm(null);
        };
    }, [])

    console.log(errors);

    return (
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full mb-6 flex">
                <div className="w-1/2 px-3">
                    <label className="block tracking-wide font-bold mb-2 text-gray-500" htmlFor="name">
                        Área
                    </label>
                    <select
                        className={`${errors.areaId ? 'border-red-500 placeholder-red-500 text-red-500' : 'border-gray-500'} appearance-none font-medium text-gray-500 block w-full bg-gray-200 border-2 rounded-lg py-5 px-5 mb-3 leading-tight focus:outline-none focus:bg-white text-3xl`}
                        id="areaId"
                        name="areaId"
                        ref={register({required: true})}
                        placeholder="Seleccionar Área (Hospital)">
                        <option value="">Selecciona una opción</option>
                        {areas.map(area => <option key={area.id} value={area.id}>{area.name}</option>)}
                    </select>
                </div>
                <div className="w-1/2 px-3">
                    <label className="block tracking-wide font-bold mb-2 text-gray-500" htmlFor="name">
                        Rol de usuario
                    </label>
                    <select
                        className={`${errors.role ? 'border-red-500 placeholder-red-500 text-red-500' : 'border-gray-500'} appearance-none font-medium text-gray-500 block w-full bg-gray-200 border-2 rounded-lg py-5 px-5 mb-3 leading-tight focus:outline-none focus:bg-white text-3xl`}
                        id="role"
                        name="role"
                        ref={register({required: true})}
                        placeholder="Seleccionar rol">
                        <option value="">Selecciona una opción</option>
                        {ROLES.map(role => <option key={role} value={role}>{role}</option>)}
                    </select>
                </div>
            </div>
            <div className="w-full flex">
                <div className="w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block tracking-wide font-bold mb-2 text-gray-500" htmlFor="username">
                        ID de usuario
                    </label>
                    <input
                        className={`${errors.username ? 'border-red-500 placeholder-red-500' : 'border-gray-500'} appearance-none font-medium text-gray-500 block w-full bg-gray-200 border-2 rounded-lg py-5 px-5 mb-3 leading-tight focus:outline-none focus:bg-white text-3xl`}
                        id="username"
                        type="text"
                        name="username"
                        ref={register({required: true})}
                        placeholder="Escribir un nombre..." />
                </div>
                <div className="w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block tracking-wide font-bold mb-2 text-gray-500" htmlFor="password">
                        Clave de usuario
                    </label>
                    <input
                        className={`${errors.password ? 'border-red-500 placeholder-red-500' : 'border-gray-500'} appearance-none font-medium text-gray-500 block w-full bg-gray-200 border-2 rounded-lg py-5 px-5 mb-3 leading-tight focus:outline-none focus:bg-white text-3xl`}
                        id="password"
                        type="text"
                        name="password"
                        ref={register({required: true})}
                        placeholder="Asignar 6 dígitos"
                        maxLength="6" />
                </div>
            </div>
            <div className="px-4 mt-10 flex text-white gap-8">
                <button
                    type="button"
                    className="bg-red-600 w-1/2 rounded-lg py-2 text-5xl"
                    onClick={() => history.push('./')}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <button
                    type="submit"
                    className="bg-green-500 w-1/2 rounded-lg py-2 text-5xl">
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

export default connect(null, mapDispatchToProps)(withRouter(CollaboratorForm));