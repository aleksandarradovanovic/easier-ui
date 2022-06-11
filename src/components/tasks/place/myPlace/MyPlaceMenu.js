import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu } from 'primereact/menu';
import { I18n } from "react-redux-i18n";
import { useHandleCallPlaceService } from './handlePlaceServices';
import { getFromAppStore } from '../../../../util/exportUtil';
import { applicationStore } from '../../../../constants/storeConstants';
import { useHistory } from 'react-router';
import { useHandleCallEventService } from '../../event/handleEventServices';

export const MyPlaceMenu = (props) => {
    const selectedPlace = useSelector((state) => getFromAppStore(state, applicationStore.PLACE_DATA))
    const history = useHistory();

    const handleGetPlaceService = useHandleCallPlaceService()
    const handleGetEventService = useHandleCallEventService()

    const getPlace = () => {
        if (selectedPlace && selectedPlace.id) {
            handleGetPlaceService.handleGetPlaceService(selectedPlace.id)

        }
    }
    const getPlaceImages = () => {
        handleGetPlaceService.handleGetImagesRequest()
    }
    const getPlaceSeatTable = () => {
        handleGetPlaceService.handleGetPlaceSeatTableService()
    }
    const getPlaceStaff = () => {
        handleGetPlaceService.handleGetPlaceStaffService()
    }
    const getPlaceEvents = () => {
        let requestObject = {
            placeId: selectedPlace.id
        }
        handleGetEventService.handleSearchEventService(requestObject,
            () => {
                history.push('/myPlaceEvents')
            }
        )
    }
    useEffect(() => {
    }, [])

    const items = [
        {
            label: 'Place information',
            items: [
                {
                    label: I18n.t('label.overview'),
                    icon: 'pi pi-align-justify',
                    command: (e) => {
                        getPlace()
                    }
                },
                {
                    label: I18n.t('label.images'),
                    icon: 'pi pi-images',
                    command: (e) => {
                        getPlaceImages()
                    }
                },
                {
                    label: I18n.t('label.seatTables'),
                    icon: 'pi pi-ticket',
                    command: (e) => {
                        getPlaceSeatTable()
                    }
                },
                {
                    label: I18n.t('label.staff'),
                    icon: 'pi pi-users',
                    command: (e) => {
                        getPlaceStaff()
                    }
                }
            ]
        },
        {
            label: I18n.t('label.events'),
            items: [
                {
                    label: I18n.t('label.createEvent'),
                    icon: 'pi pi-plus',
                    command: (e) => {
                        history.push('/createPlaceEvent')
                    }
                },
                {
                    label: I18n.t('label.viewEvents'),
                    icon: 'pi pi-eye',
                    command: (e) => {
                        getPlaceEvents()
                    }
                },
            ]
        },
        {
            label: 'Options',
            items: [
                {
                    label: 'Delete',
                    icon: 'pi pi-times',
                    command: () => {
                    }
                }
            ]
        },
    ];
    return (
        <Fragment>
            <Menu model={items} />
        </Fragment>

    )
}
export default MyPlaceMenu
