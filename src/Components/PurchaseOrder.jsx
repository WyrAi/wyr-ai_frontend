/** @format */

// InspectionForm.jsx
import React, {useEffect, useState} from 'react';
import {BiArrowBack} from 'react-icons/bi';

import {useNavigate} from 'react-router-dom';

import {useFormik} from 'formik';
import * as Yup from 'yup';
// import {useGetFetch, useCreateFetch} from '../api/api';
import DropZone from '../Components/DropZone';
import Products from '../container/Products';
import InputField from '../container/InputField';
import addUser from '../assets/noun-add-account-6047901 1.svg';
import {HiOutlineCalendar} from 'react-icons/hi';
import {FaPlus} from 'react-icons/fa';
import {AiOutlineSearch} from 'react-icons/ai';
import Preview from '../container/Preview';
import img from '../assets/sara-kurfess-ltE8bDLjX9E-unsplash.jpeg';
import {userGloabalContext} from '../UserContext';
import UploadImages from '../container/UploadImages';
import Datepicker from './DatepickerComponent';
import gps from '../assets/ion_location-outline.svg';
import axios from 'axios';

// import DropdownSelect from '../container/DropdownSelect';

/**
 * A form component for Purchase data.
 *
 * @returns {JSX.Element} The PurchaseOrderForm component.
 */

