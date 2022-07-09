import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Translate } from 'react-redux-i18n';
import { applicationStore } from '../../../../constants/storeConstants';
import { getFromAppStore } from '../../../../util/exportUtil';
import { Avatar } from 'primereact/avatar';
import { AvatarGroup } from 'primereact/avatargroup';
import { Button } from 'primereact/button';
import { useHandleCallPlaceService } from './handlePlaceServices';
import { useHistory } from 'react-router';
import { useHandleCallEventService } from '../../event/handleEventServices';

export const MyPlaceOverviewAvatar = (props) => {
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
    const getImageAvatar = () => {
        let avatarData = []
        if (selectedPlace && selectedPlace.imagesCount > 0 && selectedPlace.imagesDtos && selectedPlace.imagesDtos.length > 0) {
            avatarData = selectedPlace.imagesDtos.map((x, index) => {
                if (index < 3) {
                    return <Avatar image={x.image} size="xlarge" key={x.id} />
                }
            })
        }
        return <AvatarGroup>
            {avatarData}
            {
                selectedPlace && selectedPlace.imagesCount > 3 && <Avatar label={"+" + (selectedPlace.imagesCount - 3)} size="xlarge" />
            }

        </AvatarGroup>
    }
    const getSeatTablesAvatar = () => {
        let avatarData = []
        if (selectedPlace && selectedPlace.seatTablesCount > 0 && selectedPlace.seatTableDtos && selectedPlace.seatTableDtos.length > 0) {
            avatarData = selectedPlace.seatTableDtos.map((x, index) => {
                if (index < 3) {
                    return <Avatar icon="pi pi-ticket" size="xlarge" shape="circle" key={x.id} />

                }
            })
        }
        return <AvatarGroup>
            {avatarData}
            {
                selectedPlace && selectedPlace.seatTablesCount > 3 && <Avatar label={"+" + (selectedPlace.seatTablesCount - 3)} size="xlarge" />
            }

        </AvatarGroup>
    }
    const getStaffAvatar = () => {
        let avatarData = []
        if (selectedPlace && selectedPlace.staffCount > 0) {
            for (let i = 0; i < selectedPlace.staffCount; i++) {
                avatarData.push(
                    <Avatar icon="pi pi-user" size="xlarge" shape="circle" key={i} />
                )
            }
        }
        return <AvatarGroup>
            {avatarData}
            {
                selectedPlace && selectedPlace.staffCount > 3 && <Avatar label={"+" + (selectedPlace.staffCount - 3)} size="xlarge" />
            }

        </AvatarGroup>
    }

    const getEventsAvatar = () => {
        let avatarData = []
        if (selectedPlace && selectedPlace.eventsCount > 0 && selectedPlace.eventsDto && selectedPlace.eventsDto.length > 0) {
            avatarData = selectedPlace.eventsDto.map((x, index) => {
                if (index < 3) {
                    return <Avatar image={process.env.PUBLIC_URL + "/eventPlaceholder2.jpg"} size="xlarge" shape="circle" key={x.id} />

                }
            })
        }
        return <AvatarGroup>
            {avatarData}
            {
                selectedPlace && selectedPlace.eventsCount > 3 && <Avatar label={"+" + (selectedPlace.eventsCount - 3)} size="xlarge" />
            }

        </AvatarGroup>
    }
    return (
        <div className='col-12 sm:col-12 lg:col-4 md:col-4 xl:col-4'>
            <div className='grid'>
                <div className='col-12'>
                    <h5>
                        <Translate value="label.images" />
                        <Button icon="pi pi-eye" className="p-button-rounded p-button-info edit-place-button" onClick={() => { getPlaceImages() }} />
                        <Button icon="pi pi-pencil" className="p-button-rounded p-button-success edit-place-button" onClick={() => { getPlaceImages(true) }} />
                    </h5>
                    <div>
                        {getImageAvatar()}
                    </div>
                </div>
                <div className='col-12'>
                    <h5>
                        <Translate value="label.seatTables" />
                        <Button icon="pi pi-eye" className="p-button-rounded p-button-info edit-place-button" onClick={() => { getPlaceSeatTables() }} />
                        <Button icon="pi pi-pencil" className="p-button-rounded p-button-success edit-place-button" onClick={() => { getPlaceSeatTables(true) }} />

                    </h5>
                    <div>
                        {getSeatTablesAvatar()}

                    </div>
                </div>
                <div className='col-12'>
                    <h5>
                        <Translate value="label.staff" />
                        <Button icon="pi pi-eye" className="p-button-rounded p-button-info edit-place-button" onClick={() => { getPlaceStaff() }} />
                        <Button icon="pi pi-pencil" className="p-button-rounded p-button-success edit-place-button" onClick={() => { getPlaceStaff(true) }} />

                    </h5>
                    <div>
                        {getStaffAvatar()}

                    </div>
                </div>
                <div className='col-12'>
                    <h5>
                        <Translate value="label.events" />
                        <Button icon="pi pi-eye" className="p-button-rounded p-button-info edit-place-button" onClick={() => { getPlaceEvents() }} />
                        <Button icon="pi pi-plus" className="p-button-rounded p-button-success edit-place-button" onClick={() => { history.push('/createPlaceEvent') }} />

                    </h5>
                    <div>
                        {getEventsAvatar()}

                    </div>
                </div>
            </div>
        </div>

    )
}
export default MyPlaceOverviewAvatar
