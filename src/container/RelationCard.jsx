/* eslint-disable react/prop-types */
// import menu from '../assets/pepicons-pencil_dots-y.svg';
import { useState } from "react";
import profile from "../assets/Ellipse 8.svg";
import checked from "../assets/checked.svg";
import unchecked from "../assets/unchecked.svg";
import { FaRegTrashAlt } from "react-icons/fa";
import gps from "../assets/ion_location-outline.svg";
import wyraiApi from "../api/wyraiApi";
import userGloabalContext from "../UserContext";

const RelationCard = ({
  check,
  setCheck,
  company,
  relation,
  selectRelationmethod,
}) => {
  const { companyId } = userGloabalContext();
  const [click, setClick] = useState(false);

  // const [photos, setPhotos] = useState([]);

  function handleBtnCheck() {
    // // const dataIdValue = e.currentTarget.getAttribute('data-id');
    // const dataIdValue = e.currentTarget.dataset.id;
    // // console.log(click);
    // if (!click) {
    //   setCheck([...check, dataIdValue]);
    // } else {
    //   setCheck([...check.filter((id) => id !== dataIdValue)]);
    // }
    if (!click) {
      selectRelationmethod({
        id: relation?._id,
        checkRelation,
      });
    } else {
      selectRelationmethod({
        id: "",
        checkRelation,
      });
    }

    setClick(!click);
  }
  console.log(click);

  let checkRelation = companyId === relation.ReceiverRelationId;
  console.log(relation._id);
  console.log(relation.Status === "Unregistered");

  const RelationShipHandleDelete = () => {
    try {
      wyraiApi
        .delete(`/deleteRelation/${relation._id}`)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full rounded overflow-hidden justify-between shadow-lg bg-white  flex flex-col items-center">
      <div className="flex justify-between w-full pt-1 pl-1  ">
        <div
          className="flex items-center gap-2"
          // data-id={item._id}
          id="select"
          // onClick={(e) => {
          //   handleBtnCheck(e);
          // }}
          onClick={() => handleBtnCheck()}
        >
          {relation.Status === "Unregistered" &&
            checkRelation &&
            (click ? (
              <img src={checked} className="cursor-pointer" alt="checked" />
            ) : (
              <img src={unchecked} className="cursor-pointer" alt="unchecked" />
            ))}
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
          <p className="text-gray-500 text-xs">{company?.name || "test"}</p>
          <div className="text-gray-500  text-xs ">
            {relation?.Status || "test"}
          </div>
          <p className="text-gray-700 text-sm flex gap-1">
            <img src={gps} alt="" className="w-4 h-4 items-center" />
            {company?.city || "test"}
          </p>
        </div>
      </div>
      <div className="flex justify-end w-full pr-2 pb-2">
        <FaRegTrashAlt
          className="text-orange cursor-pointer"
          onClick={() => RelationShipHandleDelete()}
        />
      </div>
    </div>
  );
};

export default RelationCard;
