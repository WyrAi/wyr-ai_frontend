import work from "../assets/noun-work-5949579.svg";
import select from "../assets/noun-select-all-4671270 1.svg";
import plus from "../assets/typcn_plus.svg";
import gps from "../assets/ion_location-outline.svg";
import UserCard from "../container/UserCard"; //change the name of the file later
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PopupBranch from "../container/PopupBranch";
import { userGloabalContext } from "../UserContext";
import Menu from "../container/Menu";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import axios from "axios";
import wyraiApi from "../api/wyraiApi";
import useToast from "../Contexts/ToasterContext";

// *** there is filter to be added on when click button there is remove of id from array State ***

// import {useEffect, useState} from 'react';

// change the checkbox styles

const UserMgt = () => {
  const {
    userData,
    setUserData,
    fetchData,
    edit,
    checkedItems,
    setBranchData,
    branchData,
    setCheckedItems,
    userInformation,
    companyId,
  } = userGloabalContext();
  // const companyId = userInformation?.companyId?._id;
  const toast = useToast();

  const [addBranchPopUp, setAddBranchPopUp] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);

  const handleDelete = async () => {
    // console.log(checkedItems);
    // const resp = await fetch(
    //   import.meta.env.VITE_BASE_URL + "/api/deleteEmploye",
    //   {
    //     method: "Delete",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ userIds: checkedItems }),
    //   }
    // );

    fetchData();

    wyraiApi
      .delete("/api/registerEmployeeDelete", {
        data: {
          checkedItems,
        },
      })
      .then((res) => {
        // console.log(res);
        toast.success("User Removed");
        fetchData();
      })
      .catch((err) => {
        if (err.message) {
          toast.error(`${err.message}`);
        }
        // console.log(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleBranchClick = async (id) => {
    // setSelectedBranch(selectedBranch);
    // id = userInformation.UserInfo.
    // console.log(id);
    const { data } = await axios(
      import.meta.env.VITE_BASE_URL + `/api/getAllEmployessWithBranch/${id}`
    );
    // console.log("te", data);
    setUserData(data);
  };

  const handleAlluserClick = () => {
    setSelectedBranch(null);
    fetchData();
  };

  const filteredUsers =
    selectedBranch !== null
      ? userData.filter(
          (user) => user.addOfficeBranch === selectedBranch.branchName
        )
      : userData;

  const handleEscKeyPress = (event) => {
    if (event.key === "Escape") {
      // Do something when the Esc key is pressed
      setAddBranchPopUp(false);
    }
  };

  const handleClickOutside = () => {
    // console.log
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscKeyPress);

    window.addEventListener("click", handleClickOutside);

    setCheckedItems([]);

    // Cleanup: remove event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleEscKeyPress);
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // const branchData = [];
  const getBranches = async () => {
    wyraiApi
      .get(`/api/getAllBranches/${companyId}`)
      .then((res) => {
        setBranchData(res.data);
      })
      .catch((err) => {
        if (err.message) {
          toast.error(`${err.message}`);
        }
        console.log(err);
      });
  };

  const closeAddBranchPopUp = () => {
    setAddBranchPopUp(false);
  };

  useEffect(() => {
    if (companyId) {
      getBranches();
    }
  }, [companyId]);

  // console.log(filteredUsers);

  return (
    <>
      <div className="flex flex-col w-11/12 h-full overflow-hidden">
        <header className=" w-full items-center h-[60px] flex gap-5 justify-end mb-5 ">
          <div className="flex gap-5   items-center">
            {checkedItems.length === 1 && (
              <button
                className=""
                id="edit"
                // className="bg-white py-[6px] pr-5 pl-4 items-center w-24 flex gap-1 text-xs text-blue font-bold rounded-md border border-blue"
                onClick={() => edit(checkedItems)}
              >
                <MdOutlineModeEditOutline className="w-9 h-9" />
              </button>
            )}
            {checkedItems.length >= 1 && (
              <button
                // className="bg-[#EE7360] py-[6px] pr-5 pl-4 items-center w-24 flex gap-1 text-xs text-white font-bold rounded-md"
                onClick={() => handleDelete()}
                id="delete"
              >
                <FaRegTrashAlt className="text-3xl text-orange" />
              </button>
            )}
          </div>
          <div className="">
            <Link
              to={"/user/add"}
              className="bg-[#1B9BEF] text-white font-bold px-11 py-3 rounded-md "
            >
              Add New User
            </Link>
          </div>
        </header>
        <div className="grid grid-cols-[20rem_auto] gap-6 h-full">
          <div>
            <div className="flex flex-col  bg-white h-full ">
              <div className="flex items-center gap-1 pl-6 h-[52px] ">
                <img src={work} alt="branch" />
                <span>Branch</span>
              </div>
              <div
                className="flex hover:bg-[#1B9BEF14] pl-6 gap-1 py-3 cursor-pointer"
                onClick={handleAlluserClick}
              >
                <img src={select} alt="branch" />
                <span>View All Users</span>
              </div>
              <div className="flex flex-col gap-1 text-gray-500">
                {branchData?.length > 0 &&
                  branchData?.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between pl-5 py-3 h-14 hover:bg-[#1B9BEF14] "
                    >
                      <div
                        className="flex gap-3 cursor-pointer "
                        onClick={() => {
                          handleBranchClick(item._id);
                        }}
                      >
                        <img src={gps} className="" alt="gps" />
                        <div className="flex flex-col ">
                          <span className="text-[14px] font-medium">
                            {item.city}, {item.country}
                          </span>
                          <span className="text-xs">{item.branchName}</span>
                        </div>
                      </div>

                      <Menu
                        BranchId={item._id}
                        BranchesGetMethod={getBranches}
                      />
                    </div>
                  ))}
              </div>
              <div
                className="flex cursor-pointer pl-6 gap-1 py-3"
                onClick={() => setAddBranchPopUp(!addBranchPopUp)}
              >
                <img src={plus} alt="add" />
                <span className="text-[#1B9BEF] font-bold">Add branch</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap content-start w-full h-full gap-4 overflow-auto">
            {filteredUsers?.map((item, index) => (
              <UserCard
                check={checkedItems}
                setCheck={setCheckedItems}
                key={index}
                item={item}
              />
            ))}
          </div>
        </div>
        <div></div>
        {addBranchPopUp && (
          <PopupBranch
            getBranches={getBranches}
            closeAddBranchPopUp={closeAddBranchPopUp}
          />
        )}
      </div>
    </>
  );
};

export default UserMgt;

// toast.error("Action not allowed");
