import React, { Fragment } from 'react';
import { I18n, Translate } from 'react-redux-i18n';
import { fieldType, formFields } from '../../../constants/form';
import FormElement from '../../primeCustomComponents/form/FormElement';
import FormWrapper from '../../primeCustomComponents/form/FormWrapper';

export const PlaceInformation = (props) => {
    let initialValues = {
        [formFields.PLACE_NAME]: "",
        [formFields.PLACE_TYPE]: "",
        [formFields.PLACE_DESC]: ""
    };
    return (
        <Fragment>
            <FormWrapper
                submitFunction={(data) => console.log(data)}
                initialValues={initialValues}>
                <div className='card'>
                    <h5 className="sectionTitle">
                        <Translate value="label.basicInformation" />
                    </h5>
                    <div class="grid">
                        <div className="col-12 sm:col-12 lg:col-4 md:col-6 xl:col-4">
                            <FormElement
                                label={formFields.PLACE_NAME}
                                fieldType={fieldType.INPUT_TEXT}
                                required
                                fieldProps={{ name: formFields.PLACE_NAME }}
                            />
                        </div>
                        <div className="col-12 sm:col-12 lg:col-4 md:col-6 xl:col-4">
                            <FormElement
                                label={formFields.PLACE_TYPE}
                                fieldType={fieldType.INPUT_TEXT}
                                required
                                fieldProps=
                                {{
                                    name: formFields.PLACE_TYPE,
                                    tooltip:I18n.t("message.placeTypeTip")
                                 
                                }}
                            />
                        </div>
                        <div className="col-12 sm:col-12 lg:col-4 md:col-6 xl:col-4">
                            <FormElement
                                label={formFields.PLACE_DESC}
                                fieldType={fieldType.TEXT_AREA}
                                required
                                fieldProps={{ name: formFields.PLACE_DESC }}
                            />
                        </div>
                    </div>
                    <h5 className="sectionTitle">
                        <Translate value="label.workingTime" />
                    </h5>
                    <div class="grid">
                        <div className="col-12 sm:col-12 lg:col-4 md:col-6 xl:col-4">
                            <FormElement
                                label={formFields.PLACE_WORKING_TIME_FROM}
                                fieldType={fieldType.INPUT_DATE_PICKER}
                                required
                                fieldProps={{ name: formFields.PLACE_WORKING_TIME_FROM, timeOnly: true, hourFormat: "24", dateFormat: "hh:mm" }}
                            />
                        </div>
                        <div className="col-12 sm:col-12 lg:col-4 md:col-6 xl:col-4">
                            <FormElement
                                label={formFields.PLACE_WORKING_TIME_TO}
                                fieldType={fieldType.INPUT_DATE_PICKER}
                                required
                                fieldProps={{ name: formFields.PLACE_WORKING_TIME_TO, timeOnly: true, hourFormat: "24" }}
                            />
                        </div>
                    </div>
                </div>


            </FormWrapper>
        </Fragment>

    )
}
export default PlaceInformation
