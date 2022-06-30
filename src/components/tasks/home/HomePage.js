import { Button } from "primereact/button";
import React from "react";
const HomePage = () => {
    return (
        <div className="grid grid-nogutter surface-0 text-800">
            <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
                <section>
                    <span className="block text-6xl font-bold mb-1">Create your reservation today!</span>
                    <div className="text-6xl text-pink-900 font-bold mb-3">Explore more then 1000 events</div>
                    <p className="mt-0 mb-4 text-700 line-height-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

                    <Button label="Start now" type="button" className="mr-3 p-button-raised p-button-help" />
                    <Button label="Find places" type="button" className="p-button-outlined p-button-warning" />
                </section>
            </div>
            <div className="col-12 md:col-6 overflow-hidden">
                <img src={process.env.PUBLIC_URL + "/homeImage.jpeg"} alt="hero-1" className="md:ml-auto block md:h-full" style={{ clipPath: 'polygon(8% 0, 100% 0%, 100% 100%, 0 100%)' }} />
            </div>
        </div>
    )
}
export default HomePage