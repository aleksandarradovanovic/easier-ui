import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { applicationStore } from '../../../../constants/storeConstants';
import { getFromAppStore } from '../../../../util/exportUtil';
import MyPlaceWrapper from './MyPlaceWrapper';
import { Translate } from 'react-redux-i18n';
import { Button } from 'primereact/button';
import UploadPlaceImages from '../UploadPlaceImages';
import { useHandleCallPlaceService } from './handlePlaceServices';
import { removeFromAppStore } from '../../../../actions';

export const MyPlaceImagesEdit = (props) => {
    const selectedImages = useSelector((state) => getFromAppStore(state, applicationStore.SELECTED_IMAGES))
    const selectedPlace = useSelector((state) => getFromAppStore(state, applicationStore.PLACE_DATA))
    const dispatch = useDispatch();
    const handleCallPlaceService = useHandleCallPlaceService()
    useEffect(() => {
        return () => {
            dispatch(removeFromAppStore(applicationStore.SELECTED_IMAGES))
        };
      }, [])
    const updatePlace = () => {
        let requestObject = {...selectedPlace, imagesDtos: selectedImages}
        handleCallPlaceService.handleUpdatePlaceService(requestObject)
    }
    return (
        <MyPlaceWrapper>
            <div className="card">
                <div className='grid'>
                    <div className='col-12'>

                        <h5>
                            <Translate value="label.images" />
                            <Button icon="pi pi-save" className="p-button-rounded edit-place-button" onClick={() => { updatePlace() }} />
                        </h5>
                        <UploadPlaceImages />
                    </div>

                </div>
            </div>

        </MyPlaceWrapper>

    )
}
export default MyPlaceImagesEdit
