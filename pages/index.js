import CreatePlantForm from "@/components/createPlantForm";
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

    const newPlant = await response.json();

    console.log(newPlant);
  }
  return (
    <>
      <h1>Default main page</h1>
        {!showForm && (
        <button type="button" onClick={() => setShowForm(true)}>
          Add a new plant
        </button>
      )}
      {showForm && (
      <CreatePlantForm onSubmitForm={handleCreatePlant} 
      onCancel={() => setShowForm(false)}/>
      )}
    </>
  );
}
