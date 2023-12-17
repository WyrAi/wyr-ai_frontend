import { useState, useContext, useEffect } from "react";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import wyraiApi from "../api/wyraiApi";
import { AuthContext } from "../Contexts/authContext";
// import { getAuthToken, setAuthToken } from "../Utils/authUtils";
import { userGloabalContext } from "../UserContext";
import { useFormik } from "formik";
import { LoginSchema } from "../validationSchemas/loginSchema";

// import socket from "../Components/socket";
// import io from "socket.io-client";

const Login = () => {
  // const [socket, setSocket] = useState("");
  // const navigate = useNavigate();

  const { setAuth } = useContext(AuthContext);
  const { setToken } = userGloabalContext();
  const navigate = useNavigate();

  const [initialValues] = useState({
    Email: "",
    Password: "",
  });

  // useEffect(() => {
  //   // const socketInstance = io("http://localhost:5000");
  //   setSocket(socket);

  //   return () => {
  //     // Cleanup function: disconnect the socket when the component is unmounted
  //     socketInstance.disconnect();
  //   };
  // }, []);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [name]: value,
  //   }));
  // };

  // const loginUser = async (e) => {
  //   e.preventDefault();
  //   wyraiApi
  //     .post(`/api/login`, formData)
  //     .then((res) => {
  //       console.log("got token");
  //       setToken(res.data.token);
  //       setAuth(res.data.token);
  //       console.log("userInfo", formData.email);
  //       navigate("/dashboard");
  //       socket?.emit("newUser", formData.email);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: LoginSchema,
      onSubmit: async (values) => {
        wyraiApi
          .post(`/api/login`, {
            email: values.Email,
            password: values.Password,
          })
          .then((res) => {
            // console.log("got token");
            setToken(res.data.token);
            setAuth(res.data.token);
            // console.log("userInfo", values.Email);
            navigate("/dashboard");
            // socket?.emit("newUser", values.email);
          })
          .catch((err) => {
            console.log(err);
          });
      },
    });

  // console.log(errors, touched);

  const ForgetPassword = async () => {
    try {
      if (values.Email === "") {
        alert("Please Enter Your Email");
        return;
      }
      const res = await wyraiApi.post(`/api/UserPasswordReset`, {
        email: values.Email,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 shadow-lg border-2 rounded-lg px-4 py-6 bg-white">
          <div>
            <img src={logo} alt="" className="m-auto" />
            <h2 className="mt-6 text-center text-xl font-extrabold text-gray-900">
              Login
            </h2>
          </div>
          <form className="mt-8 space-y-6 mx-6" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="Email"
                className="appearance-none rounded-none relative block w-full  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter Your email or phone number"
                value={values.Email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.Email && touched.Email ? (
                <p className="text-red-800">{errors.Email}</p>
              ) : (
                ""
              )}
            </div>
            <div>
              <input
                type="password"
                name="Password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Create Password"
                value={values.Password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.Password && touched.Password ? (
                <p className="text-red-800">{errors.Password}</p>
              ) : (
                ""
              )}
            </div>

            <p
              className="text-xs text-[#1B9BEF] text-right cursor-pointer"
              onClick={() => ForgetPassword()}
            >
              Forget Password?
            </p>
            <div>
              <button
                type="submit"
                className="group relative w-1/2 m-auto flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#1b9bef] hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign In
              </button>
              <p className="text-center text-sm text-gray-500 my-4">
                Not Register Yet?{" "}
                <Link to={"/signUp"} className="text-[#1B9BEF]">
                  Create Account
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
