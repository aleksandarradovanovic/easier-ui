import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { addToAppStore, openModal } from "../../../actions";
import { modalIDs } from "../../../constants/environment";
import { ServiceRequestData } from "../../../constants/service";
import { applicationStore } from "../../../constants/storeConstants";
import { useCreateServiceWrapper } from "../../../service/serviceWrapper";
import { getFromAppStore } from "../../../util/exportUtil";
import { formFields } from "../../../constants/form";
import { getGlobalFormValues } from "../../../util/globalFormUtil";
import EventService from "../../../service/event/EventService";
import { handleSuccessGetEventImagesResponse, handleSuccessGetEventResponse, handleSuccessSearchEventResponse } from "../../../service/event/handleEventServiceResponse";


export const useHandleCallEventService = () => {
    const selectedImages = useSelector((state) => getFromAppStore(state, applicationStore.SELECTED_EVENT_IMAGES))
    const selectedEvent = useSelector((state) => getFromAppStore(state, applicationStore.EVENT_DATA))

    const formValues = useSelector((state) => getGlobalFormValues(state))

    const history = useHistory();
    const dispatch = useDispatch()
    const serviceCall = useCreateServiceWrapper();
    const useHandleSuccessSearchEventResponse = handleSuccessSearchEventResponse()
    const useHandleSuccessGetEventResponse = handleSuccessGetEventResponse()
    const useHandleSuccessGetEventImagesResponse = handleSuccessGetEventImagesResponse()


    const handleCallCreateEventService = () => {
        let eventObject = {
            name: formValues[formFields.EVENT_NAME],
            type: formValues[formFields.EVENT_TYPE],
            description: formValues[formFields.EVENT_DESC],
            startTime: formValues[formFields.EVENT_TIME_FROM],
            endTime: formValues[formFields.EVENT_TIME_TO],
            imagesDtos: selectedImages,
            placeId: formValues[formFields.EVENT_PLACE_NAME]

        }
        serviceCall(new ServiceRequestData(
            EventService.createEvent,
            eventObject,
            null,
            null,
            () => {
                dispatch(addToAppStore(applicationStore.MESSAGE_MODAL_MESSAGE, 'message.Event created'));
                dispatch(openModal(modalIDs.MESSAGE_MODAL));
            },
            null
        ))
    }
    const handleCallSearchEventService = (requestData, additionalOnSucess) => {
        serviceCall(new ServiceRequestData(
            EventService.searchEvent,
            requestData,
            useHandleSuccessSearchEventResponse,
            null,
            ()=>{
                if(additionalOnSucess){
                    additionalOnSucess()
                }
            },
            null
        ))
    }
    const handleCallGetEventService = (id) => {
        let requestData = {
            id: id
        }
        serviceCall(new ServiceRequestData(
            EventService.getEvent,
            requestData,
            useHandleSuccessGetEventResponse,
            null,
            () => {
                history.push('/eventOverview')
            },
            null
        ))
    }
    const handleCallGetEventImagesService = (isEdit) => {
        let requestData = {
            eventId: selectedEvent.id
        }
        serviceCall(new ServiceRequestData(
            EventService.getEventImages,
            requestData,
            useHandleSuccessGetEventImagesResponse,
            null,
            () => {
                if (isEdit) {
                    history.push('/eventImagesEdit')

                } else {
                    history.push('/eventImages')
                }
            },
            null
        ))
    }

    const requests = {
        handleCreateEventService: handleCallCreateEventService,
        handleSearchEventService: handleCallSearchEventService,
        handleGetEventService: handleCallGetEventService,
        handleGetEventImagesService: handleCallGetEventImagesService,
    }
    return requests

}
