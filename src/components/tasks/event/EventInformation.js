import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Translate } from 'react-redux-i18n';
import { change } from '../../../actions/globalFormActions';
import { fieldType, formFields } from '../../../constants/form';
import { applicationStore } from '../../../constants/storeConstants';
import { getFromAppStore } from '../../../util/exportUtil';
import FormElement from '../../primeCustomComponents/form/FormElement';
import FormWrapper from '../../primeCustomComponents/form/FormWrapper';

export const EventInformation = (props) => {
    const selectedPlace = useSelector((state) => getFromAppStore(state, applicationStore.PLACE_DATA))
    const selectedPlaceOptions = useSelector((state) => getFromAppStore(state, applicationStore.EVENT_PLACE_NAME_OPTIONS))
    const [placeOptions, setPlaceOptions] = useState([]);
    const [disablePlaceName, setDisablePlaceName] = useState(false);
    const dispatch = useDispatch()
    let initialValues = {
        [formFields.EVENT_NAME]: "",
        [formFields.EVENT_TYPE]: "",
        [formFields.EVENT_DESC]: "",
        [formFields.EVENT_TIME_FROM]: "",
        [formFields.EVENT_TIME_TO]: "",
    };
    useEffect(() => {
        if (selectedPlace && selectedPlace.id) {
            let placeOptionValues = [
                { label: selectedPlace.name, value: selectedPlace.id },
            ]
            dispatch(change(formFields.EVENT_PLACE_NAME, selectedPlace.id))
            setDisablePlaceName(true)
            setPlaceOptions(placeOptionValues)
        } else if (selectedPlaceOptions) {
            setDisablePlaceName(false)
            setPlaceOptions(selectedPlaceOptions)

        }
    }, [selectedPlace, selectedPlaceOptions])
    return (
        <Fragment>
            <FormWrapper
                submitFunction={(data) => console.log(data)}
                initialValues={initialValues}>
                <div className='card'>
                    <h5 className="sectionTitle">
                        <Translate value="label.eventInformation" />
                    </h5>
                    <div class="grid">
                        <div className="col-4">
                            <FormElement
                                label={formFields.PLACE_NAME}
                                fieldType={fieldType.INPUT_DROPDOWN}
                                required
                                readOnly={disablePlaceName}
                                fieldProps={{
                                    name: formFields.EVENT_PLACE_NAME,
                                    options: placeOptions,
                                }}
                            />
                        </div>
                        <div className="col-4">
                            <FormElement
                                label={formFields.EVENT_NAME}
                                fieldType={fieldType.INPUT_TEXT}
                                required
                                fieldProps={{ name: formFields.EVENT_NAME }}
                            />
                        </div>
                        <div className="col-4">
                            <FormElement
                                label={formFields.EVENT_TYPE}
                                fieldType={fieldType.INPUT_DROPDOWN}
                                required
                                fieldProps=
                                {{
                                    name: formFields.EVENT_TYPE,
                                    options: [
                                        { label: "Party", value: "party" },
                                        { label: "Concert", value: "concert" },
                                        { label: "Game", value: "game" },
                                    ]
                                }}
                            />
                        </div>
                        <div className="col-4">
                            <FormElement
                                label={formFields.EVENT_DESC}
                                fieldType={fieldType.TEXT_AREA}
                                required
                                fieldProps={{ name: formFields.EVENT_DESC }}
                            />
                        </div>
                    </div>
                    <h5 className="sectionTitle">
                        <Translate value="label.workingTime" />
                    </h5>
                    <div class="grid">
                        <div className="col-4">
                            <FormElement
                                label={formFields.EVENT_TIME_FROM}
                                fieldType={fieldType.INPUT_DATE_PICKER}
                                required
                                fieldProps={{ name: formFields.EVENT_TIME_FROM, showTime: true }}
                            />
                        </div>
                        <div className="col-4">
                            <FormElement
                                label={formFields.EVENT_TIME_TO}
                                fieldType={fieldType.INPUT_DATE_PICKER}
                                required
                                fieldProps={{ name: formFields.EVENT_TIME_TO, showTime: true }}
                            />
                        </div>
                    </div>
                </div>


            </FormWrapper>
        </Fragment>

    )
}
export default EventInformation
