import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Translate } from 'react-redux-i18n';
import { applicationStore } from '../../../../constants/storeConstants';
import { getFromAppStore } from '../../../../util/exportUtil';
import MyPlaceWrapper from './MyPlaceWrapper';
import { Button } from 'primereact/button';
import { useHistory } from 'react-router';
import MyPlaceOverviewAvatar from './MyPlaceOverviewAvatar';

export const MyPlaceOverview = (props) => {
    const selectedPlace = useSelector((state) => getFromAppStore(state, applicationStore.PLACE_DATA))

    const history = useHistory();

    useEffect(() => {
    }, [])
    const editBasicInformation = () => {
        history.push('/myPlaceBasicInformationEdit')

    }
    const editLocation = () => {
        history.push('/myPlaceLocationEdit')

    }
    const basicInformationsTemplate = () => {
        let basicKeys = [
            "name",
            "type",
            "description",
            "startWorkingTime",
            "endWorkingTime"
        ]
        let items = []
        items = basicKeys.map(element => {
            if (selectedPlace && selectedPlace[element]) {
                return <div className='grid placeInfo' key={element}>
                    <div className='col-4'>
                        <i className="pi pi-check-circle"></i> <Translate value={"label." + element} />
                    </div>
                    <div className='col-8'>
                        {selectedPlace[element]}
                    </div>
                </div>

            }
        });
        return items;
    }
    const locationTemplate = () => {
        let basicKeys = [
            "city",
            "country",
            "streetAndNumber",
            "latitude",
            "longitude"
        ]
        let items = []
        items = basicKeys.map(element => {
            let locationData
            if (selectedPlace.locationDto) {
                locationData = selectedPlace.locationDto
                if (locationData && locationData[element]) {
                    return <div className='grid placeInfo' key={element}>
                        <div className='col-4'>
                            <i className="pi pi-map-marker"></i> <Translate value={"label." + element} />
                        </div>
                        <div className='col-8'>
                            {locationData[element]}
                        </div>
                    </div>

                }
            }

        });
        return items;
    }
    return (
        <MyPlaceWrapper>
            <div className='card'>
                <div className='grid'>
                    <div className='col-12 sm:col-12 lg:col-6 md:col-6 xl:col-6'>
                        <div className='grid'>
                            <div className='col-12'>
                                <h5>
                                    <Translate value="label.basicInformation" />
                                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-success edit-place-button" onClick={() => editBasicInformation()} />

                                </h5>
                                <div>{basicInformationsTemplate()}</div>
                            </div>
                            <div className='col-12'>
                                <h5>
                                    <Translate value="label.location" />
                                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-success edit-place-button" onClick={() => editLocation()} />
                                </h5>
                                <div>{locationTemplate()}</div>
                            </div>
                        </div>
                    </div>
                    <div className='col-0 sm:col-0 lg:col-2 md:col-2 xl:col-2'>
                    </div>
                    <MyPlaceOverviewAvatar />
                </div>




            </div>
        </MyPlaceWrapper>

    )
}
export default MyPlaceOverview
