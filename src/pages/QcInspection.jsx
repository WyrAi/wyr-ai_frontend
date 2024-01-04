import React, { useEffect, useState } from "react";
import FilterBlock from "../Components/FiltersBlock";
import SortFilter from "../Components/SortFilter";
import { useNavigate } from "react-router-dom";
import wyraiApi from "../api/wyraiApi";
import userGloabalContext from "../UserContext";
import InspectionCard from "../container/InspectionCard";

const filters = [
  {
    label: "All",
  },
  {
    submenu: [
      { label: "Buyer" },
      { label: "Option Two" },
      { label: "Option Three" },
    ],
  },
  {
    submenu: [
      { label: "Buying Agency" },
      { label: "Option Two" },
      { label: "Option Three" },
    ],
  },
  {
    submenu: [
      { label: "QC Agency" },
      { label: "Option Two" },
      { label: "Option Three" },
    ],
  },
];

const sortFilter_Opt = [
  {
    text: "All",
    color: "#AAAAAA",
  },
  {
    text: "Scheduled",
    color: "#B08968",
  },
  {
    text: "UnApproved",
    color: "#666666",
  },
  {
    text: "Pending QC Assign",
    color: "#FB8B24",
  },
  {
    text: "Completed",
    color: "#52B788",
  },
];

const QcInspection = () => {
  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const [sortFilter, setSortFilter] = useState(sortFilter_Opt[0]);
  const [plData, setPlData] = useState([]);
  const navigate = useNavigate();
  const { userInformation } = userGloabalContext();
  // console.log(userInformation?._id);

  function handleAddPage() {
    try {
      navigate("/qcinspection/add");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (userInformation?._id.length > 0) {
      wyraiApi
        .get(`/api/PlDisplay/${userInformation?._id}`)
        .then((res) => setPlData(res.data.Response));
    }
  }, [userInformation?._id]);

  // console.log(plData);

  return (
    <main>
      <div className="flex flex-col m-5">
        <div className="flex gap-1 items-center">
          <div className="w-full">
            <FilterBlock
              filters={filters}
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
            />
          </div>
          <button
            onClick={handleAddPage}
            className="bg-blue p-3 rounded-md font-bold text-white w-[40vh]"
          >
            View Upcoming Inspection
          </button>
        </div>
        <div>
          <SortFilter
            filters={sortFilter_Opt}
            selectedFilter={sortFilter}
            setSelectedFilter={setSortFilter}
          />
        </div>

        <div className=" ml-5 w-full flex-1 flex flex-col">
          <div className="flex flex-wrap w-full h-24 gap-6">
            {plData?.map((value, index) => {
              const { packingListFiles, buyerId, status, _id } = value;
              let qcStatus = "";
              if (status === "Approved") {
                qcStatus = "Pending QC Assign";
              } else {
                qcStatus = "Completed";
              }
              return (
                <InspectionCard
                  k={index}
                  id={_id}
                  plDoc={packingListFiles}
                  buyer={buyerId?.name}
                  status={qcStatus}
                  statusLabel={sortFilter_Opt}
                />
              );
            })}
          </div>

          {/* <div className="flex flex-wrap gap-2 w-full h-[120px] flex-1 mt-5"></div> */}
          {/* <div className="text-center mb-5">Pagination</div> */}
        </div>
      </div>
    </main>
  );
};

export default QcInspection;
