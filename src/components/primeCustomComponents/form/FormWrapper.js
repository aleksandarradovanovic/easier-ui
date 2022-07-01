import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from 'react-hook-form';
import { addErrorsToGlobalForm, addValuesToGlobalForm } from "../../../actions/globalFormActions";
import { getGlobalFormValues, getGlobalFormValuesErrors } from "../../../util/globalFormUtil";

const FormWrapper = ({ children, submitFunction, initialValues, formRules, mode }) => {
  let dispatch = useDispatch();
  let initialFormValues = {}
  let localFormElements = []
  if (initialValues) {
    initialFormValues = initialValues
    localFormElements = Object.keys(initialFormValues)
  }

  const values = useSelector((state) => getGlobalFormValues(state))
  const formErrors = useSelector((state) => getGlobalFormValuesErrors(state))
  const [currentErrors, setCurrentErrors] = useState(formErrors)
  if (values) {
    initialFormValues = { ...initialFormValues, ...values }
  }
  const { control, formState, formState: { errors }, getValues, trigger, handleSubmit, setValue, reset } = useForm({ defaultValues: initialFormValues, mode: mode ? mode : 'all' });
  const onSubmit = (data) => {
    dispatch(addValuesToGlobalForm(data))
    if (submitFunction) {
      submitFunction(data, reset);
    }
  };
  useEffect(() => {
    return () => {
      dispatch(addErrorsToGlobalForm(currentErrors))
    }
  }, [currentErrors])

  useEffect(() => {
    if (formState.errors && Object.keys(formState.errors).length > 0) {
      setCurrentErrors(formState.errors)
    }
  }, [formState])
  return (
    <FormProvider {...{ control: control, errors: errors, getValues: getValues, setValue: setValue, formState: formState, formRules: formRules, fieldValues: values }}>
      <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
        {children}
        {/* {process.env.NODE_ENV !== 'production' && <DevTool control={control} />} */}
      </form>
    </FormProvider>
  )
}
export default FormWrapper;