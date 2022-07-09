import { Button } from "primereact/button";
import React from "react";
import { useHistory } from "react-router";
const SuccessPlaceCreated = (props) => {
    const history = useHistory()
    return (
        <div className="flex align-items-center justify-content-center">
            <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                <div className="text-center mb-5">
                    <img src={process.env.PUBLIC_URL + "/logo.png"} alt="hyper" height={50} className="mb-3" />
                    <div className="text-900 text-3xl font-medium mb-3">Place is created</div>
                    <span className="text-600 font-medium line-height-3">See your places  <Button icon="pi pi-arrow-right" label="Go" className="p-button-outlined" onClick={() => {
                        history.push('/myPlaces')
                    }}></Button> </span>
                    <span className="text-600 font-medium line-height-3">Or</span>
                    <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer" href="/">Go to home page</a>
                </div>

                <div>

                </div>
            </div>
        </div>



    );
};
export default SuccessPlaceCreated;
