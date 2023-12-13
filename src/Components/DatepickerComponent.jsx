/* eslint-disable react/prop-types */
/** @format */

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  onClickOutside,
  open,
}) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      name={name}
      minDate={new Date()}
      wrapperClassName={"w-full relative"}
      className={className || ""}
      onClickOutside={onClickOutside}
      onFocus={onClickOutside}
      open={open}
      inline={inline || false}
    ></DatePicker>
  );
};

export default DatepickerComponent;
