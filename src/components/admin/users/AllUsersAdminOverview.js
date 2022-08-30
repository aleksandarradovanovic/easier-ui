import React, { useEffect } from 'react';
import { Translate } from 'react-redux-i18n';
import AdminWrapper from '../AdminWrapper';
import AllUsers from './AllUsers';

export const AllUsersAdminOverview = (props) => {
    return (
        <AdminWrapper>
            <div className="card">
                <div className='grid'>
                    <div className='col-12'>
                        <h5>
                            <Translate value="label.users" />
                        </h5>
                        {/* <AllEvents /> */}
                        <AllUsers />
                    </div>

                </div>
            </div>
        </AdminWrapper>

    )
}
export default AllUsersAdminOverview
