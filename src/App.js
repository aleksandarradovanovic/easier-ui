/**
 * @author krsticn on 20/07/2018.
 */
import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { loadTranslations, setLocale } from 'react-redux-i18n'
import PropTypes from 'prop-types'
import MenubarDemo from './testComponents/MenuBar';
import CommonModals from './components/primeCustomComponents/modal/CommonModals';
import { getCookie } from './service/restHandler';
import { useCreateServiceWrapper } from './service/serviceWrapper';
import { ServiceRequestData } from './constants/service';
import AuthenticationService from './service/auth/AuthenticationService';
import Footer from './components/common/footer/Footer';
const App = (props) => {
  const serviceCall = useCreateServiceWrapper();

  const getUserDataFromJwt = () => {
    if (getCookie("jwt")) {
      serviceCall(new ServiceRequestData(
        AuthenticationService.getUserFromToken,
        null,
        null,
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
      <MenubarDemo />
      {props.children}
      <Footer/>
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
