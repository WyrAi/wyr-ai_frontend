/** @format */

// InspectionForm.jsx
import React, { useState } from "react";
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

/**
 * A form component for inspection data.
 *
 * @returns {JSX.Element} The InspectionForm component.
 */

function InspectionForm() {
  const { startTime, endTime } = userGloabalContext();

  const [packingListFiles, setPackingListFiles] = useState(null);
  const [inspectionDate, setInspectionDate] = useState(new Date());
  const [slotOfInspection, setSlotOfInspection] = useState([]);
  // const [inspectionTime, setInspectionTime] = useState('');
  const navigate = useNavigate();
  const initialValues = {
    nameOfBuyer: "",
    addOfBuyer: "",
    nameOfFactory: "",
    addOfFactory: "",
    totalCarton: "",
    inv_number: "",
    // slotOfInspection: [],
  };

  const names = ["ashish", "sachin", "karan"];

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
  //
  async function handleSubmit(values) {
    try {
      console.log(values);
    } catch (error) {
      console.error(error);
    }
  }

  const addSlotOfInspection = () => {
    try {
      // formik.setFieldValue('slotOfInspection', [
      // 	...formik.values.slotOfInspection,
      // 	'',
      // ]);
      setSlotOfInspection([
        ...slotOfInspection,
        { data: inspectionDate, time: `${startTime} ${endTime}` },
      ]);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(slotOfInspection);

  const handleAddAnotherPurchase = () => {
    try {
      //   return;
    } catch (error) {
      console.log(error);
    }
  };

  const handleBack = () => {
    try {
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-[94vh] bg-white py-4">
      <div className="grid gap-8 w-[95%] mx-auto">
        <div>
          <button
            onClick={handleBack}
            className="flex font-medium gap-4 items-center"
          >
            <BiArrowBack size={28} /> Packing List
          </button>
        </div>
        <form
          className="grid gap-8 md:grid-cols-2 w-full h-[60%] overflow-auto"
          onSubmit={formik.handleSubmit}
        >
          <div className="col-span-2 h-[40vh]  border-2 border-dashed border-black rounded-md overflow-hidden flex">
            <DropZone
              onDrop={setPackingListFiles}
              multiple={true}
              message={"Upload Packing List"}
            />
          </div>
          <Input
            label="Name of Buyer"
            name="nameOfBuyer"
            type="text"
            value={formik.values.nameOfBuyer}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.nameOfBuyer && formik.errors.nameOfBuyer}
          />
          <Input
            label="Address of Buyer"
            name="addOfBuyer"
            type="text"
            value={formik.values.addOfBuyer}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.addOfBuyer && formik.errors.addOfBuyer}
          />
          <Input
            label="Name of Factory"
            name="nameOfFactory"
            type="text"
            value={formik.values.nameOfFactory}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.nameOfFactory && formik.errors.nameOfFactory}
          />
          <Input
            label="Address of Factory"
            name="addOfFactory"
            type="text"
            value={formik.values.addOfFactory}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.addOfFactory && formik.errors.addOfFactory}
          />
          <Input
            label="Total Carton"
            name="totalCarton"
            type="text"
            value={formik.values.totalCarton}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.totalCarton && formik.errors.totalCarton}
          />
          <Input
            label="Invoice Number"
            name="inv_number"
            type="text"
            value={formik.values.inv_number}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.inv_number && formik.errors.inv_number}
          />
          <div>
            <label>Add Slot Of Inspection</label>
            <div className="flex items-center justify-between p-1 px-4 hover:opacity-95 w-full py-6 bg-gray-50 border rounded-md shadow-sm focus:outline-none focus:bg-white">
              <div className="flex flex-col">
                {/* {formik?.values?.slotOfInspection.map((slot, index) => (
									<span key={slot + index}>{slot}</span>
								))} */}
              </div>
              <div className="text-white ">
                <Prompt
                  btnText={
                    <AiOutlinePlus
                      onClick={addSlotOfInspection}
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
                        {endTime.length > 0 && <span> to {endTime}</span>}
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
          <div className="flex md:flex-col bg-slimeGray p-2 rounded-md col-span-2 gap-4 items-center ">
            <div className="flex w-full items-center  ">
              <div className=" flex-1 ">
                <div className="flex items-center gap-5">
                  <div className="flex-1">
                    <Input name={"po_number"} label={"PO Number"} />
                  </div>
                  <div className="flex-1 flex gap-2">
                    {names.length &&
                      names.map((name, index) => (
                        <div
                          key={index}
                          className="relative flex justify-center  items-center  bg-blue rounded-full h-9 w-9"
                        >
                          <span className="font-semibold text-sm text-white w-full text-center">
                            {name.charAt(0).toUpperCase()}
                          </span>
                          <RiCloseCircleFill className="absolute top-[30px] right-0 bg-white rounded-full" />
                        </div>
                      ))}
                    <img src={addUser} alt="addUser" className="h-9 w-9" />
                  </div>
                </div>
              </div>
              <button
                type="button"
                className=" p-2 px-6 h-9 bg-blue text-white rounded-md hover:opacity-90 "
              >
                Edit
              </button>
            </div>
            <PackingList />
          </div>
          <div className="grid col-span-2 pb-5">
            <button
              type="button"
              onClick={handleAddAnotherPurchase}
              className="flex bg-[#1b9aef42] p-3 text-blue font-semibold items-center gap-4"
            >
              <AiOutlinePlus size={28} />
              Add another Purchase Order
            </button>
          </div>
          <div className="flex col-span-2 justify-end gap-4">
            <button
              type="submit"
              className="px-8 py-2 outline rounded-md outline-2 text-[#CCCCCC] font-semibold hover:opacity-90 outline-[#CCCCCC]"
            >
              Save Draft
            </button>
            <button
              type="submit"
              className="px-8 py-2 outline bg-[#CCCCCC] text-white rounded-md outline-2 hover:opacity-90 outline-[#CCCCCC] font-semibold "
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
