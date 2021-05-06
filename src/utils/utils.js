export const convertArrayToObject = (array = [], key = 'id') => {
    if (array.length > 0) {
        return array.reduce(
            (accumulator, currentItem) => ({
                ...accumulator,
                [currentItem[key]]: currentItem,
            }),
            {}
        );
    } else return {}
};