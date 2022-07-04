import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { FileUpload } from 'primereact/fileupload';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Translate } from 'react-redux-i18n';
import { addToAppStore } from '../../../actions';
import { fieldType, formFields } from '../../../constants/form';
import { applicationStore } from '../../../constants/storeConstants';
import { getFromAppStore } from '../../../util/exportUtil';
import FormElement from '../../primeCustomComponents/form/FormElement';
import FormWrapper from '../../primeCustomComponents/form/FormWrapper';

export const ManageSeatTables = (props) => {
    const placeData = useSelector((state) => getFromAppStore(state, applicationStore.PLACE_DATA))
    const selectedReservationTypes = useSelector((state) => getFromAppStore(state, applicationStore.SELECTED_RESERVATION_TYPE))
    const selectedEventMap = useSelector((state) => getFromAppStore(state, applicationStore.SELECTED_EVENT_MAP))
    const [seatTablesList, setSeatTablesList] = useState(placeData && placeData.seatTableDtos ? placeData.seatTableDtos : []);
    const [uploadedMap, setUploadedMap] = useState(selectedEventMap);
    const dispatch = useDispatch()
    useEffect(() => {
        return () => {

        };
    }, [])
    let reservationTypeOptions = []
    if (selectedReservationTypes && selectedReservationTypes.length > 0) {
        reservationTypeOptions = selectedReservationTypes.map(x => ({
            label: x.name, value: x.name
        })
        )
    }
    const typeTemplate = (rowData) => {
        let initialValues = {
            [formFields.RESERVATION_TYPE_NAME + rowData.id]: ""
        };
        return <div class="grid">
            <div className="col-12">
                <FormWrapper
                    submitFunction={(data, resetFunc) => addNewType(data, resetFunc)}
                    initialValues={initialValues}>
                    <FormElement
                        label={formFields.RESERVATION_TYPE_NAME}
                        fieldType={fieldType.INPUT_DROPDOWN}
                        required
                        fieldProps=
                        {{
                            name: formFields.RESERVATION_TYPE_NAME + rowData.id,
                            options: reservationTypeOptions
                        }}
                    />
                </FormWrapper>
            </div>
        </div>
    }
    const uploadMap = async (event) => {
        // convert file to base64 encoded 
        const file = event.files[0];
        const reader = new FileReader();
        let blob = await fetch(file.objectURL).then(r => r.blob()); //blob:url
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
            const base64data = reader.result;
            dispatch(addToAppStore(applicationStore.SELECTED_EVENT_MAP, base64data))
            setUploadedMap(base64data)
        }
    }
    return (
            <div className='grid'>
            <div className="col-12 sm:col-12 md:col-6 lg:col-6 xl:col-6">
                <div className='card'>
                    <h5 className="headerItem">
                        <Translate value="label.seatTablesMap" />
                    </h5>
                    <FileUpload mode="basic" name="demo[]" accept="image/*" onSelect={uploadMap} />
                    <br/>
                    <div className="image-container">
                    {uploadedMap && <img src = {uploadedMap} maxWidth = {"20vw"}/>}

                    </div>

                </div>
            </div>
            <div className="col-12 sm:col-12 md:col-6 lg:col-6 xl:col-6">
                <div className='card'>
                    <h5 className="headerItem">
                        <Translate value="label.seatTables" />
                    </h5>
                    <div className="datatable-templating-demo">
                        <div className="card">
                            <DataTable value={seatTablesList} responsiveLayout="scroll">
                                <Column field="type" header="Type"></Column>
                                <Column field="number" header="number"></Column>
                                <Column header="Reservation type" body={typeTemplate} style={{ width: '40%' }}></Column>
                            </DataTable>
                        </div>
                    </div>
                </div>
            </div>
            </div>
    )
}
export default ManageSeatTables
