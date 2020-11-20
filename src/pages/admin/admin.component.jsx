import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faColumns, faCheckCircle, faCubes, faUsers, faPlus } from '@fortawesome/free-solid-svg-icons'

import {
    Content,
    Dialog,
    AdminHeader,
    Notification
} from '../../components';

const AdminPage = ({logout, activeForm, notification}) => {
    const [openDialog, setOpenDialog] = useState(false);

    const logoutHandler = () => {
        logout();
        localStorage.removeItem('adminlab-auth');
    };

    const user = JSON.parse(localStorage.getItem('adminlab-auth')).collaborator;

    return (
        <div className="min-w-screen min-h-screen flex flex-col items-center bg-gray-300 relative">

            {/* Dialogs */}
            {openDialog && <Dialog title="Crear nuevo" onClose={() => setOpenDialog(false)} />}

            {/* Notification */}
            {notification && <Notification data={notification} />}
            
            <div className="container w-full md:w-4/5 flex flex-col h-screen">
                <AdminHeader
                    user={user}
                    logoutHandler={logoutHandler}
                    activeForm={activeForm} />
                <Content />
                {!activeForm && <footer className="rounded-t-lg py-4 px-6 md:pr-20 shadow-lg rounded bg-white relative">
                    <button
                        className="text-white bg-blue-400 hover:bg-blue-300 focus:bg-blue-600 focus:outline-none absolute -mt-12 right-0 md:mr-8 py-3 px-5 rounded-l-lg md:rounded-lg font-bold text-2xl"
                        onClick={() => setOpenDialog(true)}>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <nav className="w-full flex text-gray-600">
                        <div className="flex-1 flex py-1 items-center justify-center cursor-pointer hover:text-blue-400">
                            <FontAwesomeIcon icon={faColumns} className="text-2xl" />
                            <p className="ml-4 text-lg hidden md:block">Panel de control</p>
                        </div>
                        <div className="flex-1 border-l border-gray-400 flex py-1 items-center justify-center cursor-pointer hover:text-blue-400">
                            <FontAwesomeIcon icon={faCubes} className="text-2xl" />
                            <p className="ml-4 text-lg hidden md:block">Almacenamiento</p>
                        </div>
                        <div className="flex-1 border-l border-gray-400 flex py-1 items-center justify-center cursor-pointer hover:text-blue-400">
                            <FontAwesomeIcon icon={faUsers} className="text-2xl" />
                            <p className="ml-4 text-lg hidden md:block">Colaboradores</p>
                        </div>
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