/* eslint-disable react/prop-types */
/** @format */

import {useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import '../datepicker-tailwind.css';
// import "react-calendar/dist/Calendar.css";
/**
 * A component that renders a datepicker using react-tailwindcss-datepicker library.
 * @param {Object} props - The props object containing selectedDate and setSelectedDate.
 * @param {Date} props.selectedDate - The currently selected date.
 * @param {Function} props.setSelectedDate - A function to set the selected date.
 * @returns {JSX.Element} - A Datepicker component.
 */

const DatepickerComponent = ({
	selectedDate,
	setSelectedDate,
	className,
	name,
	inline,
}) => {
	const [isOpen, setIsOpen] = useState(true);

	const toggleDatePicker = () => {
		setIsOpen(!isOpen);
	};

	// const [dateRange, setDateRange] = useState([null, null]);
	// const [startDate, endDate] = dateRange;

	// const setDate = (dates) => {
	// 	const [start, end] = dates;
	// 	// Check if both start and end dates are selected and they are not the same
	// 	console.log(start, end);
	// 	if (start && end) {
	// 		// If start and end are the same, it's considered as a single day selection
	// 		// and we can either set both to null or keep it as a valid single day selection
	// 		if (start.toISOString() === end.toISOString()) {
	// 			setDateRange([start, null]); // Keeps the start date, removes the end date
	// 		} else {
	// 			setDateRange([start, end]);
	// 		}
	// 	} else {
	// 		// If we're in the process of selecting the range, update as usual
	// 		setDateRange([start, end]);
	// 	}
	// };
	const handleChange = (date) => {
		// console.log(setSelectedDate.values);
		if (setSelectedDate.values) {
			setSelectedDate.setFieldValue(name, date);
		} else {
			setSelectedDate(date);
		}
	};

	// console.log(selectedDate);
	// console.log(setSelectedDate.values[name]);

	return (
		<>
			<DatePicker
				selected={selectedDate}
				onChange={(date) => handleChange(date)}
				name={name}
				minDate={new Date()}
				wrapperClassName={'w-full relative'}
				className={className || ''}
				onClickOutside={toggleDatePicker}
				// selectsRange={true}
				inline={inline || false}
			></DatePicker>
		</>
	);
};

export default DatepickerComponent;
