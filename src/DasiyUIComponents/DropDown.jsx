import React from "react";

function DropDown({ children, value }) {
  console.log(value);
  const handleClicks = () => {
    console.log("test");
  };

  return (
    <div className="dropdown dropdown-bottom">
      <div tabIndex={0} role="button" className="btn m-1 bg-white">
        {value || "test"}
      </div>
      <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-[100px]">
        <div className="h-[100px] overflow-y-auto">
          {React.Children.map(children, (child) => {
            return React.cloneElement(child, {
              onClick: handleClicks,
            });
          })}
        </div>
      </ul>
    </div>
  );
}

export default DropDown;
