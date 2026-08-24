import dbConnect from "@/db/connect";
import Plant from "@/db/models/Plant";

export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;

  console.log("/api/plants/[id]: ", id, typeof id);

  if (request.method === "GET") {
    try {
      const plant = await Plant.findById(id);

      if (!plant) {
        response.status(404).json({
          status: "Plant not found. Feel free to add your own Plants!",
        });
        return;
      }

      response.status(200).json(plant);
    } catch (error) {
      response
        .status(400)
        .json({ status: "Invalid request", error: error.message });
    }
  } else if (request.method === "PATCH") {
    try {
      const { isOwned } = request.body;

      if (typeof isOwned !== "boolean") {
        return response.status(400).json({
          status: "isOwned must be a boolean",
        });
      }

      const updatedPlant = await Plant.findByIdAndUpdate(
        id,
        { isOwned }, //only update isOwned
        { new: true, runValidators: true },
      );

      if (!updatedPlant) {
        return response.status(404).json({
          status: "Plant not found",
        });
      }

      response.status(200).json(updatedPlant);
    } catch (error) {
      response.status(400).json({
        status: "Invalid request",
        error: error.message,
      });
    }
  } else {
    response.status(405).json({ status: "Method not allowed." });
  }
}
