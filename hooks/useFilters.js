import { useState } from "react";

function useFilters(initialState) {
    const [filters, setFilters] = useState(initialState);


    function toggleFilters(category, value) {  
    setFilters((previous) => {
        const currentPlants = previous[category];
        const selectedPlants = currentPlants.includes(value)
        ? currentPlants.filter((item) => item !== value)
        : [...currentPlants, value];
        return {...previous, [category]: selectedPlants };
    });
}

function clearFilters() {
    setFilters(initialState);
}

return { filters, toggleFilters, clearFilters };
}

export default useFilters;

