import { useState } from 'react';

const useCheckSession = () => {
    const [intervalRef, setIntervalRef] = useState();

    const startInterval = () => {
        const interval = setInterval(() => {
            console.log('Hola');
        }, 5000);
        setIntervalRef(interval);
    };

    const close = () => {
        console.log('Vamos a cerrarlo');
        console.log(intervalRef);
        clearInterval(intervalRef);
        setIntervalRef(null);
    };

    return { startInterval, close, intervalRef };
};

export default useCheckSession;