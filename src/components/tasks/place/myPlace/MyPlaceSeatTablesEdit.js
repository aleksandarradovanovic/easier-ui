import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { applicationStore } from '../../../../constants/storeConstants';
import { getFromAppStore } from '../../../../util/exportUtil';
import MyPlaceWrapper from './MyPlaceWrapper';
import { Translate } from 'react-redux-i18n';
import { Button } from 'primereact/button';
import { useHandleCallPlaceService } from './handlePlaceServices';
import { removeFromAppStore } from '../../../../actions';
import SeatTable from '../SeatTable';

export const MyPlaceSeatTablesEdit = (props) => {
    const selectedSeatTables = useSelector((state) => getFromAppStore(state, applicationStore.SELECTED_SEAT_TABLE))
    const selectedPlace = useSelector((state) => getFromAppStore(state, applicationStore.PLACE_DATA))
    const dispatch = useDispatch();
    const handleCallPlaceService = useHandleCallPlaceService()
    useEffect(() => {
        return () => {
            dispatch(removeFromAppStore(applicationStore.SELECTED_SEAT_TABLE))
        };
      }, [])
    const updatePlace = () => {
        let seatTablesData = []
        if(selectedSeatTables && selectedSeatTables.length > 0){
            seatTablesData = selectedSeatTables.map(function(x){
                return {
                    type: x.type,
                    number: x.id
                }
            })
        }
        let requestObject = {...selectedPlace, seatTableDtos: seatTablesData}
        handleCallPlaceService.handleUpdatePlaceService(requestObject)
    }
    return (
        <MyPlaceWrapper>
            <div className="card">
                <div className='grid'>
                    <div className='col-12'>

                        <h5>
                            <Translate value="label.seatTables" />
                            <Button icon="pi pi-save" className="p-button-rounded edit-place-button" onClick={() => { updatePlace() }} />
                        </h5>
                        <SeatTable />
                    </div>

                </div>
            </div>

        </MyPlaceWrapper>

    )
}
export default MyPlaceSeatTablesEdit
