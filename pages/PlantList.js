import PlantList from "@/components/PlantList/PlantList";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import CreatePlantForm from "@/components/createPlantForm";
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

    /* shows success message for 5 seconds when a new plant is added */
    setSuccessMessage("Plant successfully added!");

    setTimeout(() => {
      setSuccessMessage("");
    }, 5000);

    return true;
  }

  return (
    <>
      <Link
        href="/"
        className="flex flex-row items-center gap-2 p-2 m-3 bg-(--color-primary-100) hover:bg-(color-secondary-500) rounded-3xl text-var(--font-body)"
      >
        <Image
        className="p-0 w-7 "
        src="./assets/back-arrow-light.svg"
        alt="image of an arrow pointing left"
        width={500}
        height={500}
        />MyPlants
      </Link>
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
        successMessage={successMessage}
      />
    </>
  );
}
