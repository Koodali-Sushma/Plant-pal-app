import PlantList from "@/components/PlantList/PlantList";
import useSWR, { mutate } from "swr";
import { useState } from "react";
import CreatePlantForm from "@/components/CreatePlantForm";
import handleOwnershipToggle from "@/components/PlantOwnership/OwnershipToggle";
import FilterButton from "@/components/FilterButton/FilterButton.js";
import useFilters from "@/hooks/useFilters.js";
import { filterPlants } from "@/utils/filterPlants.js";
import SearchBar from "@/components/SearchBar/SearchBar";

export default function PlantListPage() {
  const [showForm, setShowForm] = useState(false); /* form to add new plants */
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { data, isLoading } = useSWR("/api/plants");
  const { filters, toggleFilters, clearFilters } = useFilters({
    lightNeed: [],
    waterNeed: [],
    fertiliserSeason: [],
  });
  const [showFilterButtons, setShowFilterButtons] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchBarState = !data ? true : false;
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!data) {
    return <p className="text-center mt-12 text-lg">No data found</p>;
  }

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredPlants = filterPlants(data, filters);

  const searchPlants = filteredPlants.filter((plant) => {
    const name = plant.name?.toLowerCase() || "";
    const botanicalName = plant.botanicalName?.toLowerCase() || "";

    return (
      name.includes(normalizedQuery) || botanicalName.includes(normalizedQuery)
    );
  });
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

          populateCache: false /* Keep the optimistic data in the cache until the revalidation. fetch replaces it with the latest data from the server. */,

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
      setErrorMessage("Failed to add plant. Please try again.");
      return false;
    }
  }

  return (
    <main className="px-4 py-6">
      <h1
        className="mb-8 text-left 
     text-4xl font-bold tracking-tight 
     text-primary-500 sm:text-5xl 
     top-1 z-10"
      >
        Explore all plants
      </h1>

      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        searchBarState={searchBarState}
      />
      {searchPlants.length === 0 ? (
        <>
          <button className="ml-4" type="button" onClick={() => clearFilters()}>
            Clear all filters
          </button>
          <p
            className="mx-auto mt-12 max-w-md 
          rounded-xl border border-primary-500/30 
          bg-primary-50 p-6 text-center text-lg 
          font-semibold text-primary-700"
          >
            {normalizedQuery
              ? "No plants match your search."
              : "No plants match your filters."}
          </p>
        </>
      ) : (
        <>
          <button
            className="ml-4"
            type="button"
            onClick={() => setShowFilterButtons(!showFilterButtons)}
          >
            {showFilterButtons ? "Hide" : "Show"} Filters
          </button>
          {showFilterButtons && (
            <FilterButton
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

          {errorMessage && (
            <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
          )}

          <PlantList
            plants={searchPlants}
            onAddPlant={() => {
              setShowForm(true);
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            onOwnershipToggle={handleOwnershipToggle}
            successMessage={successMessage}
          />
        </>
      )}
    </main>
  );
}
