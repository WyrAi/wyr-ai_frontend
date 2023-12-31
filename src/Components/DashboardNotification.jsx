import image from "../assets/live.png";

const PoMessage = () => {
  return (
    <div className="flex  justify-between px-2 max-md:py-7 py-5 bg-white shadow-md ">
      <div className="flex flex-col   gap-2	">
        <span className="text-xs font-medium ">
          {"Rohit Singh"} has created the Purchase Order for {"XYZ"} Factory
        </span>
        <span className="text-sm font-medium">
          Purchase Order : {"#321321"}
        </span>
      </div>
      <div className="flex gap-5 ">
        <button className="text-blue px-7 py-2">View</button>
        <button className="text-blue px-7 py-2 border-2 border-blue rounded-md">
          Approve
        </button>
      </div>
    </div>
  );
};

const LiveInspection = () => {
  return (
    <div className="flex justify-between p-2 bg-white shadow-md ">
      <div className="flex gap-5">
        <img src={image} alt="" height={80} width={150} />
        <div className="flex flex-col justify-center gap-2">
          <span className="text-xs font-medium ">
            {"Rohit Singh"} has created the Purchase Order for {"XYZ"} Factory
          </span>
          <span className="text-sm font-medium">
            Purchase Order : {"#321321"}
          </span>
        </div>
      </div>

      <div className="flex gap-5 ">
        <button className="text-blue py-7">View Live</button>
      </div>
    </div>
  );
};

const DashboardNotification = () => {
  return (
    <div className="h-full flex flex-col gap-2">
      <PoMessage />
      <LiveInspection />
    </div>
  );
};

export default DashboardNotification;
