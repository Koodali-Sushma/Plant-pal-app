import CreatePlantForm from "@/components/createPlantForm";
import Link from "next/link";
import { useState } from "react";

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

    return true;
  }
  return (
    <>
      <h1>Default main page</h1>
    
    <Link href="/PlantList">Plant List</Link>
    
      {!showForm && (
        <button type="button" onClick={() => setShowForm(true)}>
          <img src="/assets/plus.svg" alt="plus sign" />
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
