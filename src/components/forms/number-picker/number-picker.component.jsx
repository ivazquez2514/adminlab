import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { useOnlyNumbers } from '../../../hooks';

const NumberPicker = React.memo(({label, inputProps}) => {
    const [value, setValue] = useState(0);
    const {validateFn} = useOnlyNumbers();
    const inputEl = document.getElementsByName(inputProps.name)[0];

    const handleChangeValue = (newValue) => {
        inputEl.value = newValue;
        setValue(newValue);
    };

    return (
        <div className="w-full h-full">
            <label className="block tracking-wide font-bold mb-2 text-gray-500">{label}</label>
            <div className="w-full bg-white p-2 rounded-lg border-2 border-gray-500 flex h-20 text-2xl gap-4">
                <button
                    type="button"
                    disabled={value === 0}
                    className={`${value === 0 ? 'bg-gray-500' : 'bg-blue-500'} w-1/4 md:w-2/6 lg:w-1/8 text-white focus:outline-none rounded-lg`}
                    onClick={(e) => handleChangeValue(Number(inputEl.value) - 1)}>
                        <FontAwesomeIcon icon={faMinus} />
                    </button>
                <input
                    {...inputProps}
                    onKeyDown={validateFn}
                    type="text"
                    defaultValue="0"
                    onBlur={() => inputEl.value = inputEl.value || 0}
                    className="focus:outline-none w-2/4 md:w-2/6 lg:w-6/8 text-center text-gray-500 text-3xl" />
                <button
                    type="button"
                    className={`w-1/4 md:w-2/6 lg:w-1/8 bg-blue-500 text-white focus:outline-none rounded-lg`}
                    onClick={(e) => handleChangeValue(Number(inputEl.value) + 1)}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
        </div>
    );
});

export default NumberPicker;