import React, { useEffect } from 'react';
import { withRouter, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { AREA_CREATE, AREA_DELETE, AREA_UPDATE } from '../../api/mutations';
import { AREA_GET } from '../../api/queries';
import { FormActions, FormTitlesEnum } from '../../enums';
import { useInputState } from '../../hooks';
import { types } from '../notification/notification.component';
import { useLazyQuery, useMutation } from '@apollo/client';

import { ConfirmDialog } from '../';

const HospitalAreaForm = React.memo(({history, setActiveForm, setNotification, formAction, setFormAction}) => {
    const { register, handleSubmit, errors, formState } = useForm();
    const [ areaCreate ] = useMutation(AREA_CREATE);
    const [ areaUpdate ] = useMutation(AREA_UPDATE);
    const { getInputCssClasses, getInputLabelCssClasses } = useInputState();
    const { id } = useParams();
    const [ getArea, { data: areaDetailData, loading } ] = useLazyQuery(AREA_GET);
    const [ deleteArea ] = useMutation(AREA_DELETE);

    let area;
    if (id && id !== 'new' && !areaDetailData && !loading) {
        getArea({variables: {id}});
    }

    if (areaDetailData) {
        area = areaDetailData.areaGet;
    }

    const onSubmit = (data) => {
        (id && id !== 'new' ? areaUpdate : areaCreate)({variables: {area: {
            id: id || undefined,
            name: data.name,
            usersQuantity: Number(data.usersQuantity),
            cabinetBlocksQuantity: Number(data.cabinetBlocksQuantity),
            cabinetLamellasQuantity: Number(data.cabinetLamellasQuantity),
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: id && id !== 'new' ? undefined : new Date(),
        }}})
            .then(response => {
                console.log(response);
                setNotification({
                    message: 'El area ha sido creada exitosamente.',
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

    const deleteAreaHandler = () => {
        deleteArea({variables: {id}})
            .then(response => {
                console.log(response);
                setFormAction(FormActions.DETAIL)
                setNotification({
                    message: 'El area ha sido eliminada exitosamente.',
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

    useEffect(() => {
        setActiveForm({
            title: FormTitlesEnum[`HOSPITAL_AREA${formAction ? `_${formAction}` : ''}`],
            backUrl: '../../'
        });
    }, [formAction])

    useEffect(() => {
        setActiveForm({
            title: FormTitlesEnum[`HOSPITAL_AREA${formAction ? `_${formAction}` : ''}`],
            backUrl: '../../'
        });
        if (id && id !== 'new') setFormAction(FormActions.DETAIL);

        return () => {
            setActiveForm(null);
            setFormAction('');
        };
    }, [])

    return (
        <>
            <form className="w-full h-full relative" onSubmit={handleSubmit(onSubmit)}>
                {formAction === FormActions.DELETE && <ConfirmDialog
                    title="Eliminar Area"
                    msg="¿Estas seguro que quieres eliminar esta área?"
                    onAccept={deleteAreaHandler}
                    onCancel={() => {
                        setFormAction(FormActions.DETAIL);
                    }}/>}
                <div className="w-full md:mb-6">
                    <div className="w-full px-3 md:mb-0">
                        <label className={`${getInputLabelCssClasses(formState.dirtyFields.name, errors.name)} block tracking-wide font-bold mb-2 text-gray-500`} htmlFor="name">
                            Nombre
                        </label>
                        <input
                            className={`${getInputCssClasses(formState.dirtyFields.name, errors.name)} appearance-none font-medium block w-full bg-gray-200 border-2 rounded-lg py-3 md:py-5 px-5 mb-3 leading-tight focus:outline-none focus:bg-white text-xl md:text-3xl`}
                            id="name"
                            name="name"
                            type="text"
                            disabled={formAction === FormActions.DETAIL}
                            defaultValue={area?.name}
                            ref={register({required: true})}
                            placeholder="Asignar un nombre..." />
                    </div>
                </div>
                <div className="w-full flex flex-col md:flex-row">
                    <div className="w-full md:w-1/3 px-3 md:mb-6">
                        <label className={`${getInputLabelCssClasses(formState.dirtyFields.usersQuantity, errors.usersQuantity)} block tracking-wide font-bold mb-2 text-gray-500`} htmlFor="name">
                            Cantidad de usuarios
                        </label>
                        <input
                            className={`${getInputCssClasses(formState.dirtyFields.usersQuantity, errors.usersQuantity)} appearance-none font-medium block w-full bg-gray-200 border-2 rounded-lg py-3 md:py-5 px-5 mb-3 leading-tight focus:outline-none focus:bg-white text-xl md:text-3xl`}
                            id="usersQuantity"
                            name="usersQuantity"
                            type="text"
                            placeholder="0"
                            disabled={formAction === FormActions.DETAIL}
                            defaultValue={area?.usersQuantity}
                            ref={register({required: true})}
                            onChange={() => {}} />
                    </div>
                    <div className="w-full md:w-1/3 px-3 md:mb-6">
                        <label className={`${getInputLabelCssClasses(formState.dirtyFields.cabinetLamellasQuantity, errors.cabinetLamellasQuantity)} block tracking-wide font-bold mb-2 text-gray-500`} htmlFor="cabinetLamellasQuantity">
                            Cantidad de Gabinetes (Laminillas)
                        </label>
                        <input
                            className={`${getInputCssClasses(formState.dirtyFields.cabinetLamellasQuantity, errors.cabinetLamellasQuantity)} appearance-none font-medium block w-full bg-gray-200 border-2 rounded-lg py-3 md:py-5 px-5 mb-3 leading-tight focus:outline-none focus:bg-white text-xl md:text-3xl`}
                            id="cabinetLamellasQuantity"
                            type="text"
                            name="cabinetLamellasQuantity"
                            placeholder="0"
                            disabled={formAction === FormActions.DETAIL}
                            defaultValue={area?.cabinetLamellasQuantity}
                            ref={register({required: true})}
                            onChange={() => {}} />
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className={`${getInputLabelCssClasses(formState.dirtyFields.cabinetBlocksQuantity, errors.cabinetBlocksQuantity)} block tracking-wide font-bold mb-2 text-gray-500`} htmlFor="cabinetBlocksQuantity">
                            Cantidad de Gabinetes (Bloques)
                        </label>
                        <input
                            className={`${getInputCssClasses(formState.dirtyFields.cabinetBlocksQuantity, errors.cabinetBlocksQuantity)} appearance-none font-medium block w-full bg-gray-200 border-2 rounded-lg py-3 md:py-5 px-5 mb-3 leading-tight focus:outline-none focus:bg-white text-xl md:text-3xl`}
                            id="cabinetBlocksQuantity"
                            type="text"
                            name="cabinetBlocksQuantity"
                            placeholder="0"
                            disabled={formAction === FormActions.DETAIL}
                            defaultValue={area?.cabinetBlocksQuantity}
                            ref={register({required: true})}
                            onChange={() => {}} />
                    </div>
                </div>
                {[null, '', FormActions.UPDATE].includes(formAction) && <div className="w-full px-4 md:mt-10 flex text-white gap-8 md:relative bottom-0">
                    <button
                        type="button"
                        className="bg-red-600 w-1/2 rounded-lg py-2 text-4xl md:text-5xl"
                        onClick={() => formAction === FormActions.UPDATE ? setFormAction(FormActions.DETAIL) : history.push('../../')}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                    <button
                        type="submit"
                        className="bg-green-500 w-1/2 rounded-lg py-2 text-4xl md:text-5xl">
                        <FontAwesomeIcon icon={faCheck} />
                    </button>
                </div>}
            </form>
        </>
    );
})

const mapStateToProps = (state) => ({
    formAction: state.ui.formAction
});

const mapDispatchToProps = (dispatch) => ({
    setActiveForm: dispatch.ui.setActiveForm,
    setNotification: dispatch.ui.setNotification,
    setFormAction: dispatch.ui.setFormAction,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HospitalAreaForm));