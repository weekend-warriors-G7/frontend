import React from "react";

const ActiveFilters = ({ filters }) => {
    const formatKey = (key) => {
        return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    };

    const getActiveFilters = () => {
        return Object.keys(filters)
            .filter(key => filters[key] !== '')
            .map(key => (
                <div key={key} className="flex items-center justify-between bg-elemColour text-black px-4 py-2 rounded-md mr-2">
                    <span>{`${formatKey(key)}: ${filters[key]}`}</span>
                </div>
            ));
    };

    return (
        <div className="mt-4">
            {Object.keys(filters).length > 0 && (
                <div className="flex justify-start">
                    <h3 className="text-xl font-semibold mb-2 mr-2 mt-1">Active Filters:</h3>
                    <div className="flex flex-wrap">
                        {getActiveFilters()}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActiveFilters;
