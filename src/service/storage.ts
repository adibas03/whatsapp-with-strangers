const HISTORY_REF = "wwsc_storage";
interface Value {
    in?: [],
    out?: string
};

const prepForStorage = (values: Value) => {
    return values.in ? JSON.stringify(values.in) : values.out ? JSON.parse(values.out) : null
}

const getStoredHistory = () => {
    return prepForStorage({ out: localStorage.getItem(HISTORY_REF) || '[]' })
}

const clearStoredHistory = () => {
    localStorage.removeItem(HISTORY_REF)
}

const storeHistory = (value: []) => {
    localStorage.setItem(HISTORY_REF, prepForStorage({ in: value }))
}

export default {
    getStoredHistory,
    clearStoredHistory,
    storeHistory
}