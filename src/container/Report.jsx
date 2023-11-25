import sample from '../assets/Rectangle 25.png';
import {MdOutlinePlayCircle} from 'react-icons/md';
import {BsDownload} from 'react-icons/bs';



const Report = () => {
	return (
		<>
			<div>
				<div className=" m-4 bg-gray-50 w-[295px] h-[100px] py-2 px-3 ">
					<div className="flex h-full justify-between">
						<img src={sample} alt="" />
						<div className="flex flex-col justify-center">
							<span className="">S12344321</span>
							<span>Buyer: Devi Designs</span>
						</div>
						<div className="flex flex-col justify-between">
							<MdOutlinePlayCircle className="h-6 w-6 text-blue" />
							<BsDownload className="h-6 w-6 text-blue" />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Report;
