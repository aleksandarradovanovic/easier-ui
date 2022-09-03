import { Dialog } from 'primereact/dialog';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Translate } from 'react-redux-i18n';
import { ServiceRequestData } from '../../../constants/service';
import { applicationStore } from '../../../constants/storeConstants';
import ReservationService from '../../../service/reservation/ReservationService';
import { useCreateServiceWrapper } from '../../../service/serviceWrapper';
import { getFromAppStore } from '../../../util/exportUtil';
import SimpleTable from '../../primeCustomComponents/table/SimpleTable';
import PlaceEventWrapper from '../event/PlaceEventWrapper';
import MyPlaceWrapper from '../place/myPlace/MyPlaceWrapper';
import { useHandleCallReservationService } from './handleReservationServices';

export const AllReservations = () => {
    const [allReservationList, setAllReservationList] = useState([]);
    const [reservationsCount, setReservationsCount] = useState(0);
    const [displayReservationDetailsModal, setDisplayReservationDetailsModal] = useState(false);
    const [singleReservationData, setSingleReservationData] = useState(null);
    const selectedEvent = useSelector((state) => getFromAppStore(state, applicationStore.EVENT_DATA))
    const handleReservationService = useHandleCallReservationService()

    const serviceCall = useCreateServiceWrapper();
    const reservationTypeData = (rowData) => {
        let type = ""
        if (rowData.reservationTypeDto) {
            type = rowData.reservationTypeDto.name + ", " + rowData.reservationTypeDto.price + ", " + rowData.reservationTypeDto.maxNumberOfGuests
        }
        return <span className={"tableLocation"}>{type}</span>;
    }
    let columns = [
        {
            header: "Id",
            field: "id"
        },
        {
            header: "Event name",
            field: "eventName"
        },
        {
            header: "Status",
            field: "status"
        },
        {
            header: "Type",
            field: "type",
            body: reservationTypeData
        }
    ]

    const getReservation = (id) => {
        handleReservationService.handleGetReservationService(id,
            (data) => {
                setDisplayReservationDetailsModal(true)
                setSingleReservationData(data)
            }
        )
    }
    const onView = (row, col) => {
        getReservation(row.id)
    }
    const getReservations = (page, size) => {
        let params = {}
        if (page) {
            params.page = page
        }
        if (size) {
            params.PerPage = size
        }
        if (selectedEvent && selectedEvent.id) {
            params.eventId = selectedEvent.id
        }
        serviceCall(new ServiceRequestData(
            ReservationService.searchReservation,
            params,
            null,
            null,
            (data) => {
                setAllReservationList(data.items)
                setReservationsCount(data.totalCount)
            },
            null
        ))
    }
    const removeReservation = (id) => {
        handleReservationService.handleDeleteReservationService(id,
            () => {
                getReservations()
            }
        )
    }
    const onDelete = (row, col) => {
        removeReservation(row.id)
    }
    const paginationFunc = (page, size) => {
        getReservations(page + 1, size)
    }
    useEffect(() => {
        getReservations()
    }, [])
    return (
        <PlaceEventWrapper>
            <Dialog header="Reservation details" visible={displayReservationDetailsModal} style={{ width: '50vw' }} modal onHide={() => {
                setDisplayReservationDetailsModal(false)
            }}>
                {singleReservationData &&
                    <div className="surface-0">
                        <ul className="list-none p-0 m-0">
                            <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                                <div className="text-500 w-6 md:w-2 font-medium">Event name </div>
                                <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">{singleReservationData.eventName}</div>

                            </li>
                            <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                                <div className="text-500 w-6 md:w-2 font-medium">Status</div>
                                <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">{singleReservationData.status}</div>

                            </li>
                            <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                                <div className="text-500 w-6 md:w-2 font-medium">Type</div>
                                <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">{singleReservationData.reservationTypeDto.name}</div>
                            </li>
                            <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                                <div className="text-500 w-6 md:w-2 font-medium">Price</div>
                                <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">{singleReservationData.reservationTypeDto.price}</div>

                            </li>
                            <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                                <div className="text-500 w-6 md:w-2 font-medium">Name on</div>
                                <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">{singleReservationData.nameOn}</div>

                            </li>
                            <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                                <div className="text-500 w-6 md:w-2 font-medium">Username</div>
                                <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">{singleReservationData.username}</div>

                            </li>
                            <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                                <div className="text-500 w-6 md:w-2 font-medium">Place</div>
                                <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">{singleReservationData.placeName}</div>

                            </li>
                        </ul>
                    </div>
                }

            </Dialog>
            <div className="card">
                <div className='grid'>
                    <div className='col-12'>
                        <h5>
                            <Translate value="label.reservations" />
                        </h5>
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
                                    <SimpleTable columns={columns} tableData={allReservationList} paginator totalRecords={reservationsCount} count={reservationsCount} paginationFunc={paginationFunc} onDelete={onDelete} onView={onView} />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </PlaceEventWrapper>

    )

}
export default AllReservations
