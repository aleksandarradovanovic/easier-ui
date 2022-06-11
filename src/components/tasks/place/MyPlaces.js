import React, { Fragment, useEffect, useState } from 'react';
import { Translate } from 'react-redux-i18n';
import SimpleTable from '../../primeCustomComponents/table/SimpleTable';
import { useHistory } from "react-router";
import { useHandleCallPlaceService } from './myPlace/handlePlaceServices';

export const MyPlaces = (props) => {
    const [myPlacesList, setMyPlacesList] = useState([]);
    const history = useHistory();

    const handleCallPlaceService = useHandleCallPlaceService()

    const getMyPlaces = () => {
        handleCallPlaceService.handleGetMyPlacesService(
            (data) => {
                if (data && data.items) {
                    setMyPlacesList(data.items)
                }
            }
        )
    }
    const deletePlace = (id) => {
        handleCallPlaceService.handleDeletePlaceService(id, 
            () => {
                getMyPlaces()
            }
        )
    }
    const getMyPlace = (id) => {
        handleCallPlaceService.handleGetPlaceService(id)

    }
    useEffect(() => {
        getMyPlaces()
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
        getMyPlace(row.id)
    }
    const onDelete = (row, col) => {
        deletePlace(row.id)
    }
    return (
        <Fragment>
            <div className='grid'>
                <div class="col-8 col-offset-2">
                    <div className='card'>
                        <h3>
                            <Translate value="label.myPlaces" />
                        </h3>
                        <hr/>
                        <SimpleTable columns={columns} tableData={myPlacesList} onView={onView} onDelete={onDelete} paginator totalRecords={myPlacesList.length} count={myPlacesList.length} />
                    </div>
                </div>
            </div>

        </Fragment>

    )
}
export default MyPlaces
