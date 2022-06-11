
import { ADD_FORM_ERRORS, ADD_FORM_VALUES, CHANGE_FORM_VALUE, CLEAR_FORM, DELETE_FORM_VALUE, INITIALIZE_FORM, REMOVE_ERROR } from '../actions/globalFormActions'

export default (state = { values: {}, errors: {} }, action) => {
  switch (action.type) {
    case INITIALIZE_FORM:
      return {
        ...state,
        values: action.values
      }
    case CLEAR_FORM:
      return {
        ...state,
        values: {}
      }
    case CHANGE_FORM_VALUE:
      return {
        ...state,
        values: { ...state.values, [action.key]: action.value }
      }
    case DELETE_FORM_VALUE:
      let newValuesData = { ...state.values }
      if(newValuesData[action.key]){
        delete newValuesData[action.key]
      }
      return {
        ...state,
        values: newValuesData
      }
    case ADD_FORM_VALUES:
      let newErrors = { ...state.errors }
      if (newErrors && action.values && Object.keys(action.values).length > 0) {
        Object.keys(action.values).forEach(element => {      
          if (newErrors[element] && newErrors[element].type == "required" && action.values[element] && (action.values[element] != null || action.values[element] != undefined || action.values[element] != '')) {
            delete newErrors[element]
          }
        });
      }
      let newFormValues = { ...action.values }
      if (newFormValues && Object.keys(newFormValues).length > 0) {
        Object.keys(action.values).forEach(element => {
          if (action.values[element] == null || action.values[element] == undefined || action.values[element] == '') {
            delete newFormValues[element]
          }
        });

      }
      return {
        ...state,
        values: { ...state.values, ...newFormValues },
        errors: newErrors
      }
    case ADD_FORM_ERRORS:
      let newValues = { ...state.values }
      if (newValues && action.errors && Object.keys(action.errors).length > 0) {
        Object.keys(action.errors).forEach(element => {
          if (newValues[element]) {
            delete newValues[element]
          }
        });
      }
      return {
        ...state,
        errors: { ...state.errors, ...action.errors },
        values: newValues
      }
    default:
      return state
  }
}
