import React, {useState} from 'react';
import {MdOutlineCalendarMonth} from 'react-icons/md';
import Datepicker from '../Components/Datepicker';

const Datefilter = () => {
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [selected, setSelected] = useState([]);

	async function handleBtnCheck(e) {
		const {checked, name} = e.target;

		if (checked) {
			setSelected([]);
			setSelected((prev) => [...prev, name]);
		} else {
			// setSelected([...selected.filter((perk) => perk !== name)]); for multiple select
		}
	}

	return (
		<>
			<div className="w-[256px]  h-[240px] bg-white ml-6 p-2">
				<div className="">
					<div className="grid grid-cols-2 ">
						<div className="w-full   ">
							<span className="text-center text-xs block">From</span>
							<div className="pl-2 relative">
								<Datepicker
									selectedDate={startDate}
									setSelectedDate={setStartDate}
									className="text-center text-xs w-full px-1 py-2 bg-gray-100 "
								/>
								<MdOutlineCalendarMonth className="absolute top-[20%]" />
							</div>
						</div>
						<div>
							<span className="text-center text-xs block">To</span>
							<div className="pl-2 relative">
								<Datepicker
									selectedDate={startDate}
									setSelectedDate={setStartDate}
									className="text-center text-xs w-full px-1 py-2 bg-gray-100"
								/>
								<MdOutlineCalendarMonth className="absolute top-[20%]" />
							</div>
						</div>
					</div>

					<div className="flex flex-col gap-4 my-3">
						<label className="text-sm pl-4 flex gap-2 items-center cursor-pointer">
							<input
								type="checkbox"
								checked={selected.includes('today')}
								name="today"
								onChange={handleBtnCheck}
							></input>
							<span>Today</span>
						</label>
						<label className=" text-sm pl-4 flex gap-2 items-center cursor-pointer">
							<input
								type="checkbox"
								checked={selected.includes('yesterday')}
								name="yesterday"
								onChange={handleBtnCheck}
							></input>

							<span>Yesterday</span>
						</label>
						<label className=" text-sm pl-4 flex gap-2 items-center cursor-pointer">
							<input
								type="checkbox"
								checked={selected.includes('lastweek')}
								name="lastweek"
								onChange={handleBtnCheck}
							></input>

							<span>Last Week</span>
						</label>
						<label className=" text-sm pl-4 flex gap-2 items-center cursor-pointer">
							<input
								type="checkbox"
								checked={selected.includes('lastmonth')}
								name="lastmonth"
								onChange={handleBtnCheck}
							></input>

							<span>Last Month</span>
						</label>
					</div>

					<div className="flex justify-end items-center gap-4">
						<span className="text-blue underline"> Clear</span>
						<button className="bg-blue text-white px-2 py-1 rounded">
							Show Results
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Datefilter;
