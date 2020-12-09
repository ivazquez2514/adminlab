import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { ReactComponent as LogoNova } from '../../assets/svg/logo_nova.svg';
import { ReactComponent as MobileLogo } from '../../assets/svg/mobile_logo.svg';

const MainHeader = React.memo(({user, logoutHandler, setSearch, search, setInputRef}) => {
    const [ isMenuOpen, setIsMenuOpen ] = useState(false);
    const searchEl = useRef(null);

    useEffect(() => {
        if (search === '') {
            searchEl.current.value = '';
        }
    }, [search])

    return (
        <header className="w-full rounded-b-lg py-4 px-3 md:px-6 shadow-lg rounded bg-white flex z-49">
            <div className="text-blue-500 flex justify-center w-1/6 md:w-3/12 px-3">
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
                        id="search"
                        type="text"
                        placeholder="Buscar"
                        autoComplete="off"
                        ref={searchEl}
                        onFocus={(e) => setInputRef(e.target.id)}
                        onKeyUp={(e)=> setSearch(e.target.value)} />
                </div>
            </div>
            <div className="hidden md:flex user-info-container justify-center md:justify-start md:px-3 w-1/6 md:w-3/12">
                <div className="rounded-full h-10 w-10 flex items-center justify-center bg-blue-500 text-white text-lg">{user?.username.slice(0, 1).toUpperCase()}</div>
                <div className="ml-3 hidden md:block">
                    <p className="text-blue-500 text-sm">{user?.username}</p>
                    <p className="text-gray-500 text-xs -mt-1">{user?.role}</p>
                    <p className="text-xs -mt-1">{user?.area?.name}</p>
                </div>
            </div>
            <div className="md:hidden user-info-container justify-center md:justify-start md:px-3 flex w-1/6 md:w-3/12 relative">
                <div
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="rounded-full h-10 w-10 flex items-center justify-center bg-blue-500 text-white text-lg cursor-pointer">{user?.username.slice(0, 1).toUpperCase()}</div>
                <div
                    onClick={logoutHandler}
                    className={`${!isMenuOpen ? 'hidden' : ''} ml-3 absolute mt-12 mr-12 bg-white shadow-lg py-4 px-8 hover:bg-red-500 hover:text-white rounded cursor-pointer`}>
                    Salir
                </div>
            </div>
            <div className="hidden md:block w-1/12">
                <button
                    onClick={logoutHandler}
                    className="bg-red-500 hover:bg-red-400 focus:bg-red-600 focus:outline-none text-white w-full h-full rounded">
                    Salir
                </button>
            </div>
        </header>
    )
});

const mapDispatchToProps = (dispatch) => ({
    setInputRef: dispatch.ui.setInputRef
});

export default connect(null, mapDispatchToProps)(MainHeader);