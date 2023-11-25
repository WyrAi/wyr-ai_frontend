import InputField from './InputField';
import addUser from '../assets/noun-add-account-6047901 1.svg';
const AssignPeople = () => {
	return (
		<>
			<div className=" flex flex-col gap-8">
				<span className="font-bold text-xl">{name}</span>
				<div className="flex gap-5">
					<div className="w-1/2 relative">
						<InputField
							name={'name'}
							//  setChange={}
							disabled
							title={'Assign People'}
							val={'val'}
						/>
						<img
							src={addUser}
							alt=""
							className=" absolute top-[15%] right-[2%] w-10 h-10"
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default AssignPeople;
