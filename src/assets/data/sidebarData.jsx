import dash from "../noun-dashboard-2659277.svg";
import cart from "../noun-shopping-order-4316461.svg";
import relation from "../noun-relationship-3465121 1.svg";
import reports from "../noun-reports-1431855 1.svg";
import live from "../noun-live-2146916 1.svg";
import payment from "../noun-payment-6223435 1.svg";
import profile from "../noun-profile-1543074.svg";
import user from "../UserSettings.svg";
import { LuPackageSearch } from "react-icons/lu";
import { RxDashboard } from "react-icons/rx";
import { RiUserSettingsLine } from "react-icons/ri";
import { IoDocuments } from "react-icons/io5";
import { HiMiniSignal } from "react-icons/hi2";
import { FaPlay } from "react-icons/fa";
// import {GrUserSettings} from 'react-icons';
import { FaHandshake } from "react-icons/fa";
// import {MdDashboard} from 'react-icons/md';

export const sideBarData = [
  {
    icon: <img src={dash} alt="" />,
    heading: "Dashboard",
    link: "/dashboard",
    name: "dashBoard",
  },
  {
    icon: <img src={cart} className="" alt="cart" />,
    heading: "Purachase Orders",
    name: "purchaseOrder",
    link: "/purchase/",
  },
  {
    icon: <LuPackageSearch className="text-3xl text-[#777777]" />,
    heading: "Inspection",
    name: "packingList",
    link: "/inspection/",
  },
  {
    icon: <LuPackageSearch className="text-3xl text-[#777777]" />,
    heading: "QC Inspection",
    name: "qaAssignment",
    link: "/qcInspection/",
  },
  {
    icon: <img src={relation} alt="" />,
    heading: "Relationship Mgmt.",
    link: "/relationShip",
    name: "relationshipManagement",
  },
  {
    icon: <img src={user} alt="user" />,
    heading: "User Management",
    link: "/user",
    name: "userManagement",
  },
  {
    icon: <img src={reports} alt="" />,
    heading: "Reports",
    link: "/Information_Dashboard",
    name: "reports",
  },
  {
    icon: <img src={live} alt="live" />,
    heading: "Live",
    link: "/ReportVideos",
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
