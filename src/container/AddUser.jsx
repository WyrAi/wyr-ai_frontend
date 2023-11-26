import {useEffect, useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import profile from '../assets/userProfile.svg';
import leftarrow from '../assets/ion_arrow-back-outline.svg';
import InputField from './InputField';
import DropdownSelect from './DropdownSelect';

import PopupRoles from './PopupRoles';
import camera from '../assets/noun-camera-6228850 1.svg';
import PopupBranch from './PopupBranch';
import {Link, useNavigate} from 'react-router-dom';
import {userGloabalContext} from '../UserContext';
import DropdownSelectRole from './DropdownSelectRole';

const AddUser = () => {
	// Assuming you want to store the form data in a state

	const {
		handleBranchChange,
		formData,
		branchData,
		setBranchData,
		setFormData,
		clearFieldData,
		setIsEditMode,
		isEditMode,
		editData,
		roleData,
		fetchData,
		userInformation,
	} = userGloabalContext();
	const navigate = useNavigate();

	const [photos, setPhotos] = useState(null);
	const [popupRole, setPopupRole] = useState(false);
	const [popupBranch, setPopupBranch] = useState(false);

	const handleEscKeyPress = (event) => {
		if (event.key === 'Escape') {
			// Do something when the Esc key is pressed
			setPopupBranch(false);
			setPopupRole(false);
		}
	};

	useEffect(() => {
		document.addEventListener('keydown', handleEscKeyPress);

		// Cleanup: remove event listener when the component unmounts
		return () => {
			document.removeEventListener('keydown', handleEscKeyPress);
		};
	}, []); // The empty dependency array ensures that the effect runs only once when the component mounts

	
	const initialValues = {
		name: formData.name,
		email: formData.email,
		assignRole: formData.assignRole,
		employeeID: formData.employeeID,
		phone: formData.phone,
		addOfficeBranch: formData.addOfficeBranch,
	};

	const userSchema = Yup.object().shape({
		name: Yup.string().required('Name is required'),
		email: Yup.string().email('Invalid email').required('Email is required'),
		assignRole: Yup.string().required('Role is required'),
		employeeID: Yup.string().required('Employee ID is required'),
		phone: Yup.string()
			.matches(/^[0-9]+$/, 'Phone number is not valid')
			.required('Phone is required'),
		addOfficeBranch: Yup.string().required('Branch is Required'),
	});

	const formik = useFormik({
		initialValues,
		onSubmit: (values) => handleSubmit(values),
		validationSchema: userSchema,
	});

	// if (isEditMode) {
	// 	formik.values.email = formData.email;
	// 	formik.values.name = formData.name;
	// 	formik.values.phone = formData.phone;
	// 	formik.values.employeeID = formData.employeeId;
	// 	formik.values.assignRole = formData.role;
	// 	formik.values.addOfficeBranch = formData.officeBranch;

	// 	console.log(formik.values.name);
	// }
	// const handleChange = (e) => {
	// 	this.setState({user: {...this.state.user, name: event.target.value}});
	// 	// Then call Formik's handleChange
	// 	formikProps.handleChange(event);
	// };

	// 	console.log(e.target.name, e.target.getAttribute('data-name'));
	// 	setFormData({...formData, [e.target.name]: e.target.value});
	// 	console.log(formData);
	// };
	// const handleChangeSelect = (name, value) => {
	// 	// const {name, value} = e.target.elements.submitButton;
	// 	// console.log(e.target.name, e.target.getAttribute('data-name'));
	// 	setFormData({
	// 		...formData,
	// 		[`${name}`]: value,
	// 	});

	// 	console.log(formData);
	// };

	function handleFiles(e) {
		// Actions to handle the file input change

		const imgFile = e.target.files[0];
		const reader = new FileReader();
		reader.onload = (e) => {
			// Use reader.result
			// console.log(e.target.result);
			setPhotos([e.target.result]);
			// onDrop(e.target.result);
		};
		reader.readAsDataURL(imgFile);
		// console.log(imgFile);
	}
	
	const handleSubmit = async (values) => {
		 const id = userInformation?.companyId?._id;
		console.log()
		console.log(userInformation)
		const branchId = branchData.find(
			(item) => item.branchName === values.addOfficeBranch
		)._id;
		const roleId = roleData.find((item) => item.name === values.assignRole)._id;
		const role = userInformation?.UserInfo?.role;

		// const data = {...values, assignRole: roleId, addOfficeBranch: branchId};
		// const file = photos;
		// console.log(file);

		// const id = editData[0]?._id;
		// console.log(editData, id);
		// const data = {
		// 	name: formData.name,
		// 	employeeId: formData.employeeId,
		// 	email: formData.email,
		// 	phone: formData.phone,
		// 	role: formData.role,
		// 	officeBranch: formData.officeBranch,
		// 	profileImagePath: photos,
		// };

		if (isEditMode) {
			// /api/registerEmployee
			const id = editData[0]?._id;
			const resp = await fetch(
				`http://localhost:5000/api/updateEmploye/${id}`,
				{
					method: 'Put',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(values),
				}
			);
			if (resp.ok) {
				fetchData();
				setIsEditMode(!isEditMode);
				clearFieldData();
				navigate('/user');
			}
		} else {
			const token = localStorage.getItem('token');
			const resp = await fetch(
				import.meta.env.VITE_BASE_URL + '/api/registerEmployee',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						authtok: token,
					},
					body: JSON.stringify({
						...values,
						role: roleId,
						officeBranch: branchId,
						profileImage: photos,
						companyId: id,
				
					}),
				}
			);
			if (resp.ok) {
				fetchData();
				navigate('/user');
			}
		}

		// // // /api/registerEmployee

		// Handle the form submission

		// console.log(formData, photos); // photos is object check the files provided get neccessary items according to you
	};

	return (
		<div className=" rounded mb-4 flex flex-col w-[80%] h-full ml-5 mr-1 bg-gray-100 overflow-hidden">
			<div className="flex gap-1 mb-3 ">
				<Link to={'/user'} onClick={clearFieldData}>
					<img src={leftarrow} className="cursor-pointer" alt="" />
				</Link>
				<h1 className="text-xl">Add User</h1>
			</div>
			<div className="flex flex-col bg-white w-full px-8 pt-6 pb-8 overflow-y-auto h-[87%] ">
				<div className=" md:flex relative justify-center mb-14">
					<label className="relative cursor-pointer text-white  font-medium py-2 px-4 rounded">
						<input
							type="file"
							className="hidden"
							onChange={(e) => handleFiles(e)}
						/>
						<div className="w-56 h-56 rounded-full"> 
							<img src={photos?.[0] || profile} className='w-full h-full object-cover rounded-full' alt="" />
						</div>
						
						<div className=" absolute bottom-0 right-[20%]  bg-blue w-10 h-10 rounded-full p-3">
							<img src={camera} alt="camera" />
						</div>
					</label>

					{/* <input type="file" /> */}
					{/* <button className="absolute right-0 top-[20%] bg-white py-[6px] pr-5 pl-4 items-center w-24 flex gap-1 text-xs text-[#1B9BEF] font-bold rounded-md border border-[#1B9BEF]">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
						>
							<path
								d="M16.999 2.42931L15.8401 3.61126C17.0227 4.79321 18.2053 5.97516 19.3879 7.15711L20.5705 5.9988C22.2261 4.32043 18.6783 0.774572 16.999 2.42931ZM3.30458 16.1163C2.9025 17.1801 2.50042 18.2438 2.07468 19.2839C1.7199 20.3477 2.68963 21.2933 3.70666 20.915L6.87602 19.6858L18.8439 7.70081C17.6613 6.51886 16.4787 5.33691 15.2961 4.15496L3.30458 16.1163ZM4.36892 16.8255L15.2961 5.90425L17.0936 7.70081L6.19011 18.6221L3.25728 19.7567C3.23363 19.7567 3.23363 19.7567 3.23363 19.7331L4.36892 16.8255Z"
								fill="#1B9BEF"
							/>
						</svg>
						<span>Edit</span>
					</button>
					<button className="bg-[#EE7360] absolute right-0 top-[43%] py-[6px] pr-5 pl-4 items-center w-24 flex gap-1 text-xs text-white font-bold rounded-md">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
						>
							<path
								d="M17.97 4.12605H14.67C14.67 3.31847 14.3492 2.54396 13.7781 1.97291C13.2071 1.40187 12.4326 1.08105 11.625 1.08105C10.8174 1.08105 10.0429 1.40187 9.47186 1.97291C8.90081 2.54396 8.58 3.31847 8.58 4.12605H5.28C4.78512 4.12194 4.30836 4.31209 3.95216 4.65567C3.59596 4.99926 3.38873 5.46884 3.375 5.96355V6.78855C3.38286 7.24456 3.55599 7.6822 3.86222 8.02017C4.16846 8.35813 4.58698 8.57343 5.04 8.62605V19.5761C5.03102 19.9027 5.08662 20.2279 5.20361 20.533C5.32061 20.8382 5.49669 21.1172 5.72175 21.3541C5.94682 21.591 6.21644 21.7811 6.51516 21.9136C6.81388 22.0461 7.13582 22.1183 7.4625 22.1261H15.7875C16.4446 22.1103 17.0687 21.8346 17.5228 21.3594C17.977 20.8842 18.2241 20.2482 18.21 19.5911V8.62605C18.663 8.57343 19.0815 8.35813 19.3878 8.02017C19.694 7.6822 19.8671 7.24456 19.875 6.78855V5.96355C19.8613 5.46884 19.654 4.99926 19.2978 4.65567C18.9416 4.31209 18.4649 4.12194 17.97 4.12605ZM11.625 2.62605C12.0228 2.62605 12.4044 2.78409 12.6857 3.06539C12.967 3.3467 13.125 3.72823 13.125 4.12605H10.125C10.125 3.72823 10.283 3.3467 10.5643 3.06539C10.8456 2.78409 11.2272 2.62605 11.625 2.62605ZM15.7875 20.6261H7.4625C7.20641 20.6068 6.96825 20.4874 6.79974 20.2936C6.63123 20.0998 6.54598 19.8473 6.5625 19.5911V8.66356H16.6875V19.5911C16.704 19.8473 16.6188 20.0998 16.4503 20.2936C16.2817 20.4874 16.0436 20.6068 15.7875 20.6261ZM18.375 6.78855C18.375 6.83844 18.3651 6.88782 18.3458 6.93381C18.3264 6.97981 18.2981 7.02148 18.2625 7.05641C18.2269 7.09133 18.1847 7.11879 18.1383 7.13719C18.0919 7.15559 18.0424 7.16455 17.9925 7.16356H5.28C5.22829 7.16771 5.17628 7.16108 5.12726 7.1441C5.07825 7.12712 5.03328 7.10016 4.99522 7.06492C4.95716 7.02967 4.92682 6.98691 4.90613 6.93934C4.88543 6.89178 4.87483 6.84043 4.875 6.78855V5.96355C4.88451 5.86532 4.93237 5.77481 5.00818 5.71163C5.084 5.64845 5.18166 5.6177 5.28 5.62605H17.97C18.0199 5.62506 18.0694 5.63402 18.1158 5.65242C18.1622 5.67082 18.2044 5.69828 18.24 5.7332C18.2756 5.76812 18.3039 5.8098 18.3233 5.85579C18.3426 5.90179 18.3525 5.95117 18.3525 6.00105L18.375 6.78855ZM10.125 11.4686V17.6261C10.125 17.825 10.046 18.0157 9.90533 18.1564C9.76468 18.297 9.57391 18.3761 9.375 18.3761C9.17609 18.3761 8.98532 18.297 8.84467 18.1564C8.70402 18.0157 8.625 17.825 8.625 17.6261V11.4686C8.625 11.2696 8.70402 11.0789 8.84467 10.9382C8.98532 10.7976 9.17609 10.7186 9.375 10.7186C9.57391 10.7186 9.76468 10.7976 9.90533 10.9382C10.046 11.0789 10.125 11.2696 10.125 11.4686ZM14.7 11.4686V17.6261C14.7 17.825 14.621 18.0157 14.4803 18.1564C14.3397 18.297 14.1489 18.3761 13.95 18.3761C13.7511 18.3761 13.5603 18.297 13.4197 18.1564C13.279 18.0157 13.2 17.825 13.2 17.6261V11.4686C13.2 11.2696 13.279 11.0789 13.4197 10.9382C13.5603 10.7976 13.7511 10.7186 13.95 10.7186C14.1489 10.7186 14.3397 10.7976 14.4803 10.9382C14.621 11.0789 14.7 11.2696 14.7 11.4686Z"
								fill="white"
							/>
						</svg>
						<span>Delete</span>
					</button> */}
				</div>
				<form onSubmit={formik.handleSubmit} className="w-full ">
					<div className="grid grid-cols-2 gap-5 -mx-3 mb-2">
						{/* Input fields will go here */}
						<InputField
							label="Name"
							name="name"
							type="text"
							value={formik.values.name}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.name && formik.errors.name}
							placeholder={'Enter the Name of User'}
							labelColor={'bg-white'}
						/>

						<InputField
							label="Employee ID"
							name="employeeID"
							type="text"
							value={formik.values.employeeID}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.employeeID && formik.errors.employeeID}
							placeholder={'Enter the Employee ID'}
							labelColor={'bg-white'}
						/>
						<InputField
							label="Email"
							name="email"
							type="text"
							value={formik.values.email}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.email && formik.errors.email}
							placeholder={'Enter the Email of User'}
							labelColor={'bg-white'}
						/>
						<InputField
							label="Phone"
							name="phone"
							type="text"
							value={formik.values.phone}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.phone && formik.errors.phone}
							placeholder={'+91 0123456789'}
							labelColor={'bg-white'}
						/>
					</div>
					<div className="grid grid-cols-2 gap-5 -mx-3 mb-2 ">
						<DropdownSelectRole
							popup={popupRole}
							setPopup={setPopupRole}
							label="Assign Role"
							name="assignRole"
							type="text"
							value={formik.values.assignRole}
							onChange={formik.setFieldValue}
							onBlur={formik.handleBlur}
							error={formik.touched.assignRole && formik.errors.assignRole}
							placeholder={'Assign the role'}
							labelColor={'bg-white'}
						/>
						<DropdownSelect
							popup={popupBranch}
							data={branchData}
							setPopup={setPopupBranch}
							label="Add Office Branch"
							name="addOfficeBranch"
							value={formik.values.addOfficeBranch}
							onChange={formik.setFieldValue}
							onBlur={formik.handleBlur}
							error={
								formik.touched.addOfficeBranch && formik.errors.addOfficeBranch
							}
							placeholder={'Add Office Branch'}
							labelColor={'bg-white'}
						/>
					</div>
					{/* ... */}
					<div className="flex items-center justify-end">
						<button
							className="bg-blue hover:bg-blue-700 text-white  font-bold py-[10px] px-12 rounded focus:outline-none focus:shadow-outline"
							type="submit"
						>
							Save User
						</button>
					</div>
				</form>
			</div>

			{popupRole && <PopupRoles setPopupRole={setPopupRole} />}
			{popupBranch && (
				<PopupBranch
					// branchInfo={branchInfo}
					setChange={handleBranchChange}
					setPopup={setPopupBranch}
				/>
			)}
		</div>
	);
};

export default AddUser;
