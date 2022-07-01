import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Translate } from 'react-redux-i18n';
import { applicationStore } from '../../../../constants/storeConstants';
import { getFromAppStore } from '../../../../util/exportUtil';
import MyPlaceWrapper from './MyPlaceWrapper';
import { Avatar } from 'primereact/avatar';
import { AvatarGroup } from 'primereact/avatargroup';
import { Button } from 'primereact/button';
import { useHandleCallPlaceService } from './handlePlaceServices';
import { useHistory } from 'react-router';
import { useHandleCallEventService } from '../../event/handleEventServices';

export const MyPlaceOverview = (props) => {
    const selectedPlace = useSelector((state) => getFromAppStore(state, applicationStore.PLACE_DATA))
    const handleCallPlaceService = useHandleCallPlaceService()
    const handleGetEventService = useHandleCallEventService()

    const history = useHistory();

    useEffect(() => {
    }, [])
    const getPlaceImages = (edit) => {
        handleCallPlaceService.handleGetImagesRequest(edit)
    }
    const getPlaceSeatTables = (edit) => {
        handleCallPlaceService.handleGetPlaceSeatTableService(edit)
    }
    const getPlaceStaff = (edit) => {
        handleCallPlaceService.handleGetPlaceStaffService(edit)
    }
    const editBasicInformation = () => {
        history.push('/myPlaceBasicInformationEdit')

    }
    const editLocation = () => {
        history.push('/myPlaceLocationEdit')

    }
    const getPlaceEvents = () => {
        let requestObject = {
            placeId: selectedPlace.id
        }
        handleGetEventService.handleSearchEventService(requestObject,
            () => {
                history.push('/myPlaceEvents')
            }
        )
    }
    const basicInformationsTemplate = () => {
        let basicKeys = [
            "name",
            "type",
            "description",
            "startWorkingTime",
            "endWorkingTime"
        ]
        let items = []
        items = basicKeys.map(element => {
            if (selectedPlace && selectedPlace[element]) {
                return <div className='grid placeInfo' key={element}>
                    <div className='col-4'>
                        <i className="pi pi-check-circle"></i> <Translate value={"label." + element} />
                    </div>
                    <div className='col-8'>
                        {selectedPlace[element]}
                    </div>
                </div>

            }
        });
        return items;
    }
    const locationTemplate = () => {
        let basicKeys = [
            "city",
            "country",
            "streetAndNumber",
            "latitude",
            "longitude"
        ]
        let items = []
        items = basicKeys.map(element => {
            let locationData
            if (selectedPlace.locationDto) {
                locationData = selectedPlace.locationDto
                if (locationData && locationData[element]) {
                    return <div className='grid placeInfo' key={element}>
                        <div className='col-4'>
                            <i className="pi pi-map-marker"></i> <Translate value={"label." + element} />
                        </div>
                        <div className='col-8'>
                            {locationData[element]}
                        </div>
                    </div>

                }
            }

        });
        return items;
    }
    return (
        <MyPlaceWrapper>
            <div className='card'>
                <div className='grid'>
                    <div className='col-12 sm:col-12 lg:col-6 md:col-6 xl:col-6'>
                        <div className='grid'>
                            <div className='col-12'>
                                <h5>
                                    <Translate value="label.basicInformations" />
                                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-success edit-place-button" onClick={() => editBasicInformation()} />

                                </h5>
                                <div>{basicInformationsTemplate()}</div>
                            </div>
                            <div className='col-12'>
                                <h5>
                                    <Translate value="label.location" />
                                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-success edit-place-button" onClick={() => editLocation()} />
                                </h5>
                                <div>{locationTemplate()}</div>
                            </div>
                        </div>
                    </div>
                    <div className='col-0 sm:col-0 lg:col-2 md:col-2 xl:col-2'>

                    </div>
                    <div className='col-12 sm:col-12 lg:col-4 md:col-4 xl:col-4'>
                        <div className='grid'>
                            <div className='col-12'>
                                <h5>
                                    <Translate value="label.images" />
                                    <Button icon="pi pi-eye" className="p-button-rounded p-button-info edit-place-button" onClick={() => { getPlaceImages() }} />
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
                            <div className='col-12'>
                                <h5>
                                    <Translate value="label.seatTables" />
                                    <Button icon="pi pi-eye" className="p-button-rounded p-button-info edit-place-button" onClick={() => { getPlaceSeatTables() }} />
                                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-success edit-place-button" onClick={() => { getPlaceSeatTables(true) }} />

                                </h5>
                                <div>
                                    <AvatarGroup>
                                        <Avatar icon="pi pi-ticket" size="xlarge" shape="circle" />
                                        <Avatar icon="pi pi-ticket" size="xlarge" shape="circle" />
                                        <Avatar icon="pi pi-ticket" size="xlarge" shape="circle" />
                                        <Avatar label="+2" size="xlarge" />
                                    </AvatarGroup>

                                </div>
                            </div>
                            <div className='col-12'>
                                <h5>
                                    <Translate value="label.staff" />
                                    <Button icon="pi pi-eye" className="p-button-rounded p-button-info edit-place-button" onClick={() => { getPlaceStaff() }} />
                                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-success edit-place-button" onClick={() => { getPlaceStaff(true) }} />

                                </h5>
                                <div>
                                    <AvatarGroup>
                                        <Avatar icon="pi pi-user" size="xlarge" shape="circle" />
                                        <Avatar icon="pi pi-user" size="xlarge" shape="circle" />
                                        <Avatar icon="pi pi-user" size="xlarge" shape="circle" />
                                        <Avatar label="+2" size="xlarge" />
                                    </AvatarGroup>

                                </div>
                            </div>
                            <div className='col-12'>
                                <h5>
                                    <Translate value="label.events" />
                                    <Button icon="pi pi-eye" className="p-button-rounded p-button-info edit-place-button" onClick={() => { getPlaceEvents() }} />
                                    <Button icon="pi pi-plus" className="p-button-rounded p-button-success edit-place-button" onClick={() => { history.push('/createPlaceEvent') }} />

                                </h5>
                                <div>
                                    <AvatarGroup>
                                        <Avatar image={process.env.PUBLIC_URL + "/eventPlaceholder2.jpg"} size="xlarge" shape="circle" />
                                        <Avatar image={process.env.PUBLIC_URL + "/eventPlaceholder3.jpg"} size="xlarge" shape="circle" />
                                        <Avatar image={process.env.PUBLIC_URL + "/eventPlaceholder1.jpg"} size="xlarge" shape="circle" />
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
export default MyPlaceOverview
