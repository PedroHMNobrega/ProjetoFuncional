//@ts-nocheck

export const groupBy = (items, getKeyFn) => items.reduce(
    (acc, item) => {
        const key = getKeyFn(item)
        return {
            ...acc,
            [key]: [
                ...(acc[key] || []),
                item,
            ]
        }
    }, {})