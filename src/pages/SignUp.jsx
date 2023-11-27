import { useState } from "react";
import Buyer from "../assets/noun-buyer-5533532 1.svg";
import Agency from "../assets/noun-bulk-buying-3978894 1.svg";
import factory from "../assets/noun-factory-798041 1.svg";
import QC from "../assets/noun-preview-192680 1.svg";
import { v4 as uuid } from "uuid";
import ClientOptions from "../container/ClientOptions";
const Home = () => {
  const [role, setRole] = useState([
    { id: 0, name: "Buyer", icon: Buyer, selected: false },
    { id: 1, name: "Buying Agency", icon: Agency, selected: false },
    { id: 2, name: "Factory", icon: factory, selected: false },
    { id: 3, name: "QC Agency", icon: QC, selected: false },
  ]);

  const handleSubmit = () => {
    // console.log(role);
    // const data = role.find((item) => {
    // 	console.log(item.selected);
    // 	item.selected === true;
    // });
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      <div className=" h-1/2 w-3/4 m-auto ">
        <div className="flex-col justify-center">
          <div className="text-center mt-[100px] mb-[120px]">
            <h4 className="text-base">Please Tell Us</h4>
            <h2 className="text-[32px] text-[#1B9BEF] ">WHAT YOU DO</h2>
          </div>

          <div className="container flex flex-wrap justify-between gap-20">
            {role?.length > 0 &&
              role.map((item) => (
                <div key={uuid()}>
                  <ClientOptions
                    icon={item.icon}
                    role={role}
                    setRole={setRole}
                    selected={item.selected}
                    id={item.id}
                  ></ClientOptions>
                  <span className="block text-center w-full mt-5">
                    {item.name}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
