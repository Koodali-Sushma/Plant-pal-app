import dbConnect from "@/db/connect";
import Plant from "@/db/models/Plant";

export default async function handler(request, response) {
  await dbConnect();
  if (request.method === "GET") {
    const plants = await Plant.find().sort({
      createdAt: -1,
    });
    response.status(200).json(plants);
  } else if (request.method === "POST") {
    try {
      const plant = await Plant.create(request.body);
      response.status(201).json(plant);
    } catch (error) {
      response
        .status(400)
        .json({ status: "Invalid plant data", error: error.message });
    }
  } else {
    response.status(405).json({ status: "Method not allowed." });
  }
}
