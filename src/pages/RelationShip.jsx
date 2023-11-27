import GPS from "../assets/ion_location-outline.svg";
import { FaRegTrashAlt } from "react-icons/fa";

const RelationShip = () => {
  return (
    <>
      <div className="border px-5 py-9 h-screen border-black">
        <div className="bg-white w-10/12 flex justify-between items-center pl-1">
          navbar
          <button className="bg-[#1B9BEF] px-11 py-3 font-bold text-white rounded-lg">
            Add Company
          </button>
        </div>
        <div></div>
        <div className="flex py-8 ">
          <div className="bg-white flex items-center gap-3">
            <div>
              <input type="checkbox" name="" id="" />
              <img
                src=""
                alt="logo"
                className="w-20 h-20 border rounded-full p"
              />
            </div>
            <div className="pr-4">
              <h5 className="font-normal text-[12px] capitalize">
                Home Center Factory
              </h5>
              <p className="font-normal text-[12px]">Registered</p>
              <h4 className="font-medium text-[13px] flex items-center">
                <span className="">
                  <img src={GPS} alt="" className="w-4 h-4" />
                </span>
                Nsp, New Delhi
              </h4>
              <FaRegTrashAlt className="w-3 h-4 text-orange" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RelationShip;
