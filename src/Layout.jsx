import { Outlet } from "react-router-dom";
import Header from "./container/Header";
import Nav from "./container/Nav";

const Layout = () => {
  return (
    <div className="h-screen grid grid-rows-[5rem_auto] bg-gray-100  ">
      <Header />
      <div className="grid grid-cols-[23rem_auto] ">
        <Nav></Nav>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
