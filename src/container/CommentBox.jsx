/* eslint-disable react/prop-types */
import {useFormik} from 'formik';
import * as Yup from 'yup';
import InputField from './InputField';
import moment from 'moment/moment';
import {PiPaperPlaneRightFill} from 'react-icons/pi';
import {MdModeEdit} from 'react-icons/md';
import {AiFillDelete} from 'react-icons/ai';
import {RxCrossCircled} from 'react-icons/rx';
import {userGloabalContext} from '../UserContext';

const CommentBox = ({setTogglePopup, move}) => {
	const {productList, setProductList} = userGloabalContext();

	const initialValues = {comment: '', editingId: null};

	const date = moment().format('Do MMM YYYY');

	const validationSchema = Yup.object().shape({
		comment: Yup.string().required('comment is required'),
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
				console.log(values);
				const updatedComments = productList.comments.map((comment) =>
					comment.id === values.editingId
						? {...comment, comment: values.comment}
						: comment
				);
				setProductList((prevState) => ({
					...prevState,
					comments: updatedComments,
				}));

				values.editingId = null;
			} else {
				const data = {
					id: productList.comments.length + 1,
					comment: values.comment,
				};

				setProductList((currentProductList) => {
					// Check if comments is an array, if not, default to an empty array
					const commentsArray = Array.isArray(currentProductList.comments)
						? currentProductList.comments
						: [];
					return {
						...currentProductList,
						comments: [...commentsArray, data],
					};
				});
			}

			formik.setFieldValue('comment', '');
		} catch (error) {
			console.error(error);
		}
	}

	// remove
	const removeComment = (commentId) => {
		const updatedComments = productList.comments.filter(
			(comment) => comment.id !== commentId
		);
		setProductList((prevState) => ({...prevState, comments: updatedComments}));
	};

	//edit
	const editComment = (id, text) => {
		formik.setFieldValue('comment', text);
		formik.setFieldValue('editingId', id);
	};

	return (
		<>
			<div
				ref={move}
				className="flex flex-col items-center justify-center h-full  absolute top-0 left-0 w-full bg-[#00000080] z-10 "
			>
				<div className=" w-full md:w-[70vh] p-5 bg-white border rounded-lg">
					<h1 className="text-xl text-center mb-8 font-bold"> Comments</h1>
					<div className="relative">
						<InputField
							label={'Add Comments'}
							name={'comment'}
							type="text"
							value={formik.values.comment}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.comment && formik.errors.comment}
							placeholder={'Enter Comment'}
							labelColor={'bg-white'}
						/>
						<PiPaperPlaneRightFill
							className="text-blue text-3xl absolute md:top-[1.5vh] md:right-[1vh] cursor-pointer"
							onClick={() => handleSubmit(formik.values)}
						/>
						<RxCrossCircled
							className=" text-3xl absolute md:top-[-9.5vh] md:right-[-1vh] cursor-pointer"
							onClick={() => setTogglePopup(false)}
						/>
						<div className="py-2 px-4 text-xs">{date}</div>
						<div>
							<ul className="w-full overflow-auto">
								{productList.comments.length > 0 ? (
									productList.comments.map((comment) => (
										<li
											key={comment.id}
											className="flex items-center justify-between px-4 py-2 mb-2 border-b"
										>
											<span className="text-sm flex-grow text-lightGray">
												{comment.comment}
											</span>
											<div className="flex gap-5 ">
												<MdModeEdit
													className="text-xl text-black cursor-pointer"
													onClick={() =>
														editComment(comment.id, comment.comment)
													}
												/>
												<AiFillDelete
													className="text-2xl text-red-500 cursor-pointer"
													onClick={() => removeComment(comment.id)}
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
					</div>
				</div>
			</div>
		</>
	);
};

export default CommentBox;
