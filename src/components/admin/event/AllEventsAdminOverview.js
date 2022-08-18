import React, { useEffect } from 'react';
import { Translate } from 'react-redux-i18n';
import AllEvents from '../../tasks/event/AllEvents';
import AdminWrapper from '../AdminWrapper';

export const AllEventsAdminOverview = (props) => {
    return (
        <AdminWrapper>
            <div className="card">
                <div className='grid'>
                    <div className='col-12'>
                        <h5>
                            <Translate value="label.event" />
                        </h5>
                        <AllEvents />
                    </div>

                </div>
            </div>
        </AdminWrapper>

    )
}
export default AllEventsAdminOverview
