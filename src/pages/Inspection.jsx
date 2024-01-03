/** @format */

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
    text: "Drafts",
    color: "#666666",
  },
  {
    text: "Pending Approval",
    color: "#FB8B24",
  },
  {
    text: "Approved",
    color: "#52B788",
  },
];

const Inspection = () => {
  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const [sortFilter, setSortFilter] = useState(sortFilter_Opt[0]);
  const [plData, setPlData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const navigate = useNavigate();
  const { userInformation } = userGloabalContext();
  // console.log(userInformation);

  function handleAddPage() {
    try {
      navigate("/inspection/add");
    } catch (error) {
      console.log(error);
    }
  }

  const filterDataByStatus = (status) => {
    const filtered = plData?.filter((item) => item.status === status);
    setFilterData(filtered);
  };

  useEffect(() => {
    if (sortFilter.text !== "All") {
      filterDataByStatus(sortFilter.text);
    } else {
      fetchAllPlData();
      setFilterData(plData);
    }
  }, [sortFilter]);

  const fetchAllPlData = () => {
    wyraiApi
      .get(`/api/PlDisplay/${userInformation?._id}`)
      .then((res) => setPlData(res.data.Response.plList));
  };

  useEffect(() => {
    setFilterData(plData);
  }, [plData]);

  useEffect(() => {
    fetchAllPlData();
  }, []);

  // console.log(filterData);

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
            Schedule Inspection
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
            {filterData?.map((value, index) => {
              const { packingListFiles, buyerId, status, _id } = value;
              return (
                <InspectionCard
                  k={index}
                  id={_id}
                  plDoc={packingListFiles}
                  buyer={buyerId?.name}
                  status={status}
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

export default Inspection;
