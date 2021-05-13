export const convertArrayToObject = (array = [], key = 'id') =>
  array.length === 0
    ? {}
    : array.reduce(
        (accumulator, currentItem) => ({
          ...accumulator,
          [currentItem[key]]: currentItem,
        }),
        {},
      )

export const getStats = (stats) => {
  if (stats === null) return []
  return (stats === null || stats.length) === 0
    ? []
    : stats.map(({ stat: { name }, ...rest }) => ({ ...rest, name }))
}

export const getTypes = (types) => {
  if (types === null) return []
  return types.length === 0
    ? []
    : types.map(({ type: { name }, ...rest }) => ({ ...rest, name }))
}

export const filterByKey = (array = [], key = 'id', search = '') =>
  array.filter((element) =>
    element[key].toLowerCase().includes(search.toLowerCase()),
  )
