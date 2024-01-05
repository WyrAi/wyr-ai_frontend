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
import { PiHandshake } from "react-icons/pi";
import { IoDocumentsOutline } from "react-icons/io5";
import { LuWallet } from "react-icons/lu";
import { RiLiveLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { GrUserSettings } from "react-icons/gr";
import { IoReceiptOutline } from "react-icons/io5";
// import {MdDashboard} from 'react-icons/md';

export const sideBarData = [
  {
    icon: <RxDashboard className=" max-lg:text-[26px] lg:text-[24px] " />,
    heading: "Dashboard",
    link: "/dashboard",
    name: "dashBoard",
  },
  {
    icon: <IoReceiptOutline className=" max-lg:text-[26px] lg:text-3xl " />,
    heading: "Purachase Orders",
    name: "purchaseOrder",
    link: "/purchase/",
  },
  {
    icon: <LuPackageSearch className=" max-lg:text-[26px] lg:text-[24px]  " />,
    heading: "Inspection",
    name: "packingList",
    link: "/inspection/",
  },
  {
    icon: <LuPackageSearch className=" max-lg:text-[26px] lg:text-[24px]  " />,
    heading: "QC Inspection",
    name: "qaAssignment",
    link: "/qcInspection/",
  },
  {
    icon: <PiHandshake className="max-lg:text-[26px] lg:text-3xl " />,
    heading: "Relationship Mgmt.",
    link: "/relationShip",
    name: "relationshipManagement",
  },
  {
    icon: <GrUserSettings className=" max-lg:text-[26px] lg:text-[24px]  " />,
    heading: "User Management",
    link: "/user",
    name: "userManagement",
  },
  {
    icon: <IoDocumentsOutline className="max-lg:text-[26px] lg:text-3xl " />,
    heading: "Reports",
    link: "/Information_Dashboard",
    name: "reports",
  },
  {
    icon: <RiLiveLine className=" max-lg:text-[26px] lg:text-[24px]   " />,
    heading: "Live",
    link: "/ReportVideos",
    name: "liveInspection",
  },
  {
    icon: <LuWallet className=" max-lg:text-[26px] lg:text-[24px]  " />,
    heading: "Payments",
    link: "#",
    name: "inspectionWallet",
  },
  {
    icon: <FaRegUser className=" max-lg:text-[26px] lg:text-[24px]  " />,
    heading: "Profile",
    link: "#",
    name: "profile",
  },
];
