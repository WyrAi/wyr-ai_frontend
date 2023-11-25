import InputField from './InputField';

const ShipDetails = () => {
	return (
		<>
			<div className=" flex flex-col gap-8">
				<span className="font-bold text-xl">{'Ship To'}</span>
				<div className="grid grid-cols-2 gap-5">
					<div className="w-full m-auto">
						<InputField
							name={'name'}
							//  setChange={}
							title={'Name'}
							val={'val'}
						/>
					</div>
					<div className="w-full m-auto">
						<InputField
							name={'address'}
							//  setChange={}
							title={'Complete Address'}
							val={'val'}
						/>
					</div>
					<div className="w-full m-auto">
						<InputField
							name={'ShipVia'}
							//  setChange={}
							title={'Ship Via'}
							val={'val'}
						/>
					</div>
					<div className="w-full m-auto">
						<InputField
							name={'ShipDate'}
							//  setChange={}
							title={'Ship Date'}
							val={'val'}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default ShipDetails;
