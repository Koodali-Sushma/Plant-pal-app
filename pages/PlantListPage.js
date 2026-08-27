import PlantList from "@/components/PlantList/PlantList";
import useSWR, { mutate } from "swr";
import { useState } from "react";
import CreatePlantForm from "@/components/createPlantForm";
import handleOwnershipToggle from "@/components/PlantOwnership/OwnershipToggle";

export default function PlantListPage() {
  const [showForm, setShowForm] = useState(false); /* form to add new plants */
  const [successMessage, setSuccessMessage] = useState("");
  const { data, isLoading } = useSWR("/api/plants");

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

  return (
    <>
      <h1
        className="mb-8 text-center 
     text-4xl font-bold tracking-tight 
     text-(--color-heading) sm:text-5xl 
     sticky top-1 z-100 bg-(--color-secondary-500) rounded-3xl"
      >
        All Plants
      </h1>

      {showForm && (
        <CreatePlantForm
          onSubmitForm={handleCreatePlant}
          onCancel={() => setShowForm(false)}
        />
      )}

      <PlantList
        plants={data}
        onAddPlant={() => setShowForm(true)}
        onOwnershipToggle={handleOwnershipToggle}
        successMessage={successMessage}
      />
    </>
  );
}
