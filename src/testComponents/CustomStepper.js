import React, { Component } from 'react';


export default class CustomStepper extends Component {
    render() {
        return (

<div className="wrapper option-1 option-1-1">
  <ol className="c-stepper">
    
      
    <li className="c-stepper__item_1">
      <h3 className="c-stepper__title">Step 1</h3>
      <p className="c-stepper__desc">Some desc text</p>
    </li>
    <li className="c-stepper__item_2">
      <h3 className="c-stepper__title">Step 2</h3>
      <p className="c-stepper__desc">Some desc text</p>
    </li>
    <li className="c-stepper__item_3">
      <h3 className="c-stepper__title">Step 3</h3>
      <p className="c-stepper__desc">Some desc text</p>
    </li>
  </ol>
</div>

);

}}