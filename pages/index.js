import CreatePlantForm from "@/components/createPlantForm";
import handleOwnershipToggle from "@/components/PlantOwnership/OwnershipToggle"; // Import the hook
import Image from "next/image";

import { useState } from "react";
import useSWR, { mutate } from "swr";
import MyPlants from "@/components/MyPlants/MyPlants.js";

export default function Homepage() {
  const { data: plants, isLoading } = useSWR("/api/plants");
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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

  const ownedPlants = plants?.filter((plant) => plant.isOwned === true) || [];

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
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
        className="mb-8 text-center 
     text-4xl font-bold tracking-tight 
     text-(--color-heading) sm:text-5xl 
     sticky top-1 z-100 bg-(--color-secondary-500) rounded-3xl"
      >
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
          successMessage={successMessage}
        />
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
