import React from 'react';
import { Translate } from 'react-redux-i18n';
import { Avatar } from 'primereact/avatar';
import { AvatarGroup } from 'primereact/avatargroup';
import { Button } from 'primereact/button';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { getFromAppStore } from '../../../util/exportUtil';
import { applicationStore } from '../../../constants/storeConstants';
import MyPlaceWrapper from '../place/myPlace/MyPlaceWrapper';
import { useHandleCallEventService } from './handleEventServices';

export const EventOverview = (props) => {

    const history = useHistory();
    const selectedEvent = useSelector((state) => getFromAppStore(state, applicationStore.EVENT_DATA))
    const handleCallEventService = useHandleCallEventService()
    let name = ""
    if (selectedEvent && selectedEvent.name) {
        name = " - " + selectedEvent.name
    }
    const getEventImages = (edit) => {
        handleCallEventService.handleGetEventImagesService(edit)
    }
    const basicInformationsTemplate = () => {
        let basicKeys = [
            "name",
            "type",
            "description",
            "startTime",
            "endTime"
        ]
        let items = []
        items = basicKeys.map(element => {
            if (selectedEvent && selectedEvent[element]) {
                return <div className='grid placeInfo' key={element}>
                    <div className='col-4'>
                        <i className="pi pi-check-circle"></i> <Translate value={"label." + element} />
                    </div>
                    <div className='col-8'>
                        {selectedEvent[element]}
                    </div>
                </div>

            }
        });
        return items;
    }

    return (
        <MyPlaceWrapper>
            <div className='card'>
                <h4>
                    <Translate value="label.eventData" /> {name}
                </h4>
                <div className='grid'>
                    <div className='col-6'>
                        <div className='grid'>
                            <div className='col-12'>
                                <h5>
                                    <Translate value="label.basicInformations" />
                                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-success edit-place-button" onClick={() => editBasicInformation()} />

                                </h5>
                                <div>{basicInformationsTemplate()}</div>
                            </div>
                        </div>
                    </div>
                    <div className='col-2'>

                    </div>
                    <div className='col-4'>
                        <div className='grid'>
                            <div className='col-12'>
                                <h5>
                                    <Translate value="label.images" />
                                    <Button icon="pi pi-eye" className="p-button-rounded p-button-info edit-place-button" onClick={() => { getEventImages() }} />
                                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-success edit-place-button" onClick={() => { getPlaceImages(true) }} />
                                </h5>
                                <div>
                                    <AvatarGroup>
                                        <Avatar image={process.env.PUBLIC_URL + "/barPlaceholder1.jpg"} size="xlarge" />
                                        <Avatar image={process.env.PUBLIC_URL + "/barPlaceholder2.jpg"} size="xlarge" />
                                        <Avatar image={process.env.PUBLIC_URL + "/barPlaceholder.jpg"} size="xlarge" />
                                        <Avatar label="+2" size="xlarge" />
                                    </AvatarGroup>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>




            </div>
        </MyPlaceWrapper>

    )
}
export default EventOverview
