import React from 'react';
import { I18n, Translate } from 'react-redux-i18n';
import { Button } from 'primereact/button';
import { fieldType, formFields } from '../../../constants/form';
import FormWrapper from '../../primeCustomComponents/form/FormWrapper';
import FormElement from '../../primeCustomComponents/form/FormElement';
import { ServiceRequestData } from '../../../constants/service';
import UserService from '../../../service/user/UserService';
import { useCreateServiceWrapper } from '../../../service/serviceWrapper';
import { handleErrorRegisterResponse, handleSuccessRegisterResponse } from '../../../service/user/handleUserServiceResponse';
import AdminWrapper from '../AdminWrapper';
import { useSelector } from 'react-redux';
import { getGlobalFormValues } from '../../../util/globalFormUtil';

export const CreateUser = (props) => {
    const serviceCall = useCreateServiceWrapper();
    const formValues = useSelector((state) => getGlobalFormValues(state))
    const useHandleSuccessRegisterResponse = handleSuccessRegisterResponse()
    const useHandleErrorRegisterResponse = handleErrorRegisterResponse()

    const addUser = (data) => {
        if (data != null) {
            const createUserParams = {
                ...data
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
        [formFields.ACTOR_NAME]: "",
        [formFields.POSITION]: "",
        [formFields.PHONE_NUMBER]: "",
        [formFields.PASSWORD]: "",
        [formFields.PASSWORD_REPEATED]: "",
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
        <AdminWrapper>
            <div className="card">
                <div className='grid'>
                    <div className='col-12'>
                        <h5>
                            <Translate value="label.addNewMember" />
                        </h5>
                        <FormWrapper
                            submitFunction={(data) => addUser(data)}
                            initialValues={initialValues}
                            formRules={registerValidation()}
                        // mode={"onSubmit"}
                        >
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
                                        label={I18n.t('label.' + formFields.ACTOR_NAME)}
                                        additionalClass="col-lg-6"
                                        fieldType={fieldType.INPUT_DROPDOWN}
                                        required
                                        fieldProps={{
                                            name: formFields.ACTOR_NAME, options: [
                                                { label: "Admin", value: 1 },
                                                { label: "Public", value: 2 },
                                                { label: "Place", value: 3 },
                                            ]
                                        }}
                                    />
                                </div>
                                <div className="col-12 sm:col-12 lg:col-6 md:col-6 xl:col-6">
                                    <FormElement
                                        label={I18n.t('label.' + formFields.POSITION)}
                                        additionalClass="col-lg-6"
                                        required= {formValues && formValues[formFields.ACTOR_NAME] && formValues[formFields.ACTOR_NAME] == 3}
                                        fieldType={fieldType.INPUT_TEXT}
                                        fieldProps={{ name: formFields.POSITION }}
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
                                <Button label="Add" icon="pi pi-user" className="w-full" />
                            </div>
                        </FormWrapper>
                    </div>

                </div>
            </div>

        </AdminWrapper>

    )
}
export default CreateUser
