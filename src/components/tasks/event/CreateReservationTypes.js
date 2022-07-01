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

export const CreateReservationTypes = (props) => {
    const selectedType = useSelector((state) => getFromAppStore(state, applicationStore.SELECTED_RESERVATION_TYPE))
    const [reservationTypeList, setReservationTypeList] = useState(selectedType || []);

    const dispatch = useDispatch()
    useEffect(() => {
        return () => {
            dispatch(addToAppStore(applicationStore.SELECTED_RESERVATION_TYPE, reservationTypeList))

        };
    }, [])
    let initialValues = {
        [formFields.SEAT_TABLE_TYPE]: "",
        [formFields.SEAT_TABLE_ID]: "",
    };
    let columns = [
        {
            header: "Name",
            field: "name"
        },
        {
            header: "Price",
            field: "price"
        },
        {
            header: "Max number of guests",
            field: "maxNumberOfGuests"
        },
        {
            header: "Remark",
            field: "remark"
        }
    ]
    const onDelete = (row, col) => {
        let newReservationTypeList = reservationTypeList.filter(x => x.id != row.id)
        setReservationTypeList([...newReservationTypeList])

    }
    const addNewType = (data, resetFunc) => {
        let newReservationTypeList = reservationTypeList
        newReservationTypeList.push({
            name: data[formFields.RESERVATION_TYPE_NAME],
            price: parseInt(data[formFields.RESERVATION_TYPE_PRICE]),
            maxNumberOfGuests: parseInt(data[formFields.RESERVATION_TYPE_MAX_NUMBER_OF_GUESTS]),
            remark: data[formFields.RESERVATION_TYPE_REMARK]
        })
        setReservationTypeList([...newReservationTypeList])
        dispatch(addToAppStore(applicationStore.SELECTED_RESERVATION_TYPE, newReservationTypeList))
        resetFunc()
    }
    return (
        <Fragment>
            <FormWrapper
                submitFunction={(data, resetFunc) => addNewType(data, resetFunc)}
                initialValues={initialValues}>
                <div className='grid'>
                    <div className="col-12 sm:col-12 lg:col-6 md:col-6 xl:col-6">
                        <div className='card'>
                            <h5 className="headerItem">
                                <Translate value="label.addType" />
                            </h5>
                            <div class="grid">
                                <div className="col-12">
                                    <FormElement
                                        label={formFields.RESERVATION_TYPE_NAME}
                                        fieldType={fieldType.INPUT_TEXT}
                                        required
                                        fieldProps=
                                        {{
                                            name: formFields.RESERVATION_TYPE_NAME
                                        }}
                                    />
                                </div>
                                <div className="col-12">
                                    <FormElement
                                        label={formFields.RESERVATION_TYPE_PRICE}
                                        fieldType={fieldType.INPUT_TEXT}
                                        required
                                        fieldProps={{ name: formFields.RESERVATION_TYPE_PRICE }}
                                    />
                                </div>
                                <div className="col-12">
                                    <FormElement
                                        label={formFields.RESERVATION_TYPE_MAX_NUMBER_OF_GUESTS}
                                        fieldType={fieldType.INPUT_TEXT}
                                        required
                                        fieldProps={{ name: formFields.RESERVATION_TYPE_MAX_NUMBER_OF_GUESTS }}
                                    />
                                </div>
                                <div className="col-12">
                                    <FormElement
                                        label={formFields.RESERVATION_TYPE_REMARK}
                                        fieldType={fieldType.TEXT_AREA}
                                        required
                                        fieldProps={{ name: formFields.RESERVATION_TYPE_REMARK }}
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
                                <Translate value="label.reservationTypes" />
                            </h5>
                            <SimpleTable columns={columns} tableData={reservationTypeList} onDelete={onDelete} paginator totalRecords={reservationTypeList.length} count={reservationTypeList.length} />
                        </div>
                    </div>
                </div>

            </FormWrapper>
        </Fragment>

    )
}
export default CreateReservationTypes
