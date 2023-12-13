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
        // console.log(file.type);

        const reader = new FileReader();
        reader.onload = (e) => {
          // Use reader.result
          onDrop(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    },
    [onDrop]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
      onDropHandler(acceptedFiles);
    },
    accept: accept || "image/*",
    multiple: multiple || false,
    maxSize: maxSize || 5242880,
  });

  useEffect(() => {
    if (fileName?.length > 0) {
      setPreview([fileName]);
    }
  }, [fileName]);

  console.log(files, fileName);
  return (
    <div
      {...getRootProps()}
      className={`flex cursor-pointer flex-col ${className} p-6 h-full text-[#666666] gap-2 justify-center  items-center w-full relative ${
        isDragActive ? "active" : ""
      }`}
    >
      <AiOutlineCloudUpload size={iconSize || 50} />
      <input {...getInputProps()} />
      {files.length > 0 && (
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
            textSize || "font-semibold"
          }`}
        >
          {message
            ? message
            : "Drag & drop files here, or click to select files"}
          <span className="text-blue block"> Browse</span>
        </p>
      )}
      {isDragActive && (
        <div className="absolute inset-0 bg-gray-300 opacity-50 z-10"></div>
      )}

      {preview.length > 0 && <img src={preview} className="object-cover"></img>}
    </div>
  );
};

export default DropZone;
