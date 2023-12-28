/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import wyraiApi from "./api/wyraiApi";
import { deleteToken, getAuthToken } from "./Utils/authUtils";

const userContext = createContext();

export const UserContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [branchData, setBranchData] = useState(null);
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);
  const [imgFormUploadData, setImgFormUploadData] = useState([]);

  const [notification, setNotifications] = useState([]);
  const [comments, setComments] = useState([]);
  const [productList, setProductList] = useState({
    styleId: "",
    styleName: "",
    quantity: "",
    color: "",
    weight: "",
    weightTolerance: "",
    length: "",
    lengthTolerance: "",
    width: "",
    widthTolerance: "",
    height: "",
    heightTolerance: "",
    aql: "",
    comments: [], //this can have many comments so, when sent as Array of comments
  });
  // ----------------------------------------------------------------
  const [roleData, setRoleData] = useState([]);
  const [userInformation, setUserInformation] = useState();
  const [token, setToken] = useState(getAuthToken());
  // const [render, setRender] = useState(false);

  const [userData, setUserData] = useState(null);
  const [checkedItems, setCheckedItems] = useState([]);
  const [editData, setEditData] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);

  // PO popup and images file
  const [popUpload, setPopUpload] = useState(false);
  const [imagesFiles, setImagesFiles] = useState([]); // set imnages file for products in purchase Order

  const reqimg = {
    backImage: undefined,
    frontImage: undefined,
    careLabel: undefined,
    sizeLabel: undefined,
  };
  //time setter
  const [startTime, setStartTime] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    employeeId: "",
    email: "",
    phone: "",
    role: "",
    officeBranch: "",
  });

  const clearFieldData = () => {
    const clearedData = Object.fromEntries(
      Object.keys(formData).map((key) => [key, ""])
    );
    setFormData(clearedData);
  };

  function fetchData() {
    if (companyId) {
      wyraiApi
        .get(`/api/getAllEmployess/${companyId}`)
        .then((res) => {
          // console.log(res);
          setUserData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("--noCompanyId--", companyId, userInformation);
    }
  }

  const fetchRole = () => {
    wyraiApi
      .get(`/api/getAllCompanyRoles/${companyId}`)
      .then((res) => {
        const data = res.data;
        setRoleData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchNotification = () => {
    try {
      wyraiApi
        .get(`/api/getnotification/${userInformation?.email}`)
        .then((res) => {
          // console.log(res);
          const notyData = res?.data?.data; //.map((item) => item.message);
          setNotifications([...notyData]);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  // const edit = (e) => {
  //   const id = e[0];
  //   userData.forEach((item) => {
  //     if (item._id == id) {
  //       console.log(item);
  //       setEditData([item]);
  //       setFormData({
  //         name: item.name,
  //         email: item.email,
  //         employeeID: item.employeeID,
  //         addOfficeBranch: item.addOfficeBranch,
  //         phone: item.phone,
  //         assignRole: item.assignRole,
  //       });
  //       setCheckedItems([]);
  //       setIsEditMode(!isEditMode);
  //       navigate("/add");
  //     }
  //   });
  // };

  // PurchaseOrder

  const companyCreatorEntity = [
    "Buyer",
    "Factory",
    "QC Agency",
    "Buying Agency",
  ].map((e) => e.toLowerCase());

  const getUserInformation = () => {
    wyraiApi
      .get(`/api/UserInformation`)
      .then((res) => {
        // console.log(res);
        const userInformation = res.data.UserInfo;
        setUserInformation(userInformation);
        const companyId = userInformation?.companyId?._id;
        if (
          !companyId &&
          companyCreatorEntity.includes(
            userInformation?.role?.name.toLowerCase()
          )
        ) {
          navigate("/companyDetails");
        } else {
          // navigate("/dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/login");
        deleteToken();
      });
  };
  // console.log(userInformation);

  const { companyId, role, userRights } = React.useMemo(() => {
    const companyId = userInformation?.companyId?._id;
    const role = userInformation?.companyId?.companyRole;
    const rights = userInformation?.role?.SelectAccess;
    return { companyId, role, userRights: rights };
  }, [userInformation]);

  useEffect(() => {
    // console.log(token, userInformation);
    if (token && userInformation == undefined) {
      // console.log("here");
      getUserInformation();
    }
  }, [userInformation, token]);
  // console.log(userInformation);

  // console.log(companyId, role, userRights);

  useEffect(() => {
    if (companyId) {
      fetchRole();
    }
  }, [companyId]);
  return (
    <>
      <userContext.Provider
        value={{
          token,
          setToken,
          companyId,
          roleData,
          checkedItems,
          editData,
          formData,
          isEditMode,
          comments,
          productList,
          popUpload,
          imagesFiles,
          startTime,
          branchData,
          role,
          activeMenu,
          imgFormUploadData,
          screenSize,
          setScreenSize,
          setImgFormUploadData,
          setActiveMenu,

          notification,
          fetchNotification,
          setNotifications,
          setStartTime,
          setImagesFiles,
          setPopUpload,
          clearFieldData,
          setProductList,
          setComments,
          setIsEditMode,
          setFormData,
          setEditData,
          fetchData,
          fetchRole,
          // handleBranchChange,
          setBranchData,
          setCheckedItems,
          getUserInformation,
          userInformation,
          userRights,
          // render,
          // setRender,
          setUserData,
          userData,
        }}
      >
        {children}
      </userContext.Provider>
    </>
  );
};

export const userGloabalContext = () => useContext(userContext);
export default userGloabalContext;
