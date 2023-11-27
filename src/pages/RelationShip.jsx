/** @format */

import {useState} from 'react';
import FilterBlock from '../Components/FiltersBlock';
import SortFilter from '../Components/SortFilter';
import {useNavigate} from 'react-router-dom';
import PoCard from '../container/PoCard';
import axios from 'axios';
import {useEffect} from 'react';
import RelationCard from '../container/RelationCard';
import Prompt from '../DasiyUIComponents/Prompt'
import {TbUserShield} from 'react-icons/tb';
import { TbUserCancel } from "react-icons/tb";
import { IoIosCloseCircleOutline } from "react-icons/io";
import AddCompany from '../container/AddCompany';



const filters = [
	{
		label: 'All',
	},
	{
		submenu: [{label: 'Buying Agency'}, {label: 'Option Two'}, {label: 'Option Three'}],
	},
	{
		submenu: [
			{label: 'Factory'},
			{label: 'Option Two'},
			{label: 'Option Three'},
		],
	},
	{
		submenu: [
			{label: 'QC Agency'},
			{label: 'Option Two'},
			{label: 'Option Three'},
		],
	},
];

const sortFilter_Opt = [
	{
		text: 'All',
		color: '#AAAAAA',
	},
	{
		text: 'Registered',
		color: '#52B788',
    icon: <TbUserShield className='text-2xl text-[#52B788]' />
	},
	{
		text: 'Unregistered',
		color: '#FB8B24',
    icon:<TbUserCancel className='text-2xl text-[#FB8B24]' />
	},
	{
		text: 'Unverified',
		color: '#FF758F',
    icon: <IoIosCloseCircleOutline className='text-2xl text-[#FF758F]'/>
	},
];

const RelationShip = () => {
	const [selectedFilter, setSelectedFilter] = useState(filters[0]);
	const [sortFilter, setSortFilter] = useState(sortFilter_Opt[0]);
	const [allRelation, setAllRelation] = useState([]);
	const navigate = useNavigate();

	// function handleAddPage() {
	// 	try {
	// 		navigate('/purchase/add');
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// }

	// const FetchAllPOrders = async () => {
		// console.log(selectedFilter);
		// const {data} = await axios.get(
			// `http://localhost:5000/api/getpurchaseOrder/${selectedFilter.label}`
		// );
		// if (data.Order) setAllPOrder(data.Order);
	// };

	// useEffect(() => {
	// 	FetchAllPOrders();
	// }, [selectedFilter]);

	return (
		<main className="flex flex-col h-full">
			<div className="flex flex-col m-5">
				<div className="flex gap-1 items-center">
					<div className="w-full">
						<FilterBlock
							filters={filters}
							selectedFilter={selectedFilter}
							setSelectedFilter={setSelectedFilter}
						/>
					</div>
          <Prompt btnText={
              <button
              // onClick={handleAddPage}
              className="bg-blue p-3 rounded-md font-bold text-white w-[40vh]"
            >
              Add Company
            </button>
          } modalID={'addCompany'}>
            <div className='w-[60%] mx-auto '>
              <AddCompany />
            </div>
            
          </Prompt>
					
				</div>
				<div>
					<SortFilter
						filters={sortFilter_Opt}
						selectedFilter={sortFilter}
						setSelectedFilter={setSortFilter}
					/>
				</div>
			</div>
			<div className=" mx-2 w-full flex-1 flex flex-col">
				<div className="grid grid-cols-2 md:grid-cols-3 gap-2 flex-1 mt-5">
					{allRelation?.map((value, index) => {
						const {_id, purchaseDoc, buyer, status} = value;
						return (
							<div className="bg-gray-50 h-[100px]" key={index}>
								<RelationShip />
							</div>
						);
					})}
          <div className="h-[120px] w-[295px]">
              <RelationCard />
          </div>

				</div>
				<div className="text-center mb-5">Pagination</div>
			</div>
		</main>
	);
};

export default RelationShip;



 