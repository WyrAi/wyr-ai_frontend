/* eslint-disable react/prop-types */
const SmallInputField = ({name, val, setChange, title}) => {
	return (
		<>
			<div className=" relative w-11/12 px-3 mb-6 md:mb-0">
				<input
					className="appearance-none w-full  text-gray-700  border-2 border-gray-300 rounded box-content  pl-7 px-4 py-4 mb-3 leading-tight focus:outline-none"
					id="name"
					type="text"
					placeholder="Enter the Name of User"
					value={val}
					onChange={(e) => setChange(e)}
					name={name}
				/>
				<label
					className="absolute block top-[-26%] text-gray-500 bg-white tracking-tighter left-[10%] py-1 px-3  text-base mb-2"
					htmlFor="name"
				>
					{title}
				</label>
			</div>
		</>
	);
};

export default SmallInputField;
