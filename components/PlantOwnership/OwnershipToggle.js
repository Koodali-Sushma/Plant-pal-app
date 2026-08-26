import { mutate } from "swr";

export default async function handleOwnershipToggle(plant) {
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

  if (!response.ok) {
    throw new Error("Failed to update plant ownership");
  }
  const updatedPlant = await response.json();

  await mutate("/api/plants");

  return updatedPlant;
}
