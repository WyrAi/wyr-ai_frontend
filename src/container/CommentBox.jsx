/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import * as Yup from "yup";
import InputField from "./InputField";
import moment from "moment/moment";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { MdModeEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { RxCrossCircled } from "react-icons/rx";
import { userGloabalContext } from "../UserContext";
import { useEffect, useState } from "react";

const CommentBox = ({
  poIndex,
  setTogglePopup,
  move,
  header,
  btnText,
  handleProductChange,
  comments,
}) => {
  const { productList, setProductList } = userGloabalContext();
  const [commentsData, setCommentsData] = useState(comments);

  // const [newComment, setNewComment] = useState('');

  const initialValues = { comment: "", editingId: null };

  const date = moment().format("Do MMM YYYY");

  const validationSchema = Yup.object().shape({
    comment: Yup.string().required("comment is required"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => handleSubmit(values),
    validationSchema,
  });
  // console.log(comments);

  async function handleSubmit(values) {
    try {
      if (values.editingId) {
        //this is for editing comments
        // console.log(values);

        const updatedComments = [...comments];
        updatedComments[values.editingId] = values.comment;
        setCommentsData(updatedComments);
        // const updatedComments = comments.map((comment) =>
        //   comment.id === values.editingId
        //     ? { ...comment, comment: values.comment }
        //     : comment
        // );
        // comments
        // setProductList((prevState) => ({
        //   ...prevState,
        //   comments: updatedComments,
        // }));
        values.editingId = null;
      } else {
        if (values.comment.trim() !== "") {
          setCommentsData([...commentsData, values.comment]);
          // setNewComment('');
        }
        // const data = {
        //   id: productList.comments.length + 1,
        //   comment: values.comment,
        // };

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
      // comments = commentsData;
      formik.setFieldValue("comment", "");
    } catch (error) {
      console.error(error);
    }
  }

  // remove
  const removeComment = (commentId) => {
    // const updatedComments = comments.filter(
    //   (comment) => comment.id !== commentId
    // );
    // setProductList((prevState) => ({
    //   ...prevState,
    //   comments: updatedComments,
    // }));
    // console.log(commentId);
    const filteredComments = commentsData.filter((_, i) => {
      // console.log(i, commentId);
      return i !== commentId;
    });
    // console.log(filteredComments);
    setCommentsData(filteredComments);
  };

  //edit
  const editComment = (id, text) => {
    formik.setFieldValue("comment", text);
    formik.setFieldValue("editingId", id);
  };

  useEffect(() => {
    comments = commentsData;
    handleProductChange(poIndex, "comments", commentsData);
    // console.log(comments);
  }, [commentsData]);

  // console.log(comments);

  return (
    <>
      <div
        ref={move}
        className="flex flex-col items-center justify-center h-full  absolute top-0 left-0 w-full bg-[#00000080] z-10 "
      >
        <div className=" w-full md:w-[70vh] p-5 bg-white border rounded-lg">
          <h1 className="text-xl text-center mb-8 font-bold"> {header}</h1>
          <div className="relative">
            <InputField
              label={"Add Comments"}
              name={"comment"}
              type="text"
              value={formik.values.comment}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.comment && formik.errors.comment}
              placeholder={"Enter Comment"}
              labelColor={"bg-white"}
            />
            <PiPaperPlaneRightFill
              className="text-blue text-3xl absolute md:top-[1.5vh] md:right-[1vh] cursor-pointer"
              onClick={() => handleSubmit(formik.values)}
            />
            <RxCrossCircled
              className=" text-3xl absolute md:top-[-72px] md:right-[-1vh] cursor-pointer"
              onClick={() => setTogglePopup(false)}
            />
            <div className="py-2 px-4 text-xs">{date}</div>
            <div>
              <ul className="w-full overflow-auto">
                {commentsData.length > 0 ? (
                  commentsData.map((comment, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between px-4 py-2 mb-2 border-b"
                    >
                      <span className="text-sm flex-grow text-lightGray">
                        {comment}
                      </span>
                      <div className="flex gap-5 ">
                        <MdModeEdit
                          className="text-xl text-black cursor-pointer"
                          onClick={() => editComment(index, comment)}
                        />
                        <AiFillDelete
                          className="text-2xl text-red-500 cursor-pointer"
                          onClick={() => removeComment(index)}
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
            </div>
            {btnText?.length > 0 && (
              <div className="w-full flex justify-center ">
                <button
                  type="submit"
                  className="px-8 py-2 outline bg-blue text-white rounded-md outline-2 hover:opacity-90 outline-[#CCCCCC] font-semibold "
                  onClick={() => {
                    setTogglePopup(false);
                  }}
                >
                  {btnText}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentBox;
