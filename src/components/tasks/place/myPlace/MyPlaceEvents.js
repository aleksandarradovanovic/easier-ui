import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { applicationStore } from '../../../../constants/storeConstants';
import { getFromAppStore } from '../../../../util/exportUtil';
import MyPlaceWrapper from './MyPlaceWrapper';
import { Translate } from 'react-redux-i18n';
import { Button } from 'primereact/button';
import SimpleTable from '../../../primeCustomComponents/table/SimpleTable';
import { useHandleCallPlaceService } from './handlePlaceServices';
import { useHistory } from 'react-router';
import { useHandleCallEventService } from '../../event/handleEventServices';

export const MyPlaceEvents = (props) => {
    const placeEvents = useSelector((state) => getFromAppStore(state, applicationStore.FOUND_EVENTS))
    const handleCallEventService = useHandleCallEventService()
    const history = useHistory();

    const addEvent = () => {
        history.push('/createPlaceEvent')

    }
    useEffect(() => {
    }, [])
    let columns = [
        {
            header: "ID",
            field: "id",
            hidden: true
        },
        {
            header: "Name",
            field: "name"
        },
        {
            header: "Type",
            field: "type"
        },
        {
            header: "Description",
            field: "description"
        }
    ]
    let placeEventsTableData = []
    if(placeEvents && placeEvents.length > 0){
        placeEventsTableData = placeEvents.map(function(x){
            return {
                id: x.id,
                name: x.name,
                type: x.type,
                description: x.description,
            }
        })
    }
    const deleteEvent = (id) => {
        // handleCallPlaceService.handleDeletePlaceService(id, 
        //     () => {
        //         getMyPlaces()
        //     }
        // )
    }
    const getEvent = (id) => {
        handleCallEventService.handleGetEventService(id)

    }
    const onView = (row, col) => {
        getEvent(row.id)
    }
    const onDelete = (row, col) => {
        deleteEvent(row.id)
    }
    return (
        <MyPlaceWrapper>
            <div className="card">
                <div className='grid'>
                    <div className='col-12'>
                        <h5>
                            <Translate value="label.events" />
                            <Button icon="pi pi-plus" className="p-button-rounded p-button-info edit-place-button" onClick={() => addEvent() } />
                        </h5>
                        <SimpleTable columns={columns} tableData={placeEventsTableData} paginator totalRecords={placeEventsTableData.length} count={placeEventsTableData.length} onView={onView} onDelete={onDelete}/>
                    </div>

                </div>
            </div>

        </MyPlaceWrapper>

    )
}
export default MyPlaceEvents
