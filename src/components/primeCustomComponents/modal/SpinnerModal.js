import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Dialog } from 'primereact/dialog';
import { Translate } from 'react-redux-i18n';
import { ScaleLoader } from 'react-spinners';
import {modalIDs} from '../../../constants/environment'
import {getFromAppStore} from '../../../util/exportUtil'
import {applicationStore} from '../../../constants/storeConstants'
const SpinnerModal = () => {
    const modalReducer = useSelector((state) => state.modalReducer)
    const message = useSelector((state) => getFromAppStore(state, applicationStore.SPINNER_MESSAGE))
    const [showDialog, setShowDialog] = useState(false)

    useEffect(() => {
        setShowDialog(modalReducer.activeModals.indexOf(modalIDs.SPINNER) !== -1)
    }, [modalReducer])
    return (
        <Dialog resizable={false} showHeader={false} visible={showDialog} closeOnEscape={false} style={{ backgroundColor: 'transparent', boxShadow: 'none', width: 'auto', height: 'auto' }} contentStyle={{ backgroundColor: 'transparent', padding: "10vw" }}>
            <p>
                <div className='grid'>
                    <div className='col-12'>
                        {message ? <Translate value={message} /> : <div />}
                    </div>
                    <div className='col-12'>
                        <ScaleLoader color={'#fd7e14'} loading={true} size={40} /></div>

                </div>
            </p>
        </Dialog>
    );

}

export default SpinnerModal;
