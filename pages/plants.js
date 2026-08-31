import PlantList from "@/components/PlantList/PlantList";
import useSWR, { mutate } from "swr";
import { useState } from "react";
import CreatePlantForm from "@/components/CreatePlantForm";
import handleOwnershipToggle from "@/components/PlantOwnership/OwnershipToggle";
import FilterButton from "@/components/FilterButton/FilterButton.js";
import useFilters from "@/hooks/useFilters.js";
import { filterPlants } from "@/utils/filterPlants.js";
import SearchBar from "@/components/SearchBar/SearchBar";
import { FiltersIcon } from "@/components/SvgIcons";

import Image from "next/image";

export default function PlantListPage() {
  const [showForm, setShowForm] = useState(false);
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

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!data) {
    return <p className="text-center mt-12 text-lg">No data found</p>;
  }

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredPlants = filterPlants(data, filters);

  const searchedPlants = filteredPlants.filter((plant) => {
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

  let message = "";
  let showClearButton = false;
  let searchBarState = false;
  let filterButtonState = false;
  if (filteredPlants.length === 0) {
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
        Explore all plants
      </h1>

      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        searchBarState={searchBarState}
      />

      <>
        <button
          className=" ml-4 bg-(--color-primary-100) backdrop-blur-md mb-2 border-3 p-2 text-sm/5 rounded-xl border-(--color-primary-100) disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-60"
          type="button"
          onClick={() => setShowFilterButtons(!showFilterButtons)}
          disabled={filterButtonState}
        >
          <FiltersIcon className="w-4 h-4" />
        </button>

        {showFilterButtons && (
          <FilterButton
            filters={filters}
            toggleFilters={toggleFilters}
            clearFilters={clearFilters}
          />
        )}
        {message && (
          <div>
            <p
              className="mx-auto mt-12 max-w-md 
          rounded-xl border border-primary-500/30 
          bg-primary-50 p-6 text-center text-lg 
          font-semibold text-primary-700"
            >
              {message}
            </p>
            {showClearButton && (
              <button
                className="bg-(--color-secondary-100) backdrop-blur-md mb-2 border-3 p-2 text-sm/5 rounded-full border-(--color-secondary-500) hover:bg-(--color-secondary-500) ml-4"
                type="button"
                onClick={() => clearFilters()}
              >
                Clear all filters
              </button>
            )}
          </div>
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
          plants={searchedPlants}
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
    </main>
  );
}
