export const INITIALIZE_FORM = 'INITIALIZE_FORM'
export const CLEAR_FORM = 'CLEAR_FORM'
export const CHANGE_FORM_VALUE = 'CHANGE_FORM_VALUE'
export const DELETE_FORM_VALUE = 'DELETE_FORM_VALUE'
export const ADD_FORM_VALUES = 'ADD_FORM_VALUES'
export const ADD_FORM_ERRORS = 'ADD_FORM_ERRORS'
export const REMOVE_ERROR = 'REMOVE_ERROR'

export const initializeForm = (values) => {
  return ({
    type: INITIALIZE_FORM,
    values: values
  })
}
export const clearForm = () => {
  return ({
    type: CLEAR_FORM
  })
}
export const change = (key, value) => {
  return ({
    type: CHANGE_FORM_VALUE,
    key: key,
    value: value
  })
}
export const deleteFormValue = (key) => {
  return ({
    type: DELETE_FORM_VALUE,
    key: key
  })
}
export const addValuesToGlobalForm = (values) => {
  return ({
    type: ADD_FORM_VALUES,
    values: values
  })
}
export const addErrorsToGlobalForm = (errors) => {
  return ({
    type: ADD_FORM_ERRORS,
    errors: errors
  })
}
export const removeErrorsFromGlobalForm = (key) => {
  return ({
    type: REMOVE_ERROR,
    key: key
  })
}

