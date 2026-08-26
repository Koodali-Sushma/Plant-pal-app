import { put } from "@vercel/blob";
import formidable from "formidable";
import fs from "fs/promises";

// Disable Next.js's default body parser so formidable can handle multipart/form-data.
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  // Only allow POST requests for image uploads.
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    // Create a formidable parser to process the incoming form data.
    const form = formidable({});

    // Parse the request and extract the uploaded files and other form fields.
    const [fields, files] = await form.parse(req);

    const imageFile = files.file?.[0];

    // Return an error if no image was uploaded.
    if (!imageFile) {
      return res.status(400).json({
        error: "No file provided",
      });
    }

    // Only allow JPEG and PNG image files.
    const allowedMimeTypes = ["image/jpeg", "image/png"];

    if (!allowedMimeTypes.includes(imageFile.mimetype)) {
      return res.status(400).json({
        error: "Only JPEG and PNG images are allowed",
      });
    }

    // Read the uploaded image from the temporary file path into a buffer.
    const fileBuffer = await fs.readFile(imageFile.filepath);

    // Upload the image buffer to Vercel Blob.
    const blob = await put(imageFile.originalFilename, fileBuffer, {
      access: "public",
      addRandomSuffix: true /* Adds a random suffix to the filename to prevent duplicate filenames e.g. in case the user has multiple plants with the same image name */,
    });

    // Return the URL of the uploaded image to the client.
    return res.status(200).json({
      url: blob.url,
    });
  } catch (error) {
    // Log the error on the server and return a generic error response.
    console.error("Upload error:", error);

    return res.status(500).json({
      error: "Upload failed",
    });
  }
}
