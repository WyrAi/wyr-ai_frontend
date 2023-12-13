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
  const { companyId, userInformation } = userGloabalContext();
  console.log(userInformation);
  console.log(data);
  const productList = data;
  const [branchData, setBranchData] = useState(null);
  const [qcData, setQcData] = useState(null);
  const [branch, setBranch] = useState(null);
  const [popup, setPopup] = useState({
    branch: false,
    qc: false,
  });
  // console.log(popup);

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

  const formik = useFormik({
    initialValues: {
      images: data?.images,
      from: data?.from,
      to: data?.to,
      styleId: data?.styleId,
      styleName: data?.styleName,
      quantityPerBox: data?.quantityPerBox,
      totalBox: data?.totalBox,
      totalQuantity: data?.totalQuantity,
      branch: data?.branch?.branchName,
    },
    onSubmit: (values, actions) => {
      // Handle form submission

      actions.setSubmitting(false);
    },
    validationSchema,
  });

  const validationCheck = async (name, value) => {
    try {
      const value = await validationSchema.fields[name].validate(value);
      formik.setFieldError(name, ""); // Clear any existing error
      // Validation passed, update field value in Formik state
    } catch (error) {
      formik.setFieldError(name, error.message); // Set error message
    }
  };

  async function handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    // validationCheck(name, value);
    handleProductChange(poIndex, productIndex, name, value);

    formik.setFieldValue(name, value);
  }

  const handleDropDownSelect = (item) => {
    handleProductChange(poIndex, productIndex, "branch", item?._id);
    setBranch(item?.branchName);
  };

  const qcExist = userInformation?.companyId?.companyRole === "QC Agency";

  const DropDown = ({ children }) => {
    return (
      <>
        <div className="absolute top-[60px] right-[10px] shadow mt-2 bg-white w-[150px] z-50  ">
          <ul className="ml-6 h-[130px] overflow-x-auto cursor-pointer">
            {children}
          </ul>
        </div>
      </>
    );
  };

  useEffect(() => {
    if (userInformation?.companyId?.companyRole === "QC Agency") {
      wyraiApi
        .get(`/api/GetEmployeesofBranch/${userInformation?.officeBranch}`)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      setBranch(data.branch.branchName);
    } else {
      wyraiApi
        .get(`/api/UserBranchesGet/${companyId}`)
        .then((res) => setBranchData(res.data.Response.Branches))
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <>
      <div className=" grid md:grid-cols-[1fr_repeat(8,2fr)] gap-2 items-center">
        <div className=" h-12 w-12  mb-4 mx-auto outline-1 outline-dashed outline-lightGray ">
          {productList?.images && (
            <img
              src={productList?.images?.[0]}
              alt="photo"
              className="h-full w-full "
            />
          )}
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
            disable={true}
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
            disable={true}
          />
        </div>
        <div className="">
          <InputField
            label={"Style Name"}
            name={"styleName"}
            type="text"
            value={formik.values.styleName}
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
            value={formik.values.styleId}
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
            disable={true}
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
            disable={true}
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
            disable={true}
          />
        </div>
        <div className="flex gap-2">
          <div
            className=" relative mb-8  cursor-pointer"
            onClick={() => setPopup({ ...popup, branch: !popup.branch })}
          >
            <span className="text-[10px]">Assign Factory</span>
            <div className="flex justify-around items-center">
              {branch ? (
                <span className="w-5 h-5 bg-blue flex justify-center items-center rounded-full">
                  {branch?.charAt(0).toUpperCase()}
                </span>
              ) : (
                <img
                  src={addUser}
                  alt="add"
                  className={`w-6 h-6 ${branch ? "" : "m-auto"}`}
                />
              )}
            </div>

            {popup.branch &&
              qcExist(
                <DropDown>
                  {branchData?.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className="py-2 flex items-center gap-4 mr-2 border-b"
                        onClick={() => handleDropDownSelect(item)}
                      >
                        <span className="flex-1 text-xs">
                          {item?.branchName}
                        </span>
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
          {qcExist && (
            <div
              className=" relative mb-8  cursor-pointer"
              onClick={() => setPopup({ ...popup, qc: !popup.qc })}
            >
              <span className="text-[10px]">Add QC</span>
              <div className="flex justify-around items-center">
                {branch ? (
                  <span className="w-5 h-5 bg-blue flex justify-center items-center rounded-full">
                    {branch?.charAt(0).toUpperCase()}
                  </span>
                ) : (
                  <img
                    src={addUser}
                    alt="add"
                    className={`w-6 h-6 ${branch ? "" : "m-auto"}`}
                  />
                )}
              </div>

              {popup.qc && (
                <DropDown>
                  {branchData?.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className="py-2 flex items-center gap-4 mr-2 border-b"
                        onClick={() => handleDropDownSelect(item)}
                      >
                        <span className="flex-1 text-xs">
                          {item?.branchName}
                        </span>
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
          )}
        </div>
      </div>
    </>
  );
};

export default PackingList;
