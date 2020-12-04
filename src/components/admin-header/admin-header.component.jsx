import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSearch, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { ReactComponent as LogoNova } from '../../assets/svg/logo_nova.svg';
import { ReactComponent as MobileLogo } from '../../assets/svg/mobile_logo.svg';
import { FormActions, FormTitlesEnum, Permissions } from '../../enums';
import formTitlesEnum from '../../enums/form-titles.enum';

const AdminHeader = React.memo(({user, logoutHandler, activeForm, history}) => {
    return (
        activeForm ? <FormHeader activeForm={activeForm} history={history} user={user} /> : <MainHeader user={user} logoutHandler={logoutHandler}/>
    );
})

const MainHeader = React.memo(({user, logoutHandler}) => {
    const [ isMenuOpen, setIsMenuOpen ] = useState(false);

    return (
        <header className="w-full rounded-b-lg py-4 px-3 md:px-6 shadow-lg rounded bg-white flex z-49">
            <div className="text-blue-400 flex justify-center w-1/6 md:w-3/12 px-3">
                <LogoNova className="hidden md:block"/>
                <MobileLogo className="md:hidden"/>
            </div>
            
            <div className="w-4/6 md:w-5/12 px-2 md:px-3">
                <div className="searchbar relative">
                    <div className="absolute px-4 h-full flex items-center leading-normal border-0 rounded rounded-r-none text-gray-700">
                        <FontAwesomeIcon icon={faSearch} />
                    </div>
                    <input
                        className="appearance-none pl-12 py-2 px-2 block w-full bg-gray-400 focus:bg-gray-300 text-gray-700 placeholder-gray-700 rounded-md focus:outline-none"
                        id="grid-first-name"
                        type="text"
                        placeholder="Buscar" />
                </div>
            </div>
            <div className="hidden md:flex user-info-container justify-center md:justify-start md:px-3 w-1/6 md:w-3/12">
                <div className="rounded-full h-10 w-10 flex items-center justify-center bg-blue-400 text-white text-lg">{user?.username.slice(0, 1).toUpperCase()}</div>
                <div className="ml-3 hidden md:block">
                    <p className="text-blue-400 text-sm">{user?.username}</p>
                    <p className="text-gray-500 text-xs -mt-1">{user?.role}</p>
                    <p className="text-xs -mt-1">{user?.area?.name}</p>
                </div>
            </div>
            <div className="md:hidden user-info-container justify-center md:justify-start md:px-3 flex w-1/6 md:w-3/12 relative">
                <div
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="rounded-full h-10 w-10 flex items-center justify-center bg-blue-400 text-white text-lg cursor-pointer">{user?.username.slice(0, 1).toUpperCase()}</div>
                <div
                    onClick={logoutHandler}
                    className={`${!isMenuOpen ? 'hidden' : ''} ml-3 absolute mt-12 mr-12 bg-white shadow-lg py-4 px-8 hover:bg-red-500 hover:text-white rounded cursor-pointer`}>
                    Salir
                </div>
            </div>
            <div className="hidden md:block w-1/12">
                <button
                    onClick={logoutHandler}
                    className="bg-red-600 hover:bg-red-500 focus:bg-red-700 focus:outline-none text-white w-full h-full rounded">
                    Salir
                </button>
            </div>
        </header>
    )
});

const mapStateToProps = (state) => ({
    formAction: state.ui.formAction
});

const mapDispatchToProps = (dispatch) => ({
    setFormAction: dispatch.ui.setFormAction,
});

const FormHeader = connect(mapStateToProps, mapDispatchToProps)(React.memo(({activeForm, history, formAction, setFormAction, user}) => {
    const isInvisible = (action) => {
        if (formAction === '' || formAction === null || activeForm.title === FormTitlesEnum.CABINET_UPDATE) {
            return true;
        } else if (activeForm.title === formTitlesEnum.HOSPITAL_AREA_DETAIL) {
            return !Permissions.areas[user.role].includes(action);
        } else if (activeForm.title === formTitlesEnum.COLLABORATOR_DETAIL) {
            return !Permissions.collaborators[user.role].includes(action);
        }
    };

    return (
        <header className="w-full flex justify-between text-2xl rounded-b-lg py-4 px-6 shadow-lg rounded bg-white text-blue-500 text-center">
            <div
                className="text-xl cursor-pointer"
                onClick={() => history.push(activeForm.backUrl)}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </div>
            <h4 className="text-xl md:text-2xl">{activeForm.title}</h4>
            <div className='text-lg cursor-pointer text-black'>
                <button
                    onClick={() => setFormAction(FormActions.DELETE)}
                    type="button"
                    className={`${isInvisible(FormActions.DELETE) && 'invisible'} bg-white border-2 border-gray-300 rounded-lg px-3 py-1 mr-3 focus:outline-none`}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                </button>
                <button
                    onClick={() => setFormAction(FormActions.UPDATE)}
                    type="button"
                    className={`${isInvisible(FormActions.UPDATE) && 'invisible'} bg-white border-2 border-gray-300 rounded-lg px-3 py-1 focus:outline-none`}>
                    <FontAwesomeIcon icon={faPencilAlt} />
                </button>
            </div>
        </header>
    );
}));

export default withRouter(AdminHeader);