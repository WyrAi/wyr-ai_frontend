import sample from "../assets/Rectangle 25.png";
// import {MdOutlinePlayCircle} from 'react-icons/md';
// import {BsDownload} from 'react-icons/bs';

const PoCard = ({ id, purchaseDoc, buyer, status, statusLabel }) => {
  const statusUi = statusLabel.find((item) => item.text === status);
  const color = statusUi.color || "";
  console.log(color, statusLabel);

  return (
    <>
      <div
        className={`flex gap-2 w-full h-full items-center  pl-2 `}
        style={{ borderLeft: "2px solid" + color }}
      >
        <img src={purchaseDoc} alt="" className="w-16 h-16 flex-1" />
        <div className="flex flex-col">
          <span className="text-sm flex-1">Purchase Order:{id}</span>
          <span className="text-sm flex-1">Buyer : {buyer}</span>
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

export default PoCard;
