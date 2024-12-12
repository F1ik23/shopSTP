const stateMapping = {
    COMPLETED: "Завершено",
    NOTCOMPLETED: "Не завершено",
    WAITING: "Ожидает оплаты",
    PAID: "Оплачено",
    AWAITINGDEPARTURE: "Ожидает отправки",
    SENT: "Отправлено",
    HANDED: "Вручено"
}

export const flattenObject = (obj, parentKey = '') => {
    const result = {};
    for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
            const flatObject = flattenObject(obj[key], parentKey ? `${parentKey}_${key}` : key);
            for (const nestedKey in flatObject) {
                result[nestedKey] = flatObject[nestedKey];
            }
        } else {
            if (key === 'id' && parentKey) {
                result[`${parentKey}_id`] = obj[key];
            }
            else if (key === 'state') {
                result[key] = stateMapping[obj[key]];
            }
            else if (key === 'date') {
              result[key] = formatDate(obj[key]);  
            } else result[key] = obj[key];
        }
    }
    return result;
}

const formatDate = (dateString) => {
    if (!dateString) return null;

    const date = new Date(dateString);
    const offsetHours = 5;
    const localDate = new Date(date.getTime() + offsetHours * 60 * 60 * 1000);

    const day = String(localDate.getUTCDate()).padStart(2, '0');
    const month = String(localDate.getUTCMonth() + 1).padStart(2, '0');
    const year = localDate.getUTCFullYear();

    const hours = String(localDate.getUTCHours()).padStart(2, '0');
    const minutes = String(localDate.getUTCMinutes()).padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}`;
}