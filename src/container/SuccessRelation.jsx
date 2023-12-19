import React from "react";
import thumbs from "../assets/noun-thumbs-up-218991 1.svg";

const SuccessRelation = () => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center bg-white py-6 px-8 rounded-2xl">
      <img src={thumbs} alt="" className="w-[200px] h-[200px] mb-12" />
      <span className="text-2xl font-semibold">Congratulations</span>
      <span className="text-lg font-semibold text-[#666666]">
        The Link Has Sent Successfully
      </span>
    </div>
  );
};

export default SuccessRelation;
