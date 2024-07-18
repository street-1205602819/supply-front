export const getMenuValue = (list, labelKey, valueKey, value) => {
  console.log(value)
  console.log(list.find((item) => item[valueKey] === 1))
  return list.find((item) => item[valueKey] === value)[labelKey]
}
