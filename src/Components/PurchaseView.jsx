import React from "react";

const PurchaseView = () => {
  return (
    <>
      <div className=" h-[94vh] w-[95%] pt-2 mx-auto flex flex-col">
        <div className="h-[3%] mb-5">
          <button
            type="button"
            onClick={handleBack}
            className="flex font-medium gap-4 items-center"
          >
            <BiArrowBack size={28} /> Purchase Order
          </button>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex-1 flex-cols gap-10  w-full h-[45%] bg-white p-2 overflow-y-auto  "
        >
          <div className=" relative h-[500px] rounded-md  flex mb-11 border-dashed border-2 border-[rgb(102,102,102)]">
            <div className="w-full h-full">
              <DropZone
                // onDrop={setPurchaseDoc}
                setFormData={setPurchaseDoc}
                multiple={true}
                message={"Upload Purchase Order"}
                method={ImageHandler}
              />
            </div>
            {/* {purchaseDoc && (
            <img
              src={purchaseDoc}
              alt="Preview"
              className="w-full h-full  "
            />
          )} */}
          </div>
          <div className="w-1/2">
            <h1 className="text-xl font-bold mb-5">PO Number</h1>
            <InputField
              label="PO Number"
              name="poNumber"
              type="text"
              value={formik.values.poNumber}
              onChange={handleChange}
              // handleClick={handleClick}
              onBlur={formik.handleBlur}
              error={formik.touched.poNumber && formik.errors.poNumber}
              placeholder={"Enter PO Number"}
              labelColor={"bg-white"}
            />
          </div>
          <div>
            <h1 className="text-xl font-bold mb-6">Buyers</h1>
            <div className="flex gap-5 ">
              <div className="relative flex-1 cursor-pointer">
                <InputField
                  label="Name"
                  name="nameOfBuyer"
                  type="text"
                  value={formik.values.nameOfBuyer}
                  onChange={handleChange}
                  handleClick={handleClick}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.nameOfBuyer && formik.errors.nameOfBuyer
                  }
                  placeholder={"Name Of Buyer"}
                  labelColor={"bg-white"}
                  disable={userInformation?.role?.name === "Buyer"}
                />

                {popup.nameOfBuyer && (
                  <DropDown>
                    {buyer &&
                      buyer?.map((item, index) => {
                        const intials = item?.name?.charAt(0).toUpperCase();
                        return (
                          <li
                            key={index}
                            className="py-2 flex items-center gap-4 mr-2 border-b"
                            onClick={() =>
                              handleDropDownSelect(
                                "nameOfBuyer",
                                "addOfBuyer",
                                item
                              )
                            }
                          >
                            <span className="w-6 h-6 bg-blue flex justify-center items-center rounded-full">
                              {intials}
                            </span>
                            <span className="flex-1 text-xs">{item.name}</span>
                            <span className="flex gap-2 items-center">
                              <img
                                src={gps}
                                alt="gps"
                                className="w-[16px] h-[16px]"
                              />
                              <span className="text-[10px]">
                                {item.city}, {item.country}
                              </span>
                            </span>
                          </li>
                        );
                      })}
                  </DropDown>
                )}
              </div>

              <div className="relative flex-1">
                <InputField
                  label="Address"
                  name="addOfBuyer"
                  type="text"
                  value={formik.values.addOfBuyer}
                  onChange={handleChange}
                  handleClick={handleClick}
                  onBlur={formik.handleBlur}
                  error={formik.touched.addOfBuyer && formik.errors.addOfBuyer}
                  placeholder={"Address Of Buyer"}
                  labelColor={"bg-white"}
                />
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold mb-6">Vendors</h1>
            <div className=" flex gap-5 ">
              <div className=" relative flex-1">
                <InputField
                  label="Name"
                  name="nameOfVendor"
                  type="text"
                  value={formik.values.nameOfVendor}
                  onChange={handleChange}
                  handleClick={handleClick}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.nameOfVendor && formik.errors.nameOfVendor
                  }
                  placeholder={"Name Of Vendor"}
                  labelColor={"bg-white"}
                />
                {popup.nameOfVendor && (
                  <DropDown>
                    {vendor &&
                      vendor?.map((item, index) => {
                        const intials = item?.companyId?.name
                          ?.charAt(0)
                          .toUpperCase();
                        return (
                          <li
                            key={index}
                            className="py-2 flex items-center gap-4 mr-2 border-b"
                            onClick={() =>
                              handleDropDownSelect(
                                "nameOfVendor",
                                "addOfVendor",
                                item
                              )
                            }
                          >
                            {/* {item} */}
                            <span className="w-6 h-6 bg-blue flex justify-center items-center rounded-full">
                              {intials || "A"}
                            </span>
                            <span className="flex-1 text-xs">
                              {item?.companyId?.name}
                            </span>
                            <span className="flex gap-2 items-center">
                              <img
                                src={gps}
                                alt="gps"
                                className="w-[16px] h-[16px]"
                              />
                              <span className="text-[10px]">
                                {item?.companyId?.city},{" "}
                                {item?.companyId?.country}
                              </span>
                            </span>
                          </li>
                        );
                      })}
                  </DropDown>
                )}
              </div>

              <div className="flex-1">
                <InputField
                  label="Address"
                  name="addOfVendor"
                  type="text"
                  value={formik.values.addOfVendor}
                  onChange={handleChange}
                  handleClick={handleClick}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.addOfVendor && formik.errors.addOfVendor
                  }
                  placeholder={"Address Of Vendor"}
                  labelColor={"bg-white"}
                />
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold mb-6">Ship To</h1>
            <div className="grid gap-5 md:grid-cols-2 ">
              <div className="flex-1">
                <InputField
                  label="Name"
                  name="shiptoName"
                  type="text"
                  value={formik.values.shiptoName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.shiptoName && formik.errors.shiptoName}
                  placeholder={"Zig Zag"}
                  labelColor={"bg-white"}
                />
              </div>

              <div className="flex-1">
                <InputField
                  label="Complete Address"
                  name="shiptoAdd"
                  type="text"
                  value={formik.values.shiptoAdd}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.shiptoAdd && formik.errors.shiptoAdd}
                  placeholder={"D 298 Sector 63 Uttar Pradesha Noida"}
                  labelColor={"bg-white"}
                />
              </div>
              <div className="flex-1">
                <InputField
                  label="Ship via"
                  name="shipVia"
                  type="text"
                  value={formik.values.shipVia}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.shipVia && formik.errors.shipVia}
                  placeholder={"Sea"}
                  labelColor={"bg-white"}
                />
              </div>

              <div className="flex-1 relative">
                <Datepicker
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  name={"shipDate"}
                  className={
                    "form-input border border-gray-400 mt-1 pl-4 py-4 pr-10  rounded-md w-full outline-none"
                  }
                  onClickOutside={toggleCalendar} // Close the calendar when clicking outside
                  open={isCalendarOpen}
                />
                <label
                  className={`block absolute top-[-24%]  left-[8%] md:top-[-25%] md:left-[10%] text-gray-500  tracking-tighter  py-1 px-3  ${"text-base"} mb-2 bg-white`}
                  htmlFor="name"
                >
                  Ship Date
                </label>

                <HiOutlineCalendar
                  className=" absolute top-[18%] right-[3%] h-8 w-8 cursor-pointer"
                  onClick={toggleCalendar}
                />
              </div>
            </div>
          </div>
          <div>
            <h1 className="font-bold text-xl mb-6 ">
              Assign People of Interest
            </h1>
            <div className="relative w-full md:w-1/2 ">
              <div className="relative">
                <InputField
                  label="Assign People"
                  name="assignPeople"
                  type="text"
                  value={formik.values.assignPeople}
                  onChange={handleChange}
                  handleClick={handleClick}
                  onBlur={formik.handleBlur}
                  // error={
                  //   formik.touched.assignPeople && formik.errors.assignPeople
                  // }
                  placeholder={""}
                  labelColor={"bg-white"}
                  disable={true}
                />
                <img
                  src={addUser}
                  className="absolute top-[15%] right-[3%] cursor-pointer"
                  alt=""
                  onClick={() =>
                    setPopup({
                      ...popup,
                      ["assignPeople"]: !popup["assignPeople"],
                    })
                  }
                />
                <div className="absolute top-[22px] left-[24px] flex gap-4">
                  {peopleOfInterest.length > 0 &&
                    peopleOfInterest.map((item) => {
                      const initial = item?.name?.charAt(0).toUpperCase();
                      return (
                        <div className="flex relative">
                          <span className="w-6 h-6  bg-blue flex justify-center items-center rounded-full">
                            {initial}
                          </span>
                          <IoIosCloseCircle
                            className="absolute bottom-[-5px] right-[-7px] bg-white rounded-full cursor-pointer"
                            onClick={() => RemoveAssignPeople(item?.id)}
                          />
                        </div>
                      );
                    })}
                </div>
              </div>
              {popup.assignPeople && (
                <DropDown>
                  {people.length > 0 &&
                    people?.map((item, index) => {
                      const intials = item?.name?.charAt(0).toUpperCase();
                      //   console.log(item._id);
                      return (
                        <li
                          key={index}
                          className="py-2 flex items-center gap-4 mr-2 border-b"
                          onClick={() =>
                            addAssignPeople(
                              item?._id,
                              item?.name,
                              "assignPeople"
                            )
                          }
                        >
                          {/* {item} */}
                          <span className="w-6 h-6 bg-blue flex justify-center items-center rounded-full">
                            {intials || "A"}
                          </span>
                          <span className="flex-1 text-xs">{item?.name}</span>
                          <span className="text-xs">{item?.role?.name}</span>
                          <span className="flex gap-2 items-center">
                            <img
                              src={gps}
                              alt="gps"
                              className="w-[16px] h-[16px]"
                            />
                            <span className="text-[10px]">
                              {item?.officeBranch?.city},{" "}
                              {item?.officeBranch?.country}
                            </span>
                          </span>
                        </li>
                      );
                    })}
                </DropDown>
              )}
            </div>
          </div>

          <div className="mb-4">
            <h1 className="text-xl font-bold mb-4">Products</h1>
            {slotOfProducts.map((item, index) => {
              // console.log(item);
              return (
                <Products
                  setImageIndex={setImageIndex}
                  key={index}
                  data={item}
                  handleProductChange={handleProductChange}
                  poIndex={index}
                />
              );
              // <CounterComponent key={index} />
            })}
          </div>

          <button
            type="button"
            className=" flex justify-start items-center cursor-pointer pl-6 w-full gap-1 py-3 bg-[#1B9BEF1A] mb-4 "
            onClick={() => {
              addSlotOfProduct();
              setCount((prevCount) => prevCount + 1);
            }}
          >
            <FaPlus className="text-blue font-bold text-xl" />
            <span className="text-[#1B9BEF] text-xl font-bold ">
              {"Add Another Products"}
            </span>
          </button>
          <div className="flex justify-end gap-2 mb-6  ">
            <button
              type="button"
              className="py-2 rounded-md px-11 border-2 border-[#1B9BEF] text-[#1B9BEF] font-bold "
              onClick={(e) => handleSubmit(e)}
            >
              Save Draft
            </button>
            <button
              type="submit"
              className="py-2 rounded-md px-11 bg-blue font-bold text-white"
              onClick={(e) => {
                // addSlotOfProduct();
                handleSubmit(e);
              }}
            >
              Publish
            </button>
          </div>
          {/* {purchaseDoc && (
          <button
            type="button"
            className="bg-blue flex gap-2 items-center z-10 absolute right-[4.5vh] top-[90px] py-2 px-4 rounded text-white"
            onClick={() => setShowPurchaseOrder(true)}
          >
            <AiOutlineSearch className="text-white text-2xl" />
            Preview
          </button>
        )} */}
          <div className="">
            <Prompt
              btnText={
                <button
                  type="button"
                  className="bg-blue flex gap-2 items-center z-10 absolute right-[4.5vh] top-[20px] py-2 px-4 rounded text-white"
                  // onClick={() => setShowPurchaseOrder(true)}
                >
                  <AiOutlineSearch className="text-white text-2xl" />
                  Preview
                </button>
              }
              modalID={"preview"}
            >
              <Preview
                photos={purchaseDoc}
                check={showPurchaseOrder}
                onChange={setShowPurchaseOrder}
              />
            </Prompt>
          </div>
        </form>
      </div>

      {/* {purchaseDoc && (
      <img
        title="PDF Viewer"
        src={purchaseDoc}
        width="600"
        height="400"
      ></img>
    )} */}
    </>
  );
};

export default PurchaseView;
