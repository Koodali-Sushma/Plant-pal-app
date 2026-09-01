import dbConnect from "@/db/connect";
import Plant from "@/db/models/Plant";

export default async function handler(request, response) {
  try {
    await dbConnect();
    if (request.method === "GET") {
      try {
        const plants = await Plant.find().sort({
          createdAt: -1,
        });
        return response.status(200).json(plants);
      } catch (error) {
        console.error("Failed to fetch plants:", error);

        return response.status(500).json({
          status: "Internal server error",
          error: "Failed to load plants. Please try again later.",
        });
      }
    }

    if (request.method === "POST") {
      try {
        const plant = await Plant.create(request.body);
        return response.status(201).json(plant);
      } catch (error) {
        console.error("Failed to create plant:", error);

        return response.status(400).json({
          status: "Invalid plant data",
          error: error.message,
        });
      }
    }

    return response.status(405).json({
      status: "Method not allowed.",
    });
  } catch (error) {
    console.error("Database connection failed:", error);

    return response.status(500).json({
      status: "Internal server error",
      error: "Something went wrong. Please try again later.",
    });
  }
}
