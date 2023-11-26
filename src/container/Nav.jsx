import { sideBarData } from "../assets/data/sidebarData";
import logout from "../assets/noun-log-out-5762374 1.svg";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <div
        className="h-screen grid grid-rows-[10%_80%_10%] justify-around border items-center bg-white overflow-hidden
            "
      >
        <Link to="/user" className="w-full mt-6 flex justify-center  ">
          <img src={logo} alt="" className="w-[112px]" />
        </Link>
        <div className="flex flex-col w-full gap-1 pt-8 justify-start h-full  px-7 ">
          {sideBarData?.map((item, index) => (
            <Link
              to={item.link}
              key={index}
              className="flex items-center gap-3 py-3 h-14 w-[100%] hover:bg-blue hover:text-white rounded-xl pl-7 pr-5 "
            >
              {item.icon}
              <span>{item.heading}</span>
            </Link>
          ))}
        </div>

        <div className="w-1/2 m-auto  ">
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
