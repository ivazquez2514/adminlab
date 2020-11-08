import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

const Dialog = ({ title, onClose }) => {
    return (
        <div className="w-screen h-screen transition ease-in-out bg-black bg-opacity-25 absolute z-40 flex justify-center items-center">
            <div className="bg-white rounded shadow-lg m-4 max-w-sm max-h-full overflow-y-auto">
                <div className="p-4 border-b border-gray-400 flex justify-between items-center text-2xl font-medium">
                    <p>{title}</p>
                    <FontAwesomeIcon icon={faTimes} className="cursor-pointer text-xl" onClick={onClose} />
                </div>
                <div className="p-4">
                    <button className="bg-white hover:bg-blue-500 w-full border border-gray-500 text-gray-500 hover:text-white rounded-lg py-3 text-xl mb-4">Expediente de Paciente</button>
                    <button className="bg-white hover:bg-blue-500 w-full border border-gray-500 text-gray-500 hover:text-white rounded-lg py-3 text-xl mb-4">Colaborador</button>
                    <button className="bg-white hover:bg-blue-500 w-full border border-gray-500 text-gray-500 hover:text-white rounded-lg py-3 text-xl mb-4">Gabinete de Laminillas</button>
                    <button className="bg-white hover:bg-blue-500 w-full border border-gray-500 text-gray-500 hover:text-white rounded-lg py-3 text-xl">Gabinete Bloques</button>
                </div>
                <div className="p-4 flex text-white gap-5">
                    <button className="bg-red-600 w-1/2 rounded-lg py-2 text-3xl">
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                    <button className="bg-green-500 w-1/2 rounded-lg py-2 text-3xl">
                        <FontAwesomeIcon icon={faCheck} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Dialog;