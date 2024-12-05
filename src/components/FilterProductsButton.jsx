import React from 'react';

const FilterProductsButton = ({ onToggleFilter }) => {
    return (
        <button
            onClick={onToggleFilter}
            className="bg-accentColour text-white px-4 py-2 rounded shadow hover:bg-linkColour transition duration-200"
        >
            Filter
        </button>
    );
};

export default FilterProductsButton;
