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

export const getStats = (stats = []) =>
  stats.length === 0
    ? []
    : stats.map(({ stat: { name }, ...rest }) => ({ ...rest, name }))

export const getTypes = (types = []) =>
  types.length === 0
    ? []
    : types.map(({ type: { name }, ...rest }) => ({ ...rest, name }))
