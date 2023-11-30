/** @format */

import { useState } from "react";
import FilterBlock from "../Components/FiltersBlock";
import SortFilter from "../Components/SortFilter";
import { useNavigate } from "react-router-dom";
import PoCard from "../container/PoCard";
import axios from "axios";
import { useEffect } from "react";
import wyraiApi from "../api/wyraiApi";
import userGloabalContext from "../UserContext";

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
      { label: "Factory" },
      { label: "Option Two" },
      { label: "Option Three" },
    ],
  },
  // {
  // 	submenu: [
  // 		{label: 'QC Agency'},
  // 		{label: 'Option Two'},
  // 		{label: 'Option Three'},
  // 	],
  // },
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
    text: "Published",
    color: "#52B788",
  },
];

const Purchase = () => {
  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const [sortFilter, setSortFilter] = useState(sortFilter_Opt[0]);
  const [allPOrder, setAllPOrder] = useState([]);
  const navigate = useNavigate();
  const { userInformation } = userGloabalContext();

  function handleAddPage() {
    try {
      navigate("/purchase/add");
    } catch (error) {
      console.log(error);
    }
  }

  const FetchAllPOrders = async () => {
    console.log(userInformation);
    const id = userInformation._id;

    wyraiApi
      .get(`api/purchaseOrder/${id}`)
      .then((res) => setAllPOrder(res?.data?.Response?.poList))
      .catch((err) => console.log(err));

    // // if (data.Order) setAllPOrder(data.Order);
  };
  console.log(allPOrder);

  useEffect(() => {
    FetchAllPOrders();
  }, [selectedFilter]);

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
          <button
            onClick={handleAddPage}
            className="bg-blue p-3 rounded-md font-bold text-white w-[40vh]"
          >
            Create Purchase Order
          </button>
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
        <div className="flex flex-wrap gap-2 flex-1 mt-5">
          {allPOrder?.map((value, index) => {
            const { poNumber, purchaseDoc, buyer, status } = value;
            return (
              <div className="bg-gray-50 h-[120px] w-[295px]" key={index}>
                <PoCard
                  id={poNumber}
                  purchaseDoc={purchaseDoc}
                  buyer={buyer.name}
                  status={status}
                  statusLabel={sortFilter_Opt}
                />
              </div>
            );
          })}
        </div>
        <div className="text-center mb-5">Pagination</div>
      </div>
    </main>
  );
};

export default Purchase;
