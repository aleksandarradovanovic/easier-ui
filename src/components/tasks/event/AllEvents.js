import React, { Fragment, useEffect, useState } from 'react';
import SimpleTable from '../../primeCustomComponents/table/SimpleTable';
import { useHistory } from "react-router";
import { formFields } from '../../../constants/form';
import { useHandleCallEventService } from './handleEventServices';

export const AllEvents = (props) => {
    const [allEventsList, setAllEventsList] = useState([]);
    const history = useHistory();
    const handleCallEventService = useHandleCallEventService()

    const getEvents = () => {
        let requestObject = {
        }
        handleCallEventService.handleSearchEventService(requestObject,
            (data) => {
                if (data && data.items) {
                    setAllEventsList(data.items)
                }
            }
        )
    }
    const getEvent = (id) => {
        handleCallEventService.handleGetEventService(id)

    }
    const onView = (row, col) => {
        getEvent(row.id)
    }
    const deleteEvent = (id) => {
        handleCallEventService.handleDeleteEventService(id,
            () => {
                getEvents()
            }
        )
    }
    const onDelete = (row, col) => {
        deleteEvent(row.id)
    }

    useEffect(() => {
        getEvents()
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
        },
        {
            header: "Place name",
            field: "placeName"
        }
    ]
    let initialValues = {
        [formFields.PLACE_NAME]: "",
        [formFields.PLACE_TYPE]: "",
        [formFields.PLACE_LOCATION_COUNTRY]: "",
        [formFields.PLACE_LOCATION_CITY]: "",
    };
    return (
        <Fragment>
            <div className='grid'>
                <div className='col-11'>
                    {/* <Fieldset legend="Filter" toggleable collapsed>
                        <FormWrapper
                            submitFunction={(data) => getPlaces(data)}
                            initialValues={initialValues}>
                            <PlaceFilter />
                        </FormWrapper>
                    </Fieldset> */}
                </div>
                <div class="col-11">
                    <div className='card'>
                        <SimpleTable columns={columns} tableData={allEventsList} onView={onView} onDelete={onDelete} paginator totalRecords={allEventsList.length} count={allEventsList.length} />
                    </div>
                </div>
            </div>

        </Fragment>

    )
}
export default AllEvents
