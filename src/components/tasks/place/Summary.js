import { objectOf } from 'prop-types';
import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Translate } from 'react-redux-i18n';
import { formFields } from '../../../constants/form';
import { applicationStore } from '../../../constants/storeConstants';
import { getFromAppStore } from '../../../util/exportUtil';
import { getGlobalFormValues } from '../../../util/globalFormUtil';

export const Summary = (props) => {
    const selectedSeatTables = useSelector((state) => getFromAppStore(state, applicationStore.SELECTED_SEAT_TABLE))
    const formValues = useSelector((state) => getGlobalFormValues(state))

    const dispatch = useDispatch()
    const basicInformationsTemplate = () => {
        let basicKeys = [
            formFields.PLACE_NAME,
            formFields.PLACE_TYPE,
            formFields.PLACE_DESC

        ]
        let items = []
        items = basicKeys.map(element => {
            if (formValues && formValues[element]) {
                return <div className='grid placeInfo' key={element}>
                    <div className='col-4'>
                        <i className="pi pi-check-circle"></i> <Translate value={"label." + element} />
                    </div>
                    <div className='col-8'>
                        {formValues[element]}
                    </div>
                </div>

            }
        });
        return items;
    }
    const locationTemplate = () => {
        let basicKeys = [
            formFields.PLACE_LOCATION_COUNTRY,
            formFields.PLACE_LOCATION_CITY,
            formFields.PLACE_LOCATION_STREET_NUMBER,
            formFields.PLACE_LOCATION_LAT,
            formFields.PLACE_LOCATION_LONG
        ]
        let items = []
        items = basicKeys.map(element => {
            if (formValues && formValues[element]) {
                return <div className='grid placeInfo' key={element}>
                    <div className='col-4'>
                        <i className="pi pi-map-marker"></i> <Translate value={"label." + element} />
                    </div>
                    <div className='col-8'>
                        {formValues[element]}
                    </div>
                </div>

            }
        });
        return items;
    }
    return (
        <Fragment>
            <div className='grid'>
                <div className='card'>
                    <h5 className="headerItem">
                        <Translate value="label.summary data" />
                    </h5>
                    <div className='grid'>
                        <div className='col-12'>
                            <h5>
                                <Translate value="label.basicInformations" />
                            </h5>
                            <div>{basicInformationsTemplate()}</div>
                        </div>
                        <div className='col-12'>
                            <h5>
                                <Translate value="label.location" />
                            </h5>
                            <div>{locationTemplate()}</div>
                        </div>
                    </div>

                </div>
            </div>

        </Fragment>

    )
}
export default Summary
