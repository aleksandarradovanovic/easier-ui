import React from 'react'
import { fieldType } from '../../const/components'
import { FormElement } from './FormElement'
const Captcha = (props) => {
  const { imgClass, fieldClass, refreshCaptchaLabel } = props
  const captchaURL = props.captchaURL
  const fieldClassName = fieldClass || 'md:col'
  const imgClassName = imgClass || 'md:col'


  return (
    <div className={"outerCaptchaBlockClassFormatted"}>
      <div className={fieldClassName}>
        <div className={"outerCaptchaFieldClassFormatted"}>
          <FormElement label='label.captcha' fieldType={fieldType.INPUT_TEXT} required fieldProps={{
            name: props.fieldName
          }} />
          <div className='col-12'>
            <a href='#' onClick={() => props.onRefreshCaptcha()} className='captchaCss'>{refreshCaptchaLabel ? refreshCaptchaLabel : "Refresh captcha"}&nbsp;&nbsp;
            <i className="pi pi-refresh"></i></a>
          </div>
        </div>
      </div>
      <div className={imgClassName}>
        <div className={"outerCaptchaImageClassFormatted"}>
          <div className='col-12'>
            <img src={captchaURL}
              className='center-block captchaStyle img-thumbnail img-rounded img-responsive' />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Captcha