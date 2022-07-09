import React from 'react';
import NavigationComponent from '../primeCustomComponents/navigation/NavigationComponent';
import EventInformation from '../tasks/event/EventInformation';
import UploadEventImages from '../tasks/event/UploadEventImages';
import { useHandleCallEventService } from '../tasks/event/handleEventServices';
import CreateReservationTypes from '../tasks/event/CreateReservationTypes';
import ManageSeatTables from '../tasks/event/ManageSeatTables';
import { useHandleCreateEventValidation } from './validation/handleEventValidation';
export const CreateEventWorkflow = (props) => {
    const handleGetEventService = useHandleCallEventService()
    const handleCreateEventValidation = useHandleCreateEventValidation()
    let items = [
        {
            label: "Event information",
            icon: "pi pi-cog",
            component: <EventInformation />,
            isValid: handleCreateEventValidation.isBasicInformationValid()
        },
        {
            label: "Images",
            icon: "pi pi-images",
            component: <UploadEventImages />,
            isValid: handleCreateEventValidation.isImageValid()

        },
        {
            label: "Reservation Types",
            icon: "pi pi-images",
            component: <CreateReservationTypes />,
            isValid: handleCreateEventValidation.isReservationTypeValid()

        },
        {
            label: "Manage seat/tables",
            icon: "pi pi-th-large",
            component: <ManageSeatTables />
        }
    ]
    const onSaveEvent = () => {
        handleGetEventService.handleCreateEventService()
    }
    return (
        <NavigationComponent items={items} onSave={() => onSaveEvent()} />
    )
}
export default CreateEventWorkflow
