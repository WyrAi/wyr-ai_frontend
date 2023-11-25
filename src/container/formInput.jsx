const formInput = () => {
	return (
		<>
			<div>
				<div className="block text-sm font-medium text-gray-700">Name</div>
				<input
					type="text"
					id="buyerName"
					className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					placeholder="Enter Your Name"
				/>
			</div>
		</>
	);
};

export default formInput;
