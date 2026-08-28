import PlantList from "@/components/PlantList/PlantList";
import useSWR, { mutate } from "swr";
import { useState } from "react";
import CreatePlantForm from "@/components/CreatePlantForm";
import handleOwnershipToggle from "@/components/PlantOwnership/OwnershipToggle";
import FilterButtons from "@/components/FilterButton/FilterButton.js";
import useFilters from "@/hooks/useFilters.js";
import { filterPlants } from "@/utils/filterPlants.js";
import SearchBar from "@/components/SearchBar/SearchBar";

export default function PlantListPage() {
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
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
    return <h1>Loading...</h1>;
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

  return (
    <main className="px-4 py-6">
      <h1
        className="mb-8 text-left 
     text-4xl font-bold tracking-tight 
     text-primary-500 sm:text-5xl 
     top-1 z-10"
      >
        All Plants
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
          rounded-xl border border-emerald-300/30 
          bg-emerald-50 p-6 text-center text-lg 
          font-semibold text-emerald-700"
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
            <FilterButtons
              filters={filters}
              toggleFilters={toggleFilters}
              clearFilters={clearFilters}
            />
          )}
          <PlantList
            plants={searchPlants}
            onAddPlant={() => setShowForm(true)}
            onOwnershipToggle={handleOwnershipToggle}
            successMessage={successMessage}
          />
        </>
      )}

      {showForm && (
        <CreatePlantForm
          onSubmitForm={handleCreatePlant}
          onCancel={() => setShowForm(false)}
        />
      )}
    </main>
  );
}
