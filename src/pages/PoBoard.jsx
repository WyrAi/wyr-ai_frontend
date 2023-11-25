import {useState} from 'react';
import {
	HiOutlineDocumentText,
	HiOutlineDotsCircleHorizontal,
	HiOutlineCheckCircle,
} from 'react-icons/hi';
import {GrDocumentUpload} from 'react-icons/gr';

const PoBoard = () => {
	const [selectedFilter, setSelectedFilter] = useState('all');

	const filters = [
		{name: 'All', value: 'all', icons: ''},
		{name: 'Drafts', value: 'drafts', icons: <HiOutlineDocumentText className='' />},
		{
			name: 'Pending Approval',
			value: 'pending',
			icons: <HiOutlineDotsCircleHorizontal />,
		},
		{name: 'Published', value: 'published', icons: <GrDocumentUpload />},
		{
			name: 'Factory Approved',
			value: 'approved',
			icons: <HiOutlineCheckCircle />,
		},
	];

	return (
		<div className="mx-5">
			{/* Dropdown filters */}
			<div className="flex mb-4  justify-between  bg-white">
				<div className="flex items-center space-x-2 p-2   ">
					<select className="rounded-md border-gray-300  focus:border-blue-500 focus:ring-blue-500">
						{/* Populate with Buyer options */}
						<option value="allBuyers">All </option>
					</select>
					<select className="rounded-md border-gray-300  focus:border-blue-500 focus:ring-blue-500">
						{/* Populate with Buyer options */}
						<option value="allBuyers">Buyers</option>
					</select>

					<select className="rounded-md border-gray-300  focus:border-blue-500 focus:ring-blue-500">
						{/* Populate with Factory options */}
						<option value="allFactories">Factories</option>
					</select>
				</div>
				{/* Create Purchase Order button */}
				<button className="px-6 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
					Create Purchase Order
				</button>
			</div>

			<div className="bg-white p-4 flex items-center justify-between">
				{/* Filter buttons */}
				<div className="space-x-2">
					{filters.map((filter) => (
						<button
							key={filter.value}
							className={`px-4 py-2 text-sm font-medium rounded-md shadow-sm 
                        ${
													selectedFilter === filter.value
														? 'bg-blue-500 text-white'
														: 'bg-gray-100 text-gray-700'
												} 
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
							onClick={() => setSelectedFilter(filter.value)}
						>
							<div className="flex gap-2 items-center">
								{filter.icons}
								{filter.name}
							</div>
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default PoBoard;
