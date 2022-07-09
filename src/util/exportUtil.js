export const isMainFormValid = (store) => {
  const mapErrors = store.mbNavigationReducer.mapErrors // it's in format : {stepID:mapOfErrors}
  for (let stepId in mapErrors) {
    const step = store.mbNavigationReducer.stepsList.searchStep(stepId)
    if (step.value.hidden !== true && mapErrors.hasOwnProperty(stepId) && mapErrors[stepId] && mapErrors[stepId].size !== 0) {
      return false
    }
  }
  return true
}

/**
 * Will return map of errors for specific step
 * @param store application store
 * @param stepID step id
 * @returns {Map} map of errors
 */
export const getStepErrors = (store, stepID) => {
  const mapErrors = store.mbNavigationReducer.mapErrors // it's in format : {stepID:mapOfErrors}
  return mapErrors ? mapErrors[stepID] : new Map()
}

/**
 * Check validity of field
 * @param store app store
 * @param fieldName field to check
 * @param formName if available it will get field from specific form, else it will take from main 'navigation' form
 * @returns {String} description error for selected field if available error
 */
export const getFieldError = (store, fieldName, formName) => {
  if (!formName) {
    const mapErrors = store.mbNavigationReducer.mapErrors // it's in format : {stepID:mapOfErrors}
    for (var property in mapErrors) {
      if (mapErrors[property]) {
        const errorDescription = mapErrors[property].get(fieldName)
        if (errorDescription) {
          return errorDescription
        }
      }
    }
  } else {
    if (store.mbFormReducer[formName] && store.mbFormReducer[formName].mapErrors) {
      return store.mbFormReducer[formName].mapErrors.get(fieldName)
    }
  }
  return null
}
export const getFieldWarning = (store, fieldName, formName) => {
  if (!formName) {
    const mapWarnings = store.mbNavigationReducer.mapWarnings // it's in format : {stepID:mapOfErrors}
    for (var property in mapWarnings) {
      if (mapWarnings[property]) {
        const errorDescription = mapWarnings[property].get(fieldName)
        if (errorDescription) {
          return errorDescription
        }
      }
    }
  } else {
    if (store.mbFormReducer[formName] && store.mbFormReducer[formName].mapWarnings) {
      return store.mbFormReducer[formName].mapWarnings.get(fieldName)
    }
  }
  return null
}
export const getFromAppStore = (store, key) => {
  return store.applicationReducer ? store.applicationReducer.map.get(key) : null
}
export const getFromGlobalStore = (store, key) => {
  return store.globalReducer ? store.globalReducer.map.get(key) : null
}

export const getActiveStepID = (store) => {
  return store.mbNavigationReducer ? store.mbNavigationReducer.activeStepID : null
}

export const createMapErrors = (errors, validationMode) => {
  const mapErrors = new Map()
  for (var property in { ...errors }) {
    if (errors && errors[property]) {
      if (validationMode == "Restrict") {
        mapErrors.set(property, errors[property].message)

      } else if (validationMode == "Hard" && errors[property].type != "required") {
        mapErrors.set(property, errors[property].message)
      }
    }
  }
  return mapErrors
}
