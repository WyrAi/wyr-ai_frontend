/**
 * @format
 */

const Input = ({ label, name, value, onChange, error }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="text"
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className={`mt-1 indent-2 hover:opacity-95 block w-full pl-2 pr-2 py-3 bg-gray-50 text-gray-900 placeholder-gray-400 border rounded-md shadow-sm focus:outline-none focus:bg-white ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-gray-400 focus:border-gray-500"
        }`}
        placeholder={label}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
