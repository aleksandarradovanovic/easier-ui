import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router";
import { fieldType, formFields } from '../../../constants/form';
import { useHandleUserServices } from '../../user/handleUserServices';
import { Dialog } from 'primereact/dialog';
import FormWrapper from '../../primeCustomComponents/form/FormWrapper';
import FormElement from '../../primeCustomComponents/form/FormElement';
import { I18n } from 'react-redux-i18n';
import { Button } from 'primereact/button';
import { useDispatch, useSelector } from 'react-redux';
import { getGlobalFormValues } from '../../../util/globalFormUtil';
import { clearForm } from '../../../actions/globalFormActions';
import moment from 'moment'
export const EditUserModal = (props) => {
    const [displayModal, setDisplayModal] = useState(props.displayModal);
    const handleUserServices = useHandleUserServices()
    const globalFormValues = useSelector((state) => getGlobalFormValues(state))
    const dispatch = useDispatch()
    let initialValues = {
        [formFields.FIRST_NAME]: "",
        [formFields.LAST_NAME]: "",
        [formFields.DATE_OF_BIRTH]: "",
        [formFields.USERNAME]: "",
        [formFields.EMAIL]: "",
        [formFields.POSITION]: "",
        [formFields.PHONE_NUMBER]: "",
        [formFields.PASSWORD]: "",
        [formFields.PASSWORD_REPEATED]: "",
    };
    const updateUser = () => {
        handleUserServices.updateUserService({ ...props.userData, ...globalFormValues }, (data) => {
            if (props.additionalOnEdit) {
                props.additionalOnEdit()
            }
            dispatch(clearForm())
            setDisplayModal(false)

        })

    }
    useEffect(() => {
        console.log(props.displayModal, 'props.displayModal');
        setDisplayModal(props.displayModal)
    }, [props])
    const saveChanges = (row, col) => {
        updateUser(row.id)
    }


    if (props.userData) {
        let { userData } = props
        initialValues = {
            [formFields.FIRST_NAME]: userData.firstName,
            [formFields.LAST_NAME]: userData.lastName,
            [formFields.DATE_OF_BIRTH]: moment(userData.dateOfBirth).toDate(),
            [formFields.USERNAME]: userData.userName,
            [formFields.EMAIL]: userData.email,
            [formFields.POSITION]: userData.position,
            [formFields.PHONE_NUMBER]: userData.phoneNumber,
            [formFields.PASSWORD]: "",
            [formFields.PASSWORD_REPEATED]: "",
        }
    }
    console.log(initialValues, 'initialValues');
    const footer = (
        <div>
            <Button label="Save changes" icon="pi pi-check" onClick={saveChanges} />
        </div>
    );

    return (
        <Dialog header="Edit user" visible={displayModal} footer={footer} style={{ width: '50vw' }} modal onHide={() => {
            setDisplayModal(false)
        }}>

            <div className="surface-0">

                <FormWrapper
                    submitFunction={(data) => { }}
                    initialValues={initialValues}
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
                                label={I18n.t('label.' + formFields.POSITION)}
                                additionalClass="col-lg-6"
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
                    </div>
                </FormWrapper>
            </div>

        </Dialog>


    )
}
export default EditUserModal
