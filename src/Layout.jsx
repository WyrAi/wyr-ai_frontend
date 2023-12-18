import { Outlet } from "react-router-dom";
import Header from "./container/Header";
import Nav from "./container/Nav";
import userGloabalContext from "./UserContext";
import { AiOutlineMenu } from "react-icons/ai";

const Layout = () => {
  const { activeMenu, setActiveMenu } = userGloabalContext();
  return (
    <div className="h-screen grid grid-rows-[5rem_auto] bg-gray-100  ">
      <Header />
      <div className="flex">
        {activeMenu ? (
          <div className="w-[20rem] fixed ">
            <Nav></Nav>
          </div>
        ) : (
          <div className="w-0 ">
            <Nav></Nav>
          </div>
        )}
        <div
          className={` relative min-h-screen w-full ${
            activeMenu ? "md:ml-[20rem]" : "flex-2"
          }`}
        >
          <AiOutlineMenu
            className="text-black text-xl cursor-pointer absolute top-5 left-5 "
            onClick={() => setActiveMenu((prev) => !prev)}
          />
          <div className="ml-12 mt-5">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
