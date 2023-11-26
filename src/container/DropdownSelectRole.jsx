/* eslint-disable react/prop-types */
import {useState} from 'react';
import plus from '../assets/typcn_plus.svg';
import {userGloabalContext} from '../UserContext';

const DropdownSelectRole = ({
	label,
	name,
	setChange,
	popup,
	setPopup,
	labelsize,
	padding,
	labelColor,
	error,
	type,
	placeholder,
	value,
	onChange,
	disable,
}) => {
	const {roleData} = userGloabalContext();
	const [visible, setVisible] = useState(false);
	const [field, setField] = useState('');
	// console.log(roleData[0].name);

	return (
		<>
			<div className=" relative flex flex-col">
				<div className=" relative w-full mb-6 md:mb-0">
					<div
						className={`mt-1 indent-2 hover:opacity-95 block w-full  ${
							padding || 'pl-2 py-4 pr-10'
						} ${labelColor} 
					  text-gray-400 text-start border rounded-md shadow-sm focus:outline-none focus:bg-white
					${
						error
							? 'border-red-500 focus:border-red-500'
							: 'border-gray-400 focus:border-gray-500'
					}`}
						name={name}
						id={name}
						type={type}
						placeholder={placeholder}
						value={value}
						onClick={() => setVisible(!visible)}
					>
						{value || field || placeholder}
					</div>
					<p
						className={`block absolute top-[-25%]  left-[8%] md:top-[-26%] md:left-[10%] text-gray-500 ${labelColor} tracking-tighter  py-1 px-3  ${
							labelsize || 'text-base'
						} mb-2`}
					>
						{label}
					</p>
					{error && <p className="text-red-500 text-xs pl-6 ">{error}</p>}
				</div>
				{visible && (
					<div className=" absolute w-full bg-white top-[98%] shadow mt-2">
						<button
							className="flex justify-start items-center cursor-pointer pl-6 w-full gap-1 py-3 outline-none "
							onClick={() => setPopup(!popup)}
						>
							<img src={plus} alt="add" className="w-6 h-6" />
							<span className="text-[#1B9BEF] text-xs ">{label}</span>
						</button>
						<ul className="ml-6 h-[130px] overflow-y-auto cursor-pointer">
							{roleData.map((item, index) => (
								<li
									key={index}
									className="py-2"
									onClick={() => {
										onChange(name, item.name);
										setField(`${item.name}`);
										setVisible(!visible);
									}}
								>
									{item.name}
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</>
	);
};

export default DropdownSelectRole;

// /* eslint-disable react/prop-types */
// import {useState} from 'react';

// const DropdownSelect = ({options}) => {
// 	const [selectedRole, setSelectedRole] = useState(options[0] || '');

// 	const handleChange = (event) => {
// 		setSelectedRole(event.target.value);
// 	};

// 	return (
// 		<div className="relative">
// 			<select
// 				value={selectedRole}
// 				onChange={handleChange}
// 				className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
// 			>
// 				{options.map((option, idx) => (
// 					<option key={idx} value={option}>
// 						{option}
// 					</option>
// 				))}
// 			</select>
// 			<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
// 				<svg
// 					className="fill-current h-4 w-4"
// 					xmlns="http://www.w3.org/2000/svg"
// 					viewBox="0 0 20 20"
// 				>
// 					<path d="M5.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.576 0 0.436 0.445 0.408 1.197 0 1.615l-4.695 4.502c-0.269 0.257-0.627 0.385-0.985 0.385s-0.717-0.128-0.985-0.385l-4.695-4.502c-0.408-0.418-0.436-1.17 0-1.615z" />
// 				</svg>
// 			</div>
// 		</div>
// 	);
// };

// export default DropdownSelect;
