import { useDispatch } from "react-redux";
import { ON_ERROR_GLOBAL, ON_ERROR_LOCAL, ON_SUCCESS_GLOBAL, ON_SUCCESS_LOCAL, REQUEST_DATA, restErrors, SERVICE } from "../constants/service";
import {applicationStore} from '../constants/storeConstants'
import {addToAppStore, openModal, closeModal} from '../actions/index'
import { modalIDs } from "../constants/environment";
export function useCreateServiceWrapper() {
  const dispatch = useDispatch();

  const handleResponse = (params) => {
    let service = params[SERVICE]
    let requestData = params[REQUEST_DATA]
    let onSuccessGlobalFunc = params[ON_SUCCESS_GLOBAL]
    let onErrorGlobalFunc = params[ON_ERROR_GLOBAL]
    let onSuccessLocalFunc = params[ON_SUCCESS_LOCAL]
    let onErrorLocalFunc = params[ON_ERROR_LOCAL]

    const onSuccess = (data) => {
      dispatch(closeModal(modalIDs.SPINNER));
      if (!onSuccessGlobalFunc && !onSuccessLocalFunc && data && data.message) {
        dispatch(addToAppStore(applicationStore.MESSAGE_MODAL_MESSAGE, data.message));
        dispatch(openModal(modalIDs.INFO));
      }
      if (data && onSuccessGlobalFunc) {
        onSuccessGlobalFunc(data);
      }
      if (onSuccessLocalFunc) {
        onSuccessLocalFunc(data)
      }
    }
    const onError = (data) => {
      dispatch(closeModal(modalIDs.SPINNER));
      if (!onErrorGlobalFunc && !onErrorLocalFunc) {
        dispatch(addToAppStore(applicationStore.ERROR_MESSAGE, 'err.' + restErrors.GENERAL_SERVER_ERROR));
        dispatch(openModal(modalIDs.ERROR));
      } else {
        if (data && onErrorGlobalFunc) {
          onErrorGlobalFunc(data);
        }
        if (onErrorLocalFunc) {
          onErrorLocalFunc(data)
        }
      }


    }

    let responseHandler = {
      onSuccess: onSuccess,
      onError: onError
    }
    dispatch(openModal(modalIDs.SPINNER));
    if (requestData) {
      service(requestData, responseHandler)
    } else {
      service(responseHandler)
    }
  }
  return handleResponse;
}