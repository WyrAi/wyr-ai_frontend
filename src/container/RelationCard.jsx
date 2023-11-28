/* eslint-disable react/prop-types */
// import menu from '../assets/pepicons-pencil_dots-y.svg';
import { useState } from "react";
import profile from "../assets/Ellipse 8.svg";
import checked from "../assets/checked.svg";
import unchecked from "../assets/unchecked.svg";
import { FaRegTrashAlt } from "react-icons/fa";

const RelationCard = ({ check, setCheck, item }) => {
  const [click, setClick] = useState(false);
  // const [photos, setPhotos] = useState([]);
  console.log(item);

  function handleBtnCheck(e) {
    // const dataIdValue = e.currentTarget.getAttribute('data-id');
    const dataIdValue = e.currentTarget.dataset.id;
    // console.log(click);
    if (!click) {
      setCheck([...check, dataIdValue]);
    } else {
      setCheck([...check.filter((id) => id !== dataIdValue)]);
    }
    setClick(!click);
  }
  // console.log(check);
  console.log(click);

  return (
    <div className="w-full h-full rounded overflow-hidden justify-between shadow-lg bg-white  flex flex-col items-center">
      <div className="flex justify-between w-full pt-1 pl-1  ">
        <div
          className="flex items-center gap-2"
          // data-id={item._id}
          id="select"
          onClick={(e) => {
            handleBtnCheck(e);
          }}
        >
          {click ? (
            <img src={checked} className="cursor-pointer" alt="checked" />
          ) : (
            <img src={unchecked} className="cursor-pointer" alt="unchecked" />
          )}
        </div>

        {/* <button className="text-gray-500">
					<img src={menu} alt="" />
				</button> */}
      </div>
      <div className=" w-full pl-4 flex gap-[14px]">
        {/* <div className=" bg-red-500"></div> */}
        <img
          className="w-16 h-16 rounded-full"
          src={profile}
          alt="Profile face"
        />
        <div className="flex flex-col justify-between ">
          <p className="text-gray-500 text-xs">
            Emp ID : {item?.employeeID || "test"}
          </p>
          <div className="text-gray-500  text-xs ">{item?.name || "test"}</div>
          <p className="text-gray-700 text-sm">
            {item?.assignRole.name || "test"}
          </p>
        </div>
      </div>
      <div className="flex justify-end w-full pr-2 pb-2">
        <FaRegTrashAlt className="text-orange" />
      </div>
    </div>
  );
};

export default RelationCard;
