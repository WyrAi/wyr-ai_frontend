import React, { useEffect, useMemo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../Layout";
import Dashboard from "../pages/Dashboard";
import CompanyDetails from "../pages/CompanyDetails";
import Purchase from "../pages/Purchase";
import PurchaseOrder from "../Components/PurchaseOrder";
import Inspection from "../pages/Inspection";
import UserMgt from "../pages/UserMgt";
import AddUser from "../container/AddUser";
import RelationShip from "../pages/RelationShip";
import userGloabalContext from "../UserContext";
import Page404 from "../pages/Page404";
import useToast from "../Contexts/ToasterContext";
import InspectionForm from "../Components/InspectionForm";

const IsRouteAllowed = (props) => {
  const { hasPermissions, children } = props;
  const toast = useToast();
  useEffect(() => {
    if (!hasPermissions) {
      toast.error("Not authorized page");
    }
  }, []);
  return hasPermissions ? children : <Navigate to="/dashboard" />;
};

const ProtectedRoutes = () => {
  const { userRights } = userGloabalContext();

  return (
    <Routes>
      <Route path="/companyDetails" element={<CompanyDetails />} />
      <Route path="/" element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route index element={<Dashboard />} />

        <Route path="/purchase" element={<Purchase />} />
        <Route path="/purchase/add" element={<PurchaseOrder />} />
        <Route path="/inspection" element={<Inspection />} />
        <Route path="/inspection/add" element={<InspectionForm />} />
        {/* {userRights?.userManagement?.length ? ( */}
        <Route
          path="/user"
          element={
            <IsRouteAllowed hasPermissions={userRights?.userManagement?.length}>
              <UserMgt />
            </IsRouteAllowed>
          }
        />
        {/* ) : null} */}
        {userRights?.userManagement.includes("Create/Edit User") ? (
          <Route path="/user/add" element={<AddUser />} />
        ) : null}

        <Route path="/relationShip" element={<RelationShip />} />
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
};

export default ProtectedRoutes;
