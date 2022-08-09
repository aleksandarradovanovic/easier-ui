import { Button } from 'primereact/button';
import React from 'react';

import { fieldType, formFields } from '../../../constants/form';
import FormElement from '../../primeCustomComponents/form/FormElement';

export const PlaceFilter = (props) => {
    return (
        <div class="grid">
            <div className="col-12 sm:col-12 lg:col-4 md:col-6 xl:col-4">
                <FormElement
                    label={formFields.PLACE_NAME}
                    fieldType={fieldType.INPUT_TEXT}
                    fieldProps={{
                        name: formFields.PLACE_NAME
                    }}
                />
            </div>
            <div className="col-12 sm:col-12 lg:col-4 md:col-6 xl:col-4">
                <FormElement
                    label={formFields.PLACE_TYPE}
                    fieldType={fieldType.INPUT_TEXT}
                    fieldProps={{
                        name: formFields.PLACE_TYPE
                    }}
                />
            </div>
            <div className="col-12 sm:col-12 lg:col-4 md:col-6 xl:col-4">
            <FormElement
                    label={formFields.PLACE_LOCATION_COUNTRY}
                    fieldType={fieldType.INPUT_TEXT}
                    fieldProps={{
                        name: formFields.PLACE_LOCATION_COUNTRY
                    }}
                />
            </div>
            <div className="col-12 sm:col-12 lg:col-4 md:col-6 xl:col-4">
            <FormElement
                    label={formFields.PLACE_LOCATION_CITY}
                    fieldType={fieldType.INPUT_TEXT}
                    fieldProps={{
                        name: formFields.PLACE_LOCATION_CITY
                    }}
                />
            </div>
            <div className='col-12 sm:col-12 lg:col-4 md:col-6 xl:col-4'>
                <Button icon="pi pi-filter" className='p-button-outlined' label="Apply"></Button>

            </div>
        </div>
    )
}
export default PlaceFilter
