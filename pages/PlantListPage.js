import PlantList from "@/components/PlantList/PlantList";
import useSWR, { mutate } from "swr";
import { useOwnershipToggle } from "@/hooks/useOwnershipToggle"; // Import the hook
import { useState } from "react";
import CreatePlantForm from "@/components/createPlantForm";

export default function PlantListPage() {
  const [showForm, setShowForm] = useState(false); /* form to add new plants */
  const { data, isLoading } = useSWR("/api/plants");
  // Get the function from your custom hook
  const { handleOwnershipToggle } = useOwnershipToggle();
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return null;
  }

  async function handleCreatePlant(data) {
    const response = await fetch("/api/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return false;
    }

    const newPlant = await response.json();

    console.log(newPlant);

    // Revalidate plant data so the new plant appears in the list
    await mutate("/api/plants");

    setShowForm(false);

    return true;
  }

  return (
    <>
      {
        //This link don't required
        /* <Link
        href="/"
        className="mb-4 inline-block text-emerald-400 hover:underline"
      >
        ← Back to My Plants
      </Link> */
      }
      <h1 className="mb-8 text-center text-4xl font-bold tracking-tight text-emerald-400 sm:text-5xl sticky">
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
      />
    </>
  );
}
