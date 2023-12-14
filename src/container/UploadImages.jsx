/* eslint-disable react/prop-types */

import React, { useCallback, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { IoMdCloseCircle } from "react-icons/io";
import { useDropzone } from "react-dropzone";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { FaRegCircleCheck } from "react-icons/fa6";
import userGloabalContext from "../UserContext";
import DropZone from "../Components/DropZone";

const UploadImages = ({
  popup,
  setPopup,
  imagesData,
  setImagesFiles,
  handleProductChange,
  poIndex,
}) => {
  // const [images, setImages] = useState({
  //   backImage: undefined,
  //   frontImage: undefined,
  //   careLabel: undefined,
  //   sizeLabel: undefined,
  // });
  // console.log(imagesFiles);
  const { imagesFiles } = userGloabalContext();
  // console.log(test);
  const [images, setImages] = useState(imagesData);
  const [files, setFiles] = useState([]);
  const [img, setImg] = useState(null);
  const [imgName, setImgName] = useState("");
  console.log(imagesData, imagesFiles);

  const zones = [
    { name: "backImage", text: "Drop back image here", accept: "image/*" },
    { name: "frontImage", text: "Drop front image here", accept: "image/*" },
    { name: "careLabel", text: "Drop care label here", accept: "image/*" },
    { name: "sizeLabel", text: "Drop size label here", accept: "image/*" },
    // Add more zones as needed
  ];

  // const onDropHandler = useCallback(
  //   (acceptedFiles) => {
  //     if (onDrop) {
  //       const file = acceptedFiles[0];
  //       // console.log(file);
  //       // console.log(file.type);
  //       const reader = new FileReader();
  //       reader.onload = (e) => {
  //         // Use reader.result
  //         onDrop(e.target.result);
  //         setPreview(e.target.result);
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   },
  //   [onDrop]
  // );

  // const onDrop = (acceptedFiles, fieldName) => {
  //   const file = acceptedFiles[0];
  //   const reader = new FileReader();
  //   reader.onload = (e) => {
  //     setImages((prevImages) => ({
  //       ...prevImages,
  //       [fieldName]: e.target.result,
  //     }));
  //   };
  //   reader.readAsDataURL(file);
  // };
  // console.log(images);

  // const { getRootProps, getInputProps, isDragActive } = useDropzone({
  //   onDrop: (acceptedFiles) => {
  //     console.log(acceptedFiles);
  //     setFiles(acceptedFiles);
  //     onDropHandler(acceptedFiles);
  //   },
  //   accept: accept || "image/*",
  //   multiple: multiple || false,
  //   maxSize: maxSize || 5242880,
  // });

  // const removeImage = (fieldName, e) => {
  //   e.stopPropagation(); // Prevent event propagation
  //   setImages((prevImages) => ({
  //     ...prevImages,
  //     [fieldName]: undefined,
  //   }));
  // };

  // const getDropZoneProps = (zone) =>
  //   useDropzone({
  //     accept: zone.accept,
  //     onDrop: (acceptedFiles) => onDrop(acceptedFiles, zone.name),
  //   });

  // React.useEffect(() => {
  //   console.log(images);
  //   setImagesFiles(images);
  //   handleProductChange(poIndex, "images", images);
  // }, [images]);
  // console.log(imagesFiles, poIndex);
  const handleInputChange = (e) => {
    // console.log(e.target.value);
    setImgName(e.target.value);
  };

  const addImageFile = () => {
    setFiles([...files, { name: imgName, file: img }]);
    setImg(null);
    setImgName("");
  };
  console.log(img, files);

  return (
    <div className="fixed inset-0 bg-[#00000080] h-screen w-screen pt-[100px]">
      <div className=" relative bg-white w-[70vw] h-[80vh] m-auto  bg-[#00000080] rounded-2xl p-5 flex flex-col">
        <h1 className="text-center mb-5 ">Upload Images</h1>

        <div className="flex-1 grid grid-cols md:grid-cols-5 gap-5 overflow-y-auto">
          <div className="h-[240px] w-[200px]">
            <label className="flex justify-center items-center mb-2 gap-5">
              <input
                type="text"
                placeholder="Add here..."
                className="w-2/3 outline-none focus:border-b-2 focus:border-blue pl-5"
                value={imgName}
                onChange={handleInputChange}
              />
              {imgName.length > 0 ? (
                <FaRegCircleCheck
                  className="text-xl cursor-pointer"
                  onClick={addImageFile}
                />
              ) : (
                <MdOutlineModeEditOutline
                  className="text-xl cursor-pointer"
                  onClick={""}
                />
              )}
            </label>
            <div className=" relative  rounded-md  flex mb-11 border-dashed border-2 border-[rgb(102,102,102)]">
              <div className="w-full h-[160px]">
                <DropZone
                  onDrop={setImg}
                  multiple={true}
                  message={"Upload Product Images"}

                  // method={ImageHandler}
                />
              </div>
            </div>
          </div>
          {files?.map((item, index) => {
            console.log(item);
            return (
              <div
                key={index}
                className="h-[240px] w-[200px] flex flex-col items-center"
              >
                <span>{item?.name}</span>
                <div className=" border-dashed border-2 border-[rgb(102,102,102)] p-6">
                  <img
                    src={item?.file}
                    alt={item?.name}
                    className="w-[150px] h-[150px]"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* <div className="flex-1 grid grid-cols-4 gap-5">
          {zones.map((zone, index) => {
            const { getRootProps, getInputProps } = getDropZoneProps(zone);
            const image =
              images?.[zone.name] === undefined ? "" : images?.[zone.name];
            console.log(images, images?.[zone.name] === undefined);
            return (
              <div
                key={index}
                className="flex flex-col justify-center items-center relative h-[150px]"
                {...getRootProps()}
              >
                <h1>{zone.name}</h1>
                <div className="border-dashed border-2 border-lightGray h-[140px] w-[200px] flex flex-col justify-center items-center">
                  <input {...getInputProps()} />
                  {!image ? (
                    <>
                      <AiOutlineCloudUpload size={50} />
                      <p>{zone.text}</p>
                      <p className="font-bold text-blue"> Or Browse</p>
                    </>
                  ) : (
                    <img src={image} alt={zone.name} width="150" />
                  )}

                  {image && (
                    <div
                      style={{
                        position: "absolute",
                        top: "12px",
                        right: "40px",
                        background: "white",
                      }}
                    >
                      <button onClick={(e) => removeImage(zone.name, e)}>
                        <IoMdCloseCircle size={24} className="text-red-500" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div> */}

        <div className="flex justify-center ">
          <button
            type="button"
            className="border text-blue border-blue rounded py-2 px-5"
            onClick={() => {
              setImagesFiles(imagesFiles);
              setPopup(!popup);
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            className="border text-white bg-blue rounded py-2 px-5 ml-5"
            onClick={() => setPopup(!popup)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadImages;

// import { useFormik } from "formik";
// import * as Yup from "yup";
// import DropZone from "../Components/DropZone";
// import { RxCrossCircled } from "react-icons/rx";
// import { useState } from "react";

// const UploadImages = ({ popup, setPopup, imagesFiles, setImagesFiles }) => {
//   const ImageUploadSchema = Yup.object().shape({
//     backImage: Yup.mixed().required("A back image is required"),
//     frontImage: Yup.mixed().required("A front image is required"),
//     careLabel: Yup.mixed().required("A back image is required"),
//     sizeLabel: Yup.mixed().required("A front image is required"),
//     // Add additional validation rules for other fields
//   });
//   const [images, setImages] = useState({
//     backImage: undefined,
//     frontImage: undefined,
//     careLabel: undefined,
//     sizeLabel: undefined,
//   });

//   const initialValues = {
//     backImage: undefined,
//     frontImage: undefined,
//     careLabel: undefined,
//     sizeLabel: undefined,
//   };
//   //  formik is not used remove later
//   const formik = useFormik({
//     initialValues,
//     onSubmit: (values) => handleSubmit(values),
//     ImageUploadSchema,
//   });
//   const handleDrop = (item) => {
//     try {
//       console.log(item);

//       setImagesFiles([...imagesFiles, item]);

//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleSubmit = async () => {};
//   console.log(imagesFiles);
//   console.log(formik.values);

//   return (
//     <>
//       <div className="fixed inset-0 bg-[#00000080] h-screen w-screen pt-[100px]">
//         <div className=" relative bg-white w-[70vw] h-[80vh] m-auto  bg-[#00000080]  rounded-2xl">
//           <form className="h-full flex flex-col p-5 relative">
//

//             <div className="flex-1 ">
//               <div className="grid grid-cols-4 gap-5">
//                 <div>
//                   <h3 className=" text-sm text-center">Back</h3>
//                   <div className="border-dashed border-2 border-lightGray ">
//                     <DropZone
//                       onDrop={handleDrop}
//                       multiple={false}
//                       message={"Drag To Upload Image"}

//                     />
//                   </div>
//                   {formik.values.backImage && (
//                     <img src={formik.values.backImage[0]} alt="" />
//                   )}
//                 </div>
//                 <div>
//                   <h3 className="text-sm text-center">Front</h3>
//                   <div className="border-dashed border-2 border-lightGray ">
//                     <DropZone
//                       onDrop={handleDrop}
//                       multiple={false}
//                       message={"Drag To Upload Image"}
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <h3 className="text-sm text-center">Care Lable</h3>
//                   <div className="border-dashed border-2 border-lightGray ">
//                     <DropZone
//                       onDrop={handleDrop}
//                       multiple={false}
//                       message={"Drag To Upload Image"}
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <h3 className="text-sm text-center">Size Lable</h3>
//                   <div className="border-dashed border-2 border-lightGray ">
//                     <DropZone
//                       onDrop={handleDrop}
//                       multiple={false}
//                       message={"Drag To Upload Image"}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="flex justify-center ">
//               <button
//                 type="button"
//                 className="border text-blue border-blue rounded py-2 px-5"
//                 onClick={() => {
//                   setImagesFiles([]);
//                   setPopup(!popup);
//                 }}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 className="border text-white bg-blue rounded py-2 px-5 ml-5"
//                 onClick={() => setPopup(!popup)}
//               >
//                 Save
//               </button>
//             </div>
//           </form>
//           <RxCrossCircled
//             className=" text-3xl absolute md:top-[1vh] md:right-[1vh] cursor-pointer "
//             onClick={() => {
//               setImagesFiles([...imagesFiles]);
//               setPopup(!popup);
//             }}
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default UploadImages;
