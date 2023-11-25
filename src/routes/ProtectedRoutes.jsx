import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../Layout";
import Dashboard from "../pages/Dashboard";
import CompanyDetails from "../pages/CompanyDetails";
import Purchase from "../pages/Purchase";
import PurchaseOrder from "../Components/PurchaseOrder";
import Inspection from "../pages/Inspection";
import UserMgt from "../pages/UserMgt";
import AddUser from "../container/AddUser";

const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route path="/companyDetails" element={<CompanyDetails />} />
      <Route path="/" element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route index element={<Dashboard />} />
        <Route path="/purchase" element={<Purchase />} />
        <Route path="/purchase/add" element={<PurchaseOrder />} />
        <Route path="/inspection" element={<Inspection />} />
        <Route path="/user" element={<UserMgt />} />
        <Route path="/user/add" element={<AddUser />} />

      </Route>
    </Routes>
  );
};

export default ProtectedRoutes;
