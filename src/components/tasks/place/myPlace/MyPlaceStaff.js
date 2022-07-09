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

export const MyPlaceStaff = (props) => {
    const placeStaff = useSelector((state) => getFromAppStore(state, applicationStore.PLACE_STAFF))
    const handleCallPlaceService = useHandleCallPlaceService()
    const history = useHistory();
    const editStaff = () => {
        history.push('/myPlaceStaffEdit')


    }
    useEffect(() => {
    }, [])
    let columns = [
        {
            header: "First name",
            field: "firstName",
        },
        {
            header: "Last name",
            field: "lastName",
        },
        {
            header: "Position",
            field: "position"
        }
    ]
    let placeStaffTableData = []
    if(placeStaff && placeStaff.length > 0){
        placeStaffTableData = placeStaff.map(function(x){
            return {
                firstName: x.userDto.firstName,
                lastName: x.userDto.lastName,
                position: x.position
            }
        })
    }
    return (
        <MyPlaceWrapper>
            <div className="card">
                <div className='grid'>
                    <div className='col-12'>
                        <h5>
                            <Translate value="label.staff" />
                            <Button icon="pi pi-pencil" className="p-button-rounded p-button-success edit-place-button" onClick={() => editStaff() } />
                        </h5>
                        <SimpleTable columns={columns} tableData={placeStaffTableData} paginator totalRecords={placeStaffTableData.length} count={placeStaffTableData.length} />
                    </div>

                </div>
            </div>

        </MyPlaceWrapper>

    )
}
export default MyPlaceStaff
