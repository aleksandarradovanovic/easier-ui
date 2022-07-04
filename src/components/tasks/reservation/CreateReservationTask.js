import React, { useState } from 'react';
import { OrderList } from 'primereact/orderlist';
import { useSelector } from 'react-redux';
import { getFromAppStore } from '../../../util/exportUtil';
import { applicationStore } from '../../../constants/storeConstants';
import FormWrapper from '../../primeCustomComponents/form/FormWrapper';
import FormElement from '../../primeCustomComponents/form/FormElement';
import { fieldType, formFields } from '../../../constants/form';
import { Button } from 'primereact/button';
import { I18n, Translate } from 'react-redux-i18n';
import { useHandleCallReservationService } from './handleReservationServices';
import { Dialog } from 'primereact/dialog';
import { SelectButton } from 'primereact/selectbutton';

export const CreateReservationTask = (props) => {
    // const handleGetEventService = useHandleCallEventService()
    const selectedEvent = useSelector((state) => getFromAppStore(state, applicationStore.EVENT_DATA))
    const [selectedType, setSelectedType] = useState(null);
    const [reservationTypes, setReservationTypes] = useState(selectedEvent && selectedEvent.reservationTypeDtos ? selectedEvent.reservationTypeDtos : []);
    const [displayChooseSeatDialog, setDisplayChooseSeatDialog] = useState(false);
    const [seatTableValue, setSeatTableValue] = useState(null);

    const useHandleReservationService = useHandleCallReservationService();
    const onTypeSelect = (type) => {
        setDisplayChooseSeatDialog(true)
        setSelectedType(type)
    }
    const onSaveReservation = (data) => {
        useHandleReservationService.handleCreateReservationService(data, selectedType, seatTableValue)
    }
    const itemTemplate = (item) => {
        return (
            <div className="product-item" onClick={() => onTypeSelect(item)}>
                <div className="image-container">
                    <img src={process.env.PUBLIC_URL + "/ticketPlaceholder.png"} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={item.name} />
                </div>
                <div className="product-list-detail">
                    <h5 className="mb-2">{item.name}</h5>
                    <i className="pi pi-comment product-category-icon"></i>
                    <span className="product-category">{item.remark}</span>
                </div>
                <div className="product-list-action">
                    <h6 className="mb-2">${item.price}</h6>
                    <span className={`product-badge status`}><Translate value="label.reservationTypeMaxNumberOfGuests" /> : {item.maxNumberOfGuests}</span>
                </div>
            </div>
        );
    }
    let initialValues = {
        [formFields.RESERVATION_TYPE_NAME]: "",
        [formFields.RESERVATION_NUMBER_OF_GUESTS]: "",
        [formFields.RESERVATION_EMAIL]: "",
    };
    const onSaveSeat = () => {
        setDisplayChooseSeatDialog(false)
    }
    const footer = (
        <div>
            <Button label="Ok" icon="pi pi-check" onClick={onSaveSeat} />
        </div>
    );
    const getSeatTablesForSelectedType = () => {
        let seatTables = []
        if (selectedType && selectedType.availableSeatTablesDto && selectedType.availableSeatTablesDto) {
            seatTables = selectedType.availableSeatTablesDto.map(x => ({
                label: x.seatTableDto.number, value: x.seatTableDto.id
            }))
        }
        return seatTables
    }
    const paymentOptions = [];

    return (
        <div className="orderlist-demo">
            <Dialog header="Choose your seat/table" footer={footer} visible={displayChooseSeatDialog} style={{ width: '90vw' }} modal onHide={() => {
                setSelectedType(null)
                setDisplayChooseSeatDialog(false)
            }}>
                <div className='grid'>
                    <div className='col-6'>
                        <SelectButton value={seatTableValue} options={getSeatTablesForSelectedType()} onChange={(e) => setSeatTableValue(e.value)} optionLabel="label" optionValue="value" multiple />
                    </div>
                    <div className='col-6'>
                        <h5>
                            <Translate value="label.tableSeatMap" />
                        </h5>
                        {selectedEvent && selectedEvent.eventPlaceMap && <img src={selectedEvent.eventPlaceMap} alt={'map'} width="70%" />}
                    </div>
                </div>
            </Dialog>
            <div className="card">
                <div className='grid'>
                    <div className='col-12 sm:col-12 md:col-6 lg:col-6 xl:col-6'>
                        <OrderList value={reservationTypes} header="Please choose reservation type" dragdrop listStyle={{ height: 'auto' }} dataKey="name"
                            itemTemplate={itemTemplate} onChange={(e) => setReservationTypes(e)}></OrderList>
                    </div>
                    <div className='col-12 sm:col-12 md:col-6 lg:col-6 xl:col-6'>
                        <h5 className="sectionTitle">
                            <Translate value="label.reservationInformation" />
                        </h5>
                        <FormWrapper
                            submitFunction={(data, resetFunc) => { onSaveReservation(data) }}
                            initialValues={initialValues}>
                            <div class="grid">
                                <div className="col-12">
                                    <FormElement
                                        label={formFields.RESERVATION_NAME_ON}
                                        fieldType={fieldType.INPUT_TEXT}
                                        required
                                        fieldProps=
                                        {{
                                            name: formFields.RESERVATION_NAME_ON
                                        }}
                                    />
                                </div>
                                <div className="col-12">
                                    <FormElement
                                        label={formFields.RESERVATION_NUMBER_OF_GUESTS}
                                        fieldType={fieldType.INPUT_TEXT}
                                        required
                                        fieldProps=
                                        {{
                                            name: formFields.RESERVATION_NUMBER_OF_GUESTS
                                        }}
                                    />
                                    <FormElement
                                        label={formFields.RESERVATION_EMAIL}
                                        fieldType={fieldType.INPUT_TEXT}
                                        required
                                        fieldProps=
                                        {{
                                            name: formFields.RESERVATION_EMAIL
                                        }}
                                    />
                                </div>
                                <div className="xl:col-offset-4 col-12 xl:col-4">
                                    <Button
                                        style={{ width: "100%" }}
                                        icon="pi pi-save"
                                        type="submit"
                                        label={I18n.t("action.reserve")}
                                        className="mt-2 p-button-success"
                                    />
                                </div>
                            </div>

                        </FormWrapper>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default CreateReservationTask
