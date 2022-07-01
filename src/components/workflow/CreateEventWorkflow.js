import React from 'react';
import NavigationComponent from '../primeCustomComponents/navigation/NavigationComponent';
import EventInformation from '../tasks/event/EventInformation';
import UploadEventImages from '../tasks/event/UploadEventImages';
import { useHandleCallEventService } from '../tasks/event/handleEventServices';
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
