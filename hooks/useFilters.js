import { useState } from "react";

function useFilters(initialState) {
    setFilters((previous) => {
        const currentArray = previous[category];
        const updatedArray = currentArray.includes(value)
    })
}