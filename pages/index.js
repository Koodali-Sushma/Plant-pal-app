import CreatePlantForm from "@/components/CreatePlantForm";
import handleOwnershipToggle from "@/components/PlantOwnership/OwnershipToggle"; // Import the hook
import Image from "next/image";
import useFilters from "@/hooks/useFilters";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import MyPlants from "@/components/MyPlants/MyPlants.js";
import { filterPlants } from "@/utils/filterPlants";
import FilterButton from "@/components/FilterButton/FilterButton";
import SearchBar from "@/components/SearchBar/SearchBar";
import { FiltersIcon } from "@/components/SvgIcons";

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
    return <p className="text-center mt-12 text-lg">No data found</p>;
  }

  const ownedPlants = plants.filter((plant) => plant.isOwned === true);

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredPlants = filterPlants(ownedPlants, filters);

  const searchedPlants = filteredPlants.filter((plant) => {
    const name = plant.name?.toLowerCase() || "";
    const botanicalName = plant.botanicalName?.toLowerCase() || "";

    return (
      name.includes(normalizedQuery) || botanicalName.includes(normalizedQuery)
    );
  });
  let message = "";
  let showClearButton = false;
  let searchBarState = false;
  let filterButtonState = false;
  if (ownedPlants.length === 0) {
    message = "You do not own any plants yet. Explore the Plant List.";
    searchBarState = true;
    filterButtonState = true;
  } else if (filteredPlants.length === 0) {
    message =
      "No plants found for the filter applied. Clear filters to see all plants.";
    showClearButton = true;
  } else if (searchedPlants.length === 0) {
    message =
      "No plants found for searched name!!! check with spelling mistake if any.... Clear the search bar to see all plants.";
  }
  return (
    <main className="px-4 py-6">
      {!showForm && (
        <button
          type="button"
          onClick={() => {
            setShowForm(true);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="fixed bottom-25 right-5 z-50 flex h-14 w-14 items-center
        justify-center rounded-full bg-accent-500 shadow-2xl transition hover:bg-(--color-primary-700) hover:shadow-xl"
        >
          <Image
            src="/assets/plus.svg"
            alt="plus sign"
            width={48}
            height={48}
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

      <>
        <span>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            searchBarState={searchBarState}
          />
          <button
            className="bg-(--color-primary-100) backdrop-blur-md mb-2 border-3 p-2 text-sm/5 rounded-xl border-(--color-primary-100) ml-4 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-60"
            type="button"
            onClick={() => setShowFilterButtons(!showFilterButtons)}
            disabled={filterButtonState}
          >
            <FiltersIcon className="w-4 h-4" />
          </button>
        </span>

        {showFilterButtons && (
          <FilterButton
            filters={filters}
            toggleFilters={toggleFilters}
            clearFilters={clearFilters}
          />
        )}
        {message && (
          <div className="mx-auto mt-12 max-w-md rounded-xl border border-emerald-300/30 bg-emerald-50 p-6 text-center text-lg font-semibold text-emerald-700">
            <p>{message}</p>
            {showClearButton && (
              <button
                className="ml-4 mt-4 rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
                type="button"
                onClick={() => clearFilters()}
              >
                Clear all filters
              </button>
            )}
          </div>
        )}

        <MyPlants
          plants={searchedPlants}
          onOwnershipToggle={handleOwnershipToggle}
          successMessage={successMessage}
        />
      </>
    </main>
  );
}
