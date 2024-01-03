import React from "react";
import "../Components/PoLoading.css";
const PoLoading = () => {
  return (
    <div className="spinnerContainer">
      <div className="spinner"></div>
      <div className="loader">
        {/* <p>loading</p> */}
        <div className="words">
          <span className="word ">Loading</span>
          <span className="word ">Identifying</span>
          <span className="word ">Extracting</span>
          <span className="word ">Processing</span>
          <span className="word ">Creating</span>
        </div>
        <div className="words">
          <span className="word text-[#9D9E9E]">Image</span>
          <span className="word text-[#9D9E9E]">Details</span>
          <span className="word text-[#9D9E9E]">Data</span>
          <span className="word text-[#9D9E9E]">Information</span>
          <span className="word text-[#9D9E9E]">Orders</span>
        </div>
      </div>
    </div>
  );
};

export default PoLoading;
