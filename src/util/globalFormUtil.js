export const getGlobalFormValues = (store) => {
  return store.globalFormReducer ? store.globalFormReducer.values : null
}
export const getGlobalFormValuesErrors = (store) => {
  return store.globalFormReducer ? store.globalFormReducer.errors : null
}
export const isGlobalFormValid = (store) => {
  return store.globalFormReducer && store.globalFormReducer.errors && Object.keys(store.globalFormReducer.errors).length == 0
}