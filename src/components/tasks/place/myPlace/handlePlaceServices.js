import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { addToAppStore, openModal } from "../../../../actions";
import { modalIDs } from "../../../../constants/environment";
import { ServiceRequestData } from "../../../../constants/service";
import { applicationStore } from "../../../../constants/storeConstants";
import { handleSuccessGetMyPlaceResponse, handleSuccessGetPlaceImagesResponse, handleSuccessGetPlaceSeatTablesResponse, handleSuccessGetPlaceStaffResponse } from "../../../../service/place/handlePlaceServiceResponse";
import PlaceService from "../../../../service/place/PlaceService";
import { useCreateServiceWrapper } from "../../../../service/serviceWrapper";
import { getFromAppStore } from "../../../../util/exportUtil";
import moment from "moment"
import { formFields } from "../../../../constants/form";
import { getGlobalFormValues } from "../../../../util/globalFormUtil";


export const useHandleCallPlaceService = () => {
    const selectedPlace = useSelector((state) => getFromAppStore(state, applicationStore.PLACE_DATA))
    const selectedImages = useSelector((state) => getFromAppStore(state, applicationStore.SELECTED_IMAGES))
    const selectedSeatTables = useSelector((state) => getFromAppStore(state, applicationStore.SELECTED_SEAT_TABLE))
    const formValues = useSelector((state) => getGlobalFormValues(state))

    const history = useHistory();
    const dispatch = useDispatch()
    const serviceCall = useCreateServiceWrapper();
    const useHandleSuccessGetPlaceImagesResponse = handleSuccessGetPlaceImagesResponse()
    const useHandleSuccessGetPlaceSeatTablesResponse = handleSuccessGetPlaceSeatTablesResponse()
    const usehandleSuccessGetPlaceStaffResponse = handleSuccessGetPlaceStaffResponse()
    const useHandleGetMyPlaceSuccessResponse = handleSuccessGetMyPlaceResponse()


    const handleCallCreatePlacesService = () => {
        let seatTablesData = []
        if (selectedSeatTables && selectedSeatTables.length > 0) {
            seatTablesData = selectedSeatTables.map(function (x) {
                return {
                    type: x.type,
                    number: x.id
                }
            })
        }
        let placeObject = {
            name: formValues[formFields.PLACE_NAME],
            type: formValues[formFields.PLACE_TYPE],
            description: formValues[formFields.PLACE_DESC],
            startWorkingTime: moment(formValues[formFields.PLACE_WORKING_TIME_FROM]).format("hh:mm"),
            endWorkingTime: moment(formValues[formFields.PLACE_WORKING_TIME_TO]).format("hh:mm"),
            locationDto: {
                country: formValues[formFields.PLACE_LOCATION_COUNTRY],
                city: formValues[formFields.PLACE_LOCATION_CITY],
                streetAndNumber: formValues[formFields.PLACE_LOCATION_STREET_NUMBER],
                latitude: parseFloat(formValues[formFields.PLACE_LOCATION_LAT]),
                longitude: parseFloat(formValues[formFields.PLACE_LOCATION_LONG]),
            },
            seatTableDtos: seatTablesData,
            imagesDtos: selectedImages

        }
        serviceCall(new ServiceRequestData(
            PlaceService.createPlace,
            placeObject,
            null,
            null,
            () => {
                history.push('/successCreatedPlace')
            },
            null
        ))
    }
    const handleCallMyPlacesService = (additionalOnSuccess, additionalOnError) => {
        serviceCall(new ServiceRequestData(
            PlaceService.getMyPlaces,
            null,
            null,
            null,
            (data) => {
                if (additionalOnSuccess) {
                    additionalOnSuccess(data)
                }
            },
            null
        ))
    }
    const handleCallGetPlaceService = (id) => {
        let requestData = {
            id: id
        }
        serviceCall(new ServiceRequestData(
            PlaceService.getPlace,
            requestData,
            useHandleGetMyPlaceSuccessResponse,
            null,
            () => {
                history.push('/myPlace')
            },
            null
        ))
    }
    const handleCallUpdatePlaceService = (requestObject, additionalOnSuccess, additionalOnError) => {
        let requestData = {
            placeId: selectedPlace.id,
            data: requestObject
        }
        serviceCall(new ServiceRequestData(
            PlaceService.updatePlace,
            requestData,
            null,
            null,
            (data) => {
                if (additionalOnSuccess) {
                    additionalOnSuccess(data)
                }
            },
            null
        ))
    }
    const handleCallDeletePlaceService = (id, additionalOnSuccess, additionalOnError) => {
        let requestData = {
            placeId: id
        }
        serviceCall(new ServiceRequestData(
            PlaceService.deletePlace,
            requestData,
            null,
            null,
            (data) => {
                if (additionalOnSuccess) {
                    additionalOnSuccess(data)
                }
            },
            null
        ))
    }
    const handleCallPlaceImagesService = (isEdit) => {
        let requestData = {
            placeId: selectedPlace.id
        }
        serviceCall(new ServiceRequestData(
            PlaceService.getPlaceImages,
            requestData,
            useHandleSuccessGetPlaceImagesResponse,
            null,
            () => {
                if (isEdit) {
                    history.push('/myPlaceImagesEdit')

                } else {
                    history.push('/myPlaceImages')
                }
            },
            null
        ))
    }
    const handleCallPlaceSeatTableService = (isEdit) => {
        let requestData = {
            placeId: selectedPlace.id
        }
        serviceCall(new ServiceRequestData(
            PlaceService.getPlaceSeatTable,
            requestData,
            useHandleSuccessGetPlaceSeatTablesResponse,
            null,
            () => {
                if (isEdit) {
                    history.push('/myPlaceSeatTablesEdit')
                } else {
                    history.push('/myPlaceSeatTables')
                }
            },
            null
        ))
    }
    const handleCallPlaceStaffService = (isEdit) => {
        let requestData = {
            placeId: selectedPlace.id
        }
        serviceCall(new ServiceRequestData(
            PlaceService.getPlaceStaff,
            requestData,
            usehandleSuccessGetPlaceStaffResponse,
            null,
            () => {
                if (isEdit) {
                    history.push('/myPlaceStaffEdit')
                } else {
                    history.push('/myPlaceStaff')
                }
            },
            null
        ))
    }

    const requests = {
        handleCreatePlacesService: handleCallCreatePlacesService,
        handleGetImagesRequest: handleCallPlaceImagesService,
        handleGetMyPlacesService: handleCallMyPlacesService,
        handleGetPlaceService: handleCallGetPlaceService,
        handleGetPlaceSeatTableService: handleCallPlaceSeatTableService,
        handleDeletePlaceService: handleCallDeletePlaceService,
        handleUpdatePlaceService: handleCallUpdatePlaceService,
        handleGetPlaceStaffService: handleCallPlaceStaffService,
    }
    return requests

}
