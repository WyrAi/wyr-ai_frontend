/** @format */

import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineCloudUpload } from "react-icons/ai";

const DropZone = ({
  onDrop,
  accept,
  multiple,
  maxSize,
  message,
  iconSize,
  textSize,
  className,
  fileName,
  method,
  setLoader,
  setFormData,
}) => {
  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState("");
  /**
   * Callback function for handling dropped files.
   *
   * @callback onDropHandler
   * @param {Array<File>} acceptedFiles - Array of accepted files.
   */
  const onDropHandler = useCallback(
    (acceptedFiles) => {
      if (onDrop) {
        const file = acceptedFiles[0];
        // console.log(file);
        // console.log(file.type);

        const reader = new FileReader();
        reader.onload = (e) => {
          // Use reader.result
          onDrop(e.target.result);
          // console.log(e.target.result);
          setPreview(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    },
    [onDrop]
  );

  const onDropForm = useCallback(
    (acceptedFiles) => {
      if (setFormData) {
        const file = acceptedFiles[0];
        // console.log(file);
        // console.log(file.type);
        setFormData(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          // Use reader.result
          // console.log(e.target.result);
          setPreview(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    },
    [setFormData]
  );
  useEffect(() => {
    // console.log(files[0]);
    if (method) method(files[0]);
  }, [files]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles);
      setLoader(true);
      setFiles(acceptedFiles);
      onDropForm(acceptedFiles);
      onDropHandler(acceptedFiles);
    },
    accept: accept || {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    multiple: multiple || false,
    maxSize: maxSize || 5242880,
  });

  useEffect(() => {
    // console.log(files[0]);
    if (method) method(files[0]);
  }, [files]);

  return (
    <div
      {...getRootProps()}
      className={`flex cursor-pointer flex-col ${className} p-6 h-full text-[#666666] gap-2 justify-center  items-center w-full relative ${
        isDragActive ? "active" : ""
      }`}
    >
      <input {...getInputProps()} />

      {files.length > 0 ? (
        <img
          src={preview}
          className="object-cover object-top overflow-hidden w-full flex-1"
        ></img>
      ) : (
        <p
          className={`flex gap-2 text-[#333333] text-center ${
            textSize || "font-semibold"
          }`}
        >
          {files.map((file) => (
            <span key={file?.name}>{file?.name}</span>
          ))}
        </p>
      )}
      {!files.length && (
        <p
          className={`text-[#333333] text-center ${
            textSize || "font-semibold flex flex-col items-center"
          }`}
        >
          <AiOutlineCloudUpload size={iconSize || 50} />
          {message
            ? message
            : "Drag & drop files here, or click to select files"}
          <span className="text-blue block"> Browse</span>
        </p>
      )}
      {isDragActive && (
        <div className="absolute inset-0 bg-gray-300 opacity-50 z-10"></div>
      )}
    </div>
  );
};

export default DropZone;
