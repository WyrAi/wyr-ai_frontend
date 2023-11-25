import InputField from './InputField';
import down from '../assets/mingcute_up-fill (1).svg';
import up from '../assets/mingcute_up-fill.svg';
import {useState} from 'react';

const ProductResize = () => {
	const [collapse, setCollapse] = useState(false);
	return (
		<>
			<div className={` relative flex flex-col bg-gray-100 p-10`}>
				<div className="flex flex-col gap-5">
					<div className="flex items-center ">
						<div className="outline-dashed p-4 flex-0.5 outline-gray-200">
							<img src={''} alt="cloud" className="m-auto" />
							<p className="flex flex-col justify-center items-center text-xs">
								<span>Upload Reference Image</span>
								<span className="text-[#1B9BEF] text-sm">or Browse</span>
							</p>
						</div>

						<div className="grid grid-cols-2 flex-1 gap-5 w-full">
							<div className="flex-1">
								<InputField
									name={'name'}
									//  setChange={}
									title={'Name'}
									val={'val'}
								/>
							</div>
							<div className="flex-1">
								<InputField
									name={'address'}
									//  setChange={}
									title={'Complete Address'}
									val={'val'}
								/>
							</div>
						</div>
					</div>
				</div>
				<div onClick={() => setCollapse(!collapse)}>
					{collapse ? (
						<img
							src={down}
							alt=""
							className=" absolute top-[-4%] right-[-1%]  w-10 h-10 bg-white rounded-full "
						/>
					) : (
						<img
							src={up}
							alt=""
							className=" absolute top-[-4%] right-[-1%]  w-10 h-10 bg-white rounded-full "
						/>
					)}
				</div>
			</div>

			{/* <img src={up} alt="" /> */}
		</>
	);
};

export default ProductResize;
