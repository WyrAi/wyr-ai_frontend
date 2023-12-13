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
    heading: "Dashboard",
    link: "/dashboard",
    name: "dashBoard",
  },
  {
    icon: <img src={cart} className="" alt="" />,
    heading: "Purachase Orders",
    name: "purchaseOrder",
    link: "/purchase/",
  },
  {
    icon: (
      <LuPackageSearch className="text-3xl text-darkGray hover:text-white" />
    ),
    heading: "Inspection",
    name: "packingList",
    link: "/inspection/",
  },
  {
    icon: (
      <LuPackageSearch className="text-3xl text-darkGray hover:text-white" />
    ),
    heading: "QC Inspection",
    name: "qaAssignment",
    link: "/qcInspection/",
  },
  {
    icon: <img src={relation} className="" alt="" />,
    heading: "Relationship Mgmt.",
    link: "/relationShip",
    name: "relationshipManagement",
  },
  {
    icon: <img src={user} className="" alt="" />,
    heading: "User Management",
    link: "/user",
    name: "userManagement",
  },
  {
    icon: <img src={reports} className="" alt="" />,
    heading: "Reports",
    link: "/Information_Dashboard",
    name: "reports",
  },
  {
    icon: <img src={live} className="" alt="" />,
    heading: "Live",
    link: "#",
    name: "liveInspection",
  },
  {
    icon: <img src={payment} className="" alt="" />,
    heading: "Payments",
    link: "#",
    name: "inspectionWallet",
  },
  {
    icon: <img src={profile} className="" alt="" />,
    heading: "Profile",
    link: "#",
    name: "profile",
  },
];
