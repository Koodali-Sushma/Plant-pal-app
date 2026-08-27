import PlantList from "@/components/PlantList/PlantList";
import useSWR, { mutate } from "swr";
import { useState } from "react";
import CreatePlantForm from "@/components/createPlantForm";
import handleOwnershipToggle from "@/components/PlantOwnership/OwnershipToggle";
import FilterButtons from "@/components/FilterButton/FilterButton.js";
import useFilters from "@/hooks/useFilters.js";
import { filterPlants } from "@/utils/filterPlants.js";

export default function PlantListPage() {
  const [showForm, setShowForm] = useState(false); /* form to add new plants */
  const [successMessage, setSuccessMessage] = useState("");
  const { data, isLoading } = useSWR("/api/plants");
  const { filters, toggleFilters, clearFilters } = useFilters({
  lightNeed: [],
  waterNeed: [],
  fertiliserSeason: [],
});

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
 if (!data) {
    return null;
  }



  async function handleCreatePlant(data) {
    const updatedData = { ...data, isOwned: true };

    const response = await fetch("/api/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      return false;
    }

    const newPlant = await response.json();

    console.log("newPlant add: ", newPlant);

    // Revalidate plant data so the new plant appears in the list
    await mutate("/api/plants");

    setShowForm(false);

    /* shows success message for 5 seconds when a new plant is added */
    setSuccessMessage("Plant successfully added!");

    setTimeout(() => {
      setSuccessMessage("");
    }, 5000);

    return true;
  }
const filteredPlants = filterPlants(data, filters);
 
return (
  filteredPlants.length === 0 ? (
    <p
          className="mx-auto mt-12 max-w-md rounded-xl
         border border-emerald-300/30 bg-emerald-50 p-6 
         text-center text-lg font-semibold text-emerald-700 shadow-sm"
        >
         No plants match your filters. 
<button type="button" onClick={() => clearFilters()}>
  Clear all filters
</button>
        </p>
  ) : (
    <>
      <h1
        className="mb-8 text-center 
     text-4xl font-bold tracking-tight 
     text-(--color-heading) sm:text-5xl 
     sticky top-1 z-100 bg-(--color-secondary-500) rounded-3xl"
      >
        All Plants
      </h1>
      <FilterButtons 
      filters={filters}
      toggleFilters={toggleFilters}
      clearFilters={clearFilters}/>

      {showForm && (
        <CreatePlantForm
          onSubmitForm={handleCreatePlant}
          onCancel={() => setShowForm(false)}
        />
      )}

      <PlantList
        plants={filteredPlants}
        onAddPlant={() => setShowForm(true)}
        onOwnershipToggle={handleOwnershipToggle}
        successMessage={successMessage}
      />
    </>
  ));
}
