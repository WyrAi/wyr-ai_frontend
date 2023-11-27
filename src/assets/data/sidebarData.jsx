import dash from "../noun-dashboard-2659277.svg";
import cart from "../noun-shopping-order-4316461.svg";
import relation from "../noun-relationship-3465121 1.svg";
import reports from "../noun-reports-1431855 1.svg";
import live from "../noun-live-2146916 1.svg";
import payment from "../noun-payment-6223435 1.svg";
import profile from "../noun-profile-1543074.svg";
import user from "../UserSettings.svg";
import { LuPackageSearch } from "react-icons/lu";

// import {GrUserSettings} from 'react-icons';
// import {FaHandshake} from 'react-icons/fa'
// import {MdDashboard} from 'react-icons/md';

export const sideBarData = [
  {
    icon: <img src={dash} className="" alt="" />,
    heading: "DashBoard",
    link: "/dashboard",
  },
  {
    icon: <img src={cart} className="" alt="" />,
    heading: "Purachase Orders",
    link: "/purchase/",
  },
  {
    icon: (
      <LuPackageSearch className="text-3xl text-darkGray hover:text-white" />
    ),
    heading: "Inspection",
    link: "/purchase/",
  },
  {
    icon: <img src={relation} className="" alt="" />,
    heading: "Relationship Mgt.",
    link: "/relationShip",
  },
  {
    icon: <img src={user} className="" alt="" />,
    heading: "User Management.",
    link: "/user",
  },
  {
    icon: <img src={reports} className="" alt="" />,
    heading: "Reports",
    link: "#",
  },
  {
    icon: <img src={live} className="" alt="" />,
    heading: "Live",
    link: "#",
  },
  {
    icon: <img src={payment} className="" alt="" />,
    heading: "Payments",
    link: "#",
  },
  {
    icon: <img src={profile} className="" alt="" />,
    heading: "Profile",
    link: "#",
  },
];
