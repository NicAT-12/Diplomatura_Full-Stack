import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
    const [localValue, setLocalValue] = useState(() => {
        const getStorage = localStorage.getItem(key);

        return getStorage
            ? JSON.parse(getStorage)
            : initialValue;
    });
    
    useEffect(() => {
        const valueString = JSON.stringify(localValue);
        localStorage.setItem(key, valueString);
    }, [localValue, key])

    return [
        localValue,
        setLocalValue
    ]
}