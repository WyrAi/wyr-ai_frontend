import { jsPDF } from "jspdf";
import React, { useEffect } from "react";
import logo from "../assets/logo.svg";
import axios from "axios";
import html2canvas from "html2canvas";
import { RiDeleteBack2Fill } from "react-icons/ri";

const Information = () => {
  const [data, setData] = React.useState([]);
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [comment, setComment] = React.useState("");
  const InformationGet = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/api/AllInformationGet`);
      console.log(data);
      if (data) setData(data.Response);
    } catch (error) {
      console.log(error);
    }
  };

  const AddNewComment = async (e) => {
    try {
      const { data } = await axios.put(
        `${baseURL}/api/InformationCommentAdd/${e}`,
        { comment }
      );
      if (data) InformationGet();
    } catch (error) {
      console.log(error);
    }
  };

  const slotDelete = async (e) => {
    try {
      const { data } = await axios.delete(
        `${baseURL}/api/InformationDelete/${e}`
      );
      if (data) InformationGet();
    } catch (error) {
      console.log(error);
    }
  };

  const downloadPDF = () => {
    const capture = document.querySelector(".actual-receipt");
    // Check if the capture element is found

    if (capture) {
      // Clone the scrollable content into a new div
      const cloneDiv = document.createElement("div");
      cloneDiv.innerHTML = capture.innerHTML;
      cloneDiv.style.overflow = "visible";
      cloneDiv.style.height = "auto";
      cloneDiv.style.width = capture.offsetWidth + "px";
      // Append the clone to the document (you may need to adjust the position)
      document.body.appendChild(cloneDiv);
      // Use html2canvas options to wait for images to load
      const ignoreElements = [
        ".input-comments",
        ".delete-button",
        ".download-Button",
      ];
      html2canvas(capture, {
        useCORS: true,
        logging: true,
        allowTaint: true,
        proxy: "path/to/proxy", // Provide a path to a proxy if needed
        ignoreElements: (element) => {
          // Check if the element should be ignored
          return ignoreElements.some((selector) => element.matches(selector));
        },
      }).then((canvas) => {
        // Create PDF using jsPDF
        const imgData = canvas.toDataURL("image/png");
        const doc = new jsPDF("p", "mm", "a4");
        const componentWidth = doc.internal.pageSize.getWidth();
        const componentHeight = doc.internal.pageSize.getHeight();
        doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
        doc.save("receipt.pdf");
      });
    } else {
      console.error("Element with class 'actual-receipt' not found.");
    }
  };
  useEffect(() => {
    InformationGet();
  }, []);
  return (
    <>
      <div className="w-full h-full ">
        <div className=" text-right download-Button  py-3 px-4 right-0">
          <button
            className="bg-[#1e96fc] rounded-md px-4 py-2  font-medium text-lg text-white"
            onClick={() => downloadPDF()}
          >
            Download
          </button>
        </div>
        <div className=" flex flex-col items-center actual-receipt p-6 w-full">
          <img
            src={logo}
            alt=""
            width="240px"
            height="100px"
            className="py-4 ml-4"
          />
          <div className="overflow-y-auto h-[650px]">
            <div className="flex justify-between items-center w-full text-2xl">
              <div className="font-bold">
                <h2>Client Name :{"XYZ"}</h2>
                <h2>Vender Name :{"XYZ"}</h2>
                <h2>Factory Name :{"XYZ"}</h2>
              </div>
              <div className="font-bold text-right">
                <h2>
                  Inspector Name : <span className="font-medium">{"XYZ"}</span>
                </h2>
                <h2>
                  Inspector Location:{" "}
                  <span className="font-medium">{"XYZ Factory"}</span>
                </h2>
                <h2>
                  Inspector Type:{" "}
                  <span className="font-medium">
                    {"Final Random Inspection"}
                  </span>
                </h2>
              </div>
            </div>
            <div className="flex justify-between items-center w-full text-2xl mt-5">
              <div className="font-bold">
                <h2>
                  Po Number : <span className="font-medium">{"11111"}</span>
                </h2>
                <h2>
                  Style Number : <span className="font-medium">{"J/224"}</span>
                </h2>
                <h2>
                  Color : <span className="font-medium">{"Blue"}</span>
                </h2>
                <h2>
                  Product Description :
                  <span className="font-medium">
                    {"100% Cotton, Polo SS blue with dots, man's T-shirt"}
                  </span>
                </h2>
              </div>
              <div className="font-bold text-right">
                <h2>
                  Order Quantity :{" "}
                  <span className="font-medium">{"1644 Pcs"}</span>
                </h2>
                <h2>
                  Offer Quantity:{" "}
                  <span className="font-medium">{"800 Pcs"}</span>
                </h2>
                <h2>
                  Product Size & ratio:{" "}
                  <span className="font-medium">{"20*20(1),40*40(1)"}</span>
                </h2>
              </div>
            </div>
            <div className=" w-full mt-5 h-full">
              {data.map((e) => (
                <div className="flex pt-5 h-full ">
                  <img
                    src={e.image}
                    alt="Product"
                    width={"750px"}
                    height={"400px"}
                    className="border"
                  />
                  <div className="p-5 w-full flex justify-between gap-5">
                    <div className="flex flex-col justify-between w-full">
                      <div>
                        {e.comment.map((c, index) => (
                          <p className="font-medium text-[20px] capitalize">{`${
                            index + 1
                          }.  ${c}`}</p>
                        ))}
                      </div>
                      <div className=" flex gap-5 input-comments w-full">
                        <input
                          type="text"
                          name=""
                          id=""
                          className="w-full p-4 rounded-md text-base border-none outline-none"
                          placeholder="Enter another comment"
                          onChange={(e) => setComment(e.target.value)}
                        />
                        <button
                          className="bg-[#1e96fc] px-8 text-white text-lg font-medium rounded-md"
                          onClick={() => AddNewComment(e._id)}
                        >
                          Submit
                        </button>
                      </div>
                    </div>

                    <div className="delete-button">
                      <RiDeleteBack2Fill
                        fill="#1e96fc"
                        className="text-3xl cursor-pointer"
                        width={"40px"}
                        onClick={() => slotDelete(e._id)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className=" text-right download-Button  py-3 px-4  right-0">
          <button
            className="bg-[#1e96fc] rounded-md px-4 py-2 font-medium text-lg text-white"
            onClick={() => downloadPDF()}
          >
            Download
          </button>
        </div>
      </div>
    </>
  );
};

export default Information;
