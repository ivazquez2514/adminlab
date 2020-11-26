import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const InputIcon = React.memo(({label, icon, error, iconProps}) => {
    return (
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            {label && <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor={iconProps.id}>
                {label}
            </label>}
            <div className="relative">
                <span className={`${ error ? 'text-red-500' : 'text-gray-400' } absolute flex items-center leading-normal px-3 py-3 border-0 rounded rounded-r-none text-3xl`}>
                    <FontAwesomeIcon icon={icon} />
                </span>
                <input
                    className={`${ error ? 'border-red-500 border-2 placeholder-red-500' : 'border-gray-400 border-2' } text-black appearance-none font-bold pl-12 block w-full bg-gray-200 rounded-md py-4 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                    type="text"
                    {...iconProps} />
            </div>
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
        </div>
    );
});

export default InputIcon;