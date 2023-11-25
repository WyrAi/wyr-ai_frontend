/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { useContext, createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import wyraiApi from './api/wyraiApi';
import { getAuthToken } from './Utils/authUtils';

const userContext = createContext();

export const UserContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [comments, setComments] = useState([]);
  const [productList, setProductList] = useState({
    styleId: '',
    styleName: '',
    quantity: '',
    color: '',
    weight: '',
    weightTolerance: '',
    length: '',
    lengthTolerance: '',
    width: '',
    widthTolerance: '',
    height: '',
    heightTolerance: '',
    aql: '',
    comments: [], //this can have many comments so, when sent as Array of comments
  });
  // ----------------------------------------------------------------
  const [roleData, setRoleData] = useState([]);
  const [userInformation, setUserInformation] = useState();
  const [token, setToken] = useState(getAuthToken());
  useEffect(() => {
    if (!token) {
      setToken(getAuthToken());
    }
  }, [token]);



  const [userData, setUserData] = useState(null);
  const [checkedItems, setCheckedItems] = useState([]);
  const [editData, setEditData] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);

  const companyId = userInformation?.companyId?._id;

  // PO popup and images file
  const [popUpload, setPopUpload] = useState(false);
  const [imagesFiles, setImagesFiles] = useState([]);

  //time setter
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    email: '',
    phone: '',
    role: '',
    officeBranch: '',
  });

  const clearFieldData = () => {
    const clearedData = Object.fromEntries(Object.keys(formData).map((key) => [key, '']));
    setFormData(clearedData);
  };

  async function fetchData() {
    // You can await here
    // const response = await MyAPI.getData(someId);
    const id = userInformation?.UserInfo?.company._id;
    const resp = await fetch(
      import.meta.env.VITE_BASE_URL + `/api/getAllEmployess/${id}`,
    );
    const data = await resp.json();

    setUserData([...data]);
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

  const edit = (e) => {
    const id = e[0];
    userData.forEach((item) => {
      if (item._id == id) {
        console.log(item);
        setEditData([item]);
        setFormData({
          name: item.name,
          email: item.email,
          employeeID: item.employeeID,
          addOfficeBranch: item.addOfficeBranch,
          phone: item.phone,
          assignRole: item.assignRole,
        });
        setCheckedItems([]);
        setIsEditMode(!isEditMode);
        navigate('/add');
      }
    });
  };

  // PurchaseOrder
  

  const getUserInformation = async () => {
    wyraiApi
      .get(`/api/UserInformation`)
      .then((res) => {
        setUserInformation(res.data.UserInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (token && !userData) {
      getUserInformation();
    }
  }, [userData, token]);

  useEffect(() => {
    if (companyId) {
      fetchRole();
    }
  }, [companyId]);

  return (
    <>
      <userContext.Provider
        value={{
          companyId,
          roleData,
          userData,
          checkedItems,
          editData,
          formData,
          isEditMode,
          comments,
          productList,
          popUpload,
          imagesFiles,
          startTime,
          endTime,
          setStartTime,
          setEndTime,
          setImagesFiles,
          setPopUpload,
          clearFieldData,
          setProductList,
          setComments,
          setIsEditMode,
          setFormData,
          setEditData,
          edit,
          setUserData,
          fetchData,
          fetchRole,
          // handleBranchChange,
          setCheckedItems,
          userInformation,
        }}
      >
        {children}
      </userContext.Provider>
    </>
  );
};

export const userGloabalContext = () => useContext(userContext);
