/** @format */

import React, { useState, useRef, useEffect } from "react";
import FilterBlock from "../Components/FiltersBlock";
import SortFilter from "../Components/SortFilter";
import {
  MdOutlineCalendarMonth,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Prompt from "../DasiyUIComponents/Prompt";
import Hls from "hls.js";

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
    text: "Completed",
    color: "#52B788",
  },
];

const SubImage = [
  {
    image: "./QCVideoImage.png",
  },
  {
    image: "./QCVideoImage.png",
  },
];

const LiveInsepections = [
  {
    image: "./QCVideoImage.png",
    poNumber: "S12344321",
    factoryName: "Devi Design Pvt. Ltd",
  },
  // {
  //   image: "./QCVideoImage.png",
  //   poNumber: "S12344321",
  //   factoryName: "Devi Design Pvt. Ltd",
  // },
];

const ReportVideos = () => {
  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const [sortFilter, setSortFilter] = useState(sortFilter_Opt[0]);
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();
  const videoRef = useRef(null);
  // const [videoRef, setVideoRef] = useState(null);

  function handleAddPage() {
    try {
      navigate("/inspection/add");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const initializeHLS = () => {
      if (Hls.isSupported()) {
        const video = videoRef;
        const hls = new Hls();

        // hls.loadSource("http://192.168.1.19:8080/hls/abc123.m3u8");
        // hls.loadSource("https://wyrai.in:8080/hls/abc123.m3u8");
        hls.loadSource(
          "https://live-par-1-abr-cdn.livepush.io/live/bigbuckbunnyclip/index.m3u8"
        );
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, function () {
          video.play();
        });
      }
    };

    initializeHLS();
  }, []);
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
            onClick={() => {
              setToggle(!toggle);
              handleAddPage;
            }}
            className="bg-[#1B9BEF1A] p-3 rounded-md font-bold text-blue border border-blue w-[40vh] flex justify-center items-center gap-4"
          >
            <MdOutlineCalendarMonth className="text-blue text-2xl" />
            <span>Today</span>
            {toggle ? (
              <MdOutlineKeyboardArrowUp className="text-blue text-2xl" />
            ) : (
              <MdOutlineKeyboardArrowDown className="text-blue text-2xl" />
            )}
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
      <div className="flex flex-wrap gap-4 m-5">
        {LiveInsepections.map((value, index) => (
          <div className=" w-[295px] h-[282px] flex flex-col justify-between ">
            <div className=" w-full h-[230px] relative">
              <img src={value.image} alt="" className="h-full" />
              <Prompt
                btnText={
                  <button className=" bg-[#1B9BEF] text-white rounded-md absolute px-[20px] py-[10px] font-bold text-sm text-center top-[50%] left-[50%] transform translate-x-[-55%] translate-y-[-30%] ">
                    Join Live
                  </button>
                }
                modalID={`joinLive_${index}`}
              >
                <div className="flex justify-center">
                  {/* <iframe
                    src="https://live-par-1-abr-cdn.livepush.io/live/bigbuckbunnyclip/index.m3u8"
                    title="Owncast"
                    height="350px"
                    width="550px"
                    referrerpolicy="origin"
                    allowfullscreen
                  ></iframe> */}
                  <video ref={videoRef} controls></video>
                </div>
              </Prompt>
              <div className="absolute top-[85%] right-[0%] transform translate-x-[-55%] translate-y-[-30%] flex gap-2">
                {SubImage.map((value) => (
                  <img
                    src={value.image}
                    alt="subImage"
                    className="w-[24px] h-[24px] rounded-md cursor-pointer hover:w-[36px] hover:h-[36px] hover:border-[3px] hover:border-[#29BF12]"
                  />
                ))}
              </div>
            </div>
            <div className="">
              <h2 className="font-semibold text-sm">
                PO Number : {value.poNumber}
              </h2>
              <p className="font-medium text-xs">
                Factory : {value.factoryName}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ReportVideos;
