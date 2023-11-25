import AssignPeople from '../container/AssignPeople';
import DetailsField from '../container/DetailsField';
import ProductResize from '../container/ProductResize';
import Products from '../container/Products';
import ShipDetails from '../container/ShipDetails';
import plus from '../assets/typcn_plus.svg';

const ProductOrder = () => {
	
	return (
		<>
			<div className=" absolute top-[0%] h-screen w-screen bg-white pt-10  ">
				<form action="" className=" w-5/6 m-auto">
					<div className="w-full flex flex-col gap-5 ">
						<DetailsField name={'Buyer'} title={'Buyer'} val={''} />
						<DetailsField name={'Vendor'} title={'Vendor'} val={''} />
						{/* <DetailsField name={} title={} val={}/> */}
						<ShipDetails />
					</div>
					<div className="mt-5">
						<h1 className="font-bold text-xl">Assign People of Interest</h1>
						<div>
							<AssignPeople />
						</div>
					</div>
					<div className="flex flex-col gap-10 mt-5 ">
						<span className="font-bold text-xl ">{'Products'}</span>
						<Products />
						<ProductResize />

						<button
							className=" flex justify-start items-center cursor-pointer pl-6 w-full gap-1 py-3 bg-[#1B9BEF1A] "
							// onClick={() => setPopup(!popup)}
						>
							<img src={plus} alt="add" className="w-6 h-6" />
							<span className="text-[#1B9BEF] text-xl font-bold ">
								{'Add Another Products'}
							</span>
						</button>
						<div className="flex justify-end gap-2 mb-6  ">
							<button className="py-2 rounded-md px-11 border-2 border-[#1B9BEF] text-[#1B9BEF] font-bold ">
								Save Draft
							</button>
							<button className="py-2 rounded-md px-11 bg-gray-300 font-bold text-white">
								Publish
							</button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};

export default ProductOrder;
