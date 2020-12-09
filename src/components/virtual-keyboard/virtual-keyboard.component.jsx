import { useCallback } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackspace, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const VirtualKeyBoard = ({inputRef, setSearch, setInputRef}) => {
    const keyClickHandler = useCallback((value) => {
        const el = document.getElementById(inputRef);

        if (value != 'backspace') {
            el.value += value;
        } else {
            el.value = el.value.slice(0, el.value.length - 1);
        }

        setSearch(el.value);
    }, [inputRef]);

    return (
        <div className="fixed bottom-0 z-50 w-full hidden md:flex justify-center">
            <div className="bg-white text-back p-4 w-full md:w-4/5 shadow text-3xl font-bold rounded-t-lg">
                <div className="flex gap-4 text-gray-800">
                    <button className="w-1/10 rounded-lg shadow bg-white focus:outline-none font-semibold" onClick={() => keyClickHandler(1)}>1</button>
                    <button className="w-1/10 rounded-lg shadow bg-white focus:outline-none font-semibold" onClick={() => keyClickHandler(2)}>2</button>
                    <button className="w-1/10 rounded-lg shadow bg-white focus:outline-none font-semibold" onClick={() => keyClickHandler(3)}>3</button>
                    <button className="w-1/10 rounded-lg shadow bg-white focus:outline-none font-semibold" onClick={() => keyClickHandler(4)}>4</button>
                    <button className="w-1/10 rounded-lg shadow bg-white focus:outline-none font-semibold" onClick={() => keyClickHandler(5)}>5</button>
                    <button className="w-1/10 rounded-lg shadow bg-white focus:outline-none font-semibold" onClick={() => keyClickHandler(6)}>6</button>
                    <button className="w-1/10 rounded-lg shadow bg-white focus:outline-none font-semibold" onClick={() => keyClickHandler(7)}>7</button>
                    <button className="w-1/10 rounded-lg shadow bg-white focus:outline-none font-semibold" onClick={() => keyClickHandler(8)}>8</button>
                    <button className="w-1/10 rounded-lg shadow bg-white focus:outline-none font-semibold" onClick={() => keyClickHandler(9)}>9</button>
                    <button className="w-1/10 rounded-lg shadow bg-white focus:outline-none font-semibold" onClick={() => keyClickHandler(0)}>0</button>
                    <button className="w-1/10 rounded-lg shadow-lg bg-red-500 text-white focus:outline-none font-semibold" onClick={() => keyClickHandler('backspace')}>
                        <FontAwesomeIcon icon={faBackspace} />
                    </button>
                </div>
                <div className="flex gap-4 mt-4 text-gray-800">
                    <button className="w-1/10 rounded-lg shadow bg-white focus:outline-none font-semibold" onClick={() => keyClickHandler('q')}>Q</button>
                    <button className="w-1/10 rounded-lg shadow bg-white focus:outline-none font-semibold" onClick={() => keyClickHandler('w')}>W</button>
                    <button className="w-1/10 rounded-lg shadow bg-white focus:outline-none font-semibold" onClick={() => keyClickHandler('e')}>E</button>
                    <button className="w-1/10 rounded-lg shadow bg-white focus:outline-none font-semibold" onClick={() => keyClickHandler('r')}>R</button>
                    <button className="w-1/10 rounded-lg shadow bg-white focus:outline-none font-semibold" onClick={() => keyClickHandler('t')}>T</button>
                    <button className="w-1/10 rounded-lg shadow bg-white focus:outline-none font-semibold" onClick={() => keyClickHandler('y')}>Y</button>
                    <button className="w-1/10 rounded-lg shadow bg-white focus:outline-none font-semibold" onClick={() => keyClickHandler('u')}>U</button>
                    <button className="w-1/10 rounded-lg shadow bg-white focus:outline-none font-semibold" onClick={() => keyClickHandler('i')}>I</button>
                    <button className="w-1/10 rounded-lg shadow bg-white focus:outline-none font-semibold" onClick={() => keyClickHandler('o')}>O</button>
                    <button className="w-1/10 rounded-lg shadow bg-white focus:outline-none font-semibold" onClick={() => keyClickHandler('p')}>P</button>
                </div>
                <div className="flex gap-4 mt-4 text-gray-800">
                    <button className="w-1/10 rounded-lg shadow bg-white focus:outline-none font-semibold" onClick={() => keyClickHandler('a')}>A</button>
                    <button className="w-1/10 rounded-lg shadow bg-white focus:outline-none font-semibold" onClick={() => keyClickHandler('s')}>S</button>
                    <button className="w-1/10 rounded-lg shadow bg-white focus:outline-none font-semibold" onClick={() => keyClickHandler('d')}>D</button>
                    <button className="w-1/10 rounded-lg shadow bg-white focus:outline-none font-semibold" onClick={() => keyClickHandler('f')}>F</button>
                    <button className="w-1/10 rounded-lg shadow bg-white focus:outline-none font-semibold" onClick={() => keyClickHandler('g')}>G</button>
                    <button className="w-1/10 rounded-lg shadow bg-white focus:outline-none font-semibold" onClick={() => keyClickHandler('h')}>H</button>
                    <button className="w-1/10 rounded-lg shadow bg-white focus:outline-none font-semibold" onClick={() => keyClickHandler('j')}>J</button>
                    <button className="w-1/10 rounded-lg shadow bg-white focus:outline-none font-semibold" onClick={() => keyClickHandler('k')}>K</button>
                    <button className="w-1/10 rounded-lg shadow bg-white focus:outline-none font-semibold" onClick={() => keyClickHandler('l')}>L</button>
                    <button className="w-1/10 rounded-lg shadow bg-white focus:outline-none font-semibold" onClick={() => keyClickHandler('ñ')}>Ñ</button>
                </div>
                <div className="flex gap-4 mt-4 text-gray-800">
                    <button className="w-1/10 rounded-lg shadow bg-white focus:outline-none font-semibold" onClick={() => keyClickHandler('z')}>Z</button>
                    <button className="w-1/10 rounded-lg shadow bg-white focus:outline-none font-semibold" onClick={() => keyClickHandler('x')}>X</button>
                    <button className="w-1/10 rounded-lg shadow bg-white focus:outline-none font-semibold" onClick={() => keyClickHandler('c')}>C</button>
                    <button className="w-1/10 rounded-lg shadow bg-white focus:outline-none font-semibold" onClick={() => keyClickHandler('v')}>V</button>
                    <button className="w-1/10 rounded-lg shadow bg-white focus:outline-none font-semibold" onClick={() => keyClickHandler('b')}>B</button>
                    <button className="w-1/10 rounded-lg shadow bg-white focus:outline-none font-semibold" onClick={() => keyClickHandler('n')}>N</button>
                    <button className="w-1/10 rounded-lg shadow bg-white focus:outline-none font-semibold" onClick={() => keyClickHandler('m')}>M</button>
                    <button className="w-2/10 rounded-lg shadow bg-white focus:outline-none font-semibold" onClick={() => keyClickHandler(' ')}>Espacio</button>
                    <button className="w-1/10 rounded-lg shadow bg-white focus:outline-none font-semibold" onClick={() => setInputRef(null)}>
                        <FontAwesomeIcon icon={faTimesCircle} />
                    </button>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (st) => ({
    inputRef: st.ui.inputRef
});

const mapDispatchToProps = (dispatch) => ({
    setSearch: dispatch.ui.setSearch,
    setInputRef: dispatch.ui.setInputRef,
});

export default connect(mapStateToProps, mapDispatchToProps)(VirtualKeyBoard);