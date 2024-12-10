import React from "react";

const SortProductsMenu = ({ onSort, onClearSort }) => {
  const handleSortChange = (e) => {
    const value = e.target.value;
    if (value === "clear") {
      onClearSort();
    } else {
      onSort(value);
    }
  };

  return (
    <div className="relative">
      <select
        onChange={handleSortChange}
        className="bg-accentColour text-white px-4 py-2 rounded shadow hover:bg-linkColour transition duration-200 focus:outline-none"
        defaultValue=""
      >
        <option value="" disabled>
          Sort by
        </option>
        <option value="low-to-high">Price: Low to High</option>
        <option value="high-to-low">Price: High to Low</option>
        <option value="clear">Clear Sorting</option>
      </select>
    </div>
  );
};

export default SortProductsMenu;
