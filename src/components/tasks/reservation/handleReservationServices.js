import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { addToAppStore, openModal } from "../../../actions";
import { modalIDs } from "../../../constants/environment";
import { formFields } from "../../../constants/form";
import { ServiceRequestData } from "../../../constants/service";
import { applicationStore, globalStore } from "../../../constants/storeConstants";
import ReservationService from "../../../service/reservation/ReservationService";
import { useCreateServiceWrapper } from "../../../service/serviceWrapper";
import { getFromAppStore, getFromGlobalStore } from "../../../util/exportUtil";

export const useHandleCallReservationService = () => {
    const history = useHistory();
    const dispatch = useDispatch()
    const serviceCall = useCreateServiceWrapper();
    const userData = useSelector((state) => getFromGlobalStore(state, globalStore.USER_DATA))

    const handleCallCreateReservationService = (data, type, seatTables) => {
        let seatTablesArray = []
        if(seatTables && seatTables.length >0){
            seatTablesArray = seatTables.map(x=>({
                id: x
            }))
        }
        let reservationObject = {
            nameOn: data[formFields.RESERVATION_NAME_ON],
            numberOfGuests: parseInt(data[formFields.RESERVATION_NUMBER_OF_GUESTS]),
            email: data[formFields.RESERVATION_EMAIL],
            userId: userData.id,
            reservationTypeId: type.id,
            seatTableDtos: seatTablesArray
        }
        let finalObject = {
            reservations: [
                reservationObject
            ]
        }
        serviceCall(new ServiceRequestData(
            ReservationService.createReservation,
            finalObject,
            null,
            null,
            () => {
                dispatch(addToAppStore(applicationStore.MESSAGE_MODAL_MESSAGE, 'message.Reservation created'));
                dispatch(openModal(modalIDs.MESSAGE_MODAL));
            },
            null
        ))
    }
    return {
        handleCreateReservationService: handleCallCreateReservationService 
    }
}
