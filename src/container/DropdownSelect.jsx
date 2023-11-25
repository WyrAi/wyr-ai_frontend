/* eslint-disable react/prop-types */
import {useState} from 'react';
import plus from '../assets/typcn_plus.svg';

const DropdownSelect = ({
	data,
	popup,
	setPopup,
	label,
	name,
	value,
	onChange,
	error,
	placeholder,
	labelColor,
	labelsize,
	padding,
	disable,
}) => {
	const [visible, setVisible] = useState(false);
	const [field, setField] = useState('');
	console.log(data)
	// console.log(error);
	// console.log(data, 'data');
	return (
		<>
			<div className="flex flex-col ">
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
						onClick={() => setVisible(!visible)}
						disabled={disable || false}
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
					<div className="shadow mt-2 ">
						<div
							className="flex justify-start items-center cursor-pointer pl-6 w-full gap-1 py-3 "
							onClick={() => setPopup(!popup)}
						>
							<img src={plus} alt="add" className="w-6 h-6" />
							<span className="text-[#1B9BEF] text-xs ">{label}</span>
						</div>
						<ul className="ml-6 h-[130px] overflow-y-auto cursor-pointer">
							{data?.map((item, index) => (
								<li
									key={index}
									className="py-2"
									onClick={() => {
										onChange(name, item.branchName);
										setField(`${item.branchName}`);
										setVisible(!visible);
									}}
								>
									{item.branchName}
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</>
	);
};

export default DropdownSelect;
