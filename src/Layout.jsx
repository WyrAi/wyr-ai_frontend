import {Outlet} from 'react-router-dom';
import Header from './container/Header';
import Nav from './container/Nav';

const Layout = () => {
	return (
		<div className="h-[100%] grid grid-cols-[23rem_auto] bg-gray-100  ">
			<Nav></Nav>
			<div className="flex flex-col ">
				<Header />
				<div className=" h-[96%]">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default Layout;
