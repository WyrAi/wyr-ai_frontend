import { Outlet } from "react-router-dom";
import Header from "./container/Header";
import Nav from "./container/Nav";
import userGloabalContext from "./UserContext";
import { useEffect } from "react";

const Layout = () => {
  const { activeMenu, setActiveMenu, screenSize, setScreenSize } =
    userGloabalContext();

  useEffect(() => {
    const handleSize = () => {
      setScreenSize(window.innerWidth);
    };
    window.addEventListener("resize", handleSize);
    handleSize();

    return () => window.removeEventListener("resize", handleSize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="h-screen bg-gray-100   ">
      <div className="flex">
        {activeMenu ? (
          <div className="w-[full] md:w-[20vw] fixed ">
            <Nav></Nav>
          </div>
        ) : (
          <div className="w-0 ">
            <Nav></Nav>
          </div>
        )}
        <div
          className={` relative min-h-screen w-full ${
            activeMenu ? " md:ml-[20vw]" : "flex-2"
          }`}
        >
          <div className=" grid grid-rows-[5vw_auto]">
            <Header />
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
