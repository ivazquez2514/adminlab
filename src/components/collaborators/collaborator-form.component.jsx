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
import { useInputState } from '../../hooks';

const ROLES = [
    'SuperAdministrador',
    'Administrador',
    'Encargado',
    'Consultor'
];

const CollaboratorForm = React.memo(({history, setActiveForm, setNotification}) => {
    const { register, handleSubmit, errors, formState } = useForm();
    const { data: areasResponse } = useQuery(AREA_LIST);
    const [ collaboratorCreate ] = useMutation(COLLABORATOR_CREATE);
    const { getInputCssClasses, getInputLabelCssClasses } = useInputState();

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
                history.push('../../');
            }).catch(error => {
                setNotification({
                    message: 'Un error ha ocurrido. Favor de intentarlo de nuevo.',
                    type: types.ERROR
                });
                console.log(error);
            });
    }

    useEffect(() => {
        setActiveForm({
            title: FormTitlesEnum.COLLABORATOR,
            backUrl: '../../'
        });

        return () => {
            setActiveForm(null);
        };
    }, [])

    return (
        <form className="w-full h-full relative" onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full md:mb-6 md:flex">
                <div className="w-full md:w-1/2 px-3">
                    <label className={`${getInputLabelCssClasses(!!formState.dirtyFields.areaId, !!errors.areaId)} block tracking-wide font-bold mb-2 text-gray-500`} htmlFor="name">
                        Área
                    </label>
                    <select
                        className={`${getInputCssClasses(!!formState.dirtyFields.areaId, !!errors.areaId)} appearance-none font-medium block w-full bg-gray-200 border-2 rounded-lg py-3 md:py-5 px-5 mb-3 leading-tight focus:outline-none focus:bg-white text-xl md:text-3xl`}
                        id="areaId"
                        name="areaId"
                        ref={register({required: true})}
                        placeholder="Seleccionar Área (Hospital)">
                        <option value="">Selecciona una opción</option>
                        {areas.map(area => <option key={area.id} value={area.id}>{area.name}</option>)}
                    </select>
                </div>
                <div className="w-full md:w-1/2 px-3">
                    <label className={`${getInputLabelCssClasses(!!formState.dirtyFields.role, !!errors.role)} block tracking-wide font-bold mb-2 text-gray-500`} htmlFor="name">
                        Rol de usuario
                    </label>
                    <select
                        className={`${getInputCssClasses(!!formState.dirtyFields.role, !!errors.role)} appearance-none font-medium text-gray-500 block w-full bg-gray-200 border-2 rounded-lg py-3 md:py-5 px-5 mb-3 leading-tight focus:outline-none focus:bg-white text-xl md:text-3xl`}
                        id="role"
                        name="role"
                        ref={register({required: true})}
                        placeholder="Seleccionar rol">
                        <option value="">Selecciona una opción</option>
                        {ROLES.map(role => <option key={role} value={role}>{role}</option>)}
                    </select>
                </div>
            </div>
            <div className="w-full md:flex">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className={`${getInputLabelCssClasses(!!formState.dirtyFields.username, !!errors.username)} block tracking-wide font-bold mb-2 text-gray-500`} htmlFor="username">
                        ID de usuario
                    </label>
                    <input
                        className={`${getInputCssClasses(!!formState.dirtyFields.username, !!errors.username)} appearance-none font-medium text-gray-500 block w-full bg-gray-200 border-2 rounded-lg py-3 md:py-5 px-5 mb-3 leading-tight focus:outline-none focus:bg-white text-xl md:text-3xl`}
                        id="username"
                        type="text"
                        name="username"
                        ref={register({required: true})}
                        placeholder="Escribir un nombre..." />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className={`${getInputLabelCssClasses(!!formState.dirtyFields.password, !!errors.password)} block tracking-wide font-bold mb-2 text-gray-500`} htmlFor="password">
                        Clave de usuario
                    </label>
                    <input
                        className={`${getInputCssClasses(!!formState.dirtyFields.password, !!errors.password)} appearance-none font-medium text-gray-500 block w-full bg-gray-200 border-2 rounded-lg py-3 md:py-5 px-5 mb-3 leading-tight focus:outline-none focus:bg-white text-xl md:text-3xl`}
                        id="password"
                        type="text"
                        name="password"
                        ref={register({required: true, minLength: 6})}
                        placeholder="Asignar 6 dígitos"
                        maxLength="6" />
                </div>
            </div>
            <div className="w-full px-4 mt-10 flex text-white gap-8 absolute md:relative bottom-0">
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
})

const mapDispatchToProps = (dispatch) => ({
    setActiveForm: dispatch.ui.setActiveForm,
    setNotification: dispatch.ui.setNotification,
});

export default connect(null, mapDispatchToProps)(withRouter(CollaboratorForm));