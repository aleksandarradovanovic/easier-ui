import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { I18n, Translate } from 'react-redux-i18n';
import {modalIDs} from '../../../constants/environment'
import {closeModal} from '../../../actions/index'
import {getFromAppStore} from '../../../util/exportUtil'
import {applicationStore} from '../../../constants/storeConstants'
const ErrorModal = () => {
    const modalReducer = useSelector((state) => state.modalReducer)
    const message = useSelector((state) => getFromAppStore(state, applicationStore.ERROR_MESSAGE))
    const [showDialog, setShowDialog] = useState(false)
    const dispatch = useDispatch()
    const onClose = () => {
        dispatch(closeModal(modalIDs.ERROR))
    }
    useEffect(() => {
        setShowDialog(modalReducer.activeModals.indexOf(modalIDs.ERROR) !== -1)
    }, [modalReducer])

    const footer = <Button label={I18n.t('action.ok')} icon="pi pi-times" onClick={() => onClose()} className="p-button-text" />
    return (
        <Dialog header={<Translate value={"label.error"} />} visible={showDialog} style={{ width: '50vw' }} footer={footer} onHide={() => onClose()}>
            <p> {message ? <Translate value={message}/>: <div/>}</p>
        </Dialog>
    );

}

export default ErrorModal;