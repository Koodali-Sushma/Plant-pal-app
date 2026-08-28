import { useRouter } from "next/router";
import useSWR from "swr";
import { useState } from "react";
import CreatePlantForm from "@/components/CreatePlantForm";

export default function EditPlantPage() {
  const router = useRouter();
  const { id } = router.query;

  const [errorMessage, setErrorMessage] = useState("");

  const {
    data: plant,
    isLoading,
    error,
    mutate,
  } = useSWR(id ? `/api/plants/${id}` : null);

  // Display a loading state while the plant data is being fetched.
  if (isLoading || !plant) return <p>Loading...</p>;

  // Display an error message if the plant data could not be loaded.
  if (error) return <p>Failed loading plant data.</p>;

  async function handleEditPlant(updatedData) {
    /* Create the expected updated plant data for the optimistic UI update */
    const optimisticPlant = {
      ...plant,
      ...updatedData,
    };

    try {
      /* Update the SWR cache optimistically while sending the PUT request to the server in the background. */
      await mutate(
        async () => {
          const response = await fetch(`/api/plants/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
          });

          /* Throw an error if the server rejects the update. */
          if (!response.ok) {
            throw new Error("Failed to update plant.");
          }
          return response.json();
        },
        {
          optimisticData:
            optimisticPlant /* Show the updated plant data immediately before the server responds. */,
          rollbackOnError: true /* Restore the previous data if the server update fails. */,
          revalidate: false /* Do not fetch the plant data again after the successful update */,
        },
      );
      //redirect back to plant detail page after update and pass the update status via the router
      router.push({
        pathname: `/plants/${id}`,
        query: { updated: "true" },
      });
      return true;
    } catch (error) {
      // Log the error for debugging and show a user-friendly error message
      console.error("failed to update plant");
      setErrorMessage(
        "Something went wrong while updating the plant.",
      ); /* visible error message for users */
      return false;
    }
  }

  return (
    <main className="px-4 py-6">
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
