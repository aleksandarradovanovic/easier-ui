import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Translate } from 'react-redux-i18n';
import { clearAppStore } from '../../../../actions';
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
                <div className='col-2'>
                    <MyPlaceMenu selectedPlace={selectedPlace} />
                </div>
                <div class="col-8">
                    <div className='card'>
                        <h3>
                            <Translate value="label.myPlace" /> {name}
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
