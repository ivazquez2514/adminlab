const useInputState = () => {
    const getInputCssClasses = (isDirty, hasError) => {
        if (hasError) {
            return 'border-red-500 placeholder-red-500 text-red-500';
        } else if (isDirty) {
            return 'border-blue-500 placeholder-blue-500 text-blue-500';
        }

        return 'border-gray-500 text-gray-500';
    };

    const getInputLabelCssClasses = (isDirty, hasError) => {
        if (hasError) {
            return 'text-red-500';
        } else if (isDirty) {
            return 'text-blue-500';
        }

        return 'text-gray-500';
    };

    return { getInputCssClasses, getInputLabelCssClasses };
};

export default useInputState;