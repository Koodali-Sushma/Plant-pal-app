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

  const filteredPlants = filterPlants(data, filters);

  async function handleCreatePlant(data) {
    const updatedData = { ...data, isOwned: true, userCreated: true };

    try {
      const newPlant = {
        ...updatedData,
        _id: `temp-${Date.now()}` /* Temporary ID for the optimistic update. */,
      };

      await mutate(
        "/api/plants",
        async (currentPlants) => {
          /* send the new plant to the server */
          const response = await fetch("/api/plants", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
          });

          if (!response.ok) {
            throw new Error("Failed to create plant");
          }
          /* Return the current data. SWR will revalidate afterwards. */
          return currentPlants;
        },
        {
          optimisticData: (currentPlants) => [...currentPlants, newPlant],

          /* Remove the optimistic plant if the request fails. */
          rollbackOnError: true,

          /* Fetch the latest data from the server after the request succeeds. */
          revalidate: true,
        },
      );

      setShowForm(false);

      setSuccessMessage("Plant successfully added!");

      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);

      return true;
    } catch (error) {
      console.error("Failed to create plant:", error);
      return false;
    }
  }

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
