import React from "react";
const Footer = () => {
    return (
        <div className="footer">
            <img src={process.env.PUBLIC_URL + "/logo.png"} width={50} />
            <br />
            ©Design By - Aleksandar Radovanovic, May 2022
        </div>
    )
}
export default Footer