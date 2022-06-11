import React, {useEffect, useState} from "react";
import {formFields, fieldType} from "../../constants/form";
import {I18n, Translate} from "react-redux-i18n";
import { useDispatch } from "react-redux";
import FormWrapper from "../primeCustomComponents/form/FormWrapper";
import FormElement from "../primeCustomComponents/form/FormElement";
import {ServiceRequestData} from '../../constants/service'
import {useCreateServiceWrapper} from '../../service/serviceWrapper'
import {Button} from "primereact/button"
import AuthenticationService from "../../service/auth/AuthenticationService"
import { handleErrorLoginResponse, handleSuccessLoginResponse } from "../../service/auth/handleAuthenticationServiceResponse";
const Login = () => {
  const serviceCall = useCreateServiceWrapper();
  let dispatch = useDispatch();

  const useHandleLoginSuccessResponse = handleSuccessLoginResponse()
  const useHandleLoginErrorResponse = handleErrorLoginResponse()

  const submitLogin = (data) => {
    if (data != null) {
      const loginParams = {
        username: data.username,
        password: data.password
      };
      serviceCall(new ServiceRequestData(
        AuthenticationService.login,
        loginParams,
        useHandleLoginSuccessResponse,
        useHandleLoginErrorResponse,
        null,
        null
      ))
    }
  };
  let initialValues = {
    [formFields.USERNAME]: "",
    [formFields.PASSWORD]: ""
  };
  return (
      <FormWrapper
        submitFunction={(data) => submitLogin(data)}
        initialValues={initialValues}
      >
        <div className="card">
          <div className="grid login text-center">
            <div className="xl:col-offset-4 col-12 xl:col-4 text-center">
              <img
                src={null}
                className="logoLogin"
                alt="Login background."
                style={{maxWidth: "30%"}}
              />
              <h2 className="login">
                <Translate value="label.login"/>
              </h2>
            </div>
          </div>
          <div className="grid loginColumn">
            <div className="xl:col-offset-4 col-12 xl:col-4">
              <FormElement
                label={formFields.USERNAME}
                fieldType={fieldType.INPUT_TEXT}
                required
                fieldProps={{name: formFields.USERNAME}}
              />
            </div>
          </div>
          <div className="grid loginColumn">
            <div className="xl:col-offset-4 col-12 xl:col-4">
              {" "}
              <FormElement
                label={formFields.PASSWORD}
                fieldType={fieldType.PASSWORD}
                required
                fieldProps={{
                  name: formFields.PASSWORD,
                  feedback: false,
                  toggleMask: true,
                }}
              />
            </div>
            <div className="col-4 xl"></div>
          </div>
          </div>
          <div className="grid loginColumn">
            <div className="xl:col-offset-4 col-12 xl:col-4">
              {" "}
              <Button
                style={{width: "100%"}}
                type="submit"
                label={I18n.t("action.Login")}
                className="mt-2 p-button-success"
              />
            </div>
            {" "}
          </div>
          <div className="grid loginColumn linkButtons">
            <div className="xl:col-offset-4 col-12 xl:col-2">
              <Button
                className="p-button-secondary p-button-text"
                style={{width: "100%", fontSize: "13px"}}
                label={I18n.t('action.register')}
                onClick={() => (window.location = "/registerAccount")}
              />
            </div>

            <div className="xl:col-2 col-12">
              <Button
                className="p-button-help p-button-text"
                style={{width: "100%", fontSize: "13px"}}
                label={I18n.t('action.forgotPassword')}
                onClick={() => (window.location = "/forgotPassword")}
              />
            </div>
          </div>
      </FormWrapper>
  );
};
export default Login;
