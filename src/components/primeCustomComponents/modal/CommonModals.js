import React, { Fragment } from 'react';
import ErrorModal from './ErrorModal';
import MessageModal from './MessageModal';
import SpinnerModal from './SpinnerModal';
const CommonModals = () => {
  return (
    <Fragment>
      <MessageModal />
      <ErrorModal />
      <SpinnerModal />
    </Fragment>
  )

}
export default CommonModals;