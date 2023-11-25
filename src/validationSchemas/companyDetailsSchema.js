import * as Yup from "yup";

const companyDetailsValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters"),
  address: Yup.string()
    .required("Address is required")
    .min(10, "Address must be at least 10 characters")
    .max(100, "Address must not exceed 100 characters"),
  country: Yup.string().required("Country is required"),
  city: Yup.string().required("City is required"),
  pincode: Yup.string()
    .required("Pincode is required")
    .matches(/^[0-9]+$/, "Pincode must be numeric")
    .min(5, "Pincode must be at least 5 digits")
    .max(6, "Pincode must not exceed 6 digits"),
  documentImage: Yup.mixed()
    .required("A document image is required")
    .test(
      "fileSize",
      "The file is too large",
      (value) => !value || (value && value.size <= 1024 * 1024)
    ) // Example for 1MB limit
    .test(
      "fileType",
      "Unsupported file format",
      (value) =>
        !value ||
        (value && ["image/jpeg", "image/png", "image/gif"].includes(value.type))
    ),
  companyImage: Yup.mixed()
    .required("A company image is required")
    .test(
      "fileSize",
      "The file is too large",
      (value) => !value || (value && value.size <= 1024 * 1024)
    ) // Example for 1MB limit
    .test(
      "fileType",
      "Unsupported file format",
      (value) =>
        !value ||
        (value && ["image/jpeg", "image/png", "image/gif"].includes(value.type))
    ),
});

export default companyDetailsValidationSchema;
