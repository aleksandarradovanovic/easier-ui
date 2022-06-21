import { useDispatch } from "react-redux";
import { addToAppStore } from "../../actions";
import { applicationStore } from "../../constants/storeConstants";

export const handleSuccessSearchEventResponse = () => {
    const dispatch = useDispatch();

    const handleResponse = (response) => {
        if (response && response.items) {
            dispatch(addToAppStore(applicationStore.FOUND_EVENTS, response.items))
        }
    }

    return handleResponse

    
}
export const handleSuccessGetEventResponse = () => {
    const dispatch = useDispatch();

    const handleResponse = (response) => {
        if (response) {
            dispatch(addToAppStore(applicationStore.EVENT_DATA, response))
        }
    }

    return handleResponse

}
export const handleSuccessGetEventImagesResponse = () => {
    const dispatch = useDispatch();
    const handleResponse = (response) => {
        if (response && response.items) {
            dispatch(addToAppStore(applicationStore.EVENT_IMAGES, response.items))
            dispatch(addToAppStore(applicationStore.SELECTED_EVENT_IMAGES, response.items))
        }
    }

    return handleResponse

}