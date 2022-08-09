import React, { Fragment } from 'react';
import AdminMenu from './AdminMenu';

export const AdminWrapper = (props) => {

    return (
        <Fragment>
            <div className='grid'>
                <div className='col-12 sm:col-12 md:col-2 lg:col-2 xl:col-2' >
                    <AdminMenu />
                </div>
                <div class="col-12 sm:col-12 md:col-10 lg:col-10 xl:col-10">
                    <div className='card mt-4'>
                        {props.children}
                    </div>
                </div>
            </div>

        </Fragment>

    )
}
export default AdminWrapper
