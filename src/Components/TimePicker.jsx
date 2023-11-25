import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {userGloabalContext} from '../UserContext';
import {useState} from 'react';

const TimePicker = () => {
	const {startTime, endTime, setEndTime, setStartTime} = userGloabalContext();
	const [timeCounter, setTimeCounter] = useState(2);
	// Adjust time by setting the hours based on a 12-hour format and the AM/PM value
	const adjustTime = (date, hours, period) => {
		const adjustedDate = new Date(date);
		adjustedDate.setHours(period === 'PM' ? hours + 12 : hours, 0);
		return adjustedDate;
	};

	const handleTimeChange = (e) => {
		if (!startTime.length || timeCounter === 0) {
			setStartTime(e.target.innerHTML);
			setTimeCounter((prev) => prev - 1);
		} else {
			setEndTime(e.target.innerHTML);
			setTimeCounter((prev) => prev - 1);
		}
	};
	console.log('endTime', endTime);
	console.log(startTime, 'startTime');
	// const handleStartTimeChange = (time) => {
	// 	setStartTime(time);
	// };

	// const handleEndTimeChange = (time) => {
	// 	setEndTime(time);
	// };
	const formatTime = (time) => {
		// console.log(time);
		const formattedTime = time.toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: true,
		});

		return formattedTime;
	};

	const setSpecificTime = (hours) => {
		const time = new Date(); // Use a new Date object
		time.setHours(hours, 0, 0); // Set specific time
		return formatTime(time);
	};

	const times = ['10', '11', '12', '13', '14', '15', '16'];

	return (
		<>
			<div className="w-full">
				<div className="grid grid-cols-3 gap-4 mb-4">
					{times.map((item, index) => (
						<div
							key={index}
							data-time={setSpecificTime(item)}
							className="h-[40px] w-[120px]"
						>
							<span
								className="h-full w-full border bg-white flex items-center justify-center hover:border-2 hover:border-blue cursor-pointer"
								onClick={handleTimeChange}
							>
								{setSpecificTime(item)}
							</span>

							{/* <DatePicker
								selected={setSpecificTime(item)}
								// onChange={handleTimeChange}
								// onFocus={(e) => handleTimeChange(e.target.defaultValue)}
								showTimeSelect
								showTimeSelectOnly
								dateFormat="h:mm aa"
								className="border p-2 w-full focus:outline-blue"
								readOnly // This makes the input read-only
							/> */}
						</div>
					))}
				</div>
				<h3 className="text-xs">Enter Time</h3>
				<div className="flex gap-2 items-center ">
					<div className="flex-1">
						<DatePicker
							selected={new Date()}
							onChange={(time) => {
								setStartTime(formatTime(time));
							}}
							showTimeSelect
							showTimeSelectOnly
							timeIntervals={60}
							timeCaption="Start Time"
							dateFormat="h:mm aa"
							className="border p-2 w-full"
						/>
					</div>
					<span className="font-bold">:</span>
					<div className="flex-1">
						<DatePicker
							selected={new Date()}
							onChange={(time) => setEndTime(formatTime(time))}
							showTimeSelect
							showTimeSelectOnly
							timeIntervals={60}
							timeCaption="End Time"
							dateFormat="h:mm aa"
							className="border p-2 w-full"
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default TimePicker;
