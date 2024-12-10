import React, { createContext, useState, useContext } from 'react';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [filters, setFilters] = useState({});

    const applyFilters = (newFilters) => {
        setFilters(newFilters);
    };

    const clearFilters = () => {
        setFilters({});
    };

    return (
        <FilterContext.Provider value={{ filters, applyFilters, clearFilters }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilters = () => {
    return useContext(FilterContext);
};
