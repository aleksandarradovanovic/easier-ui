import { useDispatch } from "react-redux";
import { addToAppStore, addToGlobalStore, openModal } from "../../actions";
import { modalIDs } from "../../constants/environment";
import { applicationStore, globalStore } from "../../constants/storeConstants";

export const handleSuccessLoginResponse = () => {

    const handleResponse = (response) => {
        if (response && response.data) {
            document.cookie = "jwt=Bearer " + response.data;
            window.location = "/"
        }
    }

    return handleResponse

}
export const handleErrorLoginResponse = () => {
    const dispatch = useDispatch();
    const handleResponse = (response) => {
        if (response && response.message) {
            dispatch(addToAppStore(applicationStore.ERROR_MESSAGE, 'err.' + response.message));
            dispatch(openModal(modalIDs.ERROR));
        }
    }
    return handleResponse
}

export const handleGetUserDataFromJwt = () => {
    const dispatch = useDispatch()
    const handleResponse = (response) => {
        if (response) {
            dispatch(addToGlobalStore(globalStore.USER_DATA, response));
            dispatch(addToGlobalStore(globalStore.USER_ACTOR, response.actorName));
            dispatch(addToGlobalStore(globalStore.USER_ROLES, response.rolesDto));
        }
    }

    return handleResponse

}