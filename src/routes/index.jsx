import React, { useContext, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "../pages/SignUp";
import SignUpRole from "../pages/SignUpRole";
import ProtectedRoutes from "./ProtectedRoutes";
import Login from "../pages/Login";
import { AuthContext } from "../Contexts/authContext";
import { getAuthToken } from "../Utils/authUtils";
import ResetPassword from "../pages/ResetPassword";
import SuccessRelation from "../container/SuccessRelation";
import InspectionForm from "../Components/InspectionForm";
// import Dialog from "../Components/Dialog";
// import Inspection from "../pages/Inspection";

const RequiredAuth = (props) => {
  const { auth } = useContext(AuthContext);
  const { children } = props;
  const isLoggedIn = !!auth || getAuthToken();

  return isLoggedIn ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
};
const CustomRoutes = () => {
  return (
    <Routes>
      <Route path="/signUp" index exact element={<SignUp />}></Route>
      <Route path="/signUp/:clickedRole" element={<SignUpRole />} />
      <Route path="/login" element={<Login />} />
      <Route path="/resetPassword/:token" element={<ResetPassword />} />
      <Route path="/test" element={<InspectionForm />} />

      <Route
        path="/*"
        element={
          <RequiredAuth>
            <ProtectedRoutes />
          </RequiredAuth>
        }
      />
    </Routes>
  );
};

export default CustomRoutes;
