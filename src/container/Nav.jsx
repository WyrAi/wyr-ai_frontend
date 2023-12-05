import { sideBarData } from "../assets/data/sidebarData";
import logout from "../assets/noun-log-out-5762374 1.svg";

import { Link } from "react-router-dom";
import userGloabalContext from "../UserContext";
import React from "react";

const Nav = () => {
  const { userInformation, userRights } = userGloabalContext();
  const accessArray = React.useMemo(() => {
    if (userRights) {
      console.log(userRights);
      const array = Object.keys(userRights)?.filter(
        (e) => userRights[e].length
      );
      if (array.length) {
        return [...array, "dashBoard", "profile"];
      }
    }
    return [];
  }, [userInformation?.role?.SelectAccess]);
  console.log(userRights);

  return (
    <>
      <div className="h-screen grid grid-rows-[80%_10%] justify-around border-r-[1px] border-gray-200 items-center bg-white overflow-hidden ">
        <div className="flex flex-col w-full gap-1 pt-8 justify-start h-full  px-7 ">
          {sideBarData?.map((item, index) => {
            if (accessArray.includes(item.name)) {
              return (
                <Link
                  to={item.link}
                  key={index}
                  className="flex items-center gap-3 py-3 h-14 w-[100%] hover:bg-blue hover:text-white rounded-xl pl-7 pr-5 "
                >
                  {item.icon}
                  <span>{item.heading}</span>
                </Link>
              );
            }
          })}
        </div>

        <div className="w-1/2 m-auto">
          <button className="flex gap-3 items-center  ">
            <img src={logout} alt="logout" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Nav;
