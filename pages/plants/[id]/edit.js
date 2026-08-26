import { useRouter } from "next/router";
import useSWR from "swr";
import CreatePlantForm from "@/components/CreatePlantForm";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function EditPlantPage() {
  const router = useRouter();
  const { id } = router.query;

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
      //redirect back to plant detail page after update
      router.push(`/plants/${id}?updated=true`);
      return true;
    } else {
      console.error("failed to update plant");
      return false;
    }
  }

  return (
    <main>
      <CreatePlantForm
        onSubmitForm={handleEditPlant}
        initialData={plant}
        onCancel={() => router.push(`/plants/${id}`)}
      />
    </main>
  );
}