function PurchaseOrder() {
	const {setPopUpload, popUpload, userInformation} = userGloabalContext();

	const [purchaseDoc, setPurchaseDoc] = useState(null);
	const [showPurchaseOrder, setShowPurchaseOrder] = useState(false);
	const [buyer, setBuyer] = useState([]);
	const [vendor, setVendor] = useState([]);
	const [people, setPeople] = useState([]);

	const [slotOfProducts, setSlotOfProducts] = useState([]);
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);

	const openCalendar = () => {
		setIsCalendarOpen(true);
	};

	const [popup, setPopup] = useState({
		nameOfBuyer: false,
		addOfBuyer: false,
		nameOfVendor: false,
		addOfVendor: false,
		assignPeople: false,
	});
	// const [buyerPopup, setBuyerPopup] = useState(false);
	// const [vendorPopup, setVendorPopup] = useState(false);
	const [count, setCount] = useState(1);

	const {productList, imagesFiles, setImagesFiles} = userGloabalContext();

	const validationSchema = Yup.object().shape({
		poNumber: Yup.number().required('PO Number is required'),
		nameOfBuyer: Yup.string().required('Name of Buyer is required'),
		addOfBuyer: Yup.string().required('Address of Buyer is required'),
		nameOfVendor: Yup.string().required('Name of Factory is required'),
		addOfVendor: Yup.string().required('Address of Factory is required'),
		shiptoName: Yup.string().required('Shipping to is required'),
		shiptoAdd: Yup.string().required('Shipping Address is required'),
		shipVia: Yup.string().required('Mode of Shipping is required'),
		shipDate: Yup.string().required('Date of Shipping is required'),
		totalCarton: Yup.number()
			.typeError('Total Carton must be a number')
			.required('Total Carton is required')
			.positive('Total Carton must be a positive number'),
		assignPeople: Yup.mixed().required('Add People of Interest'),
		inv_number: Yup.string().required('Invoice Number is required'),
		// slotOfInspection: Add validation for the array if needed
	});

	const initialValues = {
		poNumber: null,
		nameOfBuyer: '',
		addOfBuyer: '',
		nameOfVendor: '',
		addOfVendor: '',
		shiptoName: '',
		shiptoAdd: '',
		shipVia: '',
		shipDate: new Date(),
		totalCarton: '',
		inv_number: '',
		assignPeople: '',
	};
	const formik = useFormik({
		initialValues,
		onSubmit: (values) => handleSubmit(values),
		validationSchema,
	});
	const {values} = formik;
	useEffect(() => {
		if (values.nameOfBuyer && values.nameOfVendor) {
			fetchpeople();
		} else {
			true;
		}
	}, [values.nameOfBuyer, values.nameOfVendor]);

	useEffect(() => {
		getUser();
	}, []);

	// console.log(packingListFiles, showPurchaseOrder);
	// console.log(userInformation);

	const navigate = useNavigate();

	const getUser = async () => {
		const {data} = await axios.get(
			import.meta.env.VITE_BASE_URL + '/api/getAllSuperAdmin'
		);
		console.log(data);
		setBuyer(data.buyer);
		setVendor([...data.factory]);
	};

	// const getPeopleInterest = async () => {

	// 	const {data} = await axios.get(
	// 		import.meta.env.VITE_BASE_URL + `  /api/getAllEmployess/${id}/`
	// 	);
	// 	console.log(data);
	// 	setPeople(data);
	// };

	// console.log('formik', formik);
	//  there is options of creating a single 'productList' and 'slotOfProducts' change according to its
	// console.log(slotOfProducts);
	async function handleSubmit(values) {
		console.log(slotOfProducts.length);
		let requestBody = {};
		if (slotOfProducts.length > 0) {
			requestBody = {
				purchaseDoc,
				...formik.values,
				products: [...slotOfProducts],
			};
		} else {
			requestBody = {
				purchaseDoc,
				...formik.values,
				products: [{...productList, images: imagesFiles}],
			};
		}
		console.log(requestBody);

		const resp = await fetch(
			import.meta.env.VITE_BASE_URL + '/api/purchaseOrder',
			{
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(requestBody),
			}
		);
		console.log(resp);
		if (resp.ok) {
			navigate(-1);
		}
	}

	const addSlotOfProduct = () => {
		try {
			setSlotOfProducts([
				...slotOfProducts,
				{...productList, images: imagesFiles},
			]);
		} catch (error) {
			console.log(error);
		}
	};
	const addAssignPeople = () => {
		try {
			formik.setFieldValue('assignPeople', [...formik.values.assignPeople, '']);
		} catch (error) {
			console.log(error);
		}
	};

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
				photos={purchaseDoc}
				check={showPurchaseOrder}
				onChange={setShowPurchaseOrder}
			/>
		);
	}

	const handleClick = (e) => {
		console.log(e.target.name);
		setPopup({...popup, [e.target.name]: !popup[e.target.name]});
	};

	const handleChange = (e) => {
		formik.handleChange(e);
	};
	const fetchpeople = async () => {
		const {data} = await axios.get(
			import.meta.env.VITE_BASE_URL + `  /api/getAllEmployess/${id}/`
		);
		console.log(data);
		setPeople(data);
	};

	const DropDown = ({data, name, address}) => {
		console.log(data);
		return (
			<>
				<div className="absolute top-[60px] shadow mt-2 bg-white w-full z-50  ">
					<ul className="ml-6 h-[130px] overflow-x-auto cursor-pointer">
						{data &&
							data?.map((item, index) => {
								const intials = item.name.charAt(0).toUpperCase();
								return (
									<li
										key={index}
										className="py-2 flex items-center gap-4 mr-2 border-b"
										onClick={() => {
											formik.setFieldValue(name, item.name);
											formik.setFieldValue(address, item.address);
											setPopup({...popup, [name]: !popup[name]});
										}}
									>
										{/* {item} */}
										<span className="w-6 h-6 bg-blue flex justify-center items-center rounded-full">
											{intials}
										</span>
										<span className="flex-1 text-xs">{item.name}</span>
										<span className="flex gap-2 items-center">
											<img src={gps} alt="gps" className="w-[16px] h-[16px]" />
											<span className="text-[10px]">City</span>
										</span>
									</li>
								);
							})}
					</ul>
				</div>
			</>
		);
	};

	return (
		<>
			<div className=" h-full w-[95%] bg-white py-4 mx-auto">
				<div className='h-[3%] mb-5'>
					<button
						type="button"
						onClick={handleBack}
						className="flex font-medium gap-4 items-center"
					>
						<BiArrowBack size={28} /> Purchase Order
					</button>
				</div>
				<form
					onSubmit={formik.handleSubmit}
					className="flex-cols gap-10  w-full h-[45%] px-5 overflow-y-auto  "
				>
					<div className=" relative z-10 h-[500px] rounded-md  flex mb-11 border-dashed border-2 border-[#666666]">
						<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
							<DropZone
								onDrop={setPurchaseDoc}
								multiple={true}
								message={'Upload Purchase Order'}
							/>
						</div>
						{purchaseDoc && (
							<img
								src={purchaseDoc}
								alt="Preview"
								className="w-full h-full  "
							/>
						)}
					</div>
					<div className="w-1/2">
						<h1 className="text-xl font-bold mb-5">PO Number</h1>
						<InputField
							label="PO Number"
							name="poNumber"
							type="text"
							value={formik.values.poNumber}
							onChange={handleChange}
							// handleClick={handleClick}
							onBlur={formik.handleBlur}
							error={formik.touched.poNumber && formik.errors.poNumber}
							placeholder={'Enter PO Number'}
							labelColor={'bg-white'}
						/>
					</div>
					<div>
						<h1 className="text-xl font-bold mb-6">Buyers</h1>
						<div className="flex gap-5 ">
							<div className="relative flex-1 cursor-pointer">
								<InputField
									label="Name"
									name="nameOfBuyer"
									type="text"
									value={formik.values.nameOfBuyer}
									onChange={handleChange}
									handleClick={handleClick}
									onBlur={formik.handleBlur}
									error={
										formik.touched.nameOfBuyer && formik.errors.nameOfBuyer
									}
									placeholder={'Name Of Buyer'}
									labelColor={'bg-white'}
								/>

								{popup.nameOfBuyer && (
									<DropDown
										data={buyer}
										name={'nameOfBuyer'}
										address={'addOfBuyer'}
									/>
								)}
							</div>

							<div className="relative flex-1">
								<InputField
									label="Address"
									name="addOfBuyer"
									type="text"
									value={formik.values.addOfBuyer}
									onChange={handleChange}
									handleClick={handleClick}
									onBlur={formik.handleBlur}
									error={formik.touched.addOfBuyer && formik.errors.addOfBuyer}
									placeholder={'Address Of Buyer'}
									labelColor={'bg-white'}
								/>
								{/* {popup.addOfBuyer && (
									<DropDown data={add} name={'addOfBuyer'} />
								)} */}
							</div>
						</div>
					</div>
					<div>
						<h1 className="text-xl font-bold mb-6">Vendors</h1>
						<div className=" flex gap-5 ">
							<div className=" relative flex-1">
								<InputField
									label="Name"
									name="nameOfVendor"
									type="text"
									value={formik.values.nameOfVendor}
									onChange={handleChange}
									handleClick={handleClick}
									onBlur={formik.handleBlur}
									error={
										formik.touched.nameOfVendor && formik.errors.nameOfVendor
									}
									placeholder={'Name Of Vendor'}
									labelColor={'bg-white'}
								/>
								{popup.nameOfVendor && (
									<DropDown
										data={vendor}
										name={'nameOfVendor'}
										address={'addOfVendor'}
									/>
								)}
							</div>

							<div className="flex-1">
								<InputField
									label="Address"
									name="addOfVendor"
									type="text"
									value={formik.values.addOfVendor}
									onChange={handleChange}
									handleClick={handleClick}
									onBlur={formik.handleBlur}
									error={
										formik.touched.addOfVendor && formik.errors.addOfVendor
									}
									placeholder={'Address Of Vendor'}
									labelColor={'bg-white'}
								/>
								{/* {popup.addOfVendor && (
									<DropDown data={add} name={'addOfVendor'} />
								)} */}
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
								<Datepicker
									selectedDate={formik.values.shipDate}
									setSelectedDate={formik}
									name={'shipDate'}
									className={
										'form-input border border-gray-400 mt-1 pl-4 py-4 pr-10  rounded-md w-full outline-none'
									}
									onClickOutside={() => setIsCalendarOpen(false)} // Close the calendar when clicking outside
									calendarClassName={isCalendarOpen ? 'open' : ''}
								/>
								<label
									className={`block absolute top-[-24%]  left-[8%] md:top-[-25%] md:left-[10%] text-gray-500  tracking-tighter  py-1 px-3  ${'text-base'} mb-2 bg-white`}
									htmlFor="name"
								>
									Ship Date
								</label>

								<HiOutlineCalendar
									className=" absolute top-[18%] right-[3%] h-8 w-8 cursor-pointer"
									onClick={openCalendar}
								/>
							</div>
						</div>
					</div>
					<div>
						<h1 className="font-bold text-xl mb-6 ">
							Assign People of Interest
						</h1>
						<div className="relative w-full md:w-1/2 ">
							<div className="relative">
								<InputField
									label="Assign People"
									name="assignPeople"
									type="text"
									value={formik.values.assignPeople}
									onChange={handleChange}
									handleClick={handleClick}
									onBlur={formik.handleBlur}
									error={
										formik.touched.assignPeople && formik.errors.assignPeople
									}
									placeholder={''}
									labelColor={'bg-white'}
									// disable={true}
								/>
								<img
									src={addUser}
									className="absolute top-[15%] right-[3%] cursor-pointer"
									alt=""
									onClick={() =>
										setPopup({
											...popup,
											['assignPeople']: !popup['assignPeople'],
										})
									}
								/>
							</div>
							{popup.assignPeople && (
								<DropDown data={name} name={'assignPeople'} />
							)}
						</div>
					</div>

					<div className="mb-4">
						<h1 className="text-xl font-bold mb-4">Products</h1>
						{[...Array(count)].map((_, index) => (
							<Products key={index} />
							// <CounterComponent key={index} />
						))}
					</div>

					<button
						type="button"
						className=" flex justify-start items-center cursor-pointer pl-6 w-full gap-1 py-3 bg-[#1B9BEF1A] mb-4 "
						onClick={() => {
							addSlotOfProduct();
							setCount((prevCount) => prevCount + 1);
						}}
					>
						<FaPlus className="text-blue font-bold text-xl" />
						<span className="text-[#1B9BEF] text-xl font-bold ">
							{'Add Another Products'}
						</span>
					</button>
					<div className="flex justify-end gap-2 mb-6  ">
						<button
							type="button"
							className="py-2 rounded-md px-11 border-2 border-[#1B9BEF] text-[#1B9BEF] font-bold "
						>
							Save Draft
						</button>
						<button
							type="submit"
							className="py-2 rounded-md px-11 bg-blue font-bold text-white"
							onClick={() => {
								addSlotOfProduct();
								handleSubmit();
							}}
						>
							Publish
						</button>
					</div>
					{purchaseDoc && (
						<button
							type="button"
							className="bg-blue flex gap-2 items-center z-10 absolute right-[4.5vh] top-[21vh] py-2 px-4 rounded text-white"
							onClick={() => setShowPurchaseOrder(true)}
						>
							<AiOutlineSearch className="text-white text-2xl" />
							Preview
						</button>
					)}
				</form>
			</div>
			{popUpload && (
				<UploadImages
					popup={popUpload}
					setPopup={setPopUpload}
					imagesFiles={imagesFiles}
					setImagesFiles={setImagesFiles}
				/>
			)}

			{purchaseDoc && (
				<img
					title="PDF Viewer"
					src={purchaseDoc}
					width="600"
					height="400"
				></img>
			)}
		</>
	);
}

export default PurchaseOrder;
