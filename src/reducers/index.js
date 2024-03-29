import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { i18nReducer } from 'react-redux-i18n'
import modalReducer from './modalReducer'
import applicationReducer from './applicationReducer'
import globalFormReducer from './globalFormReducer'
import globalReducer from './globalReducer'

// main reducers
export const reducers = combineReducers({
  routing: routerReducer,
  i18n: i18nReducer,
  modalReducer: modalReducer,
  applicationReducer: applicationReducer,
  globalReducer: globalReducer,
  globalFormReducer: globalFormReducer
})
