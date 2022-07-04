import React from 'react';
import NavigationComponent from '../primeCustomComponents/navigation/NavigationComponent';
import EventInformation from '../tasks/event/EventInformation';
import UploadEventImages from '../tasks/event/UploadEventImages';
import { useHandleCallEventService } from '../tasks/event/handleEventServices';
import CreateReservationTypes from '../tasks/event/CreateReservationTypes';
import ManageSeatTables from '../tasks/event/ManageSeatTables';
export const CreateEventWorkflow = (props) => {
    const handleGetEventService = useHandleCallEventService()

    let items = [
        {
            label: "Event information",
            icon: "pi pi-cog",
            component: <EventInformation />
        },
        {
            label: "Images",
            icon: "pi pi-images",
            component: <UploadEventImages />
        },
        {
            label: "Reservation Types",
            icon: "pi pi-images",
            component: <CreateReservationTypes />
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
