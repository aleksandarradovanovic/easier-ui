import React, { Fragment, memo, useEffect } from "react";
import { fieldType as fieldTypeName } from "../../../constants/form";
import { Controller, useFormContext } from 'react-hook-form';
import { I18n } from "react-redux-i18n";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { classNames } from "primereact/utils";
import { Checkbox } from "primereact/checkbox";
import { RadioButton } from "primereact/radiobutton";
import { SelectButton } from "primereact/selectbutton";
import { Password } from "primereact/password";
import { InputMask } from "primereact/inputmask";
import { InputTextarea } from 'primereact/inputtextarea';
import { Slider } from 'primereact/slider';
import { useDispatch, useSelector } from "react-redux";
import { getGlobalFormValues } from "../../../util/globalFormUtil";
import { addValuesToGlobalForm } from "../../../actions/globalFormActions";
//todo improve performance of rendering
export const NestedInput = memo(
  (props) => {
    const { errors, control, setValue, label, fieldType, fieldProps, additionalClass, readOnly, required, validationRules, formRules } = props
    const { name } = fieldProps
    const dispatch = useDispatch();
    const globalFormValues = useSelector((state) => getGlobalFormValues(state))

    useEffect(() => {
      if (globalFormValues[name]) {
        setValue(name, globalFormValues[name])
      }
    }, [globalFormValues])

    let style = {}
    if (additionalClass) {
      style = { ...style, additionalClass }
    }
    if (readOnly) {
      style = { ...style, backgroundColor: "#ccc" }
    }
    let rules = {}
    if (formRules && formRules[name]) {
      rules = formRules[name]
    }
    if (validationRules && validationRules) {
      rules = validationRules
    }

    if (required) {
      rules = { ...rules, required: I18n.t(name + "Required") }

    }
    const resolveType = (field, fieldState, fieldProps) => {
      function onChange(e) {
        if (fieldProps.onChange) {
          fieldProps.onChange(e);
        }
        if (e.target && e.target.value) {
          if (e.target.value != '') {
            dispatch(addValuesToGlobalForm({ [name]: e.target.value }))
          }
        } else if (e.value) {
          dispatch(addValuesToGlobalForm({ [name]: e.value }))

        }
        field.onChange(e);
      }
      let invalidClassName = ""
      if (errors[name]) {
        invalidClassName = "p-invalid"
      }
      switch (fieldType) {
        case fieldTypeName.CHECKBOX:
          return <Checkbox inputId={field.name} {...field} {...fieldProps} checked={field.value} onChange={(e) => onChange(e)} disabled={readOnly} style={style} className={classNames(invalidClassName)} />
        case fieldTypeName.CHECKBOX_CUSTOM:
          return <Fragment />
        case fieldTypeName.RADIO: {
          let component = null;
          if (fieldProps.options && fieldProps.options.length > 0) {
            component = fieldProps.options.map(x => {
              return <div key={x.value} className="field-radiobutton"> <RadioButton {...field}  {...fieldProps} value={x.value} onChange={(e) => onChange(e)} disabled={readOnly} style={style} checked={field.value === x.value} /> <label htmlFor={x.key}>{x.name}</label></div>
            })
          }
          return component
        }
        case fieldTypeName.SELECT_BUTTON: {
          return <SelectButton {...field} {...fieldProps} onChange={(e) => onChange(e)} disabled={readOnly} style={style} optionLabel="name" />
        }
        case fieldTypeName.RADIO_INLINE: {
          let component = null;
          if (fieldProps.options && fieldProps.options.length > 0) {
            component = fieldProps.options.map(x => {
              return <div key={x.value} className="field-radiobutton"> <RadioButton {...field}  {...fieldProps} value={x.value} onChange={(e) => onChange(e)} disabled={readOnly} style={style} checked={field.value === x.value} /> <label htmlFor={x.key}>{x.name}</label></div>
            })
          }
          return component

        }
        case fieldTypeName.INPUT_TEXT: {
          return <InputText id={field.name} {...field} {...fieldProps} disabled={readOnly} onChange={(e) => onChange(e)} style={style} className={classNames(invalidClassName)} />

        }
        case fieldTypeName.INPUT_DROPDOWN: {
          return <Dropdown id={field.name} {...field} {...fieldProps} onChange={(e) => onChange(e)} disabled={readOnly} style={style} className={classNames(invalidClassName)} />

        }
        case fieldTypeName.INPUT_DATE_PICKER: {
          return <Calendar id={field.name} {...field} {...fieldProps} onChange={(e) => onChange(e)} disabled={readOnly} style={style} className={classNames(invalidClassName)} />

        }
        case fieldTypeName.INPUT_UPLOAD: {
          return <Fragment />

        }
        case fieldTypeName.TEXT_AREA: {
          return <InputTextarea id={field.name} {...field} {...fieldProps} onChange={(e) => onChange(e)} disabled={readOnly} style={style} className={classNames(invalidClassName)} />

        }
        case fieldTypeName.PASSWORD: {
          return <Password id={field.name} {...field} {...fieldProps} onChange={(e) => onChange(e)} disabled={readOnly} style={style} className={classNames(invalidClassName)} />

        }
        case fieldTypeName.INPUT_MASK: {
          return <InputMask id={field.name} {...field} {...fieldProps} onChange={(e) => onChange(e)} disabled={readOnly} style={style} className={classNames(invalidClassName)} />

        }
        case fieldTypeName.INPUT_TEXT_AUTOCOMPLETE: {
          return <Fragment />

        }
        case fieldTypeName.INPUT_TEXT_SELECTABLE_OPTIONS: {
          return <Fragment />

        }
        case fieldTypeName.INPUT_TEXT_GROUP: {
          return <div className="p-inputgroup">
            {fieldProps.before}
            <InputText id={field.name} {...field} {...fieldProps} onChange={(e) => onChange(e)} disabled={readOnly} style={style} className={classNames(invalidClassName)} />
            {fieldProps.after}
          </div>

        }
        case fieldTypeName.SLIDER: {
          let value = ""
          if (globalFormValues && globalFormValues[name]) {
            value = globalFormValues[name]
          }
          let sliderValue = ""
          if (value) {
            if (fieldProps.range) {
              sliderValue = <div>{value[0] + "-" + value[1]}</div>
            } else {
              sliderValue = <div>{value}</div>

            }
          }
          return <div>
            {sliderValue}
            <Slider id={field.name} {...field} {...fieldProps} onChange={(e) => onChange(e)} disabled={readOnly} style={style} className={classNames(invalidClassName)} />
          </div>

        }
      }

    }
    let showErrorMessage = false
    if (errors[name] && fieldType != fieldTypeName.CHECKBOX) {
      showErrorMessage = true
    }
    const getFormErrorMessage = (name) => {
      let message
      if (errors && errors[name] && errors[name].message) {
        message = errors[name].message
      } else if (errors && errors[name] && errors[name].type) {
        message = errors[name].type
      }
      return showErrorMessage && <small className={"p-error"}>{I18n.t("err." + message)}</small>
    };
    let labelDown = true

    const getFieldClassName = (fieldType) => {
      switch (fieldType) {
        case fieldTypeName.CHECKBOX:
        case fieldTypeName.RADIO:
        case fieldTypeName.RADIO_INLINE:
        case fieldTypeName.SLIDER:
          labelDown = false
          return "field-checkbox"
        default:
          return "field"
      }
    }
    const getLabelClassName = (fieldType) => {
      switch (fieldType) {
        case fieldTypeName.CHECKBOX:
        case fieldTypeName.RADIO:
        case fieldTypeName.SLIDER:
          return ""
        case fieldTypeName.RADIO_INLINE:
          return "p-inline-radio"
        default:
          return "p-float-label"
      }
    }
    return (
      <div className={getFieldClassName(fieldType)}>
        <span className={getLabelClassName(fieldType)}>
          {!labelDown && <label htmlFor={name} className={errors[name] ? "p-error" : ""}>{I18n.t("label." + label)}{required ? "*" : null}</label>}
          <Controller control={control} {...fieldProps} rules={rules} render={({ field, fieldState }) => (
            resolveType(field, fieldState, fieldProps)
          )} />
          {labelDown && <label htmlFor={name} className={errors[name] ? "p-error" : ""}>{I18n.t("label." + label)}{required ? "*" : null}</label>}
        </span>
        {getFormErrorMessage(name)}
      </div>
    )
  },
  //todo: improvement of prevent rerender
  // (prevProps, nextProps) => {
  //   let fieldName = prevProps.fieldProps.name
  //   let prevValues = prevProps.fieldValues
  //   let nextValues = nextProps.fieldValues
  //   let touchedFields = nextProps.formState.touchedFields
  //   let formErrors = nextProps.formState.errors
  //   let formErrorsPrev = prevProps.formState.errors
  //   let localFormValuesNext = nextProps.getValues()

  //   // console.log(nextProps.formState, fieldName);
  //   if (prevValues && !touchedFields[fieldName] && !formErrors[fieldName] && prevValues[fieldName] == nextValues[fieldName]) {
  //     return true
  //   } else if (localFormValuesNext[fieldName] && prevValues[fieldName] == localFormValuesNext[fieldName]) {
  //     return true
  //   } else if (formErrors[fieldName]) {
  //     if (formErrors[fieldName] == formErrorsPrev[fieldName] && !prevValues[fieldName]) {
  //       return true
  //     }
  //   }
  // }
)
NestedInput.displayName = 'NestedInput';
export const FormElement = (props) => {
  const methods = useFormContext();
  return <NestedInput {...props} {...methods} />;
};
export default FormElement;