import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { applicationStore } from '../../../constants/storeConstants';
import { getFromAppStore } from '../../../util/exportUtil';
import { Translate } from 'react-redux-i18n';
import { Button } from 'primereact/button';
import { removeFromAppStore } from '../../../actions';
import UploadEventImages from './UploadEventImages';
import MyPlaceWrapper from '../place/myPlace/MyPlaceWrapper';
import { useHandleCallEventService } from './handleEventServices';

export const EventImagesEdit = (props) => {
    const selectedImages = useSelector((state) => getFromAppStore(state, applicationStore.SELECTED_EVENT_IMAGES))
    const selectedEvent = useSelector((state) => getFromAppStore(state, applicationStore.EVENT_DATA))
    const handleCallEventService = useHandleCallEventService()

    const dispatch = useDispatch();
    useEffect(() => {
        return () => {
            dispatch(removeFromAppStore(applicationStore.SELECTED_EVENT_IMAGES))
        };
      }, [])
    const updateEvent = () => {
        debugger
        let requestObject = {...selectedEvent, imagesDtos: selectedImages}
        handleCallEventService.handleUpdateEventService(requestObject)
    }
    return (
        <MyPlaceWrapper>
            <div className="card">
                <div className='grid'>
                    <div className='col-12'>

                        <h5>
                            <Translate value="label.images" />
                            <Button icon="pi pi-save" className="p-button-rounded edit-place-button" onClick={() => { updateEvent() }} />
                        </h5>
                        <UploadEventImages />
                    </div>

                </div>
            </div>

        </MyPlaceWrapper>

    )
}
export default EventImagesEdit
