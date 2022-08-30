import React from "react";
import { formFields, fieldType } from "../../constants/form";
import { I18n, Translate } from "react-redux-i18n";
import { useDispatch } from "react-redux";
import FormWrapper from "../primeCustomComponents/form/FormWrapper";
import FormElement from "../primeCustomComponents/form/FormElement";
import { ServiceRequestData } from '../../constants/service'
import { useCreateServiceWrapper } from '../../service/serviceWrapper'
import { Button } from "primereact/button"
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
      <div className="flex align-items-center justify-content-center">
        <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
          <div className="text-center mb-5">
            <img src={process.env.PUBLIC_URL + "/logo.png"} alt="hyper" height={50} className="mb-3" />
            <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
            <span className="text-600 font-medium line-height-3">Don't have an account?</span>
            <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer" href = "/register">Create today!</a>
          </div>

          <div className="grid">
            <div className="col-12">
            <FormElement
              label={I18n.t('label.' + formFields.USERNAME)}
              fieldType={fieldType.INPUT_TEXT}
              required
              fieldProps={{ name: formFields.USERNAME }}
            />
            </div>
            <div className="col-12">
            <FormElement
              label={I18n.t('label.' + formFields.PASSWORD)}
              fieldType={fieldType.PASSWORD}
              required
              fieldProps={{
                name: formFields.PASSWORD,
                feedback: false,
                toggleMask: true,
              }}
            />
            </div>
            <div className="flex align-items-center justify-content-between mb-6">
              <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot your password?</a>
            </div>

            <Button label="Sign In" icon="pi pi-user" className="w-full" />
          </div>
        </div>
      </div>



    </FormWrapper>
  );
};
export default Login;
