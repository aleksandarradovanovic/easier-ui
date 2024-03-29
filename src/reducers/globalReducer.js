import { ADD_GLOBAL_STORE_VALUE, CLEAR_GLOBAL_STORE, REMOVE_GLOBAL_STORE_VALUE } from '../actions/index'
/**
 * generic store for all usecases
 * structure {key:string, value:object}
 * @param state
 * @param action
 * @returns {*}
 */
export default (state = { map: new Map(), counter: 0 }, action) => {
  const actionKey = action.key
  const actionValue = action.value
  const newMap = state.map
  switch (action.type) {
    case ADD_GLOBAL_STORE_VALUE:
      newMap.set(actionKey, actionValue)
      return {
        map: newMap
      }
    case REMOVE_GLOBAL_STORE_VALUE:
      newMap.delete(actionKey)
      return {
        map: newMap
      }
    case CLEAR_GLOBAL_STORE:
      newMap.clear()
      return {
        map: newMap
      }
    default:
      return state
  }
}
