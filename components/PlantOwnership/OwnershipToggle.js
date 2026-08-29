import { mutate } from "swr";

export default async function handleOwnershipToggle(plant) {
  // Calculate the updated ownership state for the selected plant.
  const optimisticPlants = (currentPlants) =>
    currentPlants.map((currentPlant) =>
      currentPlant._id === plant._id
        ? {
            ...currentPlant,
            isOwned: !Boolean(
              currentPlant.isOwned,
            ) /* Toggle the ownership state for the selected plant. */,
          }
        : currentPlant,
    );

  try {
    // Update the user interface immediately while the PATCH request is running.
    const updatedPlant = await mutate(
      "/api/plants",
      async (currentPlants) => {
        /* Send the updated ownership state to the server. */
        const response = await fetch(`/api/plants/${plant._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isOwned: !Boolean(plant.isOwned),
          }),
        });

        /* Throw an error if the server could not update the plant. */
        if (!response.ok) {
          throw new Error("Failed to update plant ownership");
        }
        // Return the current list. SWR will revalidate afterwards.
        return currentPlants;
      },
      {
        optimisticData:
          optimisticPlants /* Show the updated plant data immediately before the server responds. */,
        rollbackOnError: true /* Restore the previous data if the server update fails. */,
        populateCache: false /* Keep the optimistic data in the cache until the revalidation. fetch replaces it with the latest data from the server. */,
        revalidate: true /* fetch the latest plant data from the server after the successful update */,
      },
    );

    /* Return the updated plant list from SWR. */
    return updatedPlant;
  } catch (error) {
    console.error("Failed to update plant ownership:", error);
    throw error;
  }
}
