import React, { Fragment, useEffect, useState } from 'react'

import MapPicker from 'react-google-map-picker'
import { useDispatch } from 'react-redux';
import { Translate } from 'react-redux-i18n';
import { change } from '../../../actions/globalFormActions';
import { fieldType, formFields } from '../../../constants/form';
import MapPickerComponent from '../../common/MapPickerComponent';
import FormElement from '../../primeCustomComponents/form/FormElement';
import FormWrapper from '../../primeCustomComponents/form/FormWrapper';

const DefaultLocation = { lat: 44.787197, lng: 20.457273 };
const DefaultZoom = 10;

const PlaceLocationPicker = () => {
    const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);

    const [location, setLocation] = useState(defaultLocation);
    const [zoom, setZoom] = useState(DefaultZoom);
    const dispatch = useDispatch()
    function handleChangeLocation(lat, lng) {
        setLocation({ lat: lat, lng: lng });
        dispatch(change(formFields.PLACE_LOCATION_LAT, lat))
        dispatch(change(formFields.PLACE_LOCATION_LONG, lng))
    }

    function handleChangeZoom(newZoom) {
        setZoom(newZoom);
    }
    // useEffect(() => {
    //     dispatch(change(formFields.PLACE_LOCATION_LAT, DefaultLocation.lat))
    //     dispatch(change(formFields.PLACE_LOCATION_LONG, DefaultLocation.lng))
    // }, [])

    function handleResetLocation() {
        setDefaultLocation({ ...DefaultLocation });
        setZoom(DefaultZoom);
    }
    let initialValues = {
        [formFields.PLACE_LOCATION_COUNTRY]: "",
        [formFields.PLACE_LOCATION_CITY]: "",
        [formFields.PLACE_LOCATION_STREET_NUMBER]: "",
        [formFields.PLACE_LOCATION_LAT]: "",
        [formFields.PLACE_LOCATION_LONG]: ""
    };
    return (
        <Fragment>
            <div className='card'>
                <h5 className="sectionTitle">
                    <Translate value="label.location" />
                </h5>
                <FormWrapper
                    submitFunction={(data) => console.log(data)}
                    initialValues={initialValues}>
                    <div className='grid'>

                        <div className="col-12 sm:col-12 lg:col-4 md:col-6 xl:col-4">
                            <FormElement
                                label={formFields.PLACE_LOCATION_COUNTRY}
                                fieldType={fieldType.INPUT_TEXT}
                                required
                                fieldProps={{ name: formFields.PLACE_LOCATION_COUNTRY }}
                            />
                        </div>
                        <div className="col-12 sm:col-12 lg:col-4 md:col-6 xl:col-4">
                            <FormElement
                                label={formFields.PLACE_LOCATION_CITY}
                                fieldType={fieldType.INPUT_TEXT}
                                required
                                fieldProps={{ name: formFields.PLACE_LOCATION_CITY }}
                            />
                        </div>
                        <div className="col-12 sm:col-12 lg:col-4 md:col-6 xl:col-4">
                            <FormElement
                                label={formFields.PLACE_LOCATION_STREET_NUMBER}
                                fieldType={fieldType.INPUT_TEXT}
                                required
                                fieldProps={{ name: formFields.PLACE_LOCATION_STREET_NUMBER }}
                            />
                        </div>
                        <div className="col-12 sm:col-12 lg:col-4 md:col-6 xl:col-4">
                            <FormElement
                                label={formFields.PLACE_LOCATION_LAT}
                                fieldType={fieldType.INPUT_TEXT}
                                required
                                fieldProps={{ name: formFields.PLACE_LOCATION_LAT, onChange: (e) => setDefaultLocation({ ...location, lat: e.target.value }) }}
                            />
                        </div>
                        <div className="col-12 sm:col-12 lg:col-4 md:col-6 xl:col-4">
                            <FormElement
                                label={formFields.PLACE_LOCATION_LONG}
                                fieldType={fieldType.INPUT_TEXT}
                                required
                                fieldProps={{ name: formFields.PLACE_LOCATION_LONG }}
                            />
                        </div>
                    </div>

                </FormWrapper>
                {/* <MapPickerComponent /> */}

            </div>
        </Fragment>
    );
}

export default PlaceLocationPicker