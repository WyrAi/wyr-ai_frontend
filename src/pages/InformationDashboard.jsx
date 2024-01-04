import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegPlayCircle } from "react-icons/fa";
import PoLoader from "../Components/PoLoader";
import wyraiApi from "../api/wyraiApi";

const InformationDashboard = () => {
  const navigate = useNavigate();
  const [lodaer, setLoader] = useState();

  const ReportGernater = () => {
    wyraiApi
      .get("api/CreateDataSet")
      .then((res) => {
        if (res) {
          setLoader(false);
          navigate("/Information");
        } else {
          alert("Something Went Wrong");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {!lodaer ? (
        <div className="p-5  ">
          <div
            className=" w-[295px] h-[100px]  px-3 py-3 flex gap-4 cursor-pointer bg-white"
            onClick={() => {
              ReportGernater();
              setLoader(true);
            }}
          >
            <img
              src="/Rectangle 25.svg"
              alt=""
              width={"68px"}
              height={"74px"}
              className="rounded-md"
            />
            <div className="flex justify-between w-full">
              <div className="w-full my-auto">
                <h2 className="font-bold text-lg">S12344321</h2>
                <p className="font-normal text-[14px]">Buyer: Devi Designs</p>
              </div>
              <div>
                <FaRegPlayCircle
                  fill="#1B9BEF"
                  className="text-[24px] cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <PoLoader />
      )}
    </>
  );
};

export default InformationDashboard;
