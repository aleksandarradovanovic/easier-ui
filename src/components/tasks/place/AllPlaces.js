import React, { Fragment, useEffect, useState } from 'react';
import { Translate } from 'react-redux-i18n';
import SimpleTable from '../../primeCustomComponents/table/SimpleTable';
import { useHistory } from "react-router";
import { useHandleCallPlaceService } from './myPlace/handlePlaceServices';
import { Fieldset } from 'primereact/fieldset';
import FormWrapper from '../../primeCustomComponents/form/FormWrapper';
import PlaceFilter from './PlaceFilter';
import { formFields } from '../../../constants/form';

export const AllPlaces = (props) => {
    const [allPlacesList, setAllPlacesList] = useState([]);
    const history = useHistory();

    const handleCallPlaceService = useHandleCallPlaceService()

    const getPlaces = (filterData) => {
        let requestData = {}
        if(filterData){
            requestData = filterData
        }
        handleCallPlaceService.handleSearchPlacesService(requestData,
            (data) => {
                if (data && data.items) {
                    setAllPlacesList(data.items)
                }
            }
        )
    }
    const deletePlace = (id) => {
        handleCallPlaceService.handleDeletePlaceService(id,
            () => {
                getPlaces()
            }
        )
    }
    const getPlace = (id) => {
        handleCallPlaceService.handleGetPlaceService(id)

    }
    useEffect(() => {
        getPlaces()
    }, [])
    const locationBodyTemplate = (rowData) => {
        let location = ""
        if (rowData.locationDto) {
            location = rowData.locationDto.country + ", " + rowData.locationDto.city + ", " + rowData.locationDto.streetAndNumber
        }
        return <span className={"tableLocation"}>{location}</span>;
    }
    let columns = [
        {
            header: "ID",
            field: "id"
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
            header: "Location",
            field: "Location",
            body: locationBodyTemplate
        }
    ]
    const onView = (row, col) => {
        getPlace(row.id)
    }
    const onDelete = (row, col) => {
        deletePlace(row.id)
    }
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
                    <Fieldset legend="Filter" toggleable collapsed>
                        <FormWrapper
                            submitFunction={(data) => getPlaces(data)}
                            initialValues={initialValues}>
                            <PlaceFilter />
                        </FormWrapper>
                    </Fieldset>
                </div>
                <div class="col-11">
                    <div className='card'>
                        <SimpleTable columns={columns} tableData={allPlacesList} onView={onView} onDelete={onDelete} paginator totalRecords={allPlacesList.length} count={allPlacesList.length} />
                    </div>
                </div>
            </div>

        </Fragment>

    )
}
export default AllPlaces
