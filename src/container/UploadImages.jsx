/* eslint-disable react/prop-types */

import React, { useCallback, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { IoMdCloseCircle } from "react-icons/io";
import { useDropzone } from "react-dropzone";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { FaRegCircleCheck } from "react-icons/fa6";
import userGloabalContext from "../UserContext";
import { closeModal } from "../DasiyUIComponents/Prompt";

// import DropZone from "../Components/DropZone";

// ****** pending work is that add functionlity on cancel and save button *********

const UploadImages = ({
  popup,
  setPopup,
  imagesData,
  setImagesFiles,
  handleProductChange,
  poIndex,
  // closeModal,
}) => {
  const { imagesFiles, imgFormUploadData, setImgFormUploadData } =
    userGloabalContext();
  const intialImages = [
    { name: "Back", file: "" },
    { name: "Front", file: "" },
    { name: "Care Label", file: "" },
    { name: "Size Label", file: "" },
    { name: "Brand Label", file: "" },
    { name: "Price Label", file: "" },
  ];

  const [images, setImages] = useState("");
  const [files, setFiles] = useState([...imagesData]);
  const [img, setImg] = useState(null);
  const [imgName, setImgName] = useState("");

  // console.log(imagesData, poIndex);

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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      // console.log(acceptedFiles);
      // setFiles(acceptedFiles);
      onDropHandler(acceptedFiles);
    },
    accept: "image/*",
    multiple: false,
    maxSize: 5242880,
  });

  const handleSubmit = () => {
    // console.log("changes hits");
    if (files?.length > 0) {
      handleProductChange(poIndex, "images", files);
    }
  };

  const removeImage = (index) => {
    const updateFiles = [...files];
    updateFiles[index].file = "";
    // console.log(updateFiles);
    setFiles(updateFiles);
  };

  const handleInputChange = (e) => {
    setImgName(e.target.value);
  };

  // React.useEffect(() => {
  //   console.log("changes hits");
  //   if (files?.length > 0) {
  //     handleProductChange(poIndex, "images", files);
  //   }
  // }, [files]);

  const handleDrop = (acceptedFiles, index) => {
    const newImages = [...files];

    // const formData = new FormData();

    // formData.append(`${imgFormData[index].name}`, acceptedFiles[0]);

    newImages[index].file = acceptedFiles[0]; // Assuming you're adding only one file per drop
    // imgFormData[index].file = acceptedFiles[0]; // formData;
    setFiles(newImages);
  };

  const handleFormData = () => {
    if (imgFormUploadData.length - 1 === poIndex) {
      // console.log(poIndex);
      const updateImgData = [...imgFormUploadData];
      updateImgData[poIndex] = files;
      setImgFormUploadData(updateImgData);
    } else {
      setImgFormUploadData([...imgFormUploadData, files]);
    }
  };
  // console.log(files);

  const DropZone = ({
    text,
    accept,
    index = null,
    handleDrop,
    file = null,
  }) => {
    const [acceptedFiles, setAcceptedFiles] = useState([]);
    // console.log(file);

    const onDrop = (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const droppedFile = acceptedFiles[0];
        const fileExtension = droppedFile.name.split(".").pop().toLowerCase();

        // Adjust the list of allowed file extensions as needed
        const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
        // const imgData = new FormData();
        // imgData.append(`${text}`, droppedFile);
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

        // console.log("Accepted files:", acceptedFiles);
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
        className="h-[200px] w-[200px] rounded-md bg-[#F2F2F2] relative"
      >
        <input {...getInputProps()} />

        <div className=" flex flex-col justify-center h-full overflow-hidden p-2">
          {file ? (
            <div className=" h-full">
              <img
                src={URL.createObjectURL(file)}
                alt=""
                className="object-cover h-full w-full "
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

  return (
    <div className=" h-full w-full ">
      <div className=" relative bg-white  m-auto  bg-[#00000080] rounded-2xl flex flex-col">
        <h1 className="text-center mb-5 ">Upload Images</h1>

        <div className="flex-1 grid grid-cols md:grid-cols-4 gap-5 overflow-y-auto  ">
          {zones.map((zone, index) => {
            return (
              <div
                key={index}
                className=" relative flex flex-col items-center h-full w-full"
              >
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
                {Object.keys(zone?.file).length > 0 && (
                  // <span className="rounded-full bg-red-500 p-3">X</span>
                  <IoMdCloseCircle
                    size={24}
                    className="text-red-500 bg-white text-xl absolute top-[34px] right-[24px] rounded-full"
                    onClick={() => removeImage(index)}
                  />
                )}
              </div>
            );
          })}

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
                  className="text-xl "
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

        <div className="flex justify-center ">
          <button
            type="button"
            className="border text-blue border-blue rounded py-2 px-5"
            onClick={() => {
              closeModal(`uploadImg_${poIndex}`);
              // setFiles(intialImages);
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            className="border text-white bg-blue rounded py-2 px-5 ml-5"
            onClick={() => {
              closeModal(`uploadImg_${poIndex}`);
              handleFormData();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadImages;
