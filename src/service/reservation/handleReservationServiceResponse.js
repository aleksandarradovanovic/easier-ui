import { useDispatch } from "react-redux";
import { addToAppStore } from "../../actions";
import { applicationStore } from "../../constants/storeConstants";

export const handleSuccessGetReservationResponse = () => {
    const dispatch = useDispatch();

    const handleResponse = (response) => {
        if (response) {
            dispatch(addToAppStore(applicationStore.RESERVATION_DATA, response))
        }
    }

    return handleResponse

}