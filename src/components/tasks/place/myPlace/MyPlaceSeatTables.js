import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { applicationStore } from '../../../../constants/storeConstants';
import { getFromAppStore } from '../../../../util/exportUtil';
import MyPlaceWrapper from './MyPlaceWrapper';
import { Translate } from 'react-redux-i18n';
import { Button } from 'primereact/button';
import SimpleTable from '../../../primeCustomComponents/table/SimpleTable';
import { useHandleCallPlaceService } from './handlePlaceServices';

export const MyPlaceSeatTables = (props) => {
    const placeSeatTable = useSelector((state) => getFromAppStore(state, applicationStore.PLACE_SEAT_TABLE))
    const handleCallPlaceService = useHandleCallPlaceService()
    const editSeatTables = () => {
        handleCallPlaceService.handleGetPlaceSeatTableService(true)

    }
    useEffect(() => {
    }, [])
    let columns = [
        {
            header: "Type",
            field: "type"
        },
        {
            header: "ID",
            field: "number"
        }
    ]
    return (
        <MyPlaceWrapper>
            <div className="card">
                <div className='grid'>
                    <div className='col-12'>
                        <h5>
                            <Translate value="label.seatTables" />
                            <Button icon="pi pi-pencil" className="p-button-rounded p-button-success edit-place-button" onClick={() => editSeatTables() } />
                        </h5>
                        <SimpleTable columns={columns} tableData={placeSeatTable} paginator totalRecords={placeSeatTable.length} count={placeSeatTable.length} />
                    </div>

                </div>
            </div>

        </MyPlaceWrapper>

    )
}
export default MyPlaceSeatTables
