import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { applicationStore } from '../../../../constants/storeConstants';
import { getFromAppStore } from '../../../../util/exportUtil';
import MyPlaceMenu from './MyPlaceMenu';

export const MyPlaceWrapper = (props) => {
    const selectedPlace = useSelector((state) => getFromAppStore(state, applicationStore.PLACE_DATA))

    let name = ""
    if (selectedPlace && selectedPlace.name) {
        name = " - " + selectedPlace.name
    }
    return (
        <Fragment>
            <div className='grid'>
                <div className='col-12 sm:col-12 md:col-2 lg:col-2 xl:col-2' >
                    <MyPlaceMenu selectedPlace={selectedPlace} />
                </div>
                <div class="col-12 sm:col-12 md:col-8 lg:col-8 xl:col-8">
                    <div className='card'>
                        <h3>
                            {name}
                        </h3>
                        <hr />
                        {props.children}
                    </div>
                </div>
            </div>

        </Fragment>

    )
}
export default MyPlaceWrapper
