import React, { useState, useEffect } from 'react';
import { withRouter, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faColumns, faCubes, faUsers, faPlus, faClinicMedical } from '@fortawesome/free-solid-svg-icons'
import { Permissions, FormActions } from '../../enums'

import {
    Content,
    Dialog,
    AdminHeader,
    Notification
} from '../../components';

const ROUTES = {
    MOVEMENTS: '/admin/movements-history',
    CABINETS: '/admin/cabinets',
    AREAS: '/admin/hospital-areas',
    COLLABORATORS: '/admin/collaborators',
};

const AdminPage = ({logout, activeForm, notification, history, search, setSearch}) => {
    const [openDialog, setOpenDialog] = useState(false);
    const location = useLocation();
    // const { close, startInterval, intervalRef } = useCheckSession();
    const [intervalRef, setIntervalRef] = useState();
    
    const logoutHandler = () => {
        clearInterval(intervalRef);
        setIntervalRef('adminlab-auth');
        logout();
        history.push('/auth');
    };

    const displayFooterItem = (path) => {
        if (path === ROUTES.MOVEMENTS) {
            return Permissions.movements[user.role].includes(FormActions.LIST);
        } else if (path === ROUTES.COLLABORATORS) {
            return Permissions.collaborators[user.role].includes(FormActions.LIST);
        } else if (path === ROUTES.AREAS) {
            return Permissions.areas[user.role].includes(FormActions.LIST);
        } else if (path === ROUTES.CABINETS) {
            return Permissions.cabinets[user.role].includes(FormActions.LIST);
        }
    };

    const user = JSON.parse(localStorage.getItem('adminlab-auth')).collaborator;

    useEffect(() => {
        const interval = setInterval(() => {
            const lastInteraction = localStorage.getItem('adminlab-lastInteraction');
            const lastInteracionDate = new Date(new Date(Number(lastInteraction)));
            const differenceInMinutes = (new Date() - lastInteracionDate) / 1000 / 60;
            // console.log(differenceInMinutes);

            if (differenceInMinutes > 10) {
                // logoutHandler();
                history.push('/auth');
            }
        }, 5000);
        setIntervalRef(interval);
    }, []);

    return (
        <div className="min-w-screen min-h-screen flex flex-col items-center bg-gray-300 relative">

            {!activeForm && <button
                className="text-white bg-blue-400 hover:bg-blue-300 focus:bg-blue-600 focus:outline-none absolute right-0 bottom-0 mb-12 z-50 py-3 px-5 rounded-l-lg font-bold text-2xl"
                onClick={() => setOpenDialog(true)}>
                <FontAwesomeIcon icon={faPlus} />
            </button>}

            {/* Dialogs */}
            {openDialog && <Dialog title="Crear nuevo" onClose={() => setOpenDialog(false)} />}

            {/* Notification */}
            {notification && <Notification data={notification} />}
            
            <div className="container w-full h-screen md:w-4/5 flex flex-col">
                <AdminHeader
                    user={user}
                    logoutHandler={logoutHandler}
                    activeForm={activeForm}
                    search={search}
                    setSearch={setSearch} />
                <Content />
                {!activeForm && <footer className="rounded-t-lg py-4 px-6 shadow-lg rounded bg-white relative mt-4">
                    <nav className="w-full flex text-gray-600">
                        {displayFooterItem(ROUTES.MOVEMENTS) && <div
                            onClick={() => history.push('/admin/movements-history')} className={`${ location.pathname === ROUTES.MOVEMENTS ? 'text-blue-500' : '' } flex-1 flex py-1 items-center justify-center cursor-pointer hover:text-blue-500`}>
                            <FontAwesomeIcon icon={faColumns} className="text-2xl" />
                            <p className="ml-4 text-lg hidden md:block">Panel de control</p>
                        </div>}
                        {displayFooterItem(ROUTES.CABINETS) && <div
                            onClick={() => history.push('./cabinets')}
                            className={`${ location.pathname === ROUTES.CABINETS ? 'text-blue-500' : '' } flex-1 border-l border-gray-400 flex py-1 items-center justify-center cursor-pointer hover:text-blue-500`}>
                            <FontAwesomeIcon icon={faCubes} className="text-2xl" />
                            <p className="ml-4 text-lg hidden md:block">Almacenamiento</p>
                        </div>}
                        {displayFooterItem(ROUTES.COLLABORATORS) && <div
                            onClick={() => history.push('/admin/collaborators')}
                            className={`${ location.pathname === ROUTES.COLLABORATORS ? 'text-blue-500' : '' } flex-1 border-l border-gray-400 flex py-1 items-center justify-center cursor-pointer hover:text-blue-500`}>
                            <FontAwesomeIcon icon={faUsers} className="text-2xl" />
                            <p className="ml-4 text-lg hidden md:block">Colaboradores</p>
                        </div>}
                        {displayFooterItem(ROUTES.AREAS) && <div
                            onClick={() => history.push('/admin/hospital-areas')}
                            className={`${ location.pathname === ROUTES.AREAS ? 'text-blue-500' : '' } flex-1 border-l border-gray-400 flex py-1 items-center justify-center cursor-pointer hover:text-blue-500`}>
                            <FontAwesomeIcon icon={faClinicMedical} className="text-2xl" />
                            <p className="ml-4 text-lg hidden md:block">Areas</p>
                        </div>}
                    </nav>
                </footer>}
            </div>
        </div>
    )
};

const mapStateToProps = (state) => ({
    hideFooter: state.ui.hideFooter,
    activeForm: state.ui.activeForm,
    notification: state.ui.notification,
    search: state.ui.searchbar
});

const mapDispatchToProps = (dispatch) => ({
    logout: dispatch.auth.logout,
    setSearch: dispatch.ui.setSearch
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AdminPage));