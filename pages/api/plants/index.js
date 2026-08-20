import dbConnect from "@/db/connect";
import Plant from "@/db/models/Plant";

export default async function handler(request, response) {
  await dbConnect();
  if (request.method === "GET") {
    const plants = await Plant.find();
    response.status(200).json(plants);
  } else if (request.method === "POST") {
    const plant = await Plant.create(request.body);
    response.status(201).json(plant);
  } else {
    response.status(405).json({ status: "Method not allowed." });
  }
}
