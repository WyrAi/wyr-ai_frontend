import React from "react";
import Buyer from "../assets/noun-buyer-5533532 1.svg";
import Agency from "../assets/noun-bulk-buying-3978894 1.svg";
import factory from "../assets/noun-factory-798041 1.svg";
import QC from "../assets/noun-preview-192680 1.svg";
import vector from "../assets/Vector.svg";
import { v4 as uuid } from "uuid";
import SignUp from "../pages/SignUp";
import userGloabalContext from "../UserContext";
import InputField from "./InputField";
import { useFormik } from "formik";
import * as Yup from "yup";
import Prompt from "../DasiyUIComponents/Prompt";
import SuccessRelation from "./SuccessRelation";
import axios from "axios";
import wyraiApi from "../api/wyraiApi";
import socket from "../Components/socket";
const AddCompany = () => {
  const { role, companyId } = userGloabalContext();
  const [roles, setRoles] = React.useState([
    { id: 0, name: "Buyer", icon: Buyer, selected: false },
    { id: 1, name: "Buying Agency", icon: Agency, selected: false },
    { id: 2, name: "Factory", icon: factory, selected: false },
    { id: 3, name: "QC Agency", icon: QC, selected: false },
  ]);
  const [error, setError] = React.useState({ role: "" });

  const UserRolesRelation = roles.filter((item) => item.name != role);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const initialValues = {
    email: "",
  };

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      onSubmit: async (values) => {
        console.log(values);
        const selectedData = UserRolesRelation.filter(
          (item) => item.selected === true
        );
        if (selectedData.length === 0) {
          setError({ role: "Please select role before sending email " });
          console.log(document.getElementById(modalID));
          document.getElementById('modalID').close();
        } else {
          setError({ role: "" });
          // const requestBody = {
          //   email: values.email,
          //   role: selectedData[0].name,
          // };

          // console.log(requestBody);
          wyraiApi
            .post(`/api/companyRelationShip`, {
              reciverEmail: values.email,
              role: selectedData[0].name,
              senderCompanyId: companyId,
            }).then((res) => {
              console.log(res);
              console.log("before document")
              // document.getElementById('modalID').close();
              console.log("After document")

              const data ={
                senderName: values.email,
                receiverName: values.email,
                text:`connection request form the ${values.email} `,
              }
              console.log("data of form", data)
              socket.emit("sendText", {data}); 

              // const response =  fetch("http://localhost:5000/api/postmessage", {

              //   method: "POST",
              //   headers: {
              //     "Content-Type": "application/json",
              //   },
              //   body: JSON.stringify(data),
              // });
              console.log("After socket document")

            }).catch((err) => {
              console.log(err);
            });
        }
      },
      validationSchema,
    });

  const handleClick = (itemId) => {
    // Find the index of the item with the given id
    const itemIndex = UserRolesRelation.findIndex((item) => item.id === itemId);

    const clickedRole = UserRolesRelation[itemIndex].name;
    // If the item is found, update its value
    if (itemIndex !== -1) {
      // Create a new array with the updated item
      UserRolesRelation.forEach((item) => (item.selected = false));

      const updatedItems = [...UserRolesRelation];
      console.log(!updatedItems[itemIndex].selected);
      updatedItems[itemIndex] = {
        ...updatedItems[itemIndex],
        selected: !updatedItems[itemIndex].selected, // Replace with the desired new value
      };

      // Update the state with the new array
      setRoles(updatedItems);
    }
  };

  return (
    <div className="w-full flex flex-col gap-10 justify-center items-center">
      <h1 className="text-2xl font-bold text-center">Add Company</h1>
      <span className="text-base font-semibold text-darkGray">
        Select Your Role
      </span>

      <div className="flex w-full justify-center ">
        {UserRolesRelation?.length > 0 &&
          UserRolesRelation.map((item) => (
            <div
              key={uuid()}
              className="flex-1 flex flex-col justify-center items-center"
            >
              <div
                className={`relative rounded-full w-[80px] h-[80px] flex justify-center items-center shadow-[0_1px_14px_0px_rgba(0,0,0,0.15)] cursor-pointer  ${
                  item.selected && "border-2 border-blue"
                } `}
                onClick={() => handleClick(item.id)}
              >
                <img
                  src={item.icon}
                  className=" p-4 rounder-full "
                  alt="logo"
                />
                <img
                  src={vector}
                  alt=""
                  className={
                    item.selected
                      ? "absolute w-5 h-5 top-0 right-0 block bg-white rounded-full "
                      : "absolute w-5 h-5 top-0 right-0 hidden  "
                  }
                />
              </div>
              <span className="block text-center w-full mt-5">{item.name}</span>
            </div>
          ))}
      </div>

      <div className=" w-full">
        <div
          className={`border-2 ${
            errors.email ? "border-[#FF686B]" : "border-[#99999980]"
          }  relative p-[15px] flex flex-col rounded-lg mt-5 w-full bg-white `}
        >
          <label
            htmlFor={"email"}
            className="absolute top-[-11px] bg-white text-color px-3"
          >
            {"Email"}
          </label>
          <input
            type={"email"}
            name={"email"}
            id={"email"}
            placeholder={"Enter the Email Id"}
            className="border-0 outline-none placeholder-[#CCCCCC]"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="off"
          />
        </div>
        {errors.email && touched.email ? (
          <p className="text-red-800 text-left">{errors.email}</p>
        ) : (
          ""
        )}
        {error.role.length > 0 && (
          <p className="text-red-800 text-left">{error.role}</p>
        )}
        <span className="text-xs font-medium">
          As you Enter Email ID the link will Generate Automatically
        </span>
        <div className="flex justify-center">
          <div
            className="mt-6  border py-3 text-xl font-medium bg-[#1B9BEF] rounded-md w-5/12 text-white text-center cursor-pointer "
            onClick={() => {
              handleSubmit();
            }}
          >
            {" "}
            Invite
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCompany;
