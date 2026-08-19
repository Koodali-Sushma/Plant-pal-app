import dbConnect from "@/db/connect";
import Plant from "@/db/models/Plant";

export default async function handler(request, response) {
  await dbConnect();
  
  const { id } = request.query;

  console.log("/api/plants/[id]: ", id, typeof id)

  if (request.method === "GET") {
  try {
    const plant = await Plant.findById(id);

    if (!plant) {
      response.status(404).json({ status: `{plant.name} not found. Feel free to add your own Plants!` });
      return;
    }

    response.status(200).json(plant);
  } catch (error) {
    response.status(400).json({ status: "Invalid request", error: error.message });
  }
} else {
  response.status(405).json({ status: "Method not allowed." });
}
}