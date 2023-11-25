/* eslint-disable react/prop-types */
import checked from '../assets/checked.svg';
import unchecked from '../assets/unchecked.svg';

const Checkbox = ({name, check, label, setChange}) => {
	return (
		<>
			<input
				className="hidden"
				type="checkbox"
				name={name}
				onChange={function (e) {
					setChange(e);
				}}
				id={name}
			/>
			<label className="flex items-center gap-2" htmlFor={name}>
				{check.includes(name) ? (
					<img src={checked} className="cursor-pointer" alt="checked" />
				) : (
					<img src={unchecked} className="cursor-pointer" alt="unchecked" />
				)}
				<p className="text-[13px]  ">{label}</p>
			</label>
		</>
	);
};

export default Checkbox;
