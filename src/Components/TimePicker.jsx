import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { userGloabalContext } from "../UserContext";
import { useEffect, useState } from "react";
import DropDown from "../DasiyUIComponents/DropDown";

const TimePicker = () => {
  const { startTime, endTime, setEndTime, setStartTime } = userGloabalContext();

  const [time, setTime] = useState({
    hour: "00",
    minute: "00",
    zone: { AM: true, PM: true },
  });

  const [timePopup, setTimePopup] = useState({
    hour: false,
    minute: false,
  });
  const [timeZone, setTimeZone] = useState({
    AM: true,
    PM: false,
  });

  // const { zone, setZone } = useState({ AM: true, PM: false });
  // console.log(timeZone.AM);

  const minutes = Array.from({ length: 60 }, (_, index) => {
    const num = index + 1;
    return num < 10 ? `0${num}` : `${num}`;
  });

  const hours = Array.from({ length: 12 }, (_, index) => {
    const num = index + 1;
    return num < 10 ? `0${num}` : `${num}`;
  });

  const handleClicks = (e) => {
    const val = e.target.innerHTML;
    const name = e.target.getAttribute("data-name");
    // console.log(e.target.innerHTML, e.target.getAttribute("data-name"));

    if (name === "hour") {
      setTime({ ...time, ["hour"]: val });
    } else if (name === "minute") {
      setTime({ ...time, ["minute"]: val });
    } else {
      // setTime({ ...time, ["zone"]: {...zone, } });
    }
    setTimePopup({ ...timePopup, [name]: !timePopup[name] });
  };

  // Adjust time by setting the hours based on a 12-hour format and the AM/PM value
  // const adjustTime = (date, hours, period) => {
  //   const adjustedDate = new Date(date);
  //   adjustedDate.setHours(period === "PM" ? hours + 12 : hours, 0);
  //   return adjustedDate;
  // };
  useEffect(() => {
    const newTime = new Date();
    newTime.setHours(time.hour, time.minute);
    const formattedTime = newTime
      .toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .slice(0, -3);
    const amPM = Object.keys(timeZone).filter(
      (item) => timeZone[item] === true
    );
    const formattedTimeWithAMPM = `${formattedTime} ${amPM}`;
    // console.log(formattedTimeWithAMPM);
    setStartTime(formattedTimeWithAMPM);
  }, [time, timeZone]);

  const handleTimeChange = (e) => {
    setStartTime(e.target.innerHTML);
  };
  // console.log("endTime", endTime);
  // console.log(startTime, "startTime");

  const formatTime = (time) => {
    // console.log(time);
    const formattedTime = time.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return formattedTime;
  };
  // console.log(timeZone);

  const setSpecificTime = (hours) => {
    const time = new Date(); // Use a new Date object
    time.setHours(hours, 0, 0); // Set specific time
    return formatTime(time);
  };

  const times = ["10", "11", "12", "13", "14", "15", "16"];

  const DropDown = ({ children }) => {
    return (
      <>
        <div className="absolute top-[60px] shadow mt-2 bg-white w-full z-50  ">
          <ul className="ml-2 h-[130px] overflow-x-auto ">{children}</ul>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="w-full">
        <div className="grid grid-cols-3 gap-4 mb-4">
          {times.map((item, index) => (
            <div
              key={index}
              data-time={setSpecificTime(item)}
              className="h-[40px] w-[120px]"
            >
              <span
                className="h-full w-full border bg-white flex items-center justify-center hover:border-2 hover:border-blue cursor-pointer"
                onClick={handleTimeChange}
              >
                {setSpecificTime(item)}
              </span>

              {/* <DatePicker
								selected={setSpecificTime(item)}
								// onChange={handleTimeChange}
								// onFocus={(e) => handleTimeChange(e.target.defaultValue)}
								showTimeSelect
								showTimeSelectOnly
								dateFormat="h:mm aa"
								className="border p-2 w-full focus:outline-blue"
								readOnly // This makes the input read-only
							/> */}
            </div>
          ))}
        </div>
        <h3 className="text-xs">Enter Time</h3>
        <div className="flex gap-2 items-center ">
          <div className="border relative w-[120px] h-[50px] flex items-center justify-center">
            <span
              className="text-md font-semibold w-full text-center cursor-pointer"
              onClick={() =>
                setTimePopup({ ...timePopup, ["hour"]: !timePopup["hour"] })
              }
            >
              {time.hour}
            </span>
            {/* <input type="number" name="number" value={time.hour} onClick={() => setTimePopup(...timePopup, timePopup.hour: !timePopup.hour)} /> */}
            {timePopup.hour && (
              <DropDown>
                {hours.map((num) => (
                  <li
                    key={num}
                    value={num}
                    className="p-1 hover:bg-gray-200 cursor-pointer "
                    onClick={(e) => handleClicks(e)}
                    data-name="hour"
                  >
                    {num}
                  </li>
                ))}
              </DropDown>
            )}
          </div>
          <span className="font-bold">:</span>
          <div className="border relative w-[120px] h-[50px] flex items-center justify-center">
            <span
              className="text-md font-semibold w-full text-center cursor-pointer"
              onClick={() =>
                setTimePopup({ ...timePopup, ["minute"]: !timePopup["minute"] })
              }
            >
              {time.minute}
            </span>
            {timePopup.minute && (
              <DropDown>
                {minutes.map((num) => (
                  <li
                    key={num}
                    value={num}
                    className="p-1 hover:bg-gray-200 cursor-pointer "
                    onClick={(e) => handleClicks(e)}
                    data-name="minute"
                  >
                    {num}
                  </li>
                ))}
              </DropDown>
            )}
          </div>

          <div className="flex flex-col">
            <span
              className={`px-3 py-[2px] ${
                timeZone.AM && "bg-blue text-white"
              } cursor-pointer`}
              onClick={() => setTimeZone({ AM: true, PM: false })}
            >
              AM
            </span>
            <span
              className={`px-3 py-[2px] ${
                timeZone.PM && "bg-blue text-white"
              } cursor-pointer`}
              onClick={() => setTimeZone({ AM: false, PM: true })}
            >
              PM
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default TimePicker;
