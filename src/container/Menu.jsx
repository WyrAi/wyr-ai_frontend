import {useState} from 'react';
import {BsThreeDotsVertical} from 'react-icons/bs';

const Menu = () => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<div className="relative w-5 h-5">
				<BsThreeDotsVertical
					className="cursor-pointer"
					onClick={() => setOpen(!open)}
				/>

				{open && (
					<div className=" absolute  bottom-[-7vh] left-[45%] w-[60px] shadow  flex flex-col bg-white ">
						<span className="  pl-2 py-[6px] text-xs">Edit</span>
						<span className="  pl-2 py-[6px] text-xs">Delete</span>
					</div>
				)}
			</div>
		</>
	);
};

export default Menu;
