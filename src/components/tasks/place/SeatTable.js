import { Button } from 'primereact/button';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { I18n, Translate } from 'react-redux-i18n';
import { addToAppStore } from '../../../actions';
import { fieldType, formFields } from '../../../constants/form';
import { applicationStore } from '../../../constants/storeConstants';
import { getFromAppStore } from '../../../util/exportUtil';
import FormElement from '../../primeCustomComponents/form/FormElement';
import FormWrapper from '../../primeCustomComponents/form/FormWrapper';
import SimpleTable from '../../primeCustomComponents/table/SimpleTable';

export const SeatTable = (props) => {
    const selectedSeatTables = useSelector((state) => getFromAppStore(state, applicationStore.SELECTED_SEAT_TABLE))
    const [seatTablesList, setSeatTablesList] = useState(selectedSeatTables || []);

    const dispatch = useDispatch()
    useEffect(() => {
        return () => {
            dispatch(addToAppStore(applicationStore.SELECTED_SEAT_TABLE, seatTablesList))

        };
    }, [])
    let initialValues = {
        [formFields.SEAT_TABLE_TYPE]: "",
        [formFields.SEAT_TABLE_ID]: "",
    };
    let columns = [
        {
            header: "Type",
            field: "type"
        },
        {
            header: "ID",
            field: "id"
        }
    ]
    const onDelete = (row, col) => {
        let newSeatTableList = seatTablesList.filter(x => x.id != row.id)
        setSeatTablesList([...newSeatTableList])

    }
    const addNewSeat = (data, resetFunc) => {
        let newSeatTableList = seatTablesList
        newSeatTableList.push({
            type: data[formFields.SEAT_TABLE_TYPE],
            id: data[formFields.SEAT_TABLE_ID]
        })
        setSeatTablesList([...newSeatTableList])
        dispatch(addToAppStore(applicationStore.SELECTED_SEAT_TABLE, newSeatTableList))
        resetFunc()
    }
    return (
        <Fragment>
            <FormWrapper
                submitFunction={(data, resetFunc) => addNewSeat(data, resetFunc)}
                initialValues={initialValues}>
                <div className='grid'>
                    <div className="col-12 sm:col-12 lg:col-6 md:col-6 xl:col-6">
                        <div className='card'>
                            <h5 className="headerItem">
                                <Translate value="label.addSeatTable" />
                            </h5>
                            <div class="grid">
                                <div className="col-12">
                                    <FormElement
                                        label={formFields.SEAT_TABLE_TYPE}
                                        fieldType={fieldType.INPUT_DROPDOWN}
                                        required
                                        fieldProps=
                                        {{
                                            name: formFields.SEAT_TABLE_TYPE,
                                            options: [
                                                { label: "Seat", value: "seat" },
                                                { label: "Table", value: "Table" },
                                            ]
                                        }}
                                    />
                                </div>
                                <div className="col-12">
                                    <FormElement
                                        label={formFields.SEAT_TABLE_ID}
                                        fieldType={fieldType.INPUT_TEXT}
                                        required
                                        fieldProps={{ name: formFields.SEAT_TABLE_ID }}
                                    />
                                </div>
                                <div className="xl:col-offset-4 col-12 xl:col-4">
                                    <Button
                                        style={{ width: "100%" }}
                                        icon="pi pi-plus"
                                        type="submit"
                                        label={I18n.t("action.Add")}
                                        className="mt-2 p-button-success"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 sm:col-12 lg:col-6 md:col-6 xl:col-6">
                        <div className='card'>
                            <h5 className="headerItem">
                                <Translate value="label.seatTables" />
                            </h5>
                            <SimpleTable columns={columns} tableData={seatTablesList} onDelete={onDelete} paginator totalRecords={seatTablesList.length} count={seatTablesList.length} />
                        </div>
                    </div>
                </div>

            </FormWrapper>
        </Fragment>

    )
}
export default SeatTable
