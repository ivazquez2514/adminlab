import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FormActions, FormTitlesEnum, Permissions } from '../../enums';
import formTitlesEnum from '../../enums/form-titles.enum';

import MainHeader from './main-header.component';

const AdminHeader = React.memo(({user, logoutHandler, activeForm, history, setSearch, search}) => {
    return (
        activeForm ? <FormHeader activeForm={activeForm} history={history} user={user} /> : <MainHeader user={user} search={search} setSearch={setSearch} logoutHandler={logoutHandler}/>
    );
})

const mapStateToProps = (state) => ({
    formAction: state.ui.formAction,
});

const mapDispatchToProps = (dispatch) => ({
    setFormAction: dispatch.ui.setFormAction
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
            <div>
                <p className="invisible">hola</p>
                <button
                    onClick={() => setFormAction(FormActions.DELETE)}
                    type="button"
                    className={`${isInvisible(FormActions.DELETE) && 'hidden'} bg-white border-2 border-gray-300 rounded-lg px-3 py-1 mr-3 focus:outline-none`}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                </button>
                <button
                    onClick={() => setFormAction(FormActions.UPDATE)}
                    type="button"
                    className={`${isInvisible(FormActions.UPDATE) && 'hidden'} bg-white border-2 border-gray-300 rounded-lg px-3 py-1 focus:outline-none`}>
                    <FontAwesomeIcon icon={faPencilAlt} />
                </button>
            </div>
        </header>
    );
}));

export default withRouter(AdminHeader);