import React, { useEffect } from 'react';
import { Translate } from 'react-redux-i18n';
import AllPlaces from '../../tasks/place/AllPlaces';
import AdminWrapper from '../AdminWrapper';

export const AllPlacesAdminOverview = (props) => {
    return (
        <AdminWrapper>
            <div className="card">
                <div className='grid'>
                    <div className='col-12'>
                        <h5>
                            <Translate value="label.places" />
                        </h5>
                        <AllPlaces />
                    </div>

                </div>
            </div>
        </AdminWrapper>

    )
}
export default AllPlacesAdminOverview
