
import { CLOSE_MODAL, OPEN_MODAL } from '../actions/index'
export default (state = { activeModals: [] }, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      if (state.activeModals.indexOf(action.modalID) !== -1) {
        return state
      }
      if (state.activeModals.length === 3) {
        throw new Error('Maximum number of opened modals can not be more then 3')
      }
      const newArr = state.activeModals.slice()
      newArr.push(action.modalID)
      return {
        activeModals: newArr
      }
    case CLOSE_MODAL:
      if (!action.modalID) {
        return { activeModals: [] }
      } else {
        return {
          activeModals: state.activeModals.filter(modalID => modalID !== action.modalID)
        }
      }

    default:
      return state
  }
}
