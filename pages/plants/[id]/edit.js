import { useRouter } from "next/router";
import useSWR from "swr";
import { useState } from "react";
import CreatePlantForm from "@/components/CreatePlantForm";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function EditPlantPage() {
  const router = useRouter();
  const { id } = router.query;

  const [errorMessage, setErrorMessage] = useState("");

  // fetch plant data by id

  const {
    data: plant,
    isLoading,
    error,
  } = useSWR(id ? `/api/plants/${id}` : null, fetcher);

  if (isLoading || !plant) return <p>Loading...</p>;
  if (error) return <p>Failed loading plant data.</p>;

  // handle PUT request, when form has been submitted

  async function handleEditPlant(updatedData) {
    const response = await fetch(`/api/plants/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      //redirect back to plant detail page after update and pass the update status via the router
      router.push({
        pathname: `/plants/${id}`,
        query: { updated: "true" },
      });
      return true;
    } else {
      // Log the error for debugging and show a user-friendly error message
      console.error("failed to update plant");
      setErrorMessage(
        "Something went wrong while updating the plant.",
      ); /* visible error message for users */
      return false;
    }
  }

  return (
    <main>
      {/* Display an error message if the plant update fails */}
      {errorMessage && (
        <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
      )}

      <CreatePlantForm
        onSubmitForm={handleEditPlant}
        initialData={plant}
        onCancel={() => router.push(`/plants/${id}`)}
      />
    </main>
  );
}
