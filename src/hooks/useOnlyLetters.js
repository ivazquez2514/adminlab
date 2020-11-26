const PERMITTED_KEYS = [
    /* 8,
    9,
    16,
    17,
    37,
    38,
    39,
    40,
    65,
    66,
    67,
    68,
    69,
    70,
    71,
    72,
    73,
    74,
    75,
    76,
    77,
    78,
    79,
    80,
    81,
    82,
    83,
    84,
    85,
    86,
    87,
    88,
    89,
    90 */
];

const useOnlyLetters = function () {
    const validateFn = (e) => {
        if (!PERMITTED_KEYS.includes(e.which)) {
            e.preventDefault();
            return false;
        }

        return true;
    }
    
    return {validateFn};
}

export default useOnlyLetters;