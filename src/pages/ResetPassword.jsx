import { useState } from "react";
import { useFormik } from "formik";
import { ResetPasswordSchema } from "../validationSchemas/resetPasswordSchema";
import logo from "../assets/logo.svg";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";

const FormData = [
  {
    name: "Password",
    bname: "Password",
    PlaceVale: "Abcde123",
    type: "password",
  },
  {
    name: "Confirm Password",
    bname: "ConfirmPassword",
    PlaceVale: "Abcde123",
    type: "password",
  },
];

const ResetPassword = () => {
  const { token } = useParams();
  const [initialValues] = useState({
    Password: "",
    ConfirmPassword: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: ResetPasswordSchema,
      onSubmit: async (values) => {
        await axios
          .post(`${import.meta.env.VITE_BASE_URL}/api/userPassword`, {
            token,
            Password: values.Password,
            confirmPassword: values.ConfirmPassword,
          })
          .then((res) => {
            if (res.status === 200) {
              alert("Password reset successfully");
              navigate("/login");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      },
    });

  return (
    <>
      <div className="bg-[#f8fcfe] h-screen flex flex-col justify-center">
        <div className="w-4/12 mx-auto shadow-md h-6/12 p-5 rounded-lg text-center bg-white">
          <img src={logo} alt="logo" width="200px" className="mx-auto mb-6" />
          <h1 className="text-center text-2xl font-bold mb-6">
            Reset account password
          </h1>
          {FormData.map((i, index) => {
            return (
              <div key={index}>
                <div
                  className={`border-2 ${
                    errors[i.bname] ? "border-[#FF686B]" : "border-[#99999980]"
                  }  relative p-[15px] flex flex-col rounded-lg mt-5 w-full bg-white`}
                >
                  <label
                    htmlFor={i.bname}
                    className="absolute top-[-11px] bg-white text-color px-3"
                  >
                    {i.name}
                  </label>
                  <input
                    type={i.type}
                    name={i.bname}
                    id={i.bname}
                    placeholder={i.PlaceVale}
                    className="border-0 outline-none placeholder-[#CCCCCC]"
                    value={values[i.name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {errors[i.bname] && touched[i.bname] ? (
                  <p className="text-red-800 text-left">{errors[i.bname]}</p>
                ) : (
                  ""
                )}
              </div>
            );
          })}
          <p className="mt-2 text-left">Password should be alpha-numeric</p>;
          <button
            className="mt-6 border py-3 text-xl font-medium bg-[#1B9BEF] rounded-md w-5/12 text-white "
            onClick={() => {
              handleSubmit();
              setLoading(true);
            }}
          >
            {loading ? <Loader /> : "Submit"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
