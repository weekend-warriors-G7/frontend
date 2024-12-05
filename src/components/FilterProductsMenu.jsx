import React, { useState } from 'react';

const FilterProductsMenu = ({ onApplyFilters, onCancel }) => {
    const [filters, setFilters] = useState({
        startingPrice: '',
        endingPrice: '',
        size: '',
        material: '',
        clothingType: '',
        colour: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    const validateFilters = () => {
        const errors = {}; // For future, implement error handling and display them to the user
        if (filters.startingPrice && isNaN(filters.startingPrice)) {
            errors.startingPrice = 'Starting Price must be a number';
        }
        if (filters.endingPrice && isNaN(filters.endingPrice)) {
            errors.endingPrice = 'Ending Price must be a number';
        }
        if (parseFloat(filters.startingPrice) > parseFloat(filters.endingPrice) && filters.endingPrice !== '') {
            errors.priceRange = 'Starting Price cannot be greater than Ending Price';
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        onApplyFilters(filters);
        const validationErrors = validateFilters();
        if (Object.keys(validationErrors).length === 0) {
            onApplyFilters(filters);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md mb-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <label htmlFor="startingPrice" className="mb-2 font-semibold">Starting Price</label>
                    <input
                        type="number"
                        id="startingPrice"
                        name="startingPrice"
                        placeholder="E.g., 20"
                        onChange={handleChange}
                        className="input h-12 px-3 border-2 border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="endingPrice" className="mb-2 font-semibold">Ending Price</label>
                    <input
                        type="number"
                        id="endingPrice"
                        name="endingPrice"
                        placeholder="E.g., 45"
                        onChange={handleChange}
                        className="input h-12 px-3 border-2 border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="size" className="mb-2 font-semibold">Size</label>
                    <input
                        type="text"
                        id="size"
                        name="size"
                        placeholder="E.g., xs"
                        onChange={handleChange}
                        className="input h-12 px-3 border-2 border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="material" className="mb-2 font-semibold">Material</label>
                    <input
                        type="text"
                        id="material"
                        name="material"
                        placeholder="E.g., polyester"
                        onChange={handleChange}
                        className="input h-12 px-3 border-2 border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="clothingType" className="mb-2 font-semibold">Clothing Type</label>
                    <input
                        type="text"
                        id="clothingType"
                        name="clothingType"
                        placeholder="E.g., t-shirt"
                        onChange={handleChange}
                        className="input h-12 px-3 border-2 border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="colour" className="mb-2 font-semibold">Colour</label>
                    <input
                        type="text"
                        id="colour"
                        name="colour"
                        placeholder="E.g., red"
                        onChange={handleChange}
                        className="input h-12 px-3 border-2 border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                    />
                </div>
            </div>
            <div className="flex justify-end mt-4">
                <button type="button" onClick={onCancel} className="mr-2 bg-gray-400 text-white px-4 py-2 rounded hover:bg-linkColour">Clear Filters</button>
                <button type="submit" className="bg-accentColour text-white px-4 py-2 rounded hover:bg-linkColour">Apply</button>
            </div>
        </form>
    );

};

export default FilterProductsMenu;
