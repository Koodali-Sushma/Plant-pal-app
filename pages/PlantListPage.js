import PlantList from "@/components/PlantList/PlantList";
import useSWR, { mutate } from "swr";
import { useState } from "react";
import CreatePlantForm from "@/components/CreatePlantForm";
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
  const [showFilterButtons, setShowFilterButtons] = useState(false);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (!data) {
    return null;
  }

  async function handleCreatePlant(data) {
    const updatedData = { ...data, isOwned: true, userCreated: true };

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

    await mutate("/api/plants");

    setShowForm(false);

    setSuccessMessage("Plant successfully added!");

    setTimeout(() => {
      setSuccessMessage("");
    }, 5000);

    return true;
  }
  const filteredPlants = filterPlants(data, filters);

  return (
    <main className="px-4 py-6">
      {filteredPlants.length === 0 ? (
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
            className="mb-8 text-left 
     text-4xl font-bold tracking-tight 
     text-primary-500 sm:text-5xl 
     top-1 z-10"
          >
            All Plants
          </h1>
          <button
          className="bg-(--color-secondary-100) backdrop-blur-md mb-2 border-3 p-2 text-sm/5 rounded-full border-(--color-secondary-500) hover:bg-(--color-secondary-500) "
            type="Button"
            onClick={() => setShowFilterButtons(!showFilterButtons)}
          >
            {showFilterButtons ? "Hide" : "Show"} Filters
          </button>
          {showFilterButtons && (
            <FilterButtons
              filters={filters}
              toggleFilters={toggleFilters}
              clearFilters={clearFilters}
            />
          )}
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
      )}
    </main>
  );
}
