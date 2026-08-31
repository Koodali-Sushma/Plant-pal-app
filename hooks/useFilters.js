import { useState } from "react";

function useFilters(initialState) {
    const [filters, setFilters] = useState(initialState);


    function toggleFilters(category, value) {  
    setFilters((previous) => {
        const currentSelected = previous[category] ?? [];
        const selectedFilterValues = currentSelected.includes(value)
        ? currentSelected.filter((item) => item !== value)
        : [...currentSelected, value];
        return {...previous, [category]: selectedFilterValues };
    });
}

function clearFilters() {
    setFilters(initialState);
}

return { filters, toggleFilters, clearFilters };
}

export default useFilters;

