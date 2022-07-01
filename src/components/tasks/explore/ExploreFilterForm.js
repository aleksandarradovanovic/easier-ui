import { Button } from 'primereact/button';
import React from 'react';

import { fieldType, formFields } from '../../../constants/form';
import FormElement from '../../primeCustomComponents/form/FormElement';

export const ExploreFilterForm = (props) => {
    return (
        <div class="grid">
            <div className="col-12 sm:col-12 lg:col-4 md:col-6 xl:col-4">
                <FormElement
                    label={formFields.PLACE_NAME}
                    fieldType={fieldType.INPUT_TEXT}
                    fieldProps={{
                        name: formFields.EVENT_PLACE_NAME
                    }}
                />
            </div>
            <div className="col-12 sm:col-12 lg:col-4 md:col-6 xl:col-4">
                <FormElement
                    label={formFields.EVENT_NAME}
                    fieldType={fieldType.INPUT_TEXT}
                    fieldProps={{
                        name: formFields.EVENT_NAME
                    }}
                />
            </div>
            <div className="col-12 sm:col-12 lg:col-4 md:col-6 xl:col-4">
                <FormElement
                    label={formFields.EVENT_TYPE}
                    fieldType={fieldType.INPUT_DROPDOWN}
                    fieldProps=
                    {{
                        name: formFields.EVENT_TYPE,
                        options: [
                            { label: "Party", value: "party" },
                            { label: "Concert", value: "concert" },
                            { label: "Game", value: "game" },
                        ],
                        showClear: true
                    }}
                />
            </div>
            <div className='col-12 sm:col-12 lg:col-4 md:col-6 xl:col-4'>
                <Button icon="pi pi-filter" className='p-button-outlined' label="Apply"></Button>

            </div>
        </div>
    )
}
export default ExploreFilterForm
