const PERMITTED_KEYS = [
    8,
    9,
    16,
    17,
    37,
    38,
    39,
    40,
    48,
    49,
    50,
    51,
    52,
    53,
    54,
    55,
    56,
    57,
    96
];

const useOnlyNumbers = function () {
    const validateFn = (e) => {
        if (!PERMITTED_KEYS.includes(e.which)) {
            e.preventDefault();
            return false;
        }

        return true;
    }
    
    return {validateFn};
}

export default useOnlyNumbers;