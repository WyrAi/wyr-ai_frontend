import logo from "../assets/logo.svg";
import upload from "../assets/formkit_uploadcloud.svg";
import UploadFiles from "../container/UploadFiles";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DropZone from "../Components/DropZone";
import { useFormik } from "formik";

import { useNavigate } from "react-router-dom";
import companyDetailsValidationSchema from "../validationSchemas/companyDetailsSchema";
import wyraiApi from "../api/wyraiApi";
import { userGloabalContext } from "../UserContext";

const CompanyDetailsForm = () => {
  const { userData, setUserData } = userGloabalContext();
  // Placeholder function for form submission
  const params = useParams();
  const id = params.id;
  const [companyImage, setCompanyImage] = useState(null);
  const [fileUpload, setFileUpload] = useState([]);
  const [docPopup, setDocPopup] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.addEventListener("keydown", handleEscKeyPress);

    // Cleanup: remove event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleEscKeyPress);
    };
  }, []); // The empty dependency array ensures that the effect runs only once when the component mounts

  const handleEscKeyPress = (event) => {
    if (event.key === "Escape") {
      // Do something when the Esc key is pressed

      setDocPopup(false);
    }
  };

  const initialValues = {
    name: "",
    address: "",
    country: "",
    city: "",
    pincode: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: () => {},
    validationSchema: companyDetailsValidationSchema,
  });

  const handleSubmit = async () => {
    try {
      const newFileUpload = fileUpload.map((obj) => obj.base64String);

      const requestBody = {
        companyImage,
        details: formik.values,
        fileUpload: newFileUpload,
      };
      wyraiApi
        .post(`/api/companydetails`, requestBody)
        .then((res) => {
          console.log(res);
          navigate("/dashboard");
        })
        .catch(console.log);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg border-2 w-3/5 "
        >
          <div className="mb-6">
            <img src={logo} alt="" className="m-auto" />
            <h2 className="text-xl font-bold text-center mb-4">
              Company Details
            </h2>

            <label className="block mb-2">
              <input
                type="text"
                placeholder="Enter Your Company Name"
                className="w-full px-3 py-2 border rounded"
                value={formik.values.name}
                onChange={formik.handleChange}
                name="name"
                // onChange={handleChange}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-xs pl-6 ">
                  {formik.errors.name}
                </p>
              )}
            </label>

            <label className="block mb-2">
              <input
                type="text"
                placeholder="Enter Your Company Address"
                className="w-full px-3 py-2 border rounded"
                value={formik.values.address}
                name="address"
                onChange={formik.handleChange}
              />
              {formik.touched.address && formik.errors.address && (
                <p className="text-red-500 text-xs pl-6 ">
                  {formik.errors.address}
                </p>
              )}
            </label>

            <div className="mb-2 flex-1">
              <label className="block mb-2">
                {/* <span>Country</span> */}
                <input
                  type="text"
                  placeholder="Enter Your Country"
                  className="w-full px-3 py-2 border rounded"
                  value={formik.values.country}
                  name="country"
                  onChange={formik.handleChange}
                />
                {formik.touched.country && formik.errors.country && (
                  <p className="text-red-500 text-xs pl-6 ">
                    {formik.errors.country}
                  </p>
                )}
              </label>
            </div>

            <div className="flex gap-4 mb-6">
              <label className="flex-1">
                <input
                  type="text"
                  placeholder="Enter City"
                  className="w-full px-3 py-2 border rounded"
                  value={formik.values.city}
                  name="city"
                  onChange={formik.handleChange}
                />
                {formik.touched.city && formik.errors.city && (
                  <p className="text-red-500 text-xs pl-6 ">
                    {formik.errors.city}
                  </p>
                )}
              </label>
              <label className="flex-1">
                <input
                  type="text"
                  placeholder="Enter Pincode"
                  className="w-full px-3 py-2 border rounded"
                  value={formik.values.pincode}
                  name="pincode"
                  onChange={formik.handleChange}
                />
                {formik.touched.pincode && formik.errors.pincode && (
                  <p className="text-red-500 text-xs pl-6 ">
                    {formik.errors.pincode}
                  </p>
                )}
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div
                className="flex-1 px-3 py-2 border-dashed border-2 rounded text-gray-500 cursor-pointer"
                onClick={() => setDocPopup(true)}
              >
                <div className=" ">
                  <img src={upload} alt="cloud" className="m-auto" />
                  <p className="text-center">
                    Upload Documents/License/Certification
                  </p>
                </div>
              </div>
              <div
                className="flex-1 px-3 py-2 border-dashed border-2  rounded text-gray-500 cursor-pointer"
                // onClick={handleSubmit}
              >
                {/* <img src={upload} alt="cloud" className="m-auto" />
									<p className="text-center">Upload Company images</p> */}
                <DropZone
                  onDrop={setCompanyImage}
                  multiple={false}
                  message={"Upload Company Images"}
                  className={"bg-white"}
                  textSize={"text-sm text-gray-500"}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue text-white px-3 py-2 rounded hover:bg-blue-600"
              onClick={handleSubmit}
            >
              Finish
            </button>
          </div>
        </form>
      </div>
      {docPopup && (
        <UploadFiles
          fileUpload={fileUpload}
          setFileUpload={setFileUpload}
          title={"Upload Documents/License/Certification"}
        />
      )}
    </>
  );
};

export default CompanyDetailsForm;
