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
    if (screenSize <= 768) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="h-screen bg-gray-100   ">
      <div className="flex h-full">
        {activeMenu ? (
          <div className="w-full h-full md:w-[20vw] fixed ">
            <Nav></Nav>
          </div>
        ) : (
          <div className="w-0 h-full ">
            <Nav></Nav>
          </div>
        )}
        <div
          className={` relative h-full w-full ${
            activeMenu ? " md:ml-[20vw]" : "flex-2"
          }`}
        >
          <div className=" flex flex-col h-full">
            <div className="flex-none h-[10%]">
              <Header />
            </div>

            <div className=" flex-1 border-l-[1px] border-gray-300 pt-5 h-[90%] overflow-hidden">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
