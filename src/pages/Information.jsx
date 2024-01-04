import { jsPDF } from "jspdf";
import React, { useEffect } from "react";
import logo from "../assets/logo.svg";
import axios from "axios";
import html2canvas from "html2canvas";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { MdModeEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { RxCrossCircled } from "react-icons/rx";
import { useFormik } from "formik";
import InputField from "../container/InputField";
import Prompt from "../DasiyUIComponents/Prompt";
import image from "../assets/img2024.png";

const Information = () => {
  const [data, setData] = React.useState([]);
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [isEditting, setIsEditting] = React.useState(null);
  const [commentData, setCommentData] = React.useState({
    commentIndex: "",
    parentIndex: "",
    text: "",
  });
  const [sendEmail, setSendEmail] = React.useState("");
  const [PDFStore, setPDFStore] = React.useState("");
  const [buttonStatus, setButtonStatus] = React.useState(false);
  const InformationGet = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/api/AllInformationGet`);
      // console.log(data);
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

  let initialValues = data.reduce((o, key) => ({ ...o, [key._id]: "" }), {});

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => handleSubmit(values),
  });
  // console.log(comments);

  async function handleSubmit(parentIndex, id) {
    try {
      if (isEditting) {
        //this is for editing comments

        // const comments = data?.[commentData?.parentIndex]?.comment;
        // comments[commentData.commentIndex] = formik.values[`${isEditting}`];

        // console.log(data?.[commentData?.parentIndex].comment);
        // console.log(formik.values[`${isEditting}`]);

        const res = await axios.put(
          `${baseURL}/api/InformationComentUpdate/${id}/${commentData.commentIndex}`,
          { comment: formik.values[`${isEditting}`] }
        );

        if (res.status === 200) {
          InformationGet();
          formik.setFieldValue(`${id}`, "");
        }
        setIsEditting(null);
      } else {
        const comments = data?.[parentIndex]?.comment;
        comments?.push(formik.values[`${id}`]);

        const res = await axios.put(
          `${baseURL}/api/InformationCommentAdd/${id}`,
          { comment: formik.values[`${id}`] }
        );
        if (res.status === 200) {
          InformationGet();
          formik.setFieldValue(`${id}`, "");
        }

        // console.log(res);
        // comments?.push(commentData.text);
        // setProductList((currentProductList) => {
        //   // Check if comments is an array, if not, default to an empty array
        //   const commentsArray = Array.isArray(currentProductList.comments)
        //     ? currentProductList.comments
        //     : [];
        //   return {
        //     ...currentProductList,
        //     comments: [...commentsArray, data],
        //   };
        // });
      }

      // formik.setFieldValue("comment", "");
    } catch (error) {
      console.error(error);
    }
  }

  function editComment(parentIndex, commentIndex, newText, id) {
    formik.setFieldValue(`${id}`, newText);

    setIsEditting(id);
    setCommentData({ commentIndex, parentIndex, text: newText });
  }

  async function deleteComment(commentIndex, id) {
    try {
      const { data } = await axios.delete(
        `${baseURL}/api/InformationComentDelete/${id}/${commentIndex}`
      );
      if (data) InformationGet();
    } catch (error) {
      console.log(error);
    }
  }

  const downloadPDF = async () => {
    return new Promise((resolve, reject) => {
      const capture = document.querySelector(".actual-receipt");

      if (!capture) {
        reject(new Error("Element with class 'actual-receipt' not found."));
        return;
      }

      const ignoreElements = [
        ".input-comments",
        ".delete-button",
        ".download-Button",
      ];

      html2canvas(capture, {
        useCORS: true,
        quality: 1,
        type: "image/png",
        logging: true,
        allowTaint: true,
        proxy: "path/to/proxy",
        ignoreElements: (element) => {
          return ignoreElements.some((selector) => element.matches(selector));
        },
      }).then(async (canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const topMargin = 20;
        const lowerMargin = 20;

        const doc = new jsPDF("p", "mm");

        let position = topMargin;

        doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        let heightLeft = imgHeight - pageHeight + topMargin + lowerMargin;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight + topMargin + lowerMargin;
          doc.addPage();
          doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        const pdfData = doc.output("arraybuffer");
        const blob = new Blob([pdfData], { type: "application/pdf" });
        resolve(blob);
      });
    });
  };

  const PdfCreateAndVideoCheck = async () => {
    try {
      const pdf = await downloadPDF();
      // console.log(pdf);
      if (!pdf) {
        alert("PDF generation failed.");
        return;
      }

      setPDFStore(pdf);

      const { data } = await axios.get(`${baseURL}/api/VideoCheck`);
      // console.log(data);
      if (!data.status) {
        alert(
          "We are still processing the video. Please check the spellings after some time."
        );
      }
      if (data.status && pdf) {
        setButtonStatus(true);
        alert("The PDF is generating.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while generating the PDF.");
    }
  };
  const EmailHandleMethod = async () => {
    try {
      // console.log(PDFStore, "HIIIIII");
      let formData = new FormData();
      formData.append("email", sendEmail);
      formData.append("file", PDFStore, "file.pdf");
      const { data } = await axios.post(
        `${baseURL}/api/ReportEmailSend`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (data.status) {
        setButtonStatus(false);
        setPDFStore(null);
      }
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    InformationGet();
  }, []);
  return (
    <>
      <div className="w-full h-screen overflow-y-auto  ">
        <div className=" flex justify-end gap-5 download-Button  py-3 px-4 right-0">
          <button
            className="bg-[#1e96fc] rounded-md px-4 py-2  font-medium text-lg text-white"
            onClick={() => downloadPDF()}
          >
            Download
          </button>
          {buttonStatus ? (
            <Prompt
              btnText={
                <button
                  className="bg-[#1e96fc] rounded-md px-4 py-2 font-medium text-lg text-white ml-5 w-[300px] h-[50px] mb-1"
                  onClick={() => {}}

                  //                   className="bg-[#1e96fc] rounded-md px-4 py-2 font-medium text-lg text-white "
                  // onClick={() => PdfCreateAndVideoCheck()}
                >
                  Email
                </button>
              }
              modalID={"sendEmail"}
            >
              <div className="w-[80%] mx-auto flex flex-col gap-5">
                <h1 className="text-center text-xl font-semibold ">
                  Send Report{" "}
                </h1>
                <div className="flex gap-1 items-end">
                  <div
                    className={`border-2 border-[#99999980]  relative p-[15px] flex flex-col rounded-lg mt-5 w-full bg-white `}
                  >
                    <label
                      htmlFor={"email"}
                      className="absolute top-[-11px] bg-white text-color px-3"
                    >
                      {"Email"}
                    </label>
                    <input
                      type={"email"}
                      name={"email"}
                      id={"email"}
                      placeholder={"Enter the Email Id"}
                      className="border-0 outline-none placeholder-[#CCCCCC]"
                      value={sendEmail}
                      onChange={(e) => setSendEmail(e.target.value)}
                      autoComplete="off"
                    />
                  </div>
                  <button
                    className="bg-[#1e96fc] rounded-md px-4 py-2 font-medium text-lg text-white ml-5 w-[300px] h-[50px] mb-1"
                    onClick={() => EmailHandleMethod()}
                  >
                    Send
                  </button>
                </div>
              </div>
            </Prompt>
          ) : (
            <button
              className="bg-[#1e96fc] rounded-md px-4 py-2 font-medium text-lg text-white "
              onClick={() => PdfCreateAndVideoCheck()}
            >
              PDF & Video Gernate
            </button>
          )}
        </div>
        <div className=" flex flex-col items-center actual-receipt p-6 w-full">
          <img
            src={logo}
            alt=""
            width="240px"
            height="100px"
            className="py-4 ml-4"
          />
          <div className="w-[90vw]">
            <div className="flex justify-between items-center w-full text-2xl">
              <div className="font-bold">
                <h2>Client Name :{"XYZ"}</h2>
                <h2>Vender Name :{"XYZ"}</h2>
                <h2>Factory Name :{"XYZ"}</h2>
              </div>
              <div className="font-bold md:text-right">
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
            <div className="flex flex-col md:flex-row justify-between items-center w-full text-lg md:text-2xl mt-5">
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
              <div className="font-bold md:text-right">
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
            <div className=" w-full mt-5 h-screen md:h-full">
              {data.map((e, InfoIndex) => (
                <div className="flex py-8 h-[500px] ">
                  <div className="relative ">
                    <img
                      src={e.image}
                      alt="Product"
                      width={"700px"}
                      height={"700px"}
                      className="border xl:w-[650px] xl:h-[650px] md:w-[650px] md:h-[650px]"
                    />
                    <img
                      src={image}
                      alt=""
                      className="absolute top-0 left-0 z-5 xl:w-[650px] xl:h-[650px] md:w-[650px] md:h-[650px]"
                    />
                  </div>

                  <div className="p-5 w-full flex-1 flex justify-between gap-5">
                    <div className="flex flex-col justify-between w-full">
                      <ul className="w-full h-[45%]  md:h-[70%] overflow-auto">
                        {e?.comment?.length > 0 ? (
                          e?.comment?.map((comment, CommentIndex) => (
                            <li
                              key={CommentIndex}
                              className="flex items-center justify-between px-4 py-2 mb-2 border-b"
                            >
                              <span className="text-2xl flex-grow text-black">
                                {comment}
                              </span>
                              <div className="flex gap-5 delete-button">
                                <MdModeEdit
                                  className="text-xl text-black cursor-pointer delete-button"
                                  onClick={() =>
                                    editComment(
                                      InfoIndex,
                                      CommentIndex,
                                      comment,
                                      e._id
                                    )
                                  }
                                />
                                <AiFillDelete
                                  className="text-2xl text-red-500 cursor-pointer delete-button"
                                  onClick={() =>
                                    deleteComment(CommentIndex, e._id)
                                  }
                                />
                              </div>
                            </li>
                          ))
                        ) : (
                          <>
                            <li className="text-center">Add New Comment....</li>
                          </>
                        )}
                      </ul>

                      <div className=" relative w-full input-comments">
                        <InputField
                          label={"Add Comments"}
                          name={`${e._id}`}
                          type="text"
                          value={formik.values[`${e._id}`]}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.comment && formik.errors.comment
                          }
                          placeholder={"Enter Comment"}
                          labelColor={"bg-white"}
                        />
                        <PiPaperPlaneRightFill
                          className="text-blue text-3xl absolute top-[18px] right-[10px]  md:top-[1.5vh] md:right-[1vh] cursor-pointer"
                          onClick={() => handleSubmit(InfoIndex, e._id)}
                        />
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
          </button>{" "}
          {buttonStatus ? (
            <Prompt
              btnText={
                <button
                  className="bg-[#1e96fc] rounded-md px-4 py-2 font-medium text-lg text-white ml-5 w-[300px] h-[50px] mb-1"
                  onClick={() => {}}

                  //                   className="bg-[#1e96fc] rounded-md px-4 py-2 font-medium text-lg text-white "
                  // onClick={() => PdfCreateAndVideoCheck()}
                >
                  Email
                </button>
              }
              modalID={"sendEmail"}
            >
              <div className="w-[80%] mx-auto flex flex-col gap-5">
                <h1 className="text-center text-xl font-semibold ">
                  Send Report
                </h1>
                <div className="flex gap-1 items-end">
                  <div
                    className={`border-2 border-[#99999980]  relative p-[15px] flex flex-col rounded-lg mt-5 w-full bg-white `}
                  >
                    <label
                      htmlFor={"email"}
                      className="absolute top-[-11px] bg-white text-color px-3"
                    >
                      {"Email"}
                    </label>
                    <input
                      type={"email"}
                      name={"email"}
                      id={"email"}
                      placeholder={"Enter the Email Id"}
                      className="border-0 outline-none placeholder-[#CCCCCC]"
                      value={sendEmail}
                      onChange={(e) => setSendEmail(e.target.value)}
                      autoComplete="off"
                    />
                  </div>
                  <button
                    className="bg-[#1e96fc] rounded-md px-4 py-2 font-medium text-lg text-white ml-5 w-[300px] h-[50px] mb-1"
                    onClick={() => EmailHandleMethod()}
                  >
                    Send
                  </button>
                </div>
              </div>
            </Prompt>
          ) : (
            <button
              className="bg-[#1e96fc] rounded-md px-4 py-2 font-medium text-lg text-white "
              onClick={() => PdfCreateAndVideoCheck()}
            >
              PDF & Video Gernate
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Information;

{
  /* <div>
{e.comment.map((c, index) => (
  <p className="font-medium text-[20px] capitalize">{`${
    index + 1
  }.  ${c}`}</p>
))}
</div> */
}
