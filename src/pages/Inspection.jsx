/** @format */

import React, {useState} from 'react';
import FilterBlock from '../Components/FiltersBlock';
import SortFilter from '../Components/SortFilter';
import {useNavigate} from 'react-router-dom';

const filters = [
	{
		label: 'All',
	},
	{
		submenu: [{label: 'Buyer'}, {label: 'Option Two'}, {label: 'Option Three'}],
	},
	{
		submenu: [
			{label: 'Buying Agency'},
			{label: 'Option Two'},
			{label: 'Option Three'},
		],
	},
	{
		submenu: [
			{label: 'QC Agency'},
			{label: 'Option Two'},
			{label: 'Option Three'},
		],
	},
];

const sortFilter_Opt = [
	{
		text: 'All',
		color: '#AAAAAA',
	},
	{
		text: 'Scheduled',
		color: '#B08968',
	},
	{
		text: 'Drafts',
		color: '#666666',
	},
	{
		text: 'Pending Approval',
		color: '#FB8B24',
	},
	{
		text: 'Completed',
		color: '#52B788',
	},
];

const Inspection = () => {
	const [selectedFilter, setSelectedFilter] = useState(filters[0]);
	const [sortFilter, setSortFilter] = useState(sortFilter_Opt[0]);
	const navigate = useNavigate();

	function handleAddPage() {
		try {
			navigate('/inspection/add');
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<main>
			<div className="flex flex-col m-5">
				<div className="flex gap-1 items-center">
					<div className="w-full">
						<FilterBlock
							filters={filters}
							selectedFilter={selectedFilter}
							setSelectedFilter={setSelectedFilter}
						/>
					</div>
					<button
						onClick={handleAddPage}
						className="bg-blue p-3 rounded-md font-bold text-white w-[40vh]"
					>
						Schedule Inspection
					</button>
				</div>
				<div>
					<SortFilter
						filters={sortFilter_Opt}
						selectedFilter={sortFilter}
						setSelectedFilter={setSortFilter}
					/>
				</div>
			</div>
		</main>
	);
};

export default Inspection;
