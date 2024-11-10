interface History {
    apid: string
}
interface HistoryRef {
    [index: string]: History;
}
type HistoryList = HistoryRef[]

const getUrlFromHistory = (history: History) => {
    return history.apid || ''
}

const getHistoryIndexFromList = (key: string, historyList: HistoryList) => {
    return historyList.findIndex((hist) =>
        Object.keys(hist).includes(key)
    );
}

const getHistoryFromList = (key: string, historyList: HistoryList) => {
    const ind = getHistoryIndexFromList(key, historyList)
    return ind > -1 ? historyList[ind] : undefined
}

const historyExistsInList = (key: string, historyList: HistoryList) => {
    const ind = getHistoryIndexFromList(key, historyList)
    return ind > -1
}

const addToHistoryList = (key: string, history: History, historyList: HistoryList) => {

    let newList = historyList
    const ind = getHistoryIndexFromList(key, historyList)
    const rec = {
        [key]: history
    }

    if (ind > -1) {
        newList.splice(ind, 1, rec)
    } else {
        newList = newList.concat([rec])
    }

    return newList;
}


export default {
    getUrlFromHistory,
    getHistoryFromList,
    historyExistsInList,
    addToHistoryList
}