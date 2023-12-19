import * as Yup from "yup";
// const PnumberRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
const Password = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8}$/;
// const EmailRegex = /^[A-Za-z0-9_.]{3,}@[a-zA-Z]{3,}[a-zA-Z.]{2,}$/;
// const EmailRegex =
//   /^[A-Za-z0-9_.]{3,}@([A-Za-z]{3,}[A-Za-z.]{1,}[A-Za-z]{2,})$/;
const EmailRegex = /^[A-Za-z0-9_.]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export const LoginSchema = Yup.object({
  Email: Yup.string()
    .trim()
    .matches(EmailRegex, "Invalid Email")
    .required("Please enter Email"),
  Password: Yup.string().max(8).required("Please enter Password"),

  // .matches(Password, "Password limit eight characters")
});
