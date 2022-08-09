import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu } from 'primereact/menu';
import { I18n } from "react-redux-i18n";
import { useHistory } from 'react-router';
import { useHandleCallPlaceService } from '../tasks/place/myPlace/handlePlaceServices';
import { useHandleCallEventService } from '../tasks/event/handleEventServices';
import { getFromAppStore } from '../../util/exportUtil';
import { applicationStore } from '../../constants/storeConstants';
import { isMobile } from '../../util/deviceUtil';

export const AdminMenu = (props) => {
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
            label: I18n.t('label.places'),
            items: [
                {
                    label: I18n.t('label.view'),
                    icon: 'pi pi-eye',
                    command: (e) => {
                        history.push('/allPlacesAdminOverview')
                    }
                },
                {
                    label: I18n.t('label.createPlace'),
                    icon: 'pi pi-plus',
                    command: (e) => {
                        history.push('/createPlace')
                    }
                },
            ]
        },
        {
            label: I18n.t('label.events'),
            items: [
                {
                    label: I18n.t('label.viewEvents'),
                    icon: 'pi pi-eye',
                    command: (e) => {
                        getPlaceEvents()
                    }
                },
                {
                    label: I18n.t('label.createEvent'),
                    icon: 'pi pi-plus',
                    command: (e) => {
                        history.push('/createPlaceEvent')
                    }
                }

            ]
        },
        {
            label: I18n.t('label.users'),
            items: [
                {
                    label: I18n.t('label.viewUsers'),
                    icon: 'pi pi-eye',
                    command: (e) => {
                        getPlaceEvents()
                    }
                },
                {
                    label: I18n.t('label.createUser'),
                    icon: 'pi pi-plus',
                    command: (e) => {
                        history.push('/createPlaceEvent')
                    }
                }
            ]
        },
        {
            label: I18n.t('label.reservations'),
            items: [
                {
                    label: I18n.t('label.view'),
                    icon: 'pi pi-eye',
                    command: (e) => {
                    }
                }
            ]
        },
        {
            label: I18n.t('label.auditLog'),
            items: [
                {
                    label: I18n.t('label.view'),
                    icon: 'pi pi-eye',
                    command: (e) => {
                    }
                }
            ]
        },
    ];
    return (
        <Fragment>
            <Menu model={items} popup={isMobile()} />
        </Fragment>

    )
}
export default AdminMenu
