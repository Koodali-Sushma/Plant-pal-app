import { mutate } from "swr";

export default async function handleOwnershipToggle(plant) {
  const optimisticPlants = (currentPlants) =>
    currentPlants.map((currentPlant) =>
      currentPlant._id === plant._id
        ? {
            ...currentPlant,
            isOwned: !Boolean(currentPlant.isOwned),
          }
        : currentPlant,
    );

  try {
    const updatedPlant = await mutate(
      "/api/plants",
      async (currentPlants) => {
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

        return currentPlants;
      },
      {
        optimisticData: optimisticPlants,
        rollbackOnError: true,
        populateCache: false,
        revalidate: true,
      },
    );
    return updatedPlant;
  } catch (error) {
    console.error("Failed to update plant ownership:", error);
    throw error;
  }
}
