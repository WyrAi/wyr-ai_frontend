import React from "react";

const DropDown = () => {
  function toggleDropdown() {
    // console.log(test);
    var dropdownContent = document.getElementById("dropdownContent");
    if (dropdownContent.classList.contains("hidden")) {
      dropdownContent.classList.remove("hidden");
    } else {
      dropdownContent.classList.add("hidden");
    }
  }

  return (
    <div class="relative inline-block text-left h-screen w-full">
      <div>
        <button
          onclick={toggleDropdown()}
          type="button"
          class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Open Dropdown
        </button>
      </div>
      <div
        id="dropdownContent"
        class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 z-10 hidden h-full"
      >
        <div class="py-1">
          <input
            type="text"
            placeholder="Input 1"
            class="block w-full px-4 py-2 text-sm text-gray-700 border"
          />
          <input
            type="text"
            placeholder="Input 2"
            class="block w-full px-4 py-2 text-sm text-gray-700"
          />
          <input
            type="text"
            placeholder="Input 3"
            class="block w-full px-4 py-2 text-sm text-gray-700"
          />
        </div>
      </div>
    </div>
  );
};

export default DropDown;
