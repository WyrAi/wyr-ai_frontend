import React from "react";
import "../Components/PoLoading.css";
const PoLoading = () => {
  return (
    <div class="spinnerContainer">
      <div class="spinner"></div>
      <div class="loader">
        {/* <p>loading</p> */}
        <div class="words">
           <span class="word ">Loading</span>
          <span class="word ">Identifying</span>
          <span class="word ">Extracting</span>
          <span class="word ">Processing</span>
          <span class="word ">Creating</span>
        </div>
        <div class="words">
          <span class="word text-[#9D9E9E]">Image</span>
          <span class="word text-[#9D9E9E]">Details</span>
          <span class="word text-[#9D9E9E]">Data</span>
          <span class="word text-[#9D9E9E]">Information</span>
          <span class="word text-[#9D9E9E]">Orders</span>
        </div>
      </div>
    </div>
  );
};

export default PoLoading;
