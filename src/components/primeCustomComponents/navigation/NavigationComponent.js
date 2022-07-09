import { Button } from 'primereact/button';
import { Steps } from 'primereact/steps';
import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { getGlobalFormValuesErrors } from '../../../util/globalFormUtil';

export const NavigationComponent = (props) => {
    const formValuesErrors = useSelector((state) => getGlobalFormValuesErrors(state))

    const [activeIndex, setActiveIndex] = useState(0)
    const onNext = () => {
        setActiveIndex(activeIndex + 1)
    }
    return (
        <div className="steps-demo">
            <div className="card">
                <Steps direction="vertical" model={props && props.items ? props.items : []} activeIndex={activeIndex} onSelect={(e) => setActiveIndex(e.index)} readOnly={props.readOnly ? true : false} />
                <div className='stepComponent'>
                    {props.items && props.items[activeIndex] && props.items[activeIndex].component ? props.items[activeIndex].component : <Fragment />}
                </div>
                <div className='stepButtons'>
                    <div class="grid">
                        {activeIndex != 0 && <div class="col">
                            <Button label="Back" icon="pi pi-arrow-left" onClick={() => setActiveIndex(activeIndex - 1)} />
                        </div>}
                        <div class="col">
                        </div>
                        <div class="col text-right">
                            <span className="p-buttonset">
                                {activeIndex != props.items.length - 1 && <Button label="Next" disabled = {props.items[activeIndex] && !props.items[activeIndex].isValid} icon="pi pi-arrow-right" onClick={() => onNext() } />}
                                {activeIndex == props.items.length - 1 && <Button label="Save" icon="pi pi-check" onClick={() => props.onSave()} />}
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default NavigationComponent
