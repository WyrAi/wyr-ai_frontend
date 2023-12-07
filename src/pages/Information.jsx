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

const Information = () => {
  const [data, setData] = React.useState([]);
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [isEditting, setIsEditting] = React.useState(null);
  const [commentData, setCommentData] = React.useState({
    commentIndex: "",
    parentIndex: "",
    text: "",
  });

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

  const downloadPDF = () => {
    const capture = document.querySelector(".actual-receipt");
    // Check if the capture element is found

    if (capture) {
      // Use html2canvas options to wait for images to load
      const ignoreElements = [
        ".input-comments",
        ".delete-button",
        ".download-Button",
      ];

      // // Remove ignored elements from the clone
      // ignoreElements.forEach((selector) => {
      //   const elementsToRemove = clone.querySelectorAll(selector);
      //   elementsToRemove.forEach((element) =>
      //     element.parentNode.removeChild(element)
      //   );
      // });
      // window.onload = function () {
      html2canvas(capture, {
        useCORS: true,
        quality: 1,
        type: "image/png",
        // width: window.innerWidth, // Set the width to the viewport width
        // height: window.innerHeight,
        // scale: 1, // Set the scale to 1 (no scaling)
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
        // const doc = new jsPDF("p", "mm", "a4");
        // console.log(imgData);
        // const componentWidth = doc.internal.pageSize.getWidth();
        // const componentHeight = doc.internal.pageSize.getHeight();
        // const imgWidth = 210; // A4 page width in mm
        // const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // // Add the image to the PDF
        // doc.addImage(imgData, 'PNG', 0, 0);
        // // doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
        // doc.save("receipt.pdf");
        var imgWidth = 210;
        var pageHeight = 295;
        var imgHeight = (canvas.height * imgWidth) / canvas.width;
        var heightLeft = imgHeight;

        var doc = new jsPDF("p", "mm");
        var position = 0;

        doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        doc.save("file.pdf");
      });
      // };
    } else {
      console.error("Element with class 'actual-receipt' not found.");
    }
  };

  // const downloadPDF = () => {
  //   const capture = document.querySelector(".actual-receipt");
  //   // Check if the capture element is found

  //   if (capture) {
  //     // Use html2canvas options to wait for images to load
  //     const ignoreElements = [
  //       ".input-comments",
  //       ".delete-button",
  //       ".download-Button",
  //     ];

  //     // // Remove ignored elements from the clone
  //     // ignoreElements.forEach((selector) => {
  //     //   const elementsToRemove = clone.querySelectorAll(selector);
  //     //   elementsToRemove.forEach((element) =>
  //     //     element.parentNode.removeChild(element)
  //     //   );
  //     // });
  //     // html2canvas(capture, {
  //     //   useCORS: true,
  //     //   logging: true,
  //     //   allowTaint: true,
  //     //   proxy: "path/to/proxy", // Provide a path to a proxy if needed
  //     //   ignoreElements: (element) => {
  //     //     // Check if the element should be ignored
  //     //     return ignoreElements.some((selector) => element.matches(selector));
  //     //   },
  //     // }).then((canvas) => {
  //     //   // Create PDF using jsPDF
  //     //   const imgData = canvas.toDataURL("image/png");
  //     //   const doc = new jsPDF("p", "mm", "a4");
  //     //   const componentWidth = doc.internal.pageSize.getWidth();
  //     //   const componentHeight = doc.internal.pageSize.getHeight();
  //     //   doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
  //     //   doc.save("receipt.pdf");
  //     // });

  //     // Create a clone of the capture element to avoid interference with the original content
  //     const clone = capture.cloneNode(true);

  //     // Use html2canvas options to exclude certain elements
  //     html2canvas(clone, {
  //       useCORS: true,
  //       logging: true,
  //       allowTaint: true,
  //       proxy: "path/to/proxy", // Provide a path to a proxy if needed
  //       ignoreElements: (element) => {
  //         // Check if the element should be ignored
  //         return (
  //           element.nodeName.toLowerCase() === "iframe" ||
  //           ignoreElements.some((selector) => element.matches(selector))
  //         );
  //       },
  //     }).then((canvas) => {
  //       // Calculate the proper scale to fit the content into the PDF page
  //       const scale = 2; // You can adjust this value

  //       // Create PDF using jsPDF
  //       const imgData = canvas.toDataURL("image/png");
  //       const pdf = new jsPDF("p", "mm", "a4");
  //       const pdfWidth = pdf.internal.pageSize.getWidth();
  //       const pdfHeight = pdf.internal.pageSize.getHeight();
  //       const imgWidth = pdfWidth;
  //       const imgHeight = (canvas.height * imgWidth) / canvas.width;

  //       pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight, "", "FAST");
  //       pdf.save("receipt.pdf");
  //     });
  //   } else {
  //     console.error("Element with class 'actual-receipt' not found.");
  //   }
  // };
  useEffect(() => {
    InformationGet();
  }, []);
  return (
    <>
      <div className="w-full h-screen overflow-y-auto  ">
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
          <div className="md:w-[75vw]">
            <div className="flex flex-col  md:flex-row justify-between items-start md:items-center w-full text-lg md:text-2xl">
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
                <div className="flex flex-col md:flex-row py-8 h-full ">
                  <img
                    src={e.image}
                    alt="Product"
                    width={"750px"}
                    height={"400px"}
                    className="border flex-1"
                  />
                  <div className="p-5 w-full flex-1   flex justify-between gap-5">
                    <div className="flex flex-col justify-between w-full">
                      <ul className="w-full h-[45%]  md:h-[70%] overflow-auto">
                        {e?.comment?.length > 0 ? (
                          e?.comment?.map((comment, CommentIndex) => (
                            <li
                              key={CommentIndex}
                              className="flex items-center justify-between px-4 py-2 mb-2 border-b"
                            >
                              <span className="text-sm flex-grow text-lightGray">
                                {comment}
                              </span>
                              <div className="flex gap-5 ">
                                <MdModeEdit
                                  className="text-xl text-black cursor-pointer"
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
                                  className="text-2xl text-red-500 cursor-pointer"
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

                      <div className=" relative w-full">
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
          </button>
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
