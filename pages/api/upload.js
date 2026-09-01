import { put } from "@vercel/blob";
import formidable from "formidable";
import fs from "fs/promises";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const form = formidable({});

    const [fields, files] = await form.parse(req);

    const imageFile = files.file?.[0];

    if (!imageFile) {
      return res.status(400).json({
        error: "No file provided",
      });
    }

    const maxFileSize = 5 * 1024 * 1024;

    if (imageFile.size > maxFileSize) {
      return res.status(400).json({
        error: "Image must not exceed 5 MB",
      });
    }

    const allowedMimeTypes = ["image/jpeg", "image/png"];

    if (!allowedMimeTypes.includes(imageFile.mimetype)) {
      return res.status(400).json({
        error: "Only JPEG and PNG images are allowed",
      });
    }

    const fileBuffer = await fs.readFile(imageFile.filepath);

    const blob = await put(imageFile.originalFilename, fileBuffer, {
      access: "public",
      addRandomSuffix: true,
    });

    return res.status(200).json({
      url: blob.url,
    });
  } catch (error) {
    console.error("Upload error:", error);

    return res.status(500).json({
      error: "Upload failed",
    });
  }
}
