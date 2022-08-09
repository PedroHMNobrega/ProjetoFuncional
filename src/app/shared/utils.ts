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

export const orderBy = (array, attr) =>
    array.sort((a, b) => {
      if (!attr) return 0;
      if (!a[attr]) return 1;
      if (!b[attr]) return -1;

      return a[attr].toString().toLowerCase() < b[attr].toString().toLowerCase() ? -1 : 1;
    });

export const distinct = (arr, atrib) =>
    Object.values(
      arr.reduce((c,e) => {
          if(!c[e[atrib]]) c[e[atrib]] = e;
          return c;

      },{})
    );

export const fold = (reducer, init, array) =>
    array.length === 0 ? init : fold(reducer, reducer(init, array[0]), array.slice (1))

export const compose = (f, g) => x => f( g(x) )
