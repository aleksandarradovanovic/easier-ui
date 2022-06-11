import { useDispatch } from "react-redux";
import { addToAppStore, openModal } from "../../actions";
import { modalIDs } from "../../constants/environment";
import { applicationStore } from "../../constants/storeConstants";

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