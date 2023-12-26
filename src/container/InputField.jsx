/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
const InputField = ({
  label,
  name,
  value,
  onChange,
  handleClick,
  error,
  placeholder,
  labelColor,
  labelsize,
  padding,
  type,
  disable,
  onBlur,
}) => {
  return (
    <>
      <div className=" relative  mb-4 ">
        <input
          className={`mt-1 indent-2 hover:opacity-95 block w-full  ${
            padding || "pl-2 py-4 pr-10"
          } ${labelColor} 
					 text-gray-900 placeholder-gray-400  border rounded-md shadow-sm focus:outline-none focus:bg-white
					${
            error
              ? "border-red-500 focus:border-red-500"
              : "border-gray-400 focus:border-gray-500"
          }`}
          name={name}
          id={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onClick={handleClick}
          disabled={disable || false}
          autoComplete="off"
        />
        <label
          className={`block absolute top-[-25%]  left-[8%] md:top-[-26%] md:left-[10%] text-gray-500 ${labelColor} tracking-tighter  py-1 px-3  ${
            labelsize || "text-base"
          } mb-2`}
          htmlFor="name"
        >
          {label}
        </label>
        {error && <p className="text-red-500 text-xs pl-6 ">{error}</p>}
      </div>
    </>
  );
};

export default InputField;

// appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white
//  block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2
// appearance-none w-full text-gray-700  border-2 border-gray-300 rounded pr-96 pl-7 px-4 py-5 mb-3 leading-tight focus:outline-none
