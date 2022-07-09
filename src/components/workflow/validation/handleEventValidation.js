import { useSelector } from "react-redux"
import { formFields } from "../../../constants/form"
import { applicationStore } from "../../../constants/storeConstants"
import { getFromAppStore } from "../../../util/exportUtil"
import { getGlobalFormValues } from "../../../util/globalFormUtil"

export const useHandleCreateEventValidation = () => {
    const formValues = useSelector((state) => getGlobalFormValues(state))
    const selectedImages = useSelector((state) => getFromAppStore(state, applicationStore.SELECTED_EVENT_IMAGES))
    const selectedEventMap = useSelector((state) => getFromAppStore(state, applicationStore.SELECTED_EVENT_MAP))
    const reservationTypes = useSelector((state) => getFromAppStore(state, applicationStore.SELECTED_RESERVATION_TYPE))

    const handleBasicInformationValidation = () => {
        if (formValues &&
            formValues[formFields.EVENT_NAME] &&
            formValues[formFields.EVENT_TYPE] &&
            formValues[formFields.EVENT_DESC] &&
            formValues[formFields.EVENT_TIME_FROM] &&
            formValues[formFields.EVENT_TIME_TO]
        ) {
            return true
        }
        return false
    }

    const handleImageValidation = () => {
        if (selectedImages && selectedImages.length > 0
        ) {
            return true
        }
        return false
    }
    // const handleManageSeatTableValidation = () => {
    //     if (selectedSeatTables && selectedSeatTables.length > 0
    //     ) {
    //         return true
    //     }
    //     return false
    // }
    const handleManageReservationTypeValidation = () => {
        if (reservationTypes && reservationTypes.length > 0
        ) {
            return true
        }
        return false
    }
    return {
        isBasicInformationValid: handleBasicInformationValidation,
        isImageValid: handleImageValidation,
        isReservationTypeValid: handleManageReservationTypeValidation,
    }
}
