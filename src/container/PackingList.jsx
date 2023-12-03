import { useFormik } from "formik";
import * as Yup from "yup";
import DropZone from "../Components/DropZone";
import InputField from "./InputField";
import addUser from "../assets/noun-add-account-6047901 1.svg";
import sample from "../assets/Rectangle 25.png";
import { useEffect, useState } from "react";
import wyraiApi from "../api/wyraiApi";
import userGloabalContext from "../UserContext";

const PackingList = ({
  purchaseOrder,
  setPurchaseOrder,
  handlesubmit,
  data,
  poIndex,
  productIndex,
  handleProductChange,
}) => {
  const { companyId } = userGloabalContext();
  console.log(data.styleId);
  const productList = data;
  const [branchData, setBranchData] = useState(null);
  const [branch, setBranch] = useState(null);
  const [popup, setPopup] = useState(false);

  const validationSchema = Yup.object().shape({
    from: Yup.number()
      .required("Required")
      .positive("Must be positive")
      .integer("Must be an integer"),
    to: Yup.number()
      .required("Required")
      .positive("Must be positive")
      .integer("Must be an integer"),
    // styleId: Yup.string().required("Required"),
    // styleName: Yup.string().required("Required"),
    quantityPerBox: Yup.number()
      .required("Required")
      .positive("Must be positive")
      .integer("Must be an integer"),
    totalBox: Yup.number()
      .required("Required")
      .positive("Must be positive")
      .integer("Must be an integer"),
    totalQuantity: Yup.number()
      .required("Required")
      .positive("Must be positive")
      .integer("Must be an integer"),
  });
  console.log(data);
  const formik = useFormik({
    initialValues: { ...data },
    onSubmit: (values, actions) => {
      // Handle form submission
      //   console.log(values);
      actions.setSubmitting(false);
    },
    validationSchema,
  });
  console.log(formik.values);

  const validationCheck = async (name, value) => {
    try {
      const value = await validationSchema.fields[name].validate(value);
      console.log(value);
      formik.setFieldError(name, ""); // Clear any existing error
      // Validation passed, update field value in Formik state
    } catch (error) {
      formik.setFieldError(name, error.message); // Set error message
    }
  };
  //   console.log(formik.values.from);

  async function handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    // validationCheck(name, value);
    handleProductChange(poIndex, productIndex, name, value);

    formik.setFieldValue(name, value);
  }

  const handleDropDownSelect = (item) => {
    console.log(item);

    handleProductChange(poIndex, productIndex, "branch", item?._id);
    setBranch(item?.branchName);
  };

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

  useEffect(() => {
    // formik.setFieldValue("styleName", productList?.styleName);
    // formik.setFieldValue("styleId", productList?.styleId);

    // setPurchaseOrder((prevState) => ({
    //   ...prevState,
    //   ["styleName"]: productList?.styleName,
    //   ["styleId"]: productList?.styleId,
    //   ["id"]: productList?._id,
    // }));
    console.log(formik.values.styleId);

    wyraiApi
      .get(`/api/UserBranchesGet/${companyId}`)
      .then((res) => setBranchData(res.data.Response.Branches))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className=" grid md:grid-cols-[1fr_repeat(7,2fr)_1fr] gap-2 items-center">
        <div className=" h-12 w-12  mb-4 mx-auto ">
          <img
            src={productList?.images?.[0]}
            alt="photo"
            className="h-full w-full "
          />
        </div>
        <div>
          <InputField
            name={"from"}
            label={"From"}
            type="text"
            value={formik.values.from}
            onChange={handleInputChange}
            onBlur={formik.handleBlur}
            error={formik.touched.from && formik.errors.from}
            placeholder={"1234"}
            labelColor={"bg-slimeGray"}
            labelsize={"text-[10px]"}
            padding={"pt-3 pb-1"}
          />
        </div>
        <div className="">
          <InputField
            label="TO"
            name="to"
            type="text"
            value={formik.values.to}
            onChange={handleInputChange}
            onBlur={formik.handleBlur}
            error={formik.touched.to && formik.errors.to}
            placeholder={"ST ED BC 3220 W"}
            labelColor={"bg-slimeGray"}
            labelsize={"text-[10px]"}
            padding={"py-2"}
          />
        </div>
        <div className="">
          <InputField
            label={"Style Name"}
            name={"styleName"}
            type="text"
            value={productList?.styleId}
            onChange={handleInputChange}
            onBlur={formik.handleBlur}
            error={formik.touched.styleName && formik.errors.styleName}
            placeholder={"BH1222 Marri Welcome"}
            labelColor={"bg-slimeGray"}
            labelsize={"text-[10px]"}
            padding={"py-2"}
            disable={true}
          />
        </div>

        <div className="">
          <InputField
            label="StyleId"
            name="styleId"
            type="text"
            value={productList?.styleId}
            onChange={handleInputChange}
            onBlur={formik.handleBlur}
            error={formik.touched.styleId && formik.errors.styleId}
            placeholder={"ST ED BC 3220 W"}
            labelColor={"bg-slimeGray"}
            labelsize={"text-[10px]"}
            padding={"py-2"}
            disable={true}
          />
        </div>
        <div className="">
          <InputField
            label={"Quantity per Box"}
            name={"quantityPerBox"}
            type="text"
            value={formik.values.quantityPerBox}
            onChange={handleInputChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.quantityPerBox && formik.errors.quantityPerBox
            }
            placeholder={"BH1222 Marri Welcome"}
            labelColor={"bg-slimeGray"}
            labelsize={"text-[10px]"}
            padding={"py-2"}
          />
        </div>
        <div className="">
          <InputField
            label={"Total Box"}
            name={"totalBox"}
            type="text"
            value={formik.values.totalBox}
            onChange={handleInputChange}
            onBlur={formik.handleBlur}
            error={formik.touched.totalBox && formik.errors.totalBox}
            placeholder={"BH1222 Marri Welcome"}
            labelColor={"bg-slimeGray"}
            labelsize={"text-[10px]"}
            padding={"py-2"}
          />
        </div>
        <div className="">
          <InputField
            label={"Total Quantity"}
            name={"totalQuantity"}
            type="text"
            value={formik.values.totalQuantity}
            onChange={handleInputChange}
            onBlur={formik.handleBlur}
            error={formik.touched.totalQuantity && formik.errors.totalQuantity}
            placeholder={"BH1222 Marri Welcome"}
            labelColor={"bg-slimeGray"}
            labelsize={"text-[10px]"}
            padding={"py-2"}
          />
        </div>
        <div
          className=" relative mb-8  cursor-pointer"
          onClick={() => setPopup(!popup)}
        >
          <span className="text-[10px]">Assign Factory</span>
          <div className="flex justify-around items-center">
            <img
              src={addUser}
              alt="add"
              className={`w-6 h-6 ${branch ? "" : "m-auto"}`}
            />
            {branch && (
              <span className="w-5 h-5 bg-blue flex justify-center items-center rounded-full">
                {branch?.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          {popup && (
            <DropDown>
              {branchData.map((item, index) => {
                console.log(item);
                return (
                  <li
                    key={index}
                    className="py-2 flex items-center gap-4 mr-2 border-b"
                    onClick={() => handleDropDownSelect(item)}
                  >
                    <span className="flex-1 text-xs">{item?.branchName}</span>
                    {/* <span className="flex gap-2 items-center">
                      <img src={gps} alt="gps" className="w-[16px] h-[16px]" />
                      <span className="text-[10px]">
                        {item.companyId?.city}, {item.companyId?.country}
                      </span>
                    </span> */}
                  </li>
                );
              })}
            </DropDown>
          )}
        </div>
      </div>
    </>
  );
};

export default PackingList;
