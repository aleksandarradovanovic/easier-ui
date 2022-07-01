import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { applicationStore } from '../../../constants/storeConstants';
import { getFromAppStore } from '../../../util/exportUtil';
import { Translate } from 'react-redux-i18n';
import { Button } from 'primereact/button';
import { clearForm, initializeForm } from '../../../actions/globalFormActions';
import { formFields } from '../../../constants/form';
import moment from "moment";
import { getGlobalFormValues } from '../../../util/globalFormUtil';
import EventInformation from './EventInformation';
import { useHandleCallEventService } from './handleEventServices';
import MyPlaceWrapper from '../place/myPlace/MyPlaceWrapper';
export const EventInformationEdit = (props) => {
    const selectedEvent = useSelector((state) => getFromAppStore(state, applicationStore.EVENT_DATA))
    const formValues = useSelector((state) => getGlobalFormValues(state))
    const dispatch = useDispatch();
    const handleEventService = useHandleCallEventService()
    useEffect(() => {
        let data = {
            [formFields.EVENT_NAME]: selectedEvent.name,
            [formFields.EVENT_TYPE]: selectedEvent.type,
            [formFields.EVENT_DESC]: selectedEvent.description,
            [formFields.EVENT_TIME_FROM]: moment(selectedEvent.startTime, 'HH:mm').toDate(),
            [formFields.EVENT_TIME_TO]: moment(selectedEvent.endTime, 'HH:mm').toDate(),
        }
        dispatch(initializeForm(data))
        return () => {
            dispatch(clearForm())
        };
    }, [])
    const updateEvent = () => {
        let formValuesData = {
            name: formValues[formFields.EVENT_NAME],
            type: formValues[formFields.EVENT_TYPE],
            description: formValues[formFields.EVENT_DESC],
            startTime: formValues[formFields.EVENT_TIME_FROM],
            endTime: formValues[formFields.EVENT_TIME_TO],
         }
        let requestObject = { ...selectedEvent, ...formValuesData }
        handleEventService.handleUpdateEventService(requestObject)
    }
    return (
        <MyPlaceWrapper>
            <div className="card">
                <div className='grid'>
                    <div className='col-12'>

                        <h5>
                            <Translate value="label.basicInformation" />
                            <Button icon="pi pi-save" className="p-button-rounded edit-place-button" onClick={() => { updateEvent() }} />
                        </h5>
                        <EventInformation />
                    </div>

                </div>
            </div>

        </MyPlaceWrapper>

    )
}
export default EventInformationEdit
