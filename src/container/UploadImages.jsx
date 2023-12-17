/* eslint-disable react/prop-types */

import React, { useCallback, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { IoMdCloseCircle } from "react-icons/io";
import { useDropzone } from "react-dropzone";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { FaRegCircleCheck } from "react-icons/fa6";
import userGloabalContext from "../UserContext";

// import DropZone from "../Components/DropZone";

const UploadImages = ({
  popup,
  setPopup,
  imagesData,
  setImagesFiles,
  handleProductChange,
  poIndex,
}) => {
  const { imagesFiles } = userGloabalContext();
  // console.log(test);

  const [images, setImages] = useState("");
  const [files, setFiles] = useState(imagesData);
  const [img, setImg] = useState(null);
  const [imgName, setImgName] = useState("");

  console.log(imagesData, poIndex);

  const zones = files.map((item) => {
    return {
      name: item?.name,
      text: `Drag To Upload ${item.name} image here`,
      accept: {
        "image/*": [".jpeg", ".jpg", ".png"],
      },
      file: item?.file,
    };
  });
  // console.log(zone);

  // const zones = [
  //   { name: "backImage", text: "Drop back image here", accept: "image/*" },
  //   { name: "frontImage", text: "Drop front image here", accept: "image/*" },
  //   { name: "careLabel", text: "Drop care label here", accept: "image/*" },
  //   { name: "sizeLabel", text: "Drop size label here", accept: "image/*" },
  //   // Add more zones as needed
  // ];

  // const onDropHandler = useCallback((acceptedFiles) => {
  //   const file = acceptedFiles[0];
  //   // console.log(file);
  //   // console.log(file.type);
  //   const reader = new FileReader();
  //   reader.onload = (e) => {
  //     // Use reader.result
  //     // console.log(e.target);
  //     setImg(e.target.result);
  //     // setPreview(e.target.result);
  //   };
  //   reader.readAsDataURL(file);
  // }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles);
      // setFiles(acceptedFiles);
      onDropHandler(acceptedFiles);
    },
    accept: "image/*",
    multiple: false,
    maxSize: 5242880,
  });

  const removeImage = (fieldName) => {
    // e.stopPropagation(); // Prevent event propagation
    console.log(fieldName);
    // setImages((prevImages) => ({
    //   ...prevImages,
    //   [fieldName]: undefined,
    // }));
  };

  // const getDropZoneProps = (zone) =>
  //   useDropzone({
  //     accept: zone.accept,
  //     onDrop: (acceptedFiles) => onDrop(acceptedFiles, zone.name),
  //   });

  // console.log(imagesFiles, poIndex);
  const handleInputChange = (e) => {
    // console.log(e.target.value);
    setImgName(e.target.value);
  };

  // const addImageFile = () => {
  //   // console.log(imgName, img, "ADD");
  //   setFiles([...files, { name: imgName, file: img }]);
  //   setImg(null);
  //   setImgName("");
  // };

  React.useEffect(() => {
    // console.log("images", files);
    // setImagesFiles(images);
    if (files?.length > 0) {
      handleProductChange(poIndex, "images", files);
    }
  }, [files]);

  // React.useEffect(() => {
  // setFiles(im)
  // }, [imagesData])

  // const DropzoneUp = ({ img }) => {
  //   return (
  //     <div className=" relative  rounded-md  flex mb-11 border-dashed border-2 border-[rgb(102,102,102)]">
  //       <div className="w-full h-[160px]">
  //         <div
  //           {...getRootProps()}
  //           className={`flex cursor-pointer flex-col  p-6 h-full text-[#666666] gap-2 justify-center  items-center w-full relative ${
  //             isDragActive ? "active" : ""
  //           }`}
  //         >
  //           <input {...getInputProps()} />

  //           {img ? (
  //             <img
  //               src={img}
  //               alt=""
  //               className="object-cover overflow-hidden w-full flex-1"
  //             />
  //           ) : (
  //             <p
  //               className={`text-[#333333] text-center ${"font-semibold flex flex-col items-center"}`}
  //             >
  //               <AiOutlineCloudUpload size={30} />
  //               Drag & drop files here, or click to select files
  //               <span className="text-blue block"> Browse</span>
  //             </p>
  //           )}

  //           {isDragActive && (
  //             <div className="absolute inset-0 bg-gray-300 opacity-50 z-10"></div>
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  const handleDrop = (acceptedFiles, index) => {
    const newImages = [...files];
    newImages[index].file = acceptedFiles[0]; // Assuming you're adding only one file per drop
    // setImages(newImages);
    setFiles(newImages);
  };
  console.log(files);

  const DropZone = ({
    text,
    accept,
    index = null,
    handleDrop,
    file = null,
  }) => {
    const [acceptedFiles, setAcceptedFiles] = useState([]);
    console.log(file);

    const onDrop = (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const droppedFile = acceptedFiles[0];
        const fileExtension = droppedFile.name.split(".").pop().toLowerCase();

        // Adjust the list of allowed file extensions as needed
        const allowedExtensions = ["jpg", "jpeg", "png", "gif"];

        if (allowedExtensions.includes(fileExtension)) {
          setAcceptedFiles(acceptedFiles);
          if (index === null) {
            setFiles([...files, { name: text, file: acceptedFiles[0] }]);
            setImgName("");
          } else {
            handleDrop(acceptedFiles, index);
          }
        } else {
          console.log("Invalid file extension");
        }

        console.log("Accepted files:", acceptedFiles);
      }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      // accept:  "image/*",
      accept: accept || {
        "image/*": [".jpeg", ".jpg", ".png"],
      },
      multiple: false,
      maxSize: 5242880,
    });

    return (
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #ccc",
        }}
        className="h-[200px] w-[200px] rounded-md bg-[#F2F2F2]"
      >
        <input {...getInputProps()} />

        <div className=" relative flex flex-col justify-center h-full overflow-hidden p-2">
          {file ? (
            <div className=" h-full">
              <img
                src={URL.createObjectURL(file)}
                alt=""
                className="object-cover h-full w-full "
              />
              <IoMdCloseCircle
                size={24}
                className="text-red-500 absolute top-0 right-0 bg-white rounded-full cursor-pointer"
              />
            </div>
          ) : (
            <p className="text-xs text-darkGray font-semibold flex flex-col items-center">
              <AiOutlineCloudUpload size={50} />
              <span>Drag To Upload </span>
              <span className="block">{`${text} image`}</span>
              <span className="text-blue block"> Browse</span>
            </p>
          )}
        </div>

        {acceptedFiles.length > 0 && (
          <div>
            <h4>Accepted Files</h4>
            <ul>
              {acceptedFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}

        {isDragActive && (
          <div className="absolute inset-0 bg-gray-300 opacity-50 z-10"></div>
        )}
      </div>
    );
  };

  // React.useEffect(() => {
  //   setFiles([...files, ...imagesData]);
  // }, [imagesData]);
  // console.log(files);

  return (
    <div className=" h-full w-full ">
      <div className=" relative bg-white  m-auto  bg-[#00000080] rounded-2xl flex flex-col">
        <h1 className="text-center mb-5 ">Upload Images</h1>

        <div className="flex-1 grid grid-cols md:grid-cols-4 gap-5 overflow-y-auto md:min-h-[60vh]">
          {/* {files?.map((item, index) => {
            // console.log(item);
            return (
              <div
                key={index}
                className="relative h-[240px] w-[200px] flex flex-col items-center"
              >
                <span>{item?.name}</span>
                <div className="  border-dashed border-2 border-[rgb(102,102,102)] p-6">
                  {item?.file.length > 0 ? (
                    <img
                      src={item?.file}
                      alt={item?.name}
                      className="w-[150px] h-[150px]"
                    />
                  ) : (
                    ""
                  )}

                  <IoMdCloseCircle
                    size={24}
                    className="text-red-500 cursor-pointer absolute top-[12px] right-[-10px] bg-white"
                    onClick={() => removeImage(item?.name)}
                  />
                </div>
              </div>
            );
          })} */}
          {zones.map((zone, index) => (
            <div className="flex flex-col items-center h-[200px] w-[200px]">
              <span className="font-medium mb-2">{zone.name}</span>
              <div className="flex-1">
                <DropZone
                  key={zone?.name}
                  text={zone?.name}
                  accept={zone?.accept}
                  index={index}
                  handleDrop={handleDrop}
                  file={zone?.file}
                />
              </div>
            </div>
          ))}

          <div className="h-[240px] w-[200px]">
            <label className="flex justify-center items-center mb-2 gap-5">
              <input
                type="text"
                placeholder="Add here..."
                className="w-2/3 outline-none focus:border-b-2 focus:border-blue pl-5"
                value={imgName}
                onChange={(e) => handleInputChange(e)}
              />
              {imgName.length > 0 ? (
                <FaRegCircleCheck
                  className="text-xl cursor-pointer"
                  // onClick={() => addImageFile()}
                />
              ) : (
                <MdOutlineModeEditOutline
                  className="text-xl cursor-pointer"
                  // onClick={() => {}}
                />
              )}
            </label>
            <DropZone text={imgName} />

            {/* <DropzoneUp img={img} /> */}
          </div>
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
              // setImagesFiles(imagesFiles);
              // setPopup(!popup);
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

// {img.length > 0 ? (
//   <img
//     src={img}
//     className="object-cover overflow-hidden w-full flex-1"
//   ></img>
// ) : (
//   <p
//     className={`flex gap-2 text-[#333333] text-center  font-semibold}`}
//   >
//     {/* {files.map((file) => (
//       <span key={file?.name}>{file?.name}</span>
//     ))} */}
//     {imgName}
//   </p>
// )}

// {img && (
// <p
//   className={`text-[#333333] text-center ${"font-semibold flex flex-col items-center"}`}
// >
//   <AiOutlineCloudUpload size={30} />
//   Drag & drop files here, or click to select files
//   <span className="text-blue block"> Browse</span>
// </p>
// )}
