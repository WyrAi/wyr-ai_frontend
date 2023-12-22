/** @format */

// InspectionForm.jsx
import React, { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";

import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";
// import {useGetFetch, useCreateFetch} from '../api/api';
import DropZone from "../Components/DropZone";
import Products from "../container/Products";
import InputField from "../container/InputField";
import addUser from "../assets/noun-add-account-6047901 1.svg";
import { HiOutlineCalendar } from "react-icons/hi";
import { FaPlus } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosCloseCircle } from "react-icons/io";
import Preview from "../container/Preview";
import img from "../assets/sara-kurfess-ltE8bDLjX9E-unsplash.jpeg";
import { userGloabalContext } from "../UserContext";
import Datepicker from "./DatepickerComponent";
import gps from "../assets/ion_location-outline.svg";
import axios from "axios";
import wyraiApi from "../api/wyraiApi";
import Prompt from "../DasiyUIComponents/Prompt";
import Loader from "../Components/Loader";
// import PoLoader from "./PoLoader";
import PoLoading from "./PoLoading";

// import DropdownSelect from '../container/DropdownSelect';

/**
 * A form component for Purchase data.
 *
 * @returns {JSX.Element} The PurchaseOrderForm component.
 */

function PurchaseOrder() {
  const {
    setPopUpload,
    popUpload,
    userInformation,
    companyId,
    role,
    imgFormUploadData,
  } = userGloabalContext();
  const { productList, setProductList, imagesFiles, setImagesFiles } =
    userGloabalContext();

  const navigate = useNavigate();
  const [purchaseDoc, setPurchaseDoc] = useState(null);
  const [showPurchaseOrder, setShowPurchaseOrder] = useState(false);
  const [buyer, setBuyer] = useState([]);
  const [vendor, setVendor] = useState([]);
  const [people, setPeople] = useState([]);
  const [imageIndex, setImageIndex] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [isPoLoading, setIsPoLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [initialValues, setInitialValues] = useState({
    poNumber: "",
    nameOfBuyer: "",
    addOfBuyer: "",
    nameOfVendor: "",
    addOfVendor: "",
    shiptoName: "",
    shiptoAdd: "",
    shipVia: "",
    shipDate: selectedDate,
    totalCarton: "",
    inv_number: "",
    assignPeople: "",
  });

  const [aiData, setAiData] = useState({});
  console.log(isPoLoading);

  const [peopleOfInterest, setPeopelOfInterest] = useState([
    { id: userInformation?._id, name: userInformation?.name },
  ]);

  // console.log(...peopleOfInterest);
  const [ids, setIds] = useState({
    buyerId: "",
    vendorId: "",
  });
  const [ApiImage, setApiImage] = useState();

  const intialImages = [
    { name: "Back", file: "" },
    { name: "Front", file: "" },
    { name: "Care Label", file: "" },
    { name: "Size Label", file: "" },
    { name: "Brand Label", file: "" },
    { name: "Price Label", file: "" },
  ];

  const [slotOfProducts, setSlotOfProducts] = useState([
    { ...productList, images: intialImages },
  ]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const [popup, setPopup] = useState({
    nameOfBuyer: false,
    addOfBuyer: false,
    nameOfVendor: false,
    addOfVendor: false,
    assignPeople: false,
  });
  // const [buyerPopup, setBuyerPopup] = useState(false);
  // const [vendorPopup, setVendorPopup] = useState(false);
  const [count, setCount] = useState(1);

  const validationSchema = Yup.object().shape({
    poNumber: Yup.string().required("PO Number is required"),
    nameOfBuyer: Yup.string().required("Name of Buyer is required"),
    addOfBuyer: Yup.string().required("Address of Buyer is required"),
    nameOfVendor: Yup.string().required("Name of Factory is required"),
    addOfVendor: Yup.string().required("Address of Factory is required"),
    shiptoName: Yup.string().required("Shipping to is required"),
    shiptoAdd: Yup.string().required("Shipping Address is required"),
    shipVia: Yup.string().required("Mode of Shipping is required"),
    shipDate: Yup.string().required("Date of Shipping is required"),
    totalCarton: Yup.number()
      .typeError("Total Carton must be a number")
      .required("Total Carton is required")
      .positive("Total Carton must be a positive number"),
    assignPeople: Yup.mixed().required("Add People of Interest"),
    inv_number: Yup.string().required("Invoice Number is required"),
    // slotOfInspection: Add validation for the array if needed
  });

  const intials = {
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
  };
  console.log(aiData.poNumber);

  console.log("Initial Values: ", initialValues); // Check if this outputs the expected values

  const formik = useFormik({
    initialValues,
    onSubmit: () => handleSubmit(),
    // validationSchema,
  });

  const { values } = formik;

  console.log(values);

  useEffect(() => {
    if (values.nameOfBuyer && values.nameOfVendor) {
      fetchpeople();
    } else {
      true;
    }
  }, [values.nameOfBuyer, values.nameOfVendor]);

  const getUser = async () => {
    const { data } = await axios.get(
      import.meta.env.VITE_BASE_URL + `/api/getAllCompanyByRole/${companyId}`
    );
    // console.log(data);
    if (userInformation?.companyId?.companyRole === "Buyer") {
      formik.setFieldValue("nameOfBuyer", userInformation.companyId?.name);
      formik.setFieldValue("addOfBuyer", userInformation.companyId?.city);
      setIds({ ...ids, buyerId: companyId });
    } else {
      setBuyer(data.AllFields.Buyer);
    }
    setVendor(data.AllFields.Factory);
  };

  useEffect(() => {
    getUser();
    fetchpeople();
    setPeopelOfInterest([
      { id: userInformation?._id, name: userInformation?.name },
    ]);
    const userRole = userInformation?.companyId?.companyRole;
  }, [companyId]);

  // console.log(buyer, companyId);
  // console.log(vendor);

  async function handleSubmit() {
    setIsloading(true);
    try {
      let status = "";
      if (
        userInformation?.role?.SelectAccess?.purchaseOrder?.some(
          (item) => item === "Approve"
        )
      ) {
        status = "Published";
      } else {
        status = "Pending Approval";
      }

      const requestBody = {
        purchaseDoc,
        buyer: ids.buyerId,
        vendor: ids.vendorId,
        shiptoName: formik.values.shiptoName,
        shiptoAdd: formik.values.shiptoAdd,
        shipVia: formik.values.shipVia,
        shipDate: formik.values.shipDate,
        assignedPeople: peopleOfInterest.map((item) => item.id),
        poNumber: formik.values.poNumber,
        products: [...slotOfProducts],
        productImages: imgFormUploadData,
        status,
      };

      const formData = new FormData();

      Object.keys(requestBody).forEach((key) => {
        if (Array.isArray(requestBody[key])) {
          if (key === "productImages") {
            requestBody[key].map((product, productIndex) => {
              product.map((e, index) => {
                formData.append(
                  `productImage[${productIndex}][${index}].${e.name}`,
                  e.file
                );
              });
            });
          } else {
            requestBody[key].forEach((item, index) => {
              // If the item is an object or array, you might need to stringify it before appending
              formData.append(`${key}[${index}]`, JSON.stringify(item));
            });
          }
        } else {
          formData.append(key, requestBody[key]);
        }
      });

      // for (let pair of formData.entries()) {
      //   console.log(pair);
      // }

      // const response = await axios.post(
      //   import.meta.env.VITE_BASE_URL + `/api/purchaseOrder`,
      //   formData,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   }
      // );

      // console.log(response, "PO");

      if (e.target.type === "submit") {
        wyraiApi
          .post("/api/purchaseOrder", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            navigate(-1);
            setIsloading(false);
          })
          .catch((err) => console.log(err));
      } else {
        wyraiApi
          .post(`/api/PuracheseOrderDraft/${userInformation?._id}`, requestBody)
          .then((res) => {
            navigate(-1);
            setIsloading(false);
          })
          .catch((err) => console.log(err));
      }
    } catch (error) {
      setIsloading(false);
      console.log(error);
    }
  }

  // useEffect(() => {
  //   const allFieldsFilled = Object.values(productList).every(
  //     (value) => value !== ""
  //   );
  //   console.log(allFieldsFilled);
  //   if (allFieldsFilled) {
  //     console.log("filled");
  //     setSlotOfProducts([
  //       ...slotOfProducts,
  //       { ...productList, images: imagesFiles },
  //     ]);
  //     setSlotOfProducts([
  //       ...slotOfProducts,
  //       {
  //         ...intials,
  //         ["images"]: [],
  //       },
  //     ]);
  //     // setProductList(intials);
  //   }
  // }, [productList]);

  // console.log(imagesFiles, imageIndex);
  // useEffect(() => {
  //   console.log("here");
  //   if (typeof imageIndex === "number") {
  //     handleProductChange(imageIndex, "images", imagesFiles);
  //   }
  // }, [imageIndex, imagesFiles]);

  const handleProductChange = (poIndex, field, value) => {
    const newPurchaseOrders = [...slotOfProducts];
    if (field === "images") {
      console.log("images");
      const img = newPurchaseOrders[poIndex][field];
      // console.log(newPurchaseOrders[poIndex][field], value, poIndex);
      newPurchaseOrders[poIndex][field] = [...value];
      setSlotOfProducts(newPurchaseOrders);
    } else {
      newPurchaseOrders[poIndex][field] = value;
    }
    // console.log(newPurchaseOrders);
    setSlotOfProducts(newPurchaseOrders);
  };

  const addSlotOfProduct = () => {
    try {
      // console.log(slotOfProducts);
      setSlotOfProducts([
        ...slotOfProducts,
        {
          ...intials,
          ["images"]: intialImages,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(slotOfProducts);

  const addAssignPeople = (id, name, value) => {
    try {
      const isExisting = peopleOfInterest.some((item) => item.id === id);
      // console.log(isExisting);
      if (!isExisting) {
        setPeopelOfInterest([...peopleOfInterest, { id, name }]);
        setPopup({ ...popup, [value]: !popup[value] });
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(peopleOfInterest);

  const RemoveAssignPeople = (id) => {
    try {
      setPeopelOfInterest(peopleOfInterest.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(peopleOfInterest);

  const handleBack = () => {
    try {
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };

  // if (showPurchaseOrder) {
  //   return (
  //     <Preview
  //       photos={purchaseDoc}
  //       check={showPurchaseOrder}
  //       onChange={setShowPurchaseOrder}
  //     />
  //   );
  // }
  //  this preview has bug in it , need to resolve just have to put this component into prompt component

  const handleClick = (e) => {
    setPopup({ ...popup, [e.target.name]: !popup[e.target.name] });
  };

  const handleChange = (e) => {
    formik.handleChange(e);
  };

  const handleDropDownSelect = (name, address, item) => {
    formik.setFieldValue(name, item.companyId?.name);
    formik.setFieldValue(
      address,
      `${item.companyId?.city}, ${item.companyId?.country}`
    );
    if (name === "nameOfBuyer") {
      setIds({ ...ids, buyerId: item.companyId?._id });
    } else {
      setIds({ ...ids, vendorId: item.companyId?._id });
    }
    setPopup({ ...popup, [name]: !popup[name] });
  };

  useEffect(() => {
    // setIsPoLoading(false);
    const POAIData = async () => {
      console.log(isLoading);
      // setIsPoLoading(false);
      try {
        console.log("Hello");
        const formData = new FormData();
        formData.append("image_file", ApiImage);

        axios
          .post("http://13.127.36.67:5000/detect", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            console.log(res);
            setAiData(res.data);
            setIsPoLoading(false);
            // document.getElementById("bottom").scrollIntoView();
            // setInitialValues({
            //   poNumber: res.data.poNumber,
            //   nameOfBuyer: res.data.nameOfBuyer,
            //   addOfBuyer: res.data.addOfBuyer,
            //   nameOfVendor: res.data.nameOfVendor,
            //   addOfVendor: res.data.addOfVendor,
            //   shiptoName: "",
            //   shiptoAdd: "",
            //   shipVia: "",
            //   shipDate: selectedDate,
            //   totalCarton: res.data.totalCarton,
            //   inv_number: "",
            //   assignPeople: "",
            // });
          })
          .catch((err) => console.log(err));
        // if (response.status === "200") {
        //   setIsPoLoading(false);
        // }

        // console.log(response, "hfddd");
      } catch (error) {
        console.log(error);
        setIsPoLoading(false);
      }
    };
    console.log(ApiImage, "gfffcf");
    if (ApiImage) POAIData();
  }, [ApiImage]);
  console.log(aiData.poNumber);

  useEffect(() => {
    const products = aiData?.table?.products;
    console.log(products);

    let productsArray = [];
    // if (Object.keys(productList).length > 0) {
    //   productsArray = Object.keys(products).map((key) => ({
    //     id: key,
    //     ...products[key],
    //   }));
    // }

    // Object.keys(aiData).map((key) => {
    //     if(key === "table"){

    //     }
    // })
  }, [aiData]);

  const fetchpeople = async () => {
    if (ids.buyerId.length > 0 && ids.vendorId.length > 0) {
      wyraiApi
        .get(`/api/getAllEmployess/${ids.buyerId}/${ids.vendorId}`)
        .then((res) => setPeople(res.data))
        .then((err) => console.log(err));
    }
  };
  // console.log(userInformation);

  const DropDown = ({ children }) => {
    return (
      <>
        <div className="absolute top-[60px] shadow mt-2 bg-white w-full z-50  ">
          <ul className="ml-6 h-[130px] overflow-x-auto cursor-pointer">
            {children}
          </ul>
        </div>
      </>
    );
  };

  const ImageHandler = async (value) => {
    setApiImage(value);
  };
  console.log(isPoLoading);

  const scrollToDiv = () => {
    const container = document.getElementById("container");
    const scrollTo = document.getElementById("scrollToDiv");
    container.scrollTo({
      top:
        scrollTo.offsetTop -
        container.clientHeight / 2 +
        scrollTo.clientHeight / 2,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div
        id="container"
        className=" h-[94vh] w-[95%] pt-2 mx-auto flex flex-col"
      >
        <div className="h-[3%] mb-5">
          <button
            type="button"
            onClick={handleBack}
            className="flex font-medium gap-4 items-center"
          >
            <BiArrowBack size={28} /> Purchase Order
          </button>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex-1 flex-cols gap-10 w-full h-[45%] bg-white overflow-y-auto  "
        >
          <div className="  h-[500px] rounded-md  flex mb-11 ">
            <div className="relative w-full h-full ">
              {isPoLoading && (
                <div className="h-full w-full  absolute top-[0px] left-[0px] z-50 flex items-center justify-center bg-[#ffffffc4]">
                  <PoLoading />
                </div>
              )}
              <DropZone
                // onDrop={setPurchaseDoc}
                setLoader={setIsPoLoading}
                setFormData={setPurchaseDoc}
                multiple={true}
                message={"Upload Purchase Order"}
                method={ImageHandler}
              />
            </div>
            {/* {purchaseDoc && (
              <img
                src={purchaseDoc}
                alt="Preview"
                className="w-full h-full  "
              />
            )} */}
          </div>
          <div className="h-10 w-full bg-[#F3F4F6]"></div>
          <div id="bottom" className=" ml-5 mt-5 w-1/2">
            <h1 className="text-xl font-bold mb-5">PO Number</h1>
            <InputField
              label="PO Number"
              name="poNumber"
              type="text"
              value={aiData.poNumber || formik.values.poNumber}
              onChange={handleChange}
              // handleClick={handleClick}
              onBlur={formik.handleBlur}
              error={formik.touched.poNumber && formik.errors.poNumber}
              placeholder={"Enter PO Number"}
              labelColor={"bg-white"}
            />
          </div>
          <div className="ml-5">
            <h1 className="text-xl font-bold mb-6">Buyers</h1>
            <div className="flex gap-5 ">
              <div className="relative flex-1 cursor-pointer">
                <InputField
                  label="Name"
                  name="nameOfBuyer"
                  type="text"
                  value={aiData.nameOfBuyer || formik.values.nameOfBuyer}
                  onChange={handleChange}
                  handleClick={handleClick}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.nameOfBuyer && formik.errors.nameOfBuyer
                  }
                  placeholder={"Name Of Buyer"}
                  labelColor={"bg-white"}
                  disable={userInformation?.role?.name === "Buyer"}
                />

                {popup.nameOfBuyer && (
                  <DropDown>
                    {buyer &&
                      buyer?.map((item, index) => {
                        const intials = item?.name?.charAt(0).toUpperCase();
                        return (
                          <li
                            key={index}
                            className="py-2 flex items-center gap-4 mr-2 border-b"
                            onClick={() =>
                              handleDropDownSelect(
                                "nameOfBuyer",
                                "addOfBuyer",
                                item
                              )
                            }
                          >
                            <span className="w-6 h-6 bg-blue flex justify-center items-center rounded-full">
                              {intials}
                            </span>
                            <span className="flex-1 text-xs">{item.name}</span>
                            <span className="flex gap-2 items-center">
                              <img
                                src={gps}
                                alt="gps"
                                className="w-[16px] h-[16px]"
                              />
                              <span className="text-[10px]">
                                {item.city}, {item.country}
                              </span>
                            </span>
                          </li>
                        );
                      })}
                  </DropDown>
                )}
              </div>

              <div className="relative flex-1">
                <InputField
                  label="Address"
                  name="addOfBuyer"
                  type="text"
                  value={aiData.addOfBuyer || formik.values.addOfBuyer}
                  onChange={handleChange}
                  handleClick={handleClick}
                  onBlur={formik.handleBlur}
                  error={formik.touched.addOfBuyer && formik.errors.addOfBuyer}
                  placeholder={"Address Of Buyer"}
                  labelColor={"bg-white"}
                />
              </div>
            </div>
          </div>
          <div className="ml-5">
            <h1 className="text-xl font-bold mb-6">Vendors</h1>
            <div className=" flex gap-5 ">
              <div className=" relative flex-1">
                <InputField
                  label="Name"
                  name="nameOfVendor"
                  type="text"
                  value={aiData.nameOfVendor || formik.values.nameOfVendor}
                  onChange={handleChange}
                  handleClick={handleClick}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.nameOfVendor && formik.errors.nameOfVendor
                  }
                  placeholder={"Name Of Vendor"}
                  labelColor={"bg-white"}
                />
                {popup.nameOfVendor && (
                  <DropDown>
                    {vendor &&
                      vendor?.map((item, index) => {
                        const intials = item?.companyId?.name
                          ?.charAt(0)
                          .toUpperCase();
                        return (
                          <li
                            key={index}
                            className="py-2 flex items-center gap-4 mr-2 border-b"
                            onClick={() =>
                              handleDropDownSelect(
                                "nameOfVendor",
                                "addOfVendor",
                                item
                              )
                            }
                          >
                            {/* {item} */}
                            <span className="w-6 h-6 bg-blue flex justify-center items-center rounded-full">
                              {intials || "A"}
                            </span>
                            <span className="flex-1 text-xs">
                              {item?.companyId?.name}
                            </span>
                            <span className="flex gap-2 items-center">
                              <img
                                src={gps}
                                alt="gps"
                                className="w-[16px] h-[16px]"
                              />
                              <span className="text-[10px]">
                                {item?.companyId?.city},{" "}
                                {item?.companyId?.country}
                              </span>
                            </span>
                          </li>
                        );
                      })}
                  </DropDown>
                )}
              </div>

              <div className="flex-1">
                <InputField
                  label="Address"
                  name="addOfVendor"
                  type="text"
                  value={aiData.addOfVendor || formik.values.addOfVendor}
                  onChange={handleChange}
                  handleClick={handleClick}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.addOfVendor && formik.errors.addOfVendor
                  }
                  placeholder={"Address Of Vendor"}
                  labelColor={"bg-white"}
                />
              </div>
            </div>
          </div>
          <div className="ml-5">
            <h1 className="text-xl font-bold mb-6">Ship To</h1>
            <div className="grid gap-5 md:grid-cols-2 ">
              <div className="flex-1">
                <InputField
                  label="Name"
                  name="shiptoName"
                  type="text"
                  value={aiData.shiptoName || formik.values.shiptoName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.shiptoName && formik.errors.shiptoName}
                  placeholder={"Zig Zag"}
                  labelColor={"bg-white"}
                />
              </div>

              <div className="flex-1">
                <InputField
                  label="Complete Address"
                  name="shiptoAdd"
                  type="text"
                  value={aiData.shiptoAdd || formik.values.shiptoAdd}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.shiptoAdd && formik.errors.shiptoAdd}
                  placeholder={"D 298 Sector 63 Uttar Pradesha Noida"}
                  labelColor={"bg-white"}
                />
              </div>
              <div className="flex-1">
                <InputField
                  label="Ship via"
                  name="shipVia"
                  type="text"
                  value={formik.values.shipVia}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.shipVia && formik.errors.shipVia}
                  placeholder={"Sea"}
                  labelColor={"bg-white"}
                />
              </div>

              <div className="flex-1 relative">
                <Datepicker
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  name={"shipDate"}
                  className={
                    "form-input border border-gray-400 mt-1 pl-4 py-4 pr-10  rounded-md w-full outline-none"
                  }
                  onClickOutside={toggleCalendar} // Close the calendar when clicking outside
                  open={isCalendarOpen}
                />
                <label
                  className={`block absolute top-[-24%]  left-[8%] md:top-[-25%] md:left-[10%] text-gray-500  tracking-tighter  py-1 px-3  ${"text-base"} mb-2 bg-white`}
                  htmlFor="name"
                >
                  Ship Date
                </label>

                <HiOutlineCalendar
                  className=" absolute top-[18%] right-[3%] h-8 w-8 cursor-pointer"
                  onClick={toggleCalendar}
                />
              </div>
            </div>
          </div>
          <div className="ml-5">
            <h1 className="font-bold text-xl mb-6 ">
              Assign People of Interest
            </h1>
            <div className="relative w-full md:w-1/2 ">
              <div className="relative">
                <InputField
                  label="Assign People"
                  name="assignPeople"
                  type="text"
                  value={formik.values.assignPeople}
                  onChange={handleChange}
                  handleClick={handleClick}
                  onBlur={formik.handleBlur}
                  // error={
                  //   formik.touched.assignPeople && formik.errors.assignPeople
                  // }
                  placeholder={""}
                  labelColor={"bg-white"}
                  disable={true}
                />
                <img
                  src={addUser}
                  className="absolute top-[15%] right-[3%] cursor-pointer"
                  alt=""
                  onClick={() =>
                    setPopup({
                      ...popup,
                      ["assignPeople"]: !popup["assignPeople"],
                    })
                  }
                />
                <div className="absolute top-[22px] left-[24px] flex gap-4">
                  {peopleOfInterest.length > 0 &&
                    peopleOfInterest.map((item) => {
                      const initial = item?.name?.charAt(0).toUpperCase();
                      return (
                        <div className="flex relative">
                          <span className="w-6 h-6  bg-blue flex justify-center items-center rounded-full">
                            {initial}
                          </span>
                          <IoIosCloseCircle
                            className="absolute bottom-[-5px] right-[-7px] bg-white rounded-full cursor-pointer"
                            onClick={() => RemoveAssignPeople(item?.id)}
                          />
                        </div>
                      );
                    })}
                </div>
              </div>
              {popup.assignPeople && (
                <DropDown>
                  {people.length > 0 &&
                    people?.map((item, index) => {
                      const intials = item?.name?.charAt(0).toUpperCase();
                      //   console.log(item._id);
                      return (
                        <li
                          key={index}
                          className="py-2 flex items-center gap-4 mr-2 border-b"
                          onClick={() =>
                            addAssignPeople(
                              item?._id,
                              item?.name,
                              "assignPeople"
                            )
                          }
                        >
                          {/* {item} */}
                          <span className="w-6 h-6 bg-blue flex justify-center items-center rounded-full">
                            {intials || "A"}
                          </span>
                          <span className="flex-1 text-xs">{item?.name}</span>
                          <span className="text-xs">{item?.role?.name}</span>
                          <span className="flex gap-2 items-center">
                            <img
                              src={gps}
                              alt="gps"
                              className="w-[16px] h-[16px]"
                            />
                            <span className="text-[10px]">
                              {item?.officeBranch?.city},{" "}
                              {item?.officeBranch?.country}
                            </span>
                          </span>
                        </li>
                      );
                    })}
                </DropDown>
              )}
            </div>
          </div>

          <div className=" ml-5 mb-4">
            <h1 className="text-xl font-bold mb-4">Products</h1>
            {slotOfProducts.map((item, index) => {
              // console.log(item);
              return (
                <Products
                  setImageIndex={setImageIndex}
                  key={index}
                  data={item}
                  handleProductChange={handleProductChange}
                  poIndex={index}
                />
              );
              // <CounterComponent key={index} />
            })}
          </div>

          <button
            type="button"
            className=" flex justify-start items-center cursor-pointer pl-6 w-full gap-1 py-3 bg-[#1B9BEF1A] mb-4 "
            onClick={() => {
              addSlotOfProduct();
              setCount((prevCount) => prevCount + 1);
            }}
          >
            <FaPlus className="text-blue font-bold text-xl" />
            <span className="text-[#1B9BEF] text-xl font-bold ">
              {"Add Another Products"}
            </span>
          </button>
          <div className="flex justify-end gap-2 mb-6  ">
            <button
              type="button"
              className="py-2 rounded-md px-11 border-2 border-[#1B9BEF] text-[#1B9BEF] font-bold "
              onClick={() => handleSubmit()}
            >
              Save Draft
            </button>
            <button
              type="submit"
              className="py-2 rounded-md px-11 bg-blue font-bold text-white"
              onClick={() => {
                // addSlotOfProduct();
                handleSubmit();
              }}
            >
              {isLoading ? <Loader /> : `Publish`}
            </button>
          </div>
          {/* {purchaseDoc && (
            <button
              type="button"
              className="bg-blue flex gap-2 items-center z-10 absolute right-[4.5vh] top-[90px] py-2 px-4 rounded text-white"
              onClick={() => setShowPurchaseOrder(true)}
            >
              <AiOutlineSearch className="text-white text-2xl" />
              Preview
            </button>
          )} */}
          <div className="">
            <Prompt
              btnText={
                <button
                  type="button"
                  className="bg-blue flex gap-2 items-center z-10 absolute right-[5vh] top-[110px] py-2 px-4 rounded text-white"
                  // onClick={() => setShowPurchaseOrder(true)}
                >
                  <AiOutlineSearch className="text-white text-2xl" />
                  Preview
                </button>
              }
              modalID={"preview"}
            >
              <Preview
                photos={purchaseDoc}
                check={showPurchaseOrder}
                onChange={setShowPurchaseOrder}
              />
            </Prompt>
          </div>
        </form>
      </div>

      {/* {purchaseDoc && (
        <img
          title="PDF Viewer"
          src={purchaseDoc}
          width="600"
          height="400"
        ></img>
      )} */}
    </>
  );
}

export default PurchaseOrder;
