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
  } = useSWR(id ? `/api/plants/${id}` : null);

  if (isLoading || !plant) return <p>Loading...</p>;
  if (error) return <p>Failed loading plant data.</p>;

  async function handleEditPlant(updatedData) {
    const response = await fetch(`/api/plants/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      router.push({
        pathname: `/plants/${id}`,
        query: { updated: "true" },
      });
      return true;
    } else {
      console.error("failed to update plant");
      setErrorMessage("Something went wrong while updating the plant.");
      return false;
    }
  }

  return (
    <main>
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
