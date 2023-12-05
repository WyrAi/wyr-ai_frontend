import { useFormik } from "formik";
import * as Yup from "yup";
import DropZone from "../Components/DropZone";
import InputField from "./InputField";
import addUser from "../assets/noun-add-account-6047901 1.svg";
import sample from "../assets/Rectangle 25.png";

const PackingList = ({ purchaseOrder, setPurchaseOrder, handlesubmit }) => {
  //   const [purchaseOrder, setPurchaseOrder] = useState([]);
  //   const initialValues = {

  //   };

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
    initialValues: purchaseOrder,
    onSubmit: (values, actions) => {
      // Handle form submission
      console.log(values);
      actions.setSubmitting(false);
    },
    validationSchema,
  });

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
  console.log(formik.values.from);

  async function handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name);
    validationCheck(name, value);
    // setPurchaseOrder({ ...purchaseOrder, [name]: value });
    setPurchaseOrder((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    formik.setFieldValue(name, value);
  }

  //   console.log(purchaseOrder);

  return (
    <>
      <div className=" grid md:grid-cols-[1fr_repeat(7,2fr)_1fr] gap-2 items-center">
        <div className=" h-12 w-12  mb-4 mx-auto ">
          <img src={sample} alt="photo" className="h-full w-full " />
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
        <button className=" mb-8 " onClick={() => {}}>
          <span className="text-[10px]">Assign Factory</span>
          <img src={addUser} alt="add" className="w-6 h-6 m-auto" />
        </button>
      </div>
    </>
  );
};

export default PackingList;
