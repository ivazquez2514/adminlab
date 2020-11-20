import React from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSearch } from '@fortawesome/free-solid-svg-icons'
import { ReactComponent as LogoNova } from '../../assets/svg/logo_nova.svg';

const AdminHeader = React.memo(({user, logoutHandler, activeForm, history}) => {
    console.log(history);
    return (
        activeForm ? <FormHeader activeForm={activeForm} history={history} /> : <MainHeader user={user} logoutHandler={logoutHandler}/>
    );
})

const MainHeader = React.memo(({user, logoutHandler}) => (
    <header className="w-full rounded-b-lg py-4 px-3 md:px-6 shadow-lg rounded bg-white flex">
        <div className="text-blue-400 text-center w-1/6 md:w-2/12 px-3">
            <LogoNova className="hidden md:block"/>
            <p className="md:hidden">Logo</p>
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
        <div className="user-info-container px-3 flex w-1/6 md:w-4/12">
            <div className="rounded-full h-10 w-10 flex items-center justify-center bg-blue-400 text-white text-lg">{user.username.slice(0, 1).toUpperCase()}</div>
            <div className="ml-3 hidden md:block">
                <p className="text-blue-400 text-sm mt-1">{user.username}</p>
                <p className="text-gray-500 text-xs -mt-1">{user.role}</p>
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
));

const FormHeader = React.memo(({activeForm, history}) => (
    <header className="w-full text-2xl rounded-b-lg py-4 px-6 shadow-lg rounded bg-white text-blue-500 text-center">
        <div
            className="text-xl float-left h-full flex items-center cursor-pointer"
            onClick={() => history.push(activeForm.backUrl)}>
            <FontAwesomeIcon icon={faArrowLeft} />
        </div>
        <h4 className="text-xl md:text-2xl">{activeForm.title}</h4>
    </header>
));

export default withRouter(AdminHeader);