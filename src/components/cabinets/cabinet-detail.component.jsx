import { useEffect, useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';
import { ReactComponent as LaminillasIcon } from '../../assets/svg/laminillas.svg';
import BlocksIcon from '../../assets/images/gabinete_bloques.png';
import { FormActions, FormTitlesEnum, Roles } from '../../enums';
import { CABINET_GET } from '../../api/queries';
import { CABINET_DELETE } from '../../api/mutations';
import { useQuery, useMutation } from '@apollo/client';
import { types } from '../notification/notification.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPencilAlt, faTrashAlt, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import { ConfirmDialog } from '../';

const CabinetDetail = ({setActiveForm, setFormAction, history, formAction, setNotification, search, user}) => {
    const { id } = useParams();
    const { data } = useQuery(CABINET_GET, { variables: { id } });
    const [ cabinetDelete ] = useMutation(CABINET_DELETE);
    let cabinet;

    if (data && data.cabinetGet) {
        cabinet = data.cabinetGet;
        console.log(cabinet.expedients);
    }

    const formatDate = useCallback((date) => {
        return new Intl.DateTimeFormat('en-MX').format(new Date())
    });

    const deleteCabinetHandler = () => {
        cabinetDelete({variables: {id}})
            .then(response => {
                console.log(response);
                setFormAction(null)
                setNotification({
                    message: 'El gabinete ha sido eliminado exitosamente.',
                    type: types.SUCCESS
                });
                history.push('/admin/cabinets');
            }).catch(error => {
                setNotification({
                    message: 'Un error ha ocurrido. Favor de intentarlo de nuevo.',
                    type: types.ERROR
                });
                console.log(error);
            });
    }

    useEffect(() => {
        console.log(formAction);
        if (formAction === FormActions.UPDATE) {
            history.push(`/admin/cabinets/${ id }/edit`);
        }
    }, [formAction]);

    useEffect(() => {
        setActiveForm(null);
        setFormAction(null);
        
        return () => {
            setActiveForm(null);
            setFormAction(null);
        };
    }, []);

    const getFilteredExpedients = useCallback(() => {
        return (cabinet ? cabinet.expedients.filter(item => cabinet.cabinetType === 'Laminillas' ? item.blockCoordinates === null : item.lamellaCoordinates === null) : [])
            .filter(item =>
                String(item.caseNumber).toLowerCase().includes(search)
                || String(item.cabinetNumber).toLowerCase().includes(search)
                || String(cabinet.cabinetType === 'Laminillas' ? item.lamellaCoordinates?.row : item.blockCoordinates?.row).toLowerCase().includes(search)
                || String(cabinet.cabinetType === 'Laminillas' ? item.lamellaCoordinates?.column : item.blockCoordinates?.column).toLowerCase().includes(search)
                || String(cabinet.cabinetType === 'Laminillas' ? item.lamellaCoordinates?.third : item.blockCoordinates?.third).toLowerCase().includes(search)
                || String(formatDate(cabinet.cabinetType === 'Laminillas' ? item.lamellaCoordinates?.updatedAt : item.blockCoordinates?.updatedAt)).toLowerCase().includes(search)
            );
    }, [cabinet, search]);

    return (
        <div className="w-full relative">
            {formAction === FormActions.DELETE && <ConfirmDialog
                title="Eliminar Gabinete"
                msg="¿Estas seguro que quieres eliminar este gabinete?"
                onAccept={deleteCabinetHandler}
                onCancel={() => setFormAction(null)}/>}
            <div className="table-head flex flex-col md:flex-row md:justify-between bg-white rounded-lg px-4 shadow-lg mb-4">
                <p className="md:py-4 text-xl text-blue-500">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-4 cursor-pointer" onClick={() => history.push('./')} />
                    Gabinete-{cabinet?.cabinetType === 'Laminillas' ? 'L' : 'B'} {cabinet?.cabinetNumber}</p>
                <div className={`${user?.role === Roles.Consultor ? 'invisible' : ''} pb-2 md:py-4 text-gray-500`}>
                    <button
                        onClick={() => setFormAction(FormActions.DELETE)}
                        type="button"
                        className={`bg-white border-2 border-gray-300 rounded-lg px-3 py-1 mr-3 focus:outline-none`}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                    <button
                        onClick={() => setFormAction(FormActions.UPDATE)}
                        type="button"
                        className={`bg-white border-2 border-gray-300 rounded-lg px-3 py-1 focus:outline-none`}>
                        <FontAwesomeIcon icon={faPencilAlt} />
                    </button>
                </div>
            </div>
            <div className="w-full flex text-gray-500 border-b-2 border-gray-500 text-center py-4 px-2">
                <div className="w-1/12">Tipo</div>
                <div className="w-2/12">No. Expediente</div>
                <div className="w-2/12">No. Gabinete</div>
                <div className="w-1/12">Fila</div>
                <div className="w-2/12">Columna</div>
                <div className="w-1/12">Tercio</div>
                <div className="w-3/12">Fecha</div>
            </div>
            {
                getFilteredExpedients().map(item => (
                    <div key={item.id} className="w-full flex text-center bg-white rounded my-4 shadow-lg py-10 px-2 text-xl">
                        <div className="w-1/12">
                            {cabinet.cabinetType === 'Laminillas' ? <LaminillasIcon className="w-full h-24" /> : <img src={BlocksIcon} alt="Gabinete de bloque icono" className="w-1/4 md:w-2/3" />}
                        </div>
                        <div
                            onClick={() => history.push(`/admin/patient-records/${cabinet.cabinetType === 'Laminillas' ? item.lamellaCoordinates?.expedientId : item.blockCoordinates?.expedientId}`)}
                            className="w-2/12 text-blue-500 flex justify-center items-center cursor-pointer">{item.caseNumber}</div>
                        <div className="w-2/12 flex justify-center items-center">{cabinet.cabinetNumber}</div>
                        <div className="w-1/12 flex justify-center items-center">{cabinet.cabinetType === 'Laminillas' ? item.lamellaCoordinates?.row : item.blockCoordinates?.row}</div>
                        <div className="w-2/12 flex justify-center items-center">{cabinet.cabinetType === 'Laminillas' ? item.lamellaCoordinates?.column : item.blockCoordinates?.column}</div>
                        <div className="w-1/12 flex justify-center items-center">{cabinet.cabinetType === 'Laminillas' ? item.lamellaCoordinates?.third : item.blockCoordinates?.third}</div>
                        <div className="w-3/12 flex justify-center items-center">{formatDate(cabinet.cabinetType === 'Laminillas' ? item.lamellaCoordinates?.updatedAt : item.blockCoordinates?.updatedAt)}</div>
                    </div>
                ))}
        </div>
    );
};

const mapStateToProps = (state) => ({
    cabinet: state.cabinet.cabinet,
    formAction: state.ui.formAction,
    search: state.ui.searchbar,
    user: state.auth.authenticatedUser,
});

const mapDispatchToProps = (dispatch) => ({
    setActiveForm: dispatch.ui.setActiveForm,
    setFormAction: dispatch.ui.setFormAction,
    setNotification: dispatch.ui.setNotification,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CabinetDetail));