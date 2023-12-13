import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import wyraiApi from "../api/wyraiApi";
import userGloabalContext from "../UserContext";

const Menu = ({ BranchId, BranchesGetMethod }) => {
  const [open, setOpen] = useState(false);

  const BranchHandleDelete = async () => {
    try {
      const { data } = await wyraiApi.delete(`/api/BranchDelete/${BranchId}`);
      if (data) {
        BranchesGetMethod();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="relative w-5 h-5">
        <BsThreeDotsVertical
          className="cursor-pointer"
          onClick={() => setOpen(!open)}
        />

        {open && (
          <div className=" absolute  bottom-[-7vh] left-[45%] w-[60px] shadow  flex flex-col bg-white ">
            <span className="  pl-2 py-[6px] text-xs cursor-pointer">Edit</span>
            <span
              className="  pl-2 py-[6px] text-xs cursor-pointer"
              onClick={() => BranchHandleDelete()}
            >
              Delete
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default Menu;
