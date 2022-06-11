import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { applicationStore } from '../../../../constants/storeConstants';
import { getFromAppStore } from '../../../../util/exportUtil';
import MyPlaceWrapper from './MyPlaceWrapper';
import { Translate } from 'react-redux-i18n';
import { Button } from 'primereact/button';
import { useHandleCallPlaceService } from './handlePlaceServices';
import PlaceInformation from '../PlaceInformation';
import { clearForm, initializeForm } from '../../../../actions/globalFormActions';
import { formFields } from '../../../../constants/form';
import moment from "moment";
import { getGlobalFormValues } from '../../../../util/globalFormUtil';
export const MyPlaceBasicInformationEdit = (props) => {
    const selectedPlace = useSelector((state) => getFromAppStore(state, applicationStore.PLACE_DATA))
    const formValues = useSelector((state) => getGlobalFormValues(state))
    const dispatch = useDispatch();
    const handleCallPlaceService = useHandleCallPlaceService()
    useEffect(() => {
        let data = {
            [formFields.PLACE_NAME]: selectedPlace.name,
            [formFields.PLACE_TYPE]: selectedPlace.type,
            [formFields.PLACE_DESC]: selectedPlace.description,
            [formFields.PLACE_WORKING_TIME_FROM]: moment(selectedPlace.startWorkingTime, 'HH:mm').toDate(),
            [formFields.PLACE_WORKING_TIME_TO]: moment(selectedPlace.endWorkingTime, 'HH:mm').toDate(),
        }
        dispatch(initializeForm(data))
        return () => {
            dispatch(clearForm())
        };
    }, [])
    const updatePlace = () => {
        let formValuesData = {
            name: formValues[formFields.PLACE_NAME],
            type: formValues[formFields.PLACE_TYPE],
            description: formValues[formFields.PLACE_DESC],
            startWorkingTime: moment(formValues[formFields.PLACE_WORKING_TIME_FROM]).format("hh:mm"),
            endWorkingTime: moment(formValues[formFields.PLACE_WORKING_TIME_TO]).format("hh:mm"),
        }
        let requestObject = { ...selectedPlace, ...formValuesData }
        handleCallPlaceService.handleUpdatePlaceService(requestObject)
    }
    return (
        <MyPlaceWrapper>
            <div className="card">
                <div className='grid'>
                    <div className='col-12'>

                        <h5>
                            <Translate value="label.basicInformation" />
                            <Button icon="pi pi-save" className="p-button-rounded edit-place-button" onClick={() => { updatePlace() }} />
                        </h5>
                        <PlaceInformation />
                    </div>

                </div>
            </div>

        </MyPlaceWrapper>

    )
}
export default MyPlaceBasicInformationEdit
