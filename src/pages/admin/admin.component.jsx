import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faColumns, faSearch, faCubes, faUsers, faPlus } from '@fortawesome/free-solid-svg-icons'

const AdminPage = () => {
    return (
        <div className="min-w-screen min-h-screen flex flex-col items-center bg-gray-300">
            <div className="container w-4/5 flex flex-col h-screen">
                <header className="w-full rounded-b-lg py-4 px-6 shadow-lg rounded bg-white flex">
                    <p className="text-blue-400 text-center w-2/12 px-3">LOGO</p>
                    <div className="w-5/12 px-3">
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
                    <div className="user-info-container px-3 flex w-4/12">
                        <div className="rounded-full h-10 w-10 flex items-center justify-center bg-blue-400 text-white text-lg">S</div>
                        <div className="user-info ml-3">
                            <p className="text-blue-400 text-sm mt-1">Jose Luis Cordova Lopez</p>
                            <p className="text-gray-500 text-xs -mt-1">ULAB001</p>
                        </div>
                    </div>
                    <div className="logout-container w-1/12">
                        <button className="bg-red-600 hover:bg-red-500 focus:bg-red-700 focus:outline-none text-white w-full h-full rounded">Salir</button>
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto py-5">
                    Contenido principal
                </main>
                <footer className="rounded-t-lg py-4 px-6 pr-20 shadow-lg rounded bg-white relative">
                    <button className="text-white bg-blue-400 hover:bg-blue-500 focus:bg-blue-600 focus:outline-none absolute -mt-12 right-0 mr-8 py-3 px-5 rounded font-bold text-2xl">
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <nav className="w-full flex text-gray-600">
                        <div className="flex-1 flex py-1 items-center justify-center cursor-pointer hover:text-blue-400">
                            <FontAwesomeIcon icon={faColumns} className="text-2xl" />
                            <p className="ml-4 text-lg">Panel de control</p>
                        </div>
                        <div className="flex-1 border-l border-gray-400 flex py-1 items-center justify-center cursor-pointer hover:text-blue-400">
                            <FontAwesomeIcon icon={faCubes} className="text-2xl" />
                            <p className="ml-4 text-lg">Almacenamiento</p>
                        </div>
                        <div className="flex-1 border-l border-gray-400 flex py-1 items-center justify-center cursor-pointer hover:text-blue-400">
                            <FontAwesomeIcon icon={faUsers} className="text-2xl" />
                            <p className="ml-4 text-lg">Colaboradores</p>
                        </div>
                    </nav>
                </footer>
            </div>
        </div>
    )
};

export default AdminPage;