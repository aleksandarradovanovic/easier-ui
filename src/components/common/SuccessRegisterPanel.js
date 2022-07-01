import React from "react";
const SuccessRegisterPanel = (props) => {
  return (
      <div className="flex align-items-center justify-content-center">
        <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
          <div className="text-center mb-5">
            <img src={process.env.PUBLIC_URL + "/logo.png"} alt="hyper" height={50} className="mb-3" />
            <div className="text-900 text-3xl font-medium mb-3">Well done!</div>
            <span className="text-600 font-medium line-height-3">Account created</span>
            <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer" href = "/login">Please login</a>
          </div>

          <div>

          </div>
        </div>
      </div>



  );
};
export default SuccessRegisterPanel;
