import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { applicationStore } from '../../../../constants/storeConstants';
import { getFromAppStore } from '../../../../util/exportUtil';
import MyPlaceWrapper from './MyPlaceWrapper';
import { Translate } from 'react-redux-i18n';
import { Button } from 'primereact/button';
import { useHandleCallPlaceService } from './handlePlaceServices';
import { clearForm, initializeForm } from '../../../../actions/globalFormActions';
import { formFields } from '../../../../constants/form';
import moment from "moment";
import { getGlobalFormValues } from '../../../../util/globalFormUtil';
import PlaceLocationPicker from '../PlaceLocationPicker';

export const MyPlaceLocationEdit = (props) => {
    const selectedPlace = useSelector((state) => getFromAppStore(state, applicationStore.PLACE_DATA))
    const formValues = useSelector((state) => getGlobalFormValues(state))
    const dispatch = useDispatch();
    const handleCallPlaceService = useHandleCallPlaceService()
    useEffect(() => {
        let locationData = selectedPlace.locationDto
        let data = {
            [formFields.PLACE_LOCATION_COUNTRY]: locationData.country,
            [formFields.PLACE_LOCATION_CITY]: locationData.city,
            [formFields.PLACE_LOCATION_STREET_NUMBER]: locationData.streetAndNumber,
            [formFields.PLACE_LOCATION_LAT]: locationData.latitude,
            [formFields.PLACE_LOCATION_LONG]: locationData.longitude,
        }
        dispatch(initializeForm(data))
        return () => {
            dispatch(clearForm())
        };
    }, [])
    const updatePlace = () => {
        let formValuesData = {
                country: formValues[formFields.PLACE_LOCATION_COUNTRY], 
                city: formValues[formFields.PLACE_LOCATION_CITY], 
                streetAndNumber: formValues[formFields.PLACE_LOCATION_STREET_NUMBER], 
                latitude: parseFloat(formValues[formFields.PLACE_LOCATION_LAT]), 
                longitude: parseFloat(formValues[formFields.PLACE_LOCATION_LONG]), 
        }
        let requestObject = { ...selectedPlace, locationDto: formValuesData }
        handleCallPlaceService.handleUpdatePlaceService(requestObject)
    }
    return (
        <MyPlaceWrapper>
            <div className="card">
                <div className='grid'>
                    <div className='col-12'>
                        <h5>
                            <Translate value="label.location" />
                            <Button icon="pi pi-save" className="p-button-rounded edit-place-button" onClick={() => { updatePlace() }} />
                        </h5>
                        <PlaceLocationPicker />
                    </div>

                </div>
            </div>

        </MyPlaceWrapper>

    )
}
export default MyPlaceLocationEdit
