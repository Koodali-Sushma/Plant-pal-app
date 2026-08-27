import { useState } from "react";

function useFilters(initialState) {
    const [filters, setFilters] = useState(initialState);


    function toggleFilters(category, value) {  
    setFilters((previous) => {
        const currentSelected = previous[category];
        const selectedPlants = currentSelected.includes(value)
        ? currentSelected.filter((item) => item !== value)
        : [...currentSelected, value];
        return {...previous, [category]: selectedPlants };
    });
}

function clearFilters() {
    setFilters(initialState);
}

return { filters, toggleFilters, clearFilters };
}

export default useFilters;

