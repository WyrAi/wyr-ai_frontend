import {Link} from 'react-router-dom';
import help from '../assets/noun-help-1459308.svg';
import notify from '../assets/noun-notification-1040085 (1) 1.svg';
import setting from '../assets/noun-setting-1835295 1.svg';
import search from '../assets/Search.svg';

const Header = () => {
	return (
		<header className="bg-gray-100 h-[10%] ">
			<div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-[1fr_1fr] items-center pt-2 md:justify-start md:space-x-10">
					<div className="w-full">
						<div className="w-4/5 m-auto">
							<label htmlFor="search" className="sr-only">
								Search
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<img src={search} alt="" />
								</div>
								<input
									id="search"
									name="search"
									className="block w-full pl-10 pr-4 py-4  rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									placeholder="Tap to Search"
									type="search"
								/>
							</div>
						</div>
					</div>
					<div className=" flex items-center justify-end ">
						<Link href="#" className="text-gray-600 hover:text-gray-900">
							{/* <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" /> */}
							<img src={notify} alt="help" className="block" />
						</Link>
						<Link href="#" className="ml-6 text-gray-600 hover:text-gray-900">
							{/* <UserIcon className="h-6 w-6" aria-hidden="true" /> */}
							<img src={setting} alt="help" />
						</Link>
						<Link
							href="#"
							className="ml-6 inline-block h-8 w-8 text-gray-600 hover:text-gray-900"
						>
							{/* <BellIcon className="h-6 w-6" aria-hidden="true" /> */}
							<img src={help} alt="help" className="" />
						</Link>
						<Link href="#" className=" ml-6 text-gray-600 hover:text-gray-900">
							{/* Your Profile/Sign In Icon */}
							<div className=" h-8 w-8 flex justify-center items-center bg-red-400  rounded-full">
								<span className="p-2 ">A</span>
							</div>
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
