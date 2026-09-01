import dbConnect from "@/db/connect";
import Plant from "@/db/models/Plant";

export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;

  if (request.method === "GET") {
    try {
      const plant = await Plant.findById(id);

      if (!plant) {
        return response.status(404).json({
          status: `Plant not found.`,
        });
      }

      return response.status(200).json(plant);
    } catch (error) {
      return response
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
        { isOwned },
        { new: true, runValidators: true },
      );

      if (!updatedPlant) {
        return response.status(404).json({
          status: "Plant not found",
        });
      }

      return response.status(200).json(updatedPlant);
    } catch (error) {
      return response.status(400).json({
        status: "Invalid request",
        error: error.message,
      });
    }
  } else if (request.method === "PUT") {
    try {
      const plantDataToUpdate = request.body;
      const updatedPlant = await Plant.findByIdAndUpdate(
        id,
        plantDataToUpdate,
        { new: true, runValidators: true },
      );

      if (!updatedPlant) {
        return response.status(404).json({
          status: "Plant not found",
        });
      }
      return response
        .status(200)
        .json({ status: "Plant successfully updated" });
    } catch (error) {
      return response.status(400).json({
        status: "Invalid request",
        error: error.message,
      });
    }
  } else if (request.method === "DELETE") {
    try {
      const deletedPlant = await Plant.findByIdAndDelete(id);
      if (!deletedPlant) {
        return response.status(404).json({
          status: "Plant not found",
        });
      }
      return response
        .status(200)
        .json({ status: "Plant successfully deleted" });
    } catch (error) {
      return response.status(400).json({
        status: "Invalid request",
        error: error.message,
      });
    }
  } else {
    return response.status(405).json({ status: "Method not allowed." });
  }
}
