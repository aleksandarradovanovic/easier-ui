import React, { useEffect, useState } from 'react';
import { Translate } from 'react-redux-i18n';
import SimpleTable from '../../primeCustomComponents/table/SimpleTable';
import { useHistory } from 'react-router';
import { useHandleCallReservationService } from './handleReservationServices';

export const MyReservations = (props) => {
    const handleReservationService = useHandleCallReservationService()
    const history = useHistory();
    const [myReservations, setMyReservations] = useState([]);

    useEffect(() => {
        getReservations()
    }, [])
    const getReservations = () => {
        handleReservationService.handleGetUserReservationsService(
            (data) => {
                if (data && data.items) {
                    setMyReservations(data.items)
                }
            }
        )
    }
    const cancelReservation = (id) => {
        handleReservationService.handleDeleteReservationService(id,
            () => {
                getReservations()
            }
        )
    }
    const getReservation = (id) => {
        handleReservationService.handleGetReservationService(id,
            () => {
                history.push("/reservationPreview")
            }
        )

    }
    const onView = (row, col) => {
        getReservation(row.id)
    }
    const onDelete = (row, col) => {
        cancelReservation(row.id)
    }
    let columns = [
        {
            header: "ID",
            field: "id",
            hidden: true
        },
        {
            header: "Name on",
            field: "nameOn"
        },
        {
            header: "Event",
            field: "eventName"
        },
        {
            header: "Place",
            field: "placeName"
        },
        {
            header: "Start time",
            field: "eventStartTime"
        }
    ]



    return (
        <div className="myReservations">
            <h5>
                <Translate value="label.myReservations" />
            </h5>
            <SimpleTable columns={columns} tableData={myReservations} paginator totalRecords={myReservations.length} count={myReservations.length} onView={onView} onDelete={onDelete} />
        </div>
    )
}
export default MyReservations
