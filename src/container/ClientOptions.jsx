/* eslint-disable react/prop-types */
import {useNavigate} from 'react-router-dom';
import vector from '../assets/Vector.svg';

const ClientOptions = ({id, icon, role, setRole, selected}) => {
	const navigate = useNavigate();
	const handleClick = (itemId) => {
		// Find the index of the item with the given id
		const itemIndex = role.findIndex((item) => item.id === itemId);

		const clickedRole = role[itemIndex].name;
		// If the item is found, update its value
		if (itemIndex !== -1) {
			// Create a new array with the updated item
			role.forEach((item) => (item.selected = false));

			const updatedItems = [...role];
			updatedItems[itemIndex] = {
				...updatedItems[itemIndex],
				selected: !selected, // Replace with the desired new value
			};

			// Update the state with the new array
			setRole(updatedItems);
			navigate(`/signUp/${clickedRole}`);
		}
	};

	return (
		<>
			<div
				className={`relative rounded-full w-[200px] h-[200px] flex justify-center items-center shadow-[0_1px_14px_0px_rgba(0,0,0,0.15)] cursor-pointer  ${
					selected && 'border-2 border-blue'
				} `}
				onClick={() => handleClick(id)}
			>
				<img src={icon} alt="logo" />
				<img
					src={vector}
					alt=""
					className={
						selected
							? 'absolute w-10 h-10 top-0 right-0 block '
							: 'absolute w-10 h-10 top-0 right-0 hidden '
					}
				/>
			</div>
		</>
	);
};

export default ClientOptions;
