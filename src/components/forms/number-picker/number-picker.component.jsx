import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useOnlyNumbers, useOnlyLetters, useInputState } from '../../../hooks';

export const letterOptions = [
    'A-A',
    'A-B',
    'A-C',
    'A-D',
    'A-E',
    'A-F',
    'A-G',
    'A-H',
    'A-I',
    'A-J',
    'A-K',
    'A-L',
    'A-M',
    'A-N',
    'A-Ñ',
    'A-O',
    'A-P',
    'A-Q',
    'A-R',
    'A-S',
    'A-T',
    'A-U',
    'A-V',
    'A-W',
    'A-X',
    'A-Y',
    'A-Z',
];

const NumberPicker = React.memo(({label, inputProps, withLetters, error}) => {
    const [value, setValue] = useState(0);
    const {validateFn: validateNumbersFn} = useOnlyNumbers();
    const {validateFn: validateLettersFn} = useOnlyLetters();
    const {getInputCssClasses, getInputLabelCssClasses} = useInputState();
    const inputEl = document.getElementsByName(inputProps.name)[0];

    if (withLetters && value === 0 && inputEl) {
        inputEl.value = letterOptions[value];
    }

    const handleChangeValue = (newValue) => {
        setValue(newValue);
        inputEl.value = withLetters ? letterOptions[newValue] : newValue;
    };

    return (
        <div className="w-full h-full">
            <label className={`${getInputLabelCssClasses(!!inputEl?.value, error)} block tracking-wide font-bold mb-2 text-gray-500`}>{label}</label>
            <div className={`${getInputCssClasses(!!inputEl?.value, error)} w-full bg-white p-2 rounded-lg border-2 flex h-20 text-2xl gap-4`}>
                <button
                    type="button"
                    disabled={value === 0}
                    className={`${value === 0 ? 'bg-gray-500' : 'bg-blue-500'} w-1/4 md:w-2/6 lg:w-1/8 text-white focus:outline-none rounded-lg`}
                    onClick={(e) => handleChangeValue(Number(value) - 1)}>
                        <FontAwesomeIcon icon={faMinus} />
                    </button>
                <input
                    {...inputProps}
                    onKeyDown={withLetters ? validateLettersFn : validateNumbersFn}
                    type="text"
                    className={`${getInputLabelCssClasses(!!inputEl?.value, error)} focus:outline-none w-2/4 md:w-2/6 lg:w-6/8 text-center text-gray-500 text-3xl`} />
                <button
                    type="button"
                    disabled={withLetters !== undefined && value >= letterOptions.length - 1 }
                    className={`${withLetters && value >= letterOptions.length - 1 ? 'bg-gray-500' : 'bg-blue-500'} w-1/4 md:w-2/6 lg:w-1/8 text-white focus:outline-none rounded-lg`}
                    onClick={(e) => handleChangeValue(Number(value) + 1)}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
        </div>
    );
});

export default NumberPicker;