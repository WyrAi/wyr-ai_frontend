import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/authContext";
import { useContext } from "react";
import wyraiApi from "../api/wyraiApi";
import userGloabalContext from "../UserContext";
import useToast from "../Contexts/ToasterContext";

const PopupOtp = (props) => {
  const { user, role } = props;
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [counter, setCounter] = useState(30);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth } = useAuth();
  const { setToken } = userGloabalContext();
  const toast = useToast();

  useEffect(() => {
    // Timer for the OTP countdown
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);

    return () => clearInterval(timer);
  }, [counter]);

  const handleChange = async (element, index) => {
    if (/^\d*$/.test(element.value)) {
      setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
      if (element.nextSibling) {
        element.nextSibling.focus();
      }
    }
  };

  const handleResendClick = () => {
    setCounter(30);
    wyraiApi
      .post(`/api/Otp/${user.email}`)
      .then((res) => {
        if (res.data.status === 200) {
          setIsLoading(false);
        }
      })
      .catch((err) => {
        // console.log("Put toaster", err);
        if (err.message) {
          toast.error(`${err.message}`);
        }
        setIsLoading(false);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newOtp = otp.join("");
    wyraiApi
      .post(`/api/verify-email`, {
        email: user.email,
        otp: newOtp,
      })
      .then(() => {
        wyraiApi
          .post("/api/register", {
            ...user,
            role,
            verified: true,
          })
          .then((res) => {
            const token = res.data.token;
            localStorage.setItem("token", token);
            setAuth(token);
            setToken(token);
            navigate("/companyDetails");
          });
      })

      .catch((err) => {
        // console.log("Put Toaster", err);
        toast.error(`${err?.message}`);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen absolute top-0 w-full bg-[#00000080] z-10">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h1 className="text-lg mb-4">Enter OTP</h1>
        <p className="text-gray-500 mb-4">OTP sent to your registered Email</p>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center space-x-2 mb-4">
            {otp.map((data, index) => (
              <input
                className="w-12 h-12 text-center form-control
                           rounded border border-gray-300"
                type="text"
                name="otp"
                maxLength="1"
                key={index}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
              />
            ))}
          </div>
          {counter ? (
            <p className="text-blue-500 mb-4">
              {counter.toString().padStart(2, "0")}
            </p>
          ) : null}

          <button
            type="submit"
            className="text-white bg-blue px-4 py-2 rounded"
          >
            Verify
          </button>

          <p className="text-gray-500 mt-4">
            {"Didn't receive OTP?"}
            <button
              type="button"
              onClick={handleResendClick}
              disabled={counter > 0}
              className="text-blue-600 hover:underline ml-1"
            >
              Send Again
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default PopupOtp;
