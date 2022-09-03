import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { applicationStore } from '../../../constants/storeConstants';
import { getFromAppStore } from '../../../util/exportUtil';
import EventMenu from './EventMenu';

export const PlaceEventWrapper = (props) => {
    const selectedEvent = useSelector((state) => getFromAppStore(state, applicationStore.EVENT_DATA))


    return (
        <Fragment>
            <div className='grid'>
                <div className='col-12 sm:col-12 md:col-2 lg:col-2 xl:col-2' >
                    <EventMenu selectedEvent={selectedEvent} />
                </div>
                <div class="col-12 sm:col-12 md:col-8 lg:col-8 xl:col-8">
                    <div className='card'>
                        {props.children}
                    </div>
                </div>
            </div>

        </Fragment>

    )
}
export default PlaceEventWrapper
