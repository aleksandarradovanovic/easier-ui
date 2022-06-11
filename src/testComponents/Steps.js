
import React, { Component } from 'react';
import { Steps } from 'primereact/steps';
import { Toast } from 'primereact/toast';

export default class StepsDemo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 1
        };

        this.items = [
            {
              label: "Components",
              icon: "pi pi-fw pi-prime",
              items: [
                {
                  label: "Accordion",
                        command: (event) => {this.toast.show({ severity: 'info', summary: 'First Step', detail: event.item.label });},
                        icon: "pi pi-fw pi-minus",
                }
                
            
        ],
            },
            {
                label: 'Seat',
                command: (event) => {
                    this.toast.show({ severity: 'info', summary: 'Seat Selection', detail: event.item.label });
                }
            },
            {
                label: 'Payment',
                command: (event) => {
                    this.toast.show({ severity: 'info', summary: 'Pay with CC', detail: event.item.label });
                }
            },
            {
                label: 'Confirmation',
                command: (event) => {
                    this.toast.show({ severity: 'info', summary: 'Last Step', detail: event.item.label });
                }
            }
        ];
    }

    render() {
        return (
            <div className="steps-demo">
                <Toast ref={(el) => { this.toast = el }}></Toast>

                <div className="card">
                    <h5>Basic</h5>
                    <Steps model={this.items} />

                    <h5>Interactive</h5>
                    <Steps model={this.items} activeIndex={this.state.activeIndex} onSelect={(e) => this.setState({ activeIndex: e.index })} readOnly={false} />
                </div>
            </div>
        );
    }
}
                 