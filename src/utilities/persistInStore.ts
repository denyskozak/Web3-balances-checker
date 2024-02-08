const getValueFromStore = <T>(key: string, getItem: (key: string) => string): T =>
    JSON.parse(getItem(key));

const setValueToStore = <T>(key: string, value = T, setItem: (key: string, value: string) => void) =>
    setItem(
        key,
        JSON.stringify(value)
    );

export const getItemLocalStore = <T>(key: string): T | null => getValueFromStore<T>(key, localStorage.getItem.bind(localStorage));
export const setItemLocalStore = <T>(key: string, value = T) => setValueToStore<T>(key, value, localStorage.setItem.bind(localStorage));