export const getMenuValue = (list, labelKey, valueKey, value) => {
  return list.find((item) => item[valueKey] === value)[labelKey]
}
