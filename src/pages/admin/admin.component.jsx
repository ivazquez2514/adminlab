import React, { useState } from 'react';
import { withRouter, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faColumns, faCubes, faUsers, faPlus } from '@fortawesome/free-solid-svg-icons'
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

const AdminPage = ({logout, activeForm, notification, history}) => {
    const [openDialog, setOpenDialog] = useState(false);
    const location = useLocation();
    
    const logoutHandler = () => {
        logout();
        localStorage.removeItem('adminlab-auth');
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
                    activeForm={activeForm} />
                <Content />
                {!activeForm && <footer className="rounded-t-lg py-4 px-6 shadow-lg rounded bg-white relative mt-4">
                    <nav className="w-full flex text-gray-600">
                        {displayFooterItem(ROUTES.MOVEMENTS) && <div
                            onClick={() => history.push('/admin/movements-history')} className={`${ location.pathname === ROUTES.MOVEMENTS ? 'text-blue-400' : '' } flex-1 flex py-1 items-center justify-center cursor-pointer hover:text-blue-400`}>
                            <FontAwesomeIcon icon={faColumns} className="text-2xl" />
                            <p className="ml-4 text-lg hidden md:block">Panel de control</p>
                        </div>}
                        {displayFooterItem(ROUTES.CABINETS) && <div
                            onClick={() => history.push('./cabinets')}
                            className={`${ location.pathname === ROUTES.CABINETS ? 'text-blue-400' : '' } flex-1 border-l border-gray-400 flex py-1 items-center justify-center cursor-pointer hover:text-blue-400`}>
                            <FontAwesomeIcon icon={faCubes} className="text-2xl" />
                            <p className="ml-4 text-lg hidden md:block">Almacenamiento</p>
                        </div>}
                        {displayFooterItem(ROUTES.COLLABORATORS) && <div
                            onClick={() => history.push('/admin/collaborators')}
                            className="flex-1 border-l border-gray-400 flex py-1 items-center justify-center cursor-pointer hover:text-blue-400">
                            <FontAwesomeIcon icon={faUsers} className="text-2xl" />
                            <p className="ml-4 text-lg hidden md:block">Colaboradores</p>
                        </div>}
                        {displayFooterItem(ROUTES.AREAS) && <div
                            onClick={() => history.push('/admin/hospital-areas')}
                            className="flex-1 border-l border-gray-400 flex py-1 items-center justify-center cursor-pointer hover:text-blue-400">
                            <FontAwesomeIcon icon={faUsers} className="text-2xl" />
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
    notification: state.ui.notification
});

const mapDispatchToProps = (dispatch) => ({
    logout: dispatch.auth.logout,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AdminPage));