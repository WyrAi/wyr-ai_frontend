import { useNavigate } from "react-router-dom";
import sample from "../assets/Rectangle 25.png";
// import {MdOutlinePlayCircle} from 'react-icons/md';
// import {BsDownload} from 'react-icons/bs';

const InspectionCard = ({ id, plDoc, buyer, status, statusLabel }) => {
  const statusUi = statusLabel.find((item) => item.text === status);
  const color = statusUi?.color || "";
  // console.log(color, statusLabel);
  const maxLength = 6;
  function trimString(inputString) {
    return inputString.length > maxLength
      ? inputString.slice(0, maxLength)
      : inputString;
  }
  const navigate = useNavigate();
  console.log(status);
  return (
    <>
      <div
        className={`flex gap-5 w-[290px] h-full items-center  pl-2 py-3 pr-12 bg-white`}
        style={{ borderLeft: "2px solid" + color }}
        onClick={() => {
          if (status !== "Completed") {
            return navigate(`/inspection/view/${id}`);
          }
        }}
      >
        <img src={plDoc || ""} alt="" className="w-16 h-16 flex-1" />
        <div className="flex flex-col gap-1">
          <span className="text-sm flex-1">Packing List: {trimString(id)}</span>
          <span className="text-sm flex-1">Buyer: {buyer}</span>
          <span
            className={`text-sm font-semibold flex-1`}
            style={{ color: color }}
          >
            {status}
          </span>
        </div>
        {/* <div className="flex flex-col justify-between">
							<MdOutlinePlayCircle className="h-6 w-6 text-blue" />
							<BsDownload className="h-6 w-6 text-blue" />
						</div> */}
      </div>
    </>
  );
};

export default InspectionCard;
