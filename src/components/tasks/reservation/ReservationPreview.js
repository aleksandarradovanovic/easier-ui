import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { I18n, Translate } from 'react-redux-i18n';
import { useHistory } from 'react-router';
import { applicationStore } from '../../../constants/storeConstants';
import { getFromAppStore } from '../../../util/exportUtil';
import { useHandleCallReservationService } from './handleReservationServices';
import moment from 'moment'
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import QRCode from "react-qr-code";
import { Tag } from 'primereact/tag';
export const ReservationPreview = (props) => {
    const handleReservationService = useHandleCallReservationService()
    const history = useHistory();
    const selectedReservation = useSelector((state) => getFromAppStore(state, applicationStore.RESERVATION_DATA))

    useEffect(() => {

    }, [])
    const header = (
        <QRCode value={selectedReservation.qrCodeContent + ";" + selectedReservation.id} size={370} />
    );
    const footer = (
        <span>
            <i className="pi pi-clock product-category-icon"></i>
            <span className={`product-badge status`}>{moment(selectedReservation.eventStartTime).format('DD/MM/YYYY, h:mm')}</span>
        </span>
    );
    return (
        <div className="card">
            <div className='grid'>
                <div className='col-12'>
                    <h5>
                        <Button icon="pi pi-arrow-left" className="p-button-rounded p-button-info edit-place-button" onClick={() => history.push("myReservations")} />
                    </h5>
                    <Card title={selectedReservation.eventName} subTitle={selectedReservation.placeName} footer={footer} header={header} style={{ textAlign: 'center', justifyContent: 'center', marginTop: "4%" }}>
                        <Tag value={I18n.t("label.nameOnReservation") + " : " + selectedReservation.nameOn} icon="pi pi-user" severity="warning" style={{ margin: "2%" }}></Tag>
                        <Tag value={I18n.t("label.type") + " : " + selectedReservation.reservationTypeDto.name} icon="pi pi-cog" severity="warning" style={{ margin: "2%" }}></Tag>
                        <Tag value={I18n.t("label.price") + " : " + selectedReservation.reservationTypeDto.price} icon="pi pi-dollar" severity="warning" style={{ margin: "2%" }}></Tag>
                    </Card>
                </div>
            </div>

        </div>
    )
}
export default ReservationPreview
