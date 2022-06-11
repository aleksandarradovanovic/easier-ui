import React from 'react';
import { Translate } from 'react-redux-i18n';
import CreateEventWorkflow from '../../../workflow/CreateEventWorkflow';
import MyPlaceWrapper from './MyPlaceWrapper';

export const CreateMyPlaceEvent = (props) => {

    return (
        <MyPlaceWrapper>
            <div className="card">
                <div className='grid'>
                    <div className='col-12'>
                        <h5>
                            <Translate value="label.createEvent" />
                        </h5>
                        <CreateEventWorkflow />
                    </div>

                </div>
            </div>

        </MyPlaceWrapper>
    )
}
export default CreateMyPlaceEvent
