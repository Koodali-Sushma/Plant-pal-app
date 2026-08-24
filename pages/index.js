import CreatePlantForm from "@/components/createPlantForm";
import { useOwnershipToggle } from "@/hooks/useOwnershipToggle"; // Import the hook
import Image from "next/image";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import MyPlants from "@/components/MyPlants/MyPlants.js";

export default function Homepage() {
  const { data: plants, isLoading } = useSWR("/api/plants");
  const [showForm, setShowForm] =
    useState(false); /* to show the form to add new plants */
  const { handleOwnershipToggle } = useOwnershipToggle();

  async function handleCreatePlant(data) {
    console.log("Request body:", data);

    const response = await fetch("/api/plants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return false;
    }

    const newPlant = await response.json();

    console.log(newPlant);

    /* Revalidate plant data so the new plant appears in the list */
    await mutate("/api/plants");

    return true;
  }

  // Get the function from your custom hook

  const ownedPlants = plants?.filter((plant) => plant.isOwned === true) || [];

  if (isLoading) {
    return <p>Loading...</p>;
  }

  /*Tracing purpose only*/
  console.log("My Plants:", ownedPlants);
  console.log("Owned plant count:", ownedPlants.length);

  return (
    <>
      <h1 className="mb-8 text-center text-4xl font-bold tracking-tight text-emerald-400 sm:text-5xl sticky">
        My Plants
      </h1>

      {ownedPlants.length === 0 ? (
        <p
          className="mx-auto mt-12 max-w-md rounded-xl
         border border-emerald-300/30 bg-emerald-50 p-6 
         text-center text-lg font-semibold text-emerald-700 shadow-sm"
        >
          You do not own any plants yet. Explore the Plant List.
        </p>
      ) : (
        <MyPlants
          plants={ownedPlants}
          onOwnershipToggle={handleOwnershipToggle}
        />
      )}

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
      {showForm && (
        <CreatePlantForm
          onSubmitForm={handleCreatePlant}
          onCancel={() => setShowForm(false)}
        />
      )}
    </>
  );
}
