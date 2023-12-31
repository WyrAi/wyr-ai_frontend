import { sideBarData } from "../assets/data/sidebarData";
import logout from "../assets/noun-log-out-5762374 1.svg";
import logo from "../assets/logo.svg";

import { Link, useLocation, useNavigate } from "react-router-dom";
import userGloabalContext from "../UserContext";
import React from "react";
import { deleteToken } from "../Utils/authUtils.js";

const Nav = () => {
  const { userInformation, userRights, setActiveMenu, activeMenu } =
    userGloabalContext();
  const navigate = useNavigate();
  const pathName = useLocation().pathname;
  const accessArray = React.useMemo(() => {
    if (userRights) {
      // console.log(userRights);
      const array = Object.keys(userRights)?.filter(
        (e) => userRights[e].length
      );
      if (array.length) {
        return [...array, "dashBoard", "profile"];
      }
    }
    return [];
  }, [userInformation?.role?.SelectAccess]);

  const logoutHandlemethod = async () => {
    const res = await deleteToken();
    if (res) navigate("/login");
  };
  console.log(activeMenu);

  return (
    <>
      <div className="h-full flex flex-col justify-start  items-center bg-white overflow-hidden ">
        <div className="flex flex-col md:gap-10 md:pt-8 lg:gap-4 lg:pt-2 justify-start h-full w-full   ">
          <Link to="/user" className="w-full flex justify-center">
            <img src={logo} alt="" className="max-md:w-[80px] md:w-[180px] " />
          </Link>

          <div className=" flex flex-col items-center gap-3 w-full box-border pt-2">
            {sideBarData?.map((item, index) => {
              const isActive =
                (pathName.includes(item.link) && item.link.length > 1) ||
                pathName === item.link;
              if (accessArray.includes(item.name)) {
                return (
                  <Link
                    to={item.link}
                    key={index}
                    className={`${
                      isActive && "bg-blue text-white"
                    } flex items-center max-lg:justify-center gap-3  lg:pl-5 md:h-14 lg:h-9 xl:h-10
                     w-[50%] lg:w-[80%] hover:bg-blue hover:text-white rounded-xl  mx-5 `}
                  >
                    <span className="">{item.icon}</span>
                    <span className="max-lg:hidden text-xs lg:text-sm   ">
                      {item.heading}
                    </span>
                  </Link>
                );
              }
            })}
          </div>
          <div className="w-1/2 m-auto">
            <button
              className="flex gap-3 items-center  "
              onClick={() => logoutHandlemethod()}
            >
              <img src={logout} alt="logout" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
