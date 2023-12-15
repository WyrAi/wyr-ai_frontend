/** @format */

import { useState } from "react";
import FilterBlock from "../Components/FiltersBlock";
import SortFilter from "../Components/SortFilter";
import { useNavigate } from "react-router-dom";
import PoCard from "../container/PoCard";
import axios from "axios";
import { useEffect } from "react";
import RelationCard from "../container/RelationCard";
import Prompt from "../DasiyUIComponents/Prompt";
import { TbUserShield } from "react-icons/tb";
import { TbUserCancel } from "react-icons/tb";
import { IoIosCloseCircleOutline } from "react-icons/io";
import AddCompany from "../container/AddCompany";
import wyraiApi from "../api/wyraiApi";
import userGloabalContext from "../UserContext";
import SuccessRelation from "../container/SuccessRelation";

const filters = [
  {
    label: "All",
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
      { label: "Factory" },
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
    text: "Registered",
    color: "#52B788",
    icon: <TbUserShield className="text-2xl text-[#52B788]" />,
  },
  {
    text: "Unregistered",
    color: "#FB8B24",
    icon: <TbUserCancel className="text-2xl text-[#FB8B24]" />,
  },
  {
    text: "Unverified",
    color: "#FF758F",
    icon: <IoIosCloseCircleOutline className="text-2xl text-[#FF758F]" />,
  },
];

const RelationShip = () => {
  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const [sortFilter, setSortFilter] = useState(sortFilter_Opt[0]);
  const [allRelation, setAllRelation] = useState([]);
  const { companyId } = userGloabalContext();
  const [selectRelation, setSelectRelation] = useState({
    id: "",
  });
  const [sucessRelation, setSuccessRelation] = useState(false);

  const navigate = useNavigate();
  console.log("selectRelation._id:", selectRelation.id);
  console.log("selectRelation.checkRelation:", selectRelation.checkRelation);
  const Unregistered = async () => {
    try {
      if (selectRelation) {
        wyraiApi
          .put(`/api/rejectedRelationship/${selectRelation.id}`)
          .then((res) => {
            console.log(res);
            fetchRelation();
            setSelectRelation({ id: "" });
          })
          .catch((err) => console.log(err));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const Registered = async () => {
    try {
      if (selectRelation) {
        wyraiApi
          .put(`/api/approvedRelationship/${selectRelation.id}`)
          .then((res) => {
            console.log(res);
            setSelectRelation({ id: "" });
            fetchRelation();
          })
          .catch((err) => console.log(err));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRelation = () => {
    wyraiApi
      .get(`/api/companyRelationShip/${companyId}`)
      .then((res) => {
        const data = res.data?.AllData[0].companyRelations;
        console.log(data);
        setAllRelation(data);
      })
      .catch((err) => console.log(err));
  };

  const handleselectRelation = (value) => {
    setSelectRelation(value);
  };

  useEffect(() => {
    fetchRelation();
  }, []);
  console.log(selectRelation.id);

  useEffect(() => {
    document.addEventListener("keydown", handleEscKeyPress);

    // window.addEventListener("click", handleClickOutside);

    // Cleanup: remove event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleEscKeyPress);
      // window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleEscKeyPress = (event) => {
    if (event.key === "Escape") {
      console.log("escape");
      setSuccessRelation(false);
      // Do something when the Esc key is pressed
      // setAddBranchPopUp(false);
    }
  };

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
          <Prompt
            btnText={
              <button
                // onClick={handleAddPage}
                className="bg-blue p-3 rounded-md font-bold text-white w-[40vh]"
              >
                Add Company
              </button>
            }
            modalID={"addCompany"}
          >
            <div className="w-[60%] mx-auto ">
              <AddCompany
                setSuccessRelation={setSuccessRelation}
                fetchRelation={fetchRelation}
              />
            </div>
          </Prompt>
        </div>
        <div className="flex justify-between">
          <SortFilter
            filters={sortFilter_Opt}
            selectedFilter={sortFilter}
            setSelectedFilter={setSortFilter}
          />
          {selectRelation.id && selectRelation.checkRelation && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="px-8 py-2 text-lightRed text-md"
                onClick={() => Unregistered()}
              >
                Reject
              </button>
              <button
                type="button"
                className="px-8 py-2 text-lightGreen border-2 border-lightGreen rounded-md text-md"
                onClick={() => Registered()}
              >
                Approve
              </button>
            </div>
          )}
        </div>
      </div>
      <div className=" mx-2 w-full flex-1 flex flex-col">
        <div className="flex flex-w gap-2  mt-5 flex-wrap">
          {allRelation?.map((value, index) => {
            return (
              <div className="bg-gray-50 h-[120px] w-[295px]" key={index}>
                <RelationCard
                  company={value.companyId}
                  relation={value.relationId}
                  selectRelationmethod={handleselectRelation}
                  RelationMethod={fetchRelation}
                />
              </div>
            );
          })}
        </div>
        {/* <div className="text-center mb-5">Pagination</div> */}
      </div>
      {sucessRelation && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#00000080] flex justify-center items-center">
          <SuccessRelation />
        </div>
      )}
    </main>
  );
};

export default RelationShip;
