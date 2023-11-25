/** @format */

import React from "react";

const SortFilter = ({ filters, selectedFilter, setSelectedFilter }) => {
  if (!Array.isArray(filters)) {
    return <div>Error: Filters must be an array</div>;
  }

  const renderFilter = (filter) => {
    if (
      !filter ||
      typeof filter !== "object" ||
      (!filter.text && !filter.icon)
    ) {
      return <div>Error: Invalid filter</div>;
    }

    const isFilterActive = selectedFilter === filter;

    return (
      <div
        style={{
          borderColor: isFilterActive ? filter.color : "transparent",
          borderWidth: "2px",
          borderStyle: "solid",
        }}
        className={`p-2 px-3 rounded-md cursor-pointer ${
          isFilterActive ? "active-filter" : ""
        }`}
        key={filter.text}
        onClick={() => setSelectedFilter(filter)}
      >
        {filter.icon && <i className={`icon ${filter.icon}`} />}
        <span style={{ color: filter.color }}>{filter.text}</span>
      </div>
    );
  };

  return (
    <div className="flex gap-2 w-fit p-2">
      {filters.map((filter) => renderFilter(filter))}
    </div>
  );
};

export default SortFilter;
