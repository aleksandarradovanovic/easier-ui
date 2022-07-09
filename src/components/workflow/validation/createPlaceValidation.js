import { useSelector } from "react-redux"
import { formFields } from "../../../constants/form"
import { applicationStore } from "../../../constants/storeConstants"
import { getFromAppStore } from "../../../util/exportUtil"
import { getGlobalFormValues } from "../../../util/globalFormUtil"

export const useHandleCreatePlaceValidation = () => {
    const formValues = useSelector((state) => getGlobalFormValues(state))
    const selectedImages = useSelector((state) => getFromAppStore(state, applicationStore.SELECTED_IMAGES))
    const selectedSeatTables = useSelector((state) => getFromAppStore(state, applicationStore.SELECTED_SEAT_TABLE))

    const handleBasicInformationValidation = () => {
        if (formValues &&
            formValues[formFields.PLACE_NAME] &&
            formValues[formFields.PLACE_TYPE] &&
            formValues[formFields.PLACE_DESC] &&
            formValues[formFields.PLACE_WORKING_TIME_FROM] &&
            formValues[formFields.PLACE_WORKING_TIME_TO]
        ) {
            return true
        }
        return false
    }
    const handleLocationValidation = () => {
        if (formValues &&
            formValues[formFields.PLACE_LOCATION_COUNTRY] &&
            formValues[formFields.PLACE_LOCATION_CITY] &&
            formValues[formFields.PLACE_LOCATION_STREET_NUMBER] &&
            formValues[formFields.PLACE_LOCATION_LAT] &&
            formValues[formFields.PLACE_LOCATION_LONG]
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
    const handleSeatTableValidation = () => {
        if (selectedSeatTables && selectedSeatTables.length > 0
        ) {
            return true
        }
        return false
    }
    return {
        isBasicInformationValid: handleBasicInformationValidation,
        isLocationValid: handleLocationValidation,
        isImageValid: handleImageValidation,
        isSeatTableValid: handleSeatTableValidation,
    }
}
