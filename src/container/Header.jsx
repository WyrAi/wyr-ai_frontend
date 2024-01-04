import { Link } from "react-router-dom";
import help from "../assets/noun-help-1459308.svg";
import notify from "../assets/noun-notification-1040085 (1) 1.svg";
import setting from "../assets/noun-setting-1835295 1.svg";
import search from "../assets/Search.svg";
import { AiOutlineMenu } from "react-icons/ai";
import userGloabalContext from "../UserContext";

import logo from "../assets/logo.svg";
import { useState, useEffect } from "react";

import axios from "axios";
import "../App.css";
import wyraiApi from "../api/wyraiApi";
import initSocket from "../Components/socket";

// DropDown.js
const DropDown = ({ children }) => {
  const { userInformation, fetchNotification } = userGloabalContext();

  const handleAllRead = () => {
    try {
      console.log("the log of update");
      wyraiApi
        .post("/api/updatenotifactionstatus", {
          receiverid: userInformation?.email,
        })
        .then(
          (res) => {console.log(res)
          console.log("the log of update in response")
          fetchNotification()} 
          )
        .catch((err) => console.log(err));
    } catch (error) {
      console.error("Error updating seen status:", error);
      // Handle error, show error message, etc.
    }
  };


 

  return (
    <div className="relative">
      <div className="dropdown-notch"></div>
      <div className="absolute top-2 right-[-10px] mt-3 w-96 bg-white rounded-xl shadow-2xl border z-50">
        <div className="flex justify-between items-center px-4 py-2 ">
          <h2 className="text-lg  text-gray-700 ">Notification</h2>
          <button
            className="text-md text-blue-600  text-blue underline underline-offset-1"
            onClick={handleAllRead}
          >
            Mark All As Read
          </button>
        </div>
        <ul className="overflow-y-auto max-h-56 px-4 example">
          {children === false ? (
            <p className="text-center text-gray-500 mt-5">No notifications</p>   
          ) : (
            children
          )}
        </ul>
        
      </div>
    </div>
  );
};

const Header = () => {
  const {
    notification,
    setNotifications,
    activeMenu,
    setActiveMenu,
    screenSize,
    fetchNotification,
  } = userGloabalContext();

  const socket = initSocket();
  socket.on("getText", async (data) => {
    fetchNotification();
  });

  console.log(
    "notification length",
    notification.filter((notification) => notification.seen === true).length
  );

  const [popup, setPopup] = useState(false);

  return (
    <header className="bg-white h-full mb-5 ">
      <div className="grid grid-cols-[1fr_1fr] items-start pt-6 pb-4 md:justify-start md:space-x-10  px-6">
        <div className="w-full flex gap-5 items-start">
          {screenSize <= 768 && (
            <AiOutlineMenu
              className="text-black text-xl cursor-pointer ml-5 "
              onClick={() => setActiveMenu((prev) => !prev)}
            />
          )}
          <div className="w-4/5 m-auto">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <img src={search} alt="" />
              </div>
              <input
                id="search"
                name="search"
                className="block w-full pl-10 pr-4 py-4 border rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Tap to Search"
                type="search"
              />
            </div>
          </div>
        </div>
        <div className=" flex items-center justify-end  ">
          <Link href="#" className="text-gray-600 hover:text-gray-900">
            {/* <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" /> */}
            <div className="relative block" onClick={() => setPopup(!popup)}>
              <img
                src={notify}
                alt="help"
                className="block"
                onClick={() => fetchNotification()}
              />
              {notification.filter(
                (notification) => notification.seen === false
              ).length > 0 && (
                <span className="absolute top-4 right-[-15px] inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                  {
                    notification.filter(
                      (notification) => notification.seen === false
                    ).length
                  }
                </span>
              )}
            </div>

            <div className="relative flex-1 cursor-pointer">
              {popup && (
                <DropDown>
                  {notification.length > 0 &&
                    notification
                      .slice() // Create a shallow copy to avoid mutating the original array
                      .reverse() // Reverse the array
                      .map((item, index) => {
                        return (
                          <li key={index} className="py-2 gap-4 mr-2 border-b w-full">
                            <span
                              className={`text-xs ${!item.seen && "font-semibold"}`}
                            >
                              {item.message}
                            </span>
                          </li>
                        );
                      })}

                </DropDown>
              )}
            </div>
          </Link>
          <Link href="#" className="ml-6 text-gray-600 hover:text-gray-900">
            {/* <UserIcon className="h-6 w-6" aria-hidden="true" /> */}
            <img src={setting} alt="help" />
          </Link>
          <Link
            href="#"
            className="ml-6 inline-block h-8 w-8 text-gray-600 hover:text-gray-900"
          >
            {/* <BellIcon className="h-6 w-6" aria-hidden="true" /> */}
            <img src={help} alt="help" className="" />
          </Link>
          <Link href="#" className=" ml-6 text-gray-600 hover:text-gray-900">
            {/* Your Profile/Sign In Icon */}
            <div className=" h-8 w-8 flex justify-center items-center bg-red-500  rounded-full">
              <span className="p-2 text-white ">A</span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
