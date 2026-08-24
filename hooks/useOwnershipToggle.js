import { mutate } from "swr";

export function useOwnershipToggle() {
  async function handleOwnershipToggle(plant) {
    console.log("Plant data:", plant);
    const response = await fetch(`/api/plants/${plant._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isOwned: !Boolean(plant.isOwned),
      }),
    });

    if (response.ok) {
      await mutate("/api/plants");
    }
  }

  return { handleOwnershipToggle };
}
