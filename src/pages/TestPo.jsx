/** @format */

// InspectionForm.jsx
import React, {useState} from 'react';
import {BiArrowBack} from 'react-icons/bi';

import {useNavigate} from 'react-router-dom';

import {useFormik} from 'formik';
import * as Yup from 'yup';
// import {useGetFetch, useCreateFetch} from '../api/api';
import DropZone from '../Components/DropZone';
// import Prompt from '../DasiyUIComponents/Prompt';
// import Datepicker from '../Components/Datepicker';
// import moment from 'moment/moment';
// import {formatDate} from '../Utils/formatDate';
import Products from '../container/Products';
import InputField from '../container/InputField';
import addUser from '../assets/noun-add-account-6047901 1.svg';
import {HiOutlineCalendar} from 'react-icons/hi';
import {FaPlus} from 'react-icons/fa';
import {AiOutlineSearch} from 'react-icons/ai';
import Preview from '../container/Preview';
import img from '../assets/sara-kurfess-ltE8bDLjX9E-unsplash.jpeg';

/**
 * A form component for Purchase data.
 *
 * @returns {JSX.Element} The PurchaseOrderForm component.
 */

function TestPo() {
	const [PurchaseOrderFiles, SetPurchaseOrderFiles] = useState(null);
	// const [inspectionDate, setInspectionDate] = useState(null);
	// const [ProductOrders, setProductOrders] = useState();
	const [showPurchaseOrder, setShowPurchaseOrder] = useState(false);
	const photos = [{title: 'image', img}];

	// console.log(PurchaseOrderFiles, showPurchaseOrder);

	const navigate = useNavigate();

	const initialValues = {
		nameOfBuyer: '',
		addOfBuyer: '',
		nameOfVendor: '',
		addOfVendor: '',
		shiptoName: '',
		shiptoAdd: '',
		shipVia: '',
		shipDate: '',
		totalCarton: '',
		inv_number: '',
		assignPeople: '',
		slotOfProducts: [],
	};
	const validationSchema = Yup.object().shape({
		nameOfBuyer: Yup.string().required('Name of Buyer is required'),
		addOfBuyer: Yup.string().required('Address of Buyer is required'),
		nameOfFactory: Yup.string().required('Name of Factory is required'),
		addOfFactory: Yup.string().required('Address of Factory is required'),
		totalCarton: Yup.number()
			.typeError('Total Carton must be a number')
			.required('Total Carton is required')
			.positive('Total Carton must be a positive number'),
		inv_number: Yup.string().required('Invoice Number is required'),
		// slotOfInspection: Add validation for the array if needed
	});

	const formik = useFormik({
		initialValues,
		onSubmit: (values) => handleSubmit(values),
		validationSchema,
	});

	// async function handleSubmit(values) {

	// }
	const handleSubmit = (values) => {
		try {
			console.log(values);
		} catch (error) {
			console.error(error);
		}
	};

	// const addSlotOfProduct = () => {
	// 	try {
	// 		formik.setFieldValue('slotOfProducts', [
	// 			...formik.values.slotOfProducts,
	// 			'',
	// 		]);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };
	// const addAssignPeople = () => {
	// 	try {
	// 		formik.setFieldValue('assignPeople', [...formik.values.assignPeople, '']);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	const handleBack = () => {
		try {
			navigate(-1);
		} catch (error) {
			console.error(error);
		}
	};

	if (showPurchaseOrder) {
		return (
			<Preview
				photos={photos}
				check={showPurchaseOrder}
				onChange={setShowPurchaseOrder}
			/>
		);
	}

	return (
		<div className="bg-white py-4">
			<div className="grid gap-8 w-[95%] mx-auto">
				<div>
					<button
						onClick={handleBack}
						className="flex font-medium gap-4 items-center"
					>
						<BiArrowBack size={28} /> Purchase Order
					</button>
				</div>

				<form
					className="flex-cols gap-10  w-full"
					onSubmit={formik.handleSubmit}
				>
					<div className=" relative h-[40vh] rounded-md overflow-hidden flex mb-11">
						<DropZone
							onDrop={SetPurchaseOrderFiles}
							multiple={true}
							message={'Upload Purchase Order'}
						/>
					</div>
					<div>
						<h1 className="text-xl font-bold mb-6">Buyers</h1>
						<div className="flex gap-5 ">
							<div className="flex-1">
								<InputField
									label="Name"
									name="nameOfBuyer"
									type="text"
									value={formik.values.nameOfBuyer}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={
										formik.touched.nameOfBuyer && formik.errors.nameOfBuyer
									}
									placeholder={'Name Of Buyer'}
									labelColor={'bg-white'}
								/>
							</div>

							<div className="flex-1">
								<InputField
									label="Address"
									name="addOfBuyer"
									type="text"
									value={formik.values.addOfBuyer}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={formik.touched.addOfBuyer && formik.errors.addOfBuyer}
									placeholder={'Address Of Buyer'}
									labelColor={'bg-white'}
								/>
							</div>
						</div>
					</div>
					<div>
						<h1 className="text-xl font-bold mb-6">Vendors</h1>
						<div className="flex gap-5 ">
							<div className="flex-1">
								<InputField
									label="Name"
									name="nameOfVendor"
									type="text"
									value={formik.values.nameOfVendor}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={
										formik.touched.nameOfVendor && formik.errors.nameOfVendor
									}
									placeholder={'Name Of Vendor'}
									labelColor={'bg-white'}
								/>
							</div>

							<div className="flex-1">
								<InputField
									label="Address"
									name="addOfVendor"
									type="text"
									value={formik.values.addOfVendor}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={
										formik.touched.addOfVendor && formik.errors.addOfVendor
									}
									placeholder={'Address Of Vendor'}
									labelColor={'bg-white'}
								/>
							</div>
						</div>
					</div>
					<div>
						<h1 className="text-xl font-bold mb-6">Ship To</h1>
						<div className="grid gap-5 md:grid-cols-2 ">
							<div className="flex-1">
								<InputField
									label="Name"
									name="shiptoName"
									type="text"
									value={formik.values.shiptoName}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={formik.touched.shiptoName && formik.errors.shiptoName}
									placeholder={'Zig Zag'}
									labelColor={'bg-white'}
								/>
							</div>

							<div className="flex-1">
								<InputField
									label="Complete Address"
									name="shiptoAdd"
									type="text"
									value={formik.values.shiptoAdd}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={formik.touched.shiptoAdd && formik.errors.shiptoAdd}
									placeholder={'D 298 Sector 63 Uttar Pradesha Noida'}
									labelColor={'bg-white'}
								/>
							</div>
							<div className="flex-1">
								<InputField
									label="Ship via"
									name="shipVia"
									type="text"
									value={formik.values.shipVia}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={formik.touched.shipVia && formik.errors.shipVia}
									placeholder={'Sea'}
									labelColor={'bg-white'}
								/>
							</div>

							<div className="flex-1 relative">
								<InputField
									label="Shipping Date"
									name="shipDate"
									type="text"
									value={formik.values.shipDate}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={formik.touched.shipDate && formik.errors.shipDate}
									placeholder={'09 Jan 2024'}
									labelColor={'bg-white'}
								/>
								<HiOutlineCalendar className=" absolute top-[18%] right-[3%] h-8 w-8 cursor-pointer" />
							</div>
						</div>
					</div>
					<div>
						<h1 className="font-bold text-xl mb-6 ">
							Assign People of Interest
						</h1>
						<div className=" w-full md:w-1/2 relative">
							<InputField
								label="Assign People"
								name="assignPeople"
								type="text"
								value={formik.values.assignPeople}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={
									formik.touched.assignPeople && formik.errors.assignPeople
								}
								placeholder={''}
								labelColor={'bg-white'}
							/>

							<img
								src={addUser}
								className="absolute top-[15%] right-[3%]"
								alt=""
							/>
						</div>
					</div>

					<div className="mb-4">
						<h1 className="text-xl font-bold mb-4">Products</h1>
						<Products />
					</div>

					<button
						type="button"
						className=" flex justify-start items-center cursor-pointer pl-6 w-full gap-1 py-3 bg-[#1B9BEF1A] mb-4 "
						// onClick={() => setPopup(!popup)}
					>
						<FaPlus className="text-blue font-bold text-xl" />
						<span className="text-[#1B9BEF] text-xl font-bold ">
							{'Add Another Products'}
						</span>
					</button>
					<div className="flex justify-end gap-2 mb-6  ">
						{/* <button
							type="button"
							className="py-2 rounded-md px-11 border-2 border-[#1B9BEF] text-[#1B9BEF] font-bold "
						>
							Save Draft
						</button> */}
						<button
							type="submit"
							className="py-2 rounded-md px-11 bg-gray-300 font-bold text-white"
							onClick={() => console.log('test')}
						>
							Publish
						</button>
					</div>
				</form>
				<button
					className="bg-blue flex gap-2 items-center absolute right-[4.5vh] top-[21vh] py-2 px-4 rounded text-white"
					onClick={() => setShowPurchaseOrder(true)}
				>
					<AiOutlineSearch className="text-white text-2xl" />
					Preview
				</button>
			</div>
		</div>
	);
}

export default TestPo;
