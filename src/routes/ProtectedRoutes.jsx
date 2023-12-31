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
import InformationDashboard from "../pages/InformationDashboard";
import Information from "../pages/Information";
import InspectionForm from "../Components/InspectionForm";
import QcInspection from "../pages/QcInspection";
import InspectionView from "../Components/InspectionView";
import ReportVideos from "../pages/ReportVideos";

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
  // console.log(userRights);

  return (
    <Routes>
      <Route path="/companyDetails" element={<CompanyDetails />} />
      <Route path="/" element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route index element={<Dashboard />} />
        <Route path="/Information" element={<Information />} />
        <Route
          path="/Information_Dashboard"
          element={<InformationDashboard />}
        />

        <Route path="/purchase" element={<Purchase />} />
        <Route path="/purchase/add" element={<PurchaseOrder />} />
        <Route path="/inspection" element={<Inspection />} />
        <Route path="/inspection/add" element={<InspectionForm />} />
        <Route path="/qcInspection" element={<QcInspection />} />
        <Route path="/inspection/view/:id" element={<InspectionView />} />
        <Route path="/ReportVideos" element={<ReportVideos />} />
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
