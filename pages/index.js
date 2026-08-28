import CreatePlantForm from "@/components/CreatePlantForm";
import handleOwnershipToggle from "@/components/PlantOwnership/OwnershipToggle"; // Import the hook
import Image from "next/image";
import useFilters from "@/hooks/useFilters";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import MyPlants from "@/components/MyPlants/MyPlants.js";
import { filterPlants } from "@/utils/filterPlants";
import FilterButtons from "@/components/FilterButton/FilterButton";
import SearchBar from "@/components/SearchBar/SearchBar";

export default function Homepage() {
  const { data: plants, isLoading } = useSWR("/api/plants");
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { filters, toggleFilters, clearFilters } = useFilters({
    lightNeed: [],
    waterNeed: [],
    fertiliserSeason: [],
  });
  const [showFilterButtons, setShowFilterButtons] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  async function handleCreatePlant(data) {
    const response = await fetch("/api/plants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, userCreated: true }),
    });

    if (!response.ok) {
      return false;
    }

    await response.json();

    await mutate("/api/plants");
    setShowForm(false);

    setSuccessMessage("Plant successfully added!");

    setTimeout(() => {
      setSuccessMessage("");
    }, 5000);
    return true;
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!plants) {
    return <p className="text-center mt12 text-lg">No data found</p>;
  }

  const ownedPlants = plants.filter((plant) => plant.isOwned === true);
  const searchBarState = ownedPlants.length > 0 ? false : true;
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredPlants = filterPlants(ownedPlants, filters);

  const searchedPlants = filteredPlants.filter((plant) => {
    const name = plant.name?.toLowerCase() || "";
    const botanicalName = plant.botanicalName?.toLowerCase() || "";

    return (
      name.includes(normalizedQuery) || botanicalName.includes(normalizedQuery)
    );
  });

  return (
    <main className="px-4 py-6">
      {!showForm && (
        <button type="button" onClick={() => setShowForm(true)}>
          <Image
            src="/assets/plus.svg"
            alt="plus sign"
            width={40}
            height={40}
            className="fixed bottom-20 right-5 z-50 flex h-14 w-14 
            items-center justify-center rounded-full bg-accent-500 
            shadow-2xl transition hover:bg-primary-700 hover:shadow-xl"
          />
        </button>
      )}
      <h1
        className="mb-8 text-left 
     text-4xl font-bold tracking-tight 
     text-primary-500 sm:text-5xl 
     top-1 z-10"
      >
        My Plants
      </h1>
      {showForm && (
        <CreatePlantForm
          onSubmitForm={handleCreatePlant}
          onCancel={() => setShowForm(false)}
        />
      )}
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        searchBarState={searchBarState}
      />
      {ownedPlants.length === 0 ? (
        <p className="mx-auto mt-12 max-w-md rounded-xl border border-emerald-300/30 bg-emerald-50 p-6 text-center text-lg font-semibold text-emerald-700">
          You do not own any plants yet. Explore the Plant List.
        </p>
      ) : searchedPlants.length === 0 ? (
        <>
          <button type="button" onClick={() => clearFilters()}>
            Clear all filters
          </button>
          <p className="mx-auto mt-12 max-w-md rounded-xl border border-emerald-300/30 bg-emerald-50 p-6 text-center text-lg font-semibold text-emerald-700">
            No results found
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

          <MyPlants
            plants={searchedPlants}
            onOwnershipToggle={handleOwnershipToggle}
            successMessage={successMessage}
          />
        </>
      )}
    </main>
  );
}
