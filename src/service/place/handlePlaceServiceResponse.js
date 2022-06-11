import { useDispatch } from "react-redux";
import { addToAppStore } from "../../actions";
import { applicationStore } from "../../constants/storeConstants";

export const handleSuccessGetMyPlaceResponse = () => {
    const dispatch = useDispatch();

    const handleResponse = (response) => {
        if (response) {
            dispatch(addToAppStore(applicationStore.PLACE_DATA, response))
        }
    }

    return handleResponse

}
export const handleSuccessGetPlaceImagesResponse = () => {
    const dispatch = useDispatch();
    const handleResponse = (response) => {
        if (response && response.items) {
            dispatch(addToAppStore(applicationStore.PLACE_IMAGES, response.items))
            dispatch(addToAppStore(applicationStore.SELECTED_IMAGES, response.items))
        }
    }

    return handleResponse

}
export const handleSuccessGetPlaceSeatTablesResponse = () => {
    const dispatch = useDispatch();
    const handleResponse = (response) => {
        if (response && response.items) {
            dispatch(addToAppStore(applicationStore.PLACE_SEAT_TABLE, response.items))
            let seatTablesTableData = []
            if(response.items && response.items.length > 0){
                seatTablesTableData = response.items.map(function(x){
                    return {
                        type: x.type,
                        id: x.number
                    }
                })
            }
            dispatch(addToAppStore(applicationStore.SELECTED_SEAT_TABLE, seatTablesTableData))

        }
    }

    return handleResponse

}
export const handleSuccessGetPlaceStaffResponse = () => {
    const dispatch = useDispatch();
    const handleResponse = (response) => {
        if (response && response.items) {
            dispatch(addToAppStore(applicationStore.PLACE_STAFF, response.items))
        }
    }

    return handleResponse

}