import React, { Fragment, useEffect } from 'react';
import {  useSelector } from 'react-redux';
import { Menu } from 'primereact/menu';
import { I18n } from "react-redux-i18n";
import { getFromAppStore } from '../../../util/exportUtil';
import { applicationStore } from '../../../constants/storeConstants';
import { useHistory } from 'react-router';
import { useHandleCallEventService } from '../event/handleEventServices';
import { isMobile } from '../../../util/deviceUtil';

export const EventMenu = (props) => {
    const selectedPlace = useSelector((state) => getFromAppStore(state, applicationStore.PLACE_DATA))
    const selectedEvent = useSelector((state) => getFromAppStore(state, applicationStore.EVENT_DATA))
    const history = useHistory();

    const handleCallEventService = useHandleCallEventService()

    const getEventImages = () => {
        handleCallEventService.handleGetEventImagesService()
    }
    const editEventInformation = () => {
        history.push('/myEventBasicInformationEdit')

    }
    const getReservations = () => {
        history.push('/myEventReservations')
    }
    useEffect(() => {
    }, [])

    const items = [
        {
            label: 'Event information',
            items: [
                {
                    label: I18n.t('label.overview'),
                    icon: 'pi pi-align-justify',
                    command: (e) => {
                        history.push('/eventOverview')

                    }
                },
                {
                    label: I18n.t('label.images'),
                    icon: 'pi pi-images',
                    command: (e) => {
                        getEventImages()
                    }
                },
                {
                    label: I18n.t('label.seatTables'),
                    icon: 'pi pi-ticket',
                    command: (e) => {

                    }
                },
                {
                    label: I18n.t('label.reservations'),
                    icon: 'pi pi-users',
                    command: (e) => {
                        getReservations()
                    }
                }
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
        <Menu model={items} popup={isMobile()}/>
        </Fragment>

    )
}
export default EventMenu
