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

export const fold = (reducer, init, array) =>
    array.length === 0 ? init : fold(reducer, reducer(init, array[0]), array.slice (1))

export const compose = (f, g) => x => f( g(x) )
