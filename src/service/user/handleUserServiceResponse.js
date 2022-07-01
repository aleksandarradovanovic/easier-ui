import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { addToAppStore, openModal } from "../../actions";
import { addErrorsToGlobalForm } from "../../actions/globalFormActions";
import { modalIDs } from "../../constants/environment";
import { applicationStore } from "../../constants/storeConstants";

export const handleSuccessRegisterResponse = () => {
    const history = useHistory();
    const handleResponse = (response) => {
        history.push('/successRegister')
    }

    return handleResponse

}
export const handleErrorRegisterResponse = () => {
    const dispatch = useDispatch();
    const handleResponse = (response) => {
        let message = ""
        if (response && response.errors && response.errors.length > 0) {
            response.errors.forEach((element, index) => {
                message += element.PropertyName + ": " + element.ErrorMessage
                if (index != response.errors.length - 1) {
                    message += ", "
                }
            });
        }
        console.log(response, 'response');
        if (message && message != "") {
            dispatch(addErrorsToGlobalForm(
                { username: "Error" }
            ))
            dispatch(addToAppStore(applicationStore.ERROR_MESSAGE, message));
            dispatch(openModal(modalIDs.ERROR));
        }
    }
    return handleResponse
}