/* eslint-disable react/prop-types */

import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { IoMdCloseCircle } from "react-icons/io";
import { useDropzone } from "react-dropzone";
import userGloabalContext from "../UserContext";

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
  console.log(imagesData, imagesFiles);

  const zones = [
    { name: "backImage", text: "Drop back image here", accept: "image/*" },
    { name: "frontImage", text: "Drop front image here", accept: "image/*" },
    { name: "careLabel", text: "Drop care label here", accept: "image/*" },
    { name: "sizeLabel", text: "Drop size label here", accept: "image/*" },
    // Add more zones as needed
  ];

  const onDrop = (acceptedFiles, fieldName) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      // Use reader.result
      // onDrop(e.target.result);
      // setPreview(e.target.result);
      setImages((prevImages) => ({
        ...prevImages,
        [fieldName]: e.target.result,
      }));
    };
    reader.readAsDataURL(file);
  };
  console.log(images);

  const removeImage = (fieldName, e) => {
    e.stopPropagation(); // Prevent event propagation
    setImages((prevImages) => ({
      ...prevImages,
      [fieldName]: undefined,
    }));
  };

  const getDropZoneProps = (zone) =>
    useDropzone({
      accept: zone.accept,
      onDrop: (acceptedFiles) => onDrop(acceptedFiles, zone.name),
    });

  React.useEffect(() => {
    console.log(images);
    setImagesFiles(images);
    handleProductChange(poIndex, "images", images);
  }, [images]);
  console.log(imagesFiles, poIndex);

  // React.useEffect(() => {
  //   console.log("here");

  // }, [ imagesFiles]);

  // React.useEffect(() => {
  //   setImages(imagesData);
  // }, [imagesData]);

  // React.useEffect(() => {
  //   // setImages(imagesFiles);
  // }, []);

  // console.log(images, imagesFiles);

  return (
    <div className="fixed inset-0 bg-[#00000080] h-screen w-screen pt-[100px]">
      <div className=" relative bg-white w-[70vw] h-[80vh] m-auto  bg-[#00000080] rounded-2xl p-5 flex flex-col">
        <h1 className="text-center mb-5 ">Upload Images</h1>
        <div className="flex-1 grid grid-cols-4 gap-5">
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
        </div>

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
