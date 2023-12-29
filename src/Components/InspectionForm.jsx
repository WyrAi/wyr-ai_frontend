/** @format */

// InspectionForm.jsx
import React, { useEffect, useState } from "react";
import { BiArrowBack, BiUserPlus } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Input from "../container/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useGetFetch, useCreateFetch } from "../api/api";
import DropZone from "./DropZone";
import Prompt, { closeModal } from "../DasiyUIComponents/Prompt";
// import Datepicker from './DatepickerComponent';
import moment from "moment/moment";
import { formatDate } from "../Utils/formatDate";
import PackingList from "../container/PackingList";
import addUser from "../assets/noun-add-account-6047901 1.svg";
import { RiCloseCircleFill } from "react-icons/ri";
import DatepickerComponent from "./DatepickerComponent";
import TimePicker from "./TimePicker";
import { userGloabalContext } from "../UserContext";
import InputField from "../container/InputField";
import wyraiApi from "../api/wyraiApi";
import gps from "../assets/ion_location-outline.svg";
import axios from "axios";

/**
 * A form component for inspection data.
 *
 * @returns {JSX.Element} The InspectionForm component.
 */

function InspectionForm() {
  const { startTime, companyId, userInformation } = userGloabalContext();
  const [userRelations, setUserRelations] = useState("");
  const [qcUser, setQcUsers] = useState([]);
  const navigate = useNavigate();
  const [packingListFiles, setPackingListFiles] = useState(null);
  const [inspectionDate, setInspectionDate] = useState(new Date());
  const [slotOfInspection, setSlotOfInspection] = useState([]);

  const [poNumber, setPoNumber] = useState([]);
  const [products, setProducts] = useState([]);
  const [added, setAdded] = useState(false);
  const [ids, setIds] = useState({
    buyerId: "",
    factoryId: "",
    qcId: "",
    qcHeadId: "",
  });

  const initials = {
    images: "",
    from: "",
    to: "",
    styleId: "",
    styleName: "",
    quantityPerBox: "",
    totalBox: "",
    totalQuantity: "",
    branch: "",
  };

  const [purchaseOrder, setPurchaseOrder] = useState(initials);
  const initialPoData = { poNumber: "", poId: "", products: [initials] };
  const [addpurchaseOrder, setAddPurchaseOrder] = useState([initialPoData]);

  // console.log(userInformation);

  const handlePoNumberChange = (index, item) => {
    setProducts([item]);
    // console.log(item);
    const newPurchaseOrder = [...addpurchaseOrder];

    newPurchaseOrder[index].poNumber = item?.poNumber;
    newPurchaseOrder[index].poId = item?._id;
    newPurchaseOrder[index].products = item?.products?.map((item, index) => {
      return {
        ...addpurchaseOrder[index].products[0],
        styleId: item.styleId,
        styleName: item.styleName,
        images: item.images,
      };
    });
    setAddPurchaseOrder(newPurchaseOrder);
  };
  const handleProductChange = (poIndex, productIndex, field, value) => {
    const newPurchaseOrders = [...addpurchaseOrder];
    newPurchaseOrders[poIndex].products[productIndex][field] = value;
    setAddPurchaseOrder(newPurchaseOrders);
  };

  const addNewPo = () => {
    setAddPurchaseOrder([...addpurchaseOrder, { ...initialPoData }]);
  };

  const initialValues = {
    nameOfBuyer: "",
    addOfBuyer: "",
    nameOfQcAgency: "",
    nameOfQcHead: "",
    nameOfFactory: "",
    addOfFactory: "",
    totalCarton: "",
    po_number: "",
    // slotOfInspection: slotOfInspection,
  };

  const validationSchema = Yup.object().shape({
    nameOfBuyer: Yup.string().required("Name of Buyer is required"),
    addOfBuyer: Yup.string().required("Address of Buyer is required"),
    nameOfFactory: Yup.string().required("Name of Factory is required"),
    addOfFactory: Yup.string().required("Address of Factory is required"),
    totalCarton: Yup.number()
      .typeError("Total Carton must be a number")
      .required("Total Carton is required")
      .positive("Total Carton must be a positive number"),
    inv_number: Yup.string().required("Invoice Number is required"),
    // slotOfInspection: Add validation for the array if needed
  });

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => handleSubmit(values),
    validationSchema,
  });

  const [popup, setPopup] = useState({
    nameOfBuyer: false,
    nameOfQcAgency: false,
    nameOfFactory: false,
    nameOfQcHead: false,
    po_number: false,
  });

  const addSlotOfInspection = () => {
    try {
      setSlotOfInspection([
        ...slotOfInspection,
        { date: inspectionDate, time: startTime },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const clearFieldData = (data, setData) => {
    const clearedData = Object.fromEntries(
      Object.keys(data).map((key) => [key, ""])
    );
    // console.log(clearedData);
    setData(clearedData);
  };

  const getAllData = () => {
    wyraiApi
      .get(`/api/getAllCompanyByRole/${companyId}`)
      .then((res) => setUserRelations(res.data.AllFields))
      .catch((err) => console.log(err));
  };

  const getQCUsers = (item, name) => {
    setPopup({ ...popup, [name]: !popup[name] });
    setIds({ ...ids, qcId: item?.companyId?._id });
    formik.setFieldValue(name, item.companyId?.name);
    wyraiApi
      .get(`/api/qcAssignmentRolePeoples/${item?.companyId?._id}`)
      .then((res) => {
        setQcUsers(res.data.Data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllData();
    if (userInformation?.companyId?.companyRole === "Factory") {
      setIds({ ...ids, factoryId: companyId });
      formik.setFieldValue("nameOfFactory", userInformation?.companyId?.name);
      formik.setFieldValue(
        "addOfFactory",
        userInformation?.companyId?.city +
          ", " +
          userInformation?.companyId?.country
      );
    }
  }, []);

  const handleDropDownSelect = (name, address, item) => {
    setPopup({ ...popup, [name]: !popup[name] });

    formik.setFieldValue(name, item?.name);
    formik.setFieldValue(address, `${item?.city}, ${item?.country}`);

    if (name === "nameOfBuyer") {
      wyraiApi
        .get(`/api/PoGetFromUser/${userInformation?._id}/${item?._id}`)
        .then((res) => setPoNumber(res.data.Response));
      setIds({ ...ids, buyerId: item?._id });
    } else if (name === "nameOfQcHead") {
      setIds({ ...ids, qcHeadId: item?._id });
    } else {
      // setIds({ ...ids, vendorId: item?._id });
    }
  };

  const [activePoNumber, setActivePoNumber] = useState(null);

  const toggleDropDown = (key) => {
    if (activePoNumber === key) {
      setActivePoNumber(null);
    } else {
      setActivePoNumber(key);
    }
  };

  const handleClick = (e) => {
    setPopup({ ...popup, [e.target.name]: !popup[e.target.name] });
  };

  const handleBack = () => {
    try {
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };
  async function handleSubmit() {
    try {
      let status = "";
      if (
        userInformation?.role?.SelectAccess?.packingList?.some(
          (item) => item === "Approve"
        )
      ) {
        status = "Pending Approval";
      } else {
        // status = "Pending Approval";
      }
      const reqbody = {
        ...formik.values,
        addpurchaseOrder,
        slotOfInspection,
        packingListFiles,
        ...ids,
      };
      wyraiApi
        .post(`/api/PLCreate/${userInformation?._id}`, {
          ...formik.values,
          addpurchaseOrder,
          slotOfInspection,
          packingListFiles,
          ...ids,
          status,
        })
        .then((res) => navigate(-1))
        .catch((err) => console.log(err));
    } catch (error) {
      console.error(error);
    }
  }

  // const [ApiImage, setApiImage] = useState();

  // useEffect(() => {
  //   // setIsPoLoading(false);
  //   const POAIData = async () => {
  //     // console.log(isLoading);
  //     // setIsPoLoading(false);
  //     try {
  //       console.log("Hello");
  //       const formData = new FormData();
  //       formData.append("image", ApiImage);

  //       for (let pair of formData.entries()) {
  //         console.log(pair);
  //       }

  //       axios
  //         .post("http://15.206.153.55:5000/generate-content", formData, {
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //           },
  //         })
  //         .then((res) => {
  //           console.log(res);
  //           // wyraiApi.post("/api/logsCreate", res.data);
  //           // setAiData(res.data);
  //           // setIsPoLoading(false);
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //           // setIsPoLoading(false);
  //         });
  //     } catch (error) {
  //       console.log(error);
  //       // setIsPoLoading(false);
  //     }
  //   };

  //   if (ApiImage) POAIData();
  // }, [ApiImage]);

  // const ImageHandler = async (value) => {
  //   setApiImage(value);
  // };

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

  return (
    <div className="h-[91vh] bg-white py-4">
      <div className="grid gap-8 w-[95%] h-full mx-auto">
        <div>
          <button
            onClick={handleBack}
            className="flex font-medium gap-4 items-center"
          >
            <BiArrowBack size={28} /> Packing List
          </button>
        </div>
        <form
          className="grid gap-8 md:grid-cols-2 w-full h-full overflow-auto"
          onSubmit={formik.handleSubmit}
        >
          <div className="col-span-2 h-[40vh]  border-2 border-dashed border-black rounded-md overflow-hidden flex">
            <DropZone
              onDrop={setPackingListFiles}
              multiple={true}
              message={"Upload Packing List"}
              // method={ImageHandler}
            />
          </div>
          <div className="relative">
            <InputField
              label="Name of Buyer"
              name="nameOfBuyer"
              type="text"
              value={formik.values.nameOfBuyer}
              onChange={formik.handleChange}
              handleClick={handleClick}
              onBlur={formik.handleBlur}
              error={formik.touched.nameOfBuyer && formik.errors.nameOfBuyer}
              placeholder={"Enter the Email of User"}
              labelColor={"bg-white"}
            />
            {popup.nameOfBuyer && (
              <DropDown>
                {userRelations["Buyer"]?.map((item, index) => {
                  const intials = item?.companyId?.name
                    ?.charAt(0)
                    .toUpperCase();
                  // console.log(item);
                  return (
                    <li
                      key={index}
                      className="py-2 flex items-center gap-4 mr-2 border-b"
                      onClick={() => {
                        handleDropDownSelect(
                          "nameOfBuyer",
                          "addOfBuyer",
                          item?.companyId
                        );
                        // handleClick();
                      }}
                    >
                      <span className="w-6 h-6 bg-blue flex justify-center items-center rounded-full">
                        {intials}
                      </span>
                      <span className="flex-1 text-xs">
                        {item.companyId?.name}
                      </span>
                      <span className="flex gap-2 items-center">
                        <img
                          src={gps}
                          alt="gps"
                          className="w-[16px] h-[16px]"
                        />
                        <span className="text-[10px]">
                          {item.companyId?.city}, {item.companyId?.country}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </DropDown>
            )}
          </div>

          <InputField
            label="Address of Buyer"
            name="addOfBuyer"
            type="text"
            value={formik.values.addOfBuyer}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.addOfBuyer && formik.errors.addOfBuyer}
            placeholder={"Enter the Email of User"}
            labelColor={"bg-white"}
          />
          <div className="relative">
            <InputField
              label="Name of Factory"
              name="nameOfFactory"
              type="text"
              value={formik.values.nameOfFactory}
              onChange={formik.handleChange}
              handleClick={handleClick}
              onBlur={formik.handleBlur}
              error={
                formik.touched.nameOfFactory && formik.errors.nameOfFactory
              }
              placeholder={"Enter the Email of User"}
              labelColor={"bg-white"}
              disable={true}
            />

            {popup.nameOfFactory && (
              <DropDown>
                {userRelations["Factory"]?.map((item, index) => {
                  const intials = item?.companyId?.name
                    ?.charAt(0)
                    .toUpperCase();
                  return (
                    <li
                      key={index}
                      className="py-2 flex items-center gap-4 mr-2 border-b"
                      onClick={() =>
                        handleDropDownSelect(
                          "nameOfFactory",
                          "addOfFactory",
                          item?.companyId
                        )
                      }
                    >
                      <span className="w-6 h-6 bg-blue flex justify-center items-center rounded-full">
                        {intials}
                      </span>
                      <span className="flex-1 text-xs">
                        {item.companyId?.name}
                      </span>
                      <span className="flex gap-2 items-center">
                        <img
                          src={gps}
                          alt="gps"
                          className="w-[16px] h-[16px]"
                        />
                        <span className="text-[10px]">
                          {item.companyId?.city}, {item.companyId?.country}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </DropDown>
            )}
          </div>

          <InputField
            label="Address of Factory"
            name="addOfFactory"
            type="text"
            value={formik.values.addOfFactory}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.addOfFactory && formik.errors.addOfFactory}
            placeholder={"Enter the Email of User"}
            labelColor={"bg-white"}
          />
          <div className="relative">
            <InputField
              label="Name of QC Agency"
              name="nameOfQcAgency"
              type="text"
              value={formik.values.nameOfQcAgency}
              onChange={formik.handleChange}
              handleClick={handleClick}
              onBlur={formik.handleBlur}
              error={
                formik.touched.nameOfQcAgency && formik.errors.nameOfQcAgency
              }
              placeholder={"Enter the Email of User"}
              labelColor={"bg-white"}
            />
            {popup.nameOfQcAgency && (
              <DropDown>
                {userRelations["QC Agency"]?.map((item, index) => {
                  const intials = item?.companyId?.name
                    ?.charAt(0)
                    .toUpperCase();
                  return (
                    <li
                      key={index}
                      className="py-2 flex items-center gap-4 mr-2 border-b"
                      onClick={
                        () => getQCUsers(item, "nameOfQcAgency")
                        // handleDropDownSelect("nameOfBuyer", "addOfBuyer", item)
                      }
                    >
                      <span className="w-6 h-6 bg-blue flex justify-center items-center rounded-full">
                        {intials}
                      </span>
                      <span className="flex-1 text-xs">
                        {item.companyId?.name}
                      </span>
                      <span className="flex gap-2 items-center">
                        <img
                          src={gps}
                          alt="gps"
                          className="w-[16px] h-[16px]"
                        />
                        <span className="text-[10px]">
                          {item.companyId?.city}, {item.companyId?.country}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </DropDown>
            )}
          </div>
          <div className="relative">
            <InputField
              label="Name Of QC Head"
              name="nameOfQcHead"
              type="text"
              value={formik.values.nameOfQcHead}
              onChange={formik.handleChange}
              handleClick={handleClick}
              onBlur={formik.handleBlur}
              error={formik.touched.nameOfQcHead && formik.errors.nameOfQcHead}
              placeholder={"Enter the Email of User"}
              labelColor={"bg-white"}
            />

            {popup.nameOfQcHead && (
              <DropDown>
                {qcUser?.map((item, index) => {
                  const intials = item?.name?.charAt(0).toUpperCase();
                  return (
                    <li
                      key={index}
                      className="py-2 flex items-center gap-4 mr-2 border-b"
                      onClick={() =>
                        handleDropDownSelect("nameOfQcHead", "", item)
                      }
                    >
                      <span className="w-6 h-6 bg-blue flex justify-center items-center rounded-full">
                        {intials}
                      </span>
                      <div className="flex flex-col flex-1 ">
                        <span className=" text-xs font-medium">
                          {item?.name}
                        </span>
                        <span className=" text-xs">{item?.email}</span>
                      </div>

                      {/* <span className="flex gap-2 items-center">
                        <img
                          src={gps}
                          alt="gps"
                          className="w-[16px] h-[16px]"
                        />
                        <span className="text-[10px]">
                          {item?.city}, {item?.country}
                        </span>
                      </span> */}
                    </li>
                  );
                })}
              </DropDown>
            )}
          </div>

          {/* <Input
            label="Invoice Number"
            name="inv_number"
            type="text"
            value={formik.values.inv_number}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.inv_number && formik.errors.inv_number}
          /> */}

          <div className="flex gap-5 items-center col-span-2">
            <div className="flex-1">
              <label>Add Slot Of Inspection</label>
              <div className="flex items-center justify-between p-1 px-4 hover:opacity-95 w-full py-6 bg-gray-50 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:bg-white">
                <div className="flex flex-col h-[100px] overflow-y-auto w-1/2">
                  {slotOfInspection?.map((slot, index) => (
                    <span key={slot + index}>
                      {formatDate(slot?.date)} - {slot?.time}
                    </span>
                  ))}
                </div>
                <div className="text-white ">
                  <Prompt
                    btnText={
                      <AiOutlinePlus
                        // onClick={addSlotOfInspection}
                        className="bg-blue text-white cursor-pointer hover:opacity-80 rounded-full"
                        size={35}
                      />
                    }
                    modalID={`addSlotInspection`}
                  >
                    <div className="flex flex-col gap-4 md:min-h-[50vh] bg-white text-dark">
                      <div className="flex flex-col gap-4 justify-center items-center">
                        <h2 className="font-semibold text-lg">
                          Add Slot Of Inspection
                        </h2>
                        <span className="font-semibold text-sm mb-4">
                          {formatDate(inspectionDate)}
                          {startTime.length > 0 && <span>- {startTime}</span>}
                          {/* {endTime.length > 0 && <span> to {endTime}</span>} */}
                        </span>
                      </div>
                      <div className="grid md:grid-cols-[17rem_auto]">
                        {/* <Datepicker
												selectedDate={inspectionDate}
												setSelectedDate={setInspectionDate}
												className={'form-input px-4 py-3 rounded-md w-full'}
											/> */}

                        <DatepickerComponent
                          inline={true}
                          selectedDate={inspectionDate}
                          setSelectedDate={setInspectionDate}
                          name={"shipDate"}
                          className={
                            "form-input  mt-1 pl-4 py-4 pr-10  rounded-md w-full outline-none"
                          }
                        />
                        <TimePicker />
                        <div className="col-span-2 text-end ">
                          {!startTime.length ? (
                            <p className="text-xs text-red-500">
                              Please, Enter desired slot time{" "}
                            </p>
                          ) : (
                            <button
                              type="submit"
                              className="col-span-2 bg-blue py-2 px-7 text-white rounded "
                              onClick={addSlotOfInspection}
                            >
                              Save
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </Prompt>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <InputField
                label="Total Carton"
                name="totalCarton"
                type="text"
                value={formik.values.totalCarton}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.totalCarton && formik.errors.totalCarton}
                placeholder={"Enter the Email of User"}
                labelColor={"bg-white"}
              />
            </div>
          </div>

          {addpurchaseOrder.map((item, poIndex) => (
            <div
              key={poIndex}
              className="flex md:flex-col bg-slimeGray p-2 pt-8 rounded-md col-span-2 gap-4 items-center "
            >
              <div className="flex w-full items-center  ">
                <div className=" flex-1 ">
                  <div className="w-1/2 relative">
                    <div
                      className="relative flex items-center justify-between p-1 px-4 py-4 hover:opacity-95 w-full h-[60px] bg-gray-50 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:bg-white"
                      onClick={() => toggleDropDown(poIndex)}
                    >
                      <div className="flex flex-col h-full overflow-y-auto w-full cursor-pointer">
                        <span>{item?.poNumber}</span>
                      </div>
                      <span className="absolute top-[-13px] bg-white px-2 left-[50px]">
                        Po Number
                      </span>
                    </div>
                    {activePoNumber === poIndex && (
                      <DropDown>
                        {poNumber?.map((item, index) => {
                          return (
                            <li
                              key={index}
                              className="py-2 flex items-center gap-4 mr-2 border-b"
                              onClick={() => {
                                toggleDropDown(poIndex);
                                handlePoNumberChange(poIndex, item?.poList[0]);
                              }}
                            >
                              {/* <span className="w-6 h-6 bg-blue flex justify-center items-center rounded-full">
                                {item?.poList?.name?.poNumber}
                              </span> */}
                              <div className="flex flex-col flex-1 ">
                                <span className=" text-md font-medium">
                                  PO Number- {item?.poList[0]?.poNumber}
                                </span>
                                <span className=" text-xs">{item?.email}</span>
                              </div>
                            </li>
                          );
                        })}
                      </DropDown>
                    )}
                  </div>
                </div>
              </div>
              {item?.products?.map((item, productIndex) => {
                // console.log(item);
                return (
                  <PackingList
                    key={products?._id}
                    purchaseOrder={item}
                    setPurchaseOrder={setPurchaseOrder}
                    handleProductChange={handleProductChange}
                    poNumber={poNumber}
                    data={item}
                    poIndex={poIndex}
                    productIndex={productIndex}
                  />
                );
              })}
            </div>
          ))}
          <div className="grid col-span-2 pb-5">
            <button
              type="button"
              onClick={addNewPo}
              className="flex bg-[#1b9aef42] p-3 text-blue font-semibold items-center gap-4"
            >
              <AiOutlinePlus size={28} />
              Add another Purchase Order
            </button>
          </div>
          <div className="flex col-span-2 justify-end gap-4 mb-5">
            <button
              type="button"
              className="px-8 py-2 outline rounded-md outline-2 text-[#CCCCCC] font-semibold hover:opacity-90 outline-[#CCCCCC]"
            >
              Save Draft
            </button>
            <button
              type="submit"
              className="px-8 py-2 outline bg-[#CCCCCC] text-white rounded-md outline-2 hover:opacity-90 outline-[#CCCCCC] font-semibold "
              onClick={() => handleSubmit()}
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InspectionForm;
