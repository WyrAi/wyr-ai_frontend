import image1 from "../assets/Rectangle 25.png";
import { FaRegPlayCircle } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import DashboardNotification from "../Components/DashboardNotification";
import userGloabalContext from "../UserContext";
import { useEffect } from "react";
import { useState } from "react";
import useToast from "../Contexts/ToasterContext";
import initSocket from "../Components/socket";
import axios from "axios";

const InspectionCard = () => {
  return (
    <div className="flex justify-around items-center py-2 px-1 shadow-md my-2">
      <img src={image1} alt="" className="h-7 w-7" />
      <span>#S12344321</span>
      <span>Factory:Devi Designs</span>
      <div className="flex justify-start gap-8">
        <FaRegPlayCircle className="text-blue text-2xl" />
        <FiEye className="text-blue text-2xl" />
      </div>
    </div>
  );
};

const Dashboard = () => {
  const socket = initSocket();

  const {
    getUserInformation,
    companyId,
    userInformation,
    notification,
    fetchNotification,
  } = userGloabalContext();
  const toast = useToast();

  const status = {
    active: { name: "Active", Current: 0, color: "#EFD780" },
    approve: { name: "Approve", Current: 0, color: "#B8B8FF" },
    onhold: { name: "On Hold", Current: 0, color: "#809BCE" },
    rejected: { name: "Rejected", Current: 1, color: "#FF97B7" },
  };
  useEffect(() => {
    if (!companyId) {
      getUserInformation();
    }
  }, []);

  socket.on("getText", async (data) => {
    fetchNotification();
  });

  useEffect(() => {
    if (userInformation?.email) {
      try {
        fetchNotification();
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    }
  }, [userInformation]);
  return (
    <div className="ml-5 w-[85%] h-full box-border mt-7">
      <header className="flex justify-between mb-9">
        <div className="flex-col gap-1">
          <h1 className="text-2xl font-semibold">
            Hey, {userInformation?.name}
          </h1>
          <p className="text-sm font-medium">{userInformation?.role?.name}</p>
        </div>
        <button
          className="py-2 px-4 bg-blue rounded-md font-semibold text-base text-white"
          onClick={() => {
            toast.error("Write function for purchase order");
          }}
        >
          Create A Purchase Order
        </button>
      </header>

      <div>
        <DashboardNotification />
      </div>

      <div className="grid grid-cols-[30%_68%] gap-[2%] w-full ">
        <div className="shadow-md bg-white p-2">
          <h1 className="m-2 text-md font-medium">PO Status</h1>
          <div className="grid grid-cols-2 gap-5 mb-2">
            {Object.keys(status).map((item, index) => (
              <div
                key={index}
                className="h-[130px] flex flex-col justify-around items-center"
                style={{
                  color: `${status[item].color}`,
                  borderBottom: `3px solid ${status[item].color}`,
                }}
              >
                <span className="text-base font-medium text-black">
                  {status[item].name}
                </span>
                <span className="text-5xl font-medium">{0}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white">
          <h1 className="m-2 text-md font-medium mb-2">Recent Inspection</h1>
          <div className="flex flex-col">
            <InspectionCard />
            <InspectionCard />
            <InspectionCard />
            <InspectionCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
