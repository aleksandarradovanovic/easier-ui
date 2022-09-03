import React from "react";
import { formFields, fieldType } from "../../constants/form";
import { I18n } from "react-redux-i18n";
import { connect, useDispatch, useSelector } from "react-redux";
import FormWrapper from "../primeCustomComponents/form/FormWrapper";
import FormElement from "../primeCustomComponents/form/FormElement";
import { ServiceRequestData } from '../../constants/service'
import { useCreateServiceWrapper } from '../../service/serviceWrapper'
import { Button } from "primereact/button"
import UserService from "../../service/user/UserService";
import { handleErrorRegisterResponse, handleSuccessRegisterResponse } from "../../service/user/handleUserServiceResponse";
import { getGlobalFormValues } from "../../util/globalFormUtil";
const RegisterUser = (props) => {
  const serviceCall = useCreateServiceWrapper();
  let dispatch = useDispatch();
  const formValues = useSelector((state) => getGlobalFormValues(state))

  const useHandleSuccessRegisterResponse = handleSuccessRegisterResponse()
  const useHandleErrorRegisterResponse = handleErrorRegisterResponse()

  const submitLogin = (data) => {
    if (data != null) {
      const createUserParams = {
        ...data,
        actorId: 2
      };
      serviceCall(new ServiceRequestData(
        UserService.createUser,
        createUserParams,
        useHandleSuccessRegisterResponse,
        useHandleErrorRegisterResponse,
        null,
        null
      ))
    }
  };
  let initialValues = {
    [formFields.FIRST_NAME]: "",
    [formFields.LAST_NAME]: "",
    [formFields.DATE_OF_BIRTH]: "",
    [formFields.USERNAME]: "",
    [formFields.EMAIL]: "",
    [formFields.PHONE_NUMBER]: "",
    [formFields.PASSWORD]: "",
    [formFields.PASSWORD_REPEATED]: ""
  };
  let registerValidation = () => {
    const emailRegex =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const phoneRegex =  /^(\+\d{1,3}[- ]?)?\d{8,11}$/
    let rules = {}
    rules[formFields.EMAIL] = {
        pattern: { value: emailRegex, message: "Wrong email format" }
    }
    rules[formFields.PHONE_NUMBER] = {
        pattern: { value: phoneRegex, message: "Wrong phone format" }
    }
    rules[formFields.PASSWORD_REPEATED] = {
        validate: {
            PasswordRepeatIsNotSameAsPassword: (value) => {
                if(value && formValues[formFields.PASSWORD]){
                    if(formValues[formFields.PASSWORD] != value){
                        return false
                    }
                }
            }
        }
    }

    return rules
}
  return (
    <FormWrapper
      submitFunction={(data) => submitLogin(data)}
      initialValues={initialValues}
      formRules={registerValidation()}

    // mode={"onSubmit"}
    >
      <div className="flex align-items-center justify-content-center">
        <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
          <div className="text-center mb-5">
            <img src={process.env.PUBLIC_URL + "/logo.png"} alt="hyper" height={50} className="mb-3" />
            <div className="text-900 text-3xl font-medium mb-3">Register account</div>
            <span className="text-600 font-medium line-height-3">You have an account?</span>
            <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Please login</a>
          </div>

          <div className="grid">
            <div className="col-12 sm:col-12 lg:col-6 md:col-6 xl:col-6">
              <FormElement
                label={I18n.t('label.' + formFields.FIRST_NAME)}
                fieldType={fieldType.INPUT_TEXT}
                required
                fieldProps={{ name: formFields.FIRST_NAME }}
              />
            </div>
            <div className="col-12 sm:col-12 lg:col-6 md:col-6 xl:col-6">
              <FormElement
                label={I18n.t('label.' + formFields.LAST_NAME)}
                additionalClass="col-lg-6"
                fieldType={fieldType.INPUT_TEXT}
                required
                fieldProps={{ name: formFields.LAST_NAME }}
              />
            </div>
            <div className="col-12 sm:col-12 lg:col-6 md:col-6 xl:col-6">
              <FormElement
                label={I18n.t('label.' + formFields.DATE_OF_BIRTH)}
                additionalClass="col-lg-6"
                fieldType={fieldType.INPUT_DATE_PICKER}
                required
                fieldProps={{ name: formFields.DATE_OF_BIRTH }}
              />
            </div>
            <div className="col-12 sm:col-12 lg:col-6 md:col-6 xl:col-6">
              <FormElement
                label={I18n.t('label.' + formFields.USERNAME)}
                fieldType={fieldType.INPUT_TEXT}
                required
                fieldProps={{ name: formFields.USERNAME }}
              />
            </div>
            <div className="col-12 sm:col-12 lg:col-6 md:col-6 xl:col-6">
              <FormElement
                label={I18n.t('label.' + formFields.EMAIL)}
                additionalClass="col-lg-6"
                fieldType={fieldType.INPUT_TEXT}
                required
                fieldProps={{ name: formFields.EMAIL }}
              />
            </div>
            <div className="col-12 sm:col-12 lg:col-6 md:col-6 xl:col-6">
              <FormElement
                label={I18n.t('label.' + formFields.PHONE_NUMBER)}
                additionalClass="col-lg-6"
                fieldType={fieldType.INPUT_TEXT}
                fieldProps={{ name: formFields.PHONE_NUMBER }}
              />
            </div>

            <div className="col-12 sm:col-12 lg:col-6 md:col-6 xl:col-6">
              <FormElement
                label={I18n.t('label.' + formFields.PASSWORD)}
                fieldType={fieldType.PASSWORD}
                required
                fieldProps={{
                  name: formFields.PASSWORD,
                  feedback: true,
                  toggleMask: true,
                }}
              />
            </div>
            <div className="col-12 sm:col-12 lg:col-6 md:col-6 xl:col-6">
              <FormElement
                label={I18n.t('label.' + formFields.PASSWORD_REPEATED)}
                fieldType={fieldType.PASSWORD}
                required
                fieldProps={{
                  name: formFields.PASSWORD_REPEATED,
                  feedback: false,
                  toggleMask: true,
                }}
              />
            </div>
            <Button label="Sign up" icon="pi pi-user" className="w-full" />
          </div>
        </div>
      </div>
    </FormWrapper>
  );
};
function mapStateToProps(state) {
  return {
    locale: state.i18n.locale
  }
}

export default connect(mapStateToProps)(RegisterUser)
