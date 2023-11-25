/** @format */

import React from 'react';

const FilterBlock = ({filters, selectedFilter, setSelectedFilter}) => {
	if (!Array.isArray(filters)) {
		return <div>Error: Filters must be an array</div>;
	}

	const renderFilter = (filter) => {
		if (
			!filter ||
			typeof filter !== 'object' ||
			(!filter.label && !filter.submenu)
		) {
			return <div>Error: Invalid filter</div>;
		}

		if (filter.submenu && !Array.isArray(filter.submenu)) {
			return <div>Error: Submenu must be an array</div>;
		}

		const isFilterActive = selectedFilter === filter;
		const isMenuActive = filter?.submenu?.includes(selectedFilter);

		if (filter.submenu) {
			return (
				<div key={filter.label}>
					<label
						className={`cursor-pointer ${isMenuActive ? 'text-blue' : ''}`}
						onClick={() => setSelectedFilter(filter)}
					>
						{filter.label}
					</label>
					<select
						className={`bg-white cursor-pointer p-2 px-3 ${
							isMenuActive ? 'text-blue' : ''
						}`}
						onChange={(e) => setSelectedFilter(e.target.value)}
					>
						{filter?.submenu.map((submenuFilter, index) => (
							<option
								className={`${isMenuActive ? 'text-blue' : ''} cursor-pointer`}
								key={submenuFilter.label + index}
								value={submenuFilter.label}
							>
								{submenuFilter.label}
							</option>
						))}
					</select>
				</div>
			);
		} else {
			return (
				<div
					className={`p-2 cursor-pointer px-3 ${
						isFilterActive ? 'text-blue border-b-2 border-blue' : ''
					}`}
					key={filter.label}
					onClick={() => setSelectedFilter(filter)}
				>
					<label>{filter.label}</label>
				</div>
			);
		}
	};

	return (
		<div className="flex gap-2 rounded-md bg-white w-full p-1">
			{filters.map((filter) => renderFilter(filter))}
		</div>
	);
};

export default FilterBlock;
