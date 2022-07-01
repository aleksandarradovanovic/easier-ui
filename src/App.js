/**
 * @author krsticn on 20/07/2018.
 */
import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { loadTranslations, setLocale } from 'react-redux-i18n'
import PropTypes from 'prop-types'
import CommonModals from './components/primeCustomComponents/modal/CommonModals';
import { getCookie } from './service/restHandler';
import { useCreateServiceWrapper } from './service/serviceWrapper';
import { ServiceRequestData } from './constants/service';
import AuthenticationService from './service/auth/AuthenticationService';
import Footer from './components/common/footer/Footer';
import MenuBar from './components/menu/MenuBar';
import { handleGetUserDataFromJwt } from './service/auth/handleAuthenticationServiceResponse';
const App = (props) => {
  const serviceCall = useCreateServiceWrapper();
  const useHandleGetUserDataFromJwt = handleGetUserDataFromJwt()
  const getUserDataFromJwt = () => {
    if (getCookie("jwt")) {
      serviceCall(new ServiceRequestData(
        AuthenticationService.getUserFromToken,
        null,
        useHandleGetUserDataFromJwt,
        null,
        null,
        null
      ))
    }
  }

  useEffect(() => {
    getUserDataFromJwt()
    const preSelectedLang = 'en'
    if (preSelectedLang) {
      // dispatch(loadTranslations(i18nApi.fetchI18n(preSelectedLang)));
      props.dispatch(loadTranslations(translationData))
      props.dispatch(setLocale(preSelectedLang))
    } else {
      props.dispatch(loadTranslations(translationData))
      // dispatch(loadTranslations(i18nApi.fetchI18n('en')));
      props.dispatch(setLocale('en'))

    }
  }, [])


  return (
    <Fragment>
      <CommonModals />
      <MenuBar />
      <div className='content'>
        {props.children}
      </div>
      <Footer />
    </Fragment>
  )
}

App.propTypes = {
  dispatch: PropTypes.any,
  children: PropTypes.any
}
function mapStateToProps(state) {
  return {
    locale: state.i18n.locale
  }
}

export default connect(mapStateToProps)(App)
