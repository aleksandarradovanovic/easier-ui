import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { applicationStore } from '../../../../constants/storeConstants';
import { getFromAppStore } from '../../../../util/exportUtil';
import MyPlaceWrapper from './MyPlaceWrapper';
import { Image } from 'primereact/image';
import { Translate } from 'react-redux-i18n';
import { Button } from 'primereact/button';
import { useHandleCallPlaceService } from './handlePlaceServices';

export const MyPlaceImages = (props) => {
    const placeImages = useSelector((state) => getFromAppStore(state, applicationStore.PLACE_IMAGES))
    const handleCallPlaceService = useHandleCallPlaceService()

    useEffect(() => {
    }, [])
    const editPlaceImages = () => {
        handleCallPlaceService.handleGetImagesRequest(true)
    }
    const uploadedItems = () => {
        let items = []
        if (placeImages && placeImages.length > 0) {
            items = placeImages.map(element => {
                return (
                    <div className="col-4" key={element.name} style={{ marginTop: '2%', border: "1px solid #ccc", padding: "2%", textAlign: 'center' }}>
                        <Image src={element.image} alt={element.name} height={100} width={"auto"} preview />
                    </div>
                )
            });
        } else {
            items = <div className="flex align-items-center flex-column">
                <i className="pi pi-image mt-3 p-5" style={{ 'fontSize': '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <span style={{ 'fontSize': '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">No uploaded images</span>
            </div>
        }
        return items
    }
    return (
        <MyPlaceWrapper>
            <div className="card">
                <div className='grid'>
                    <div className='col-12'>

                        <h5>
                            <Translate value="label.images" />
                            <Button icon="pi pi-pencil" className="p-button-rounded p-button-success edit-place-button" onClick={() => editPlaceImages()} />
                        </h5>
                        <div className='grid'>
                            {uploadedItems()}
                        </div>
                    </div>

                </div>
            </div>

        </MyPlaceWrapper>

    )
}
export default MyPlaceImages
