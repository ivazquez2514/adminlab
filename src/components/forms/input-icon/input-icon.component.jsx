import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const InputIcon = React.memo(({label, icon, errorText, placeholder}) => {

    return (
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            {label && <label className="block uppercase tracking-wide text-xs font-bold mb-2" for="grid-first-name">
                {label}
            </label>}
            <div className="relative">
                <span className="absolute flex items-center leading-normal px-3 py-3 border-0 rounded rounded-r-none text-3xl text-gray-400">
                    <FontAwesomeIcon icon={icon} />
                </span>
                <input
                    className="appearance-none font-bold pl-12 block border-gray-400 border-4 w-full bg-gray-200 text-gray-400 border rounded-md py-4 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="text"
                    placeholder={placeholder} />
            </div>
            {errorText && <p className="text-red-500 text-xs italic">{errorText}</p>}
        </div>
    );
});

export default InputIcon;