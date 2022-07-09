export const OPEN_MODAL = 'OPEN_MODAL'
export const openModal = (modalID) => {
  return ({
    type: OPEN_MODAL,
    modalID: modalID
  })
}

export const CLOSE_MODAL = 'CLOSE_MODAL'
export const closeModal = (modalID) => {
  return ({
    type: CLOSE_MODAL,
    modalID: modalID
  })
}

export const ADD_APP_STORE_VALUE = 'ADD_APP_STORE_VALUE'
export const addToAppStore = (key, value) => {
  return ({
    type: ADD_APP_STORE_VALUE,
    key: key,
    value: value
  })
}
export const REMOVE_APP_STORE_VALUE = 'REMOVE_APP_STORE_VALUE'
export const removeFromAppStore = (key) => {
  return ({
    type: REMOVE_APP_STORE_VALUE,
    key: key
  })
}
export const CLEAR_APP_STORE = 'CLEAR_APP_STORE'
export const clearAppStore = () => {
  return ({
    type: CLEAR_APP_STORE
  })
}
export const ADD_GLOBAL_STORE_VALUE = 'ADD_GLOBAL_STORE_VALUE'
export const addToGlobalStore = (key, value) => {
  return ({
    type: ADD_GLOBAL_STORE_VALUE,
    key: key,
    value: value
  })
}
export const REMOVE_GLOBAL_STORE_VALUE = 'REMOVE_GLOBAL_STORE_VALUE'
export const removeFromGlobalStore = (key) => {
  return ({
    type: REMOVE_GLOBAL_STORE_VALUE,
    key: key
  })
}
export const CLEAR_GLOBAL_STORE = 'CLEAR_GLOBAL_STORE'
export const clearGlobalStore = () => {
  return ({
    type: CLEAR_GLOBAL_STORE
  })
}
