/* eslint-disable react/prop-types */
import {useFormik} from 'formik';
import * as Yup from 'yup';
import DropZone from '../Components/DropZone';
import {RxCrossCircled} from 'react-icons/rx';
import {useState} from 'react';

const UploadImages = ({popup, setPopup, imagesFiles, setImagesFiles}) => {
	const ImageUploadSchema = Yup.object().shape({
		backImage: Yup.mixed().required('A back image is required'),
		frontImage: Yup.mixed().required('A front image is required'),
		careLabel: Yup.mixed().required('A back image is required'),
		sizeLabel: Yup.mixed().required('A front image is required'),
		// Add additional validation rules for other fields
	});
	const [images, setImages] = useState({
		backImage: undefined,
		frontImage: undefined,
		careLabel: undefined,
		sizeLabel: undefined,
	});

	const initialValues = {
		backImage: undefined,
		frontImage: undefined,
		careLabel: undefined,
		sizeLabel: undefined,
	};
	//  formik is not used remove later
	const formik = useFormik({
		initialValues,
		onSubmit: (values) => handleSubmit(values),
		ImageUploadSchema,
	});
	const handleDrop = (item) => {
		try {
			console.log(item);

			setImagesFiles([...imagesFiles, item]);
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmit = async () => {};
	console.log(imagesFiles);

	return (
		<>
			<div className="fixed inset-0 bg-[#00000080] h-screen w-screen pt-[100px]">
				<div className=" relative bg-white w-[70vw] h-[80vh] m-auto  bg-[#00000080]  rounded-2xl">
					<form className="h-full flex flex-col p-5 relative">
						<h1 className="text-center mb-5 ">Upload Images</h1>

						<div className="flex-1 ">
							<div className="grid grid-cols-4 gap-5">
								<div>
									<h3 className=" text-sm text-center">Back</h3>
									<div className="border-dashed border-2 border-lightGray ">
										<DropZone
											onDrop={handleDrop}
											multiple={false}
											message={'Drag To Upload Image'}
											name=""
										/>
									</div>
									{formik.values.backImage && (
										<img src={formik.values.backImage[0]} alt="" />
									)}
								</div>
								<div>
									<h3 className="text-sm text-center">Front</h3>
									<div className="border-dashed border-2 border-lightGray ">
										<DropZone
											onDrop={handleDrop}
											multiple={false}
											message={'Drag To Upload Image'}
										/>
									</div>
								</div>
								<div>
									<h3 className="text-sm text-center">Care Lable</h3>
									<div className="border-dashed border-2 border-lightGray ">
										<DropZone
											onDrop={handleDrop}
											multiple={false}
											message={'Drag To Upload Image'}
										/>
									</div>
								</div>
								<div>
									<h3 className="text-sm text-center">Size Lable</h3>
									<div className="border-dashed border-2 border-lightGray ">
										<DropZone
											onDrop={handleDrop}
											multiple={false}
											message={'Drag To Upload Image'}
										/>
									</div>
								</div>
							</div>
						</div>

						<div className="flex justify-center ">
							<button
								type="button"
								className="border text-blue border-blue rounded py-2 px-5"
								onClick={() => {
									setImagesFiles([]);
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
					</form>
					<RxCrossCircled
						className=" text-3xl absolute md:top-[1vh] md:right-[1vh] cursor-pointer "
						onClick={() => {
							setImagesFiles([...imagesFiles]);
							setPopup(!popup);
						}}
					/>
				</div>
			</div>
		</>
	);
};

export default UploadImages;
