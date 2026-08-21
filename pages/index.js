import CreatePlantForm from "@/components/createPlantForm";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { mutate } from "swr";


export default function Homepage() {
  const [showForm, setShowForm] =
    useState(false); /* to show the form to add new plants */

  async function handleCreatePlant(data) {
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
  return (
    <>
      <h1>My Plants</h1>

      <Link href="/PlantList">Plant List</Link>

      {!showForm && (
        <button type="button" onClick={() => setShowForm(true)}>
          <Image
            src="/assets/plus.svg"
            alt="plus sign"
            width={40}
            height={40}
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
