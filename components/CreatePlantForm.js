/*--- FORM TO ADD A NEW PLANT ---*/

import Image from "next/image";
import { useState } from "react";

export default function CreatePlantForm({
  onSubmitForm,
  onCancel,
  initialData,
}) {
  const [imageError, setImageError] = useState("");
  const [descriptionLength, setDescriptionLength] = useState(
    initialData?.description ? initialData.description.length : 0,
  );

  const imagePath = initialData
    ? initialData.imageUrl
    : "/images/plant-placeholder.png";

  const [imagePreview, setImagePreview] =
    useState(imagePath); /* set the preview for the plant image */

  const isOwnedValue = initialData ? initialData.isOwned : false;

  // Create a temporary URL for the selected image and update the preview.
  function handleImageChange(event) {
    const file = event.target.files[0];

    if (!file) return;

    // Only allow JPEG, PNG, and WebP image files.
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedMimeTypes.includes(file.type)) {
      setImageError("Please select a JPEG or PNG image.");
      return;
    }

    // Clear any previous image error.
    setImageError("");

    // Create a temporary URL for the selected image and update the preview.
    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    // Collect all form data from the submitted form.
    const formData = new FormData(event.target);
    const imageFile = formData.get("file");

    // Keep the existing image path as the default value.
    let imageUrl = imagePath;

    // Upload the selected image to Vercel Blob if a file was selected.
    if (imageFile && imageFile.size > 0) {
      const uploadFormData = new FormData();
      uploadFormData.append("file", imageFile);

      // Send the image to the upload API endpoint.
      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      });

      // Stop submitting the form if the image upload failed.
      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json().catch(() => ({}));

        console.error("Image upload failed:", errorData);

        setImageError(errorData.error || "Image upload failed.");
        return;
      }

      // Get the public Blob URL returned by the upload endpoint.
      const uploadData = await uploadResponse.json();
      imageUrl = uploadData.url;
    }

    const data = {
      name: formData.get("name"),
      botanicalName: formData.get("botanicalName"),
      imageUrl: imageUrl,
      waterNeed: formData.get("waterNeed"),
      lightNeed: formData.get("lightNeed"),
      fertiliserSeason: formData.getAll("fertiliserSeason"),
      description: formData.get("description"),
    };

    await onSubmitForm(data);
  }
  return (
    <>
      <div className="mx-auto w-full max-w-2xl rounded-3xl bg-primary-100 p-5 shadow-lg sm:p-8 mb-10">
        <h2 className="mb-2 font-heading text-3xl font-bold">
          {initialData ? "Edit a plant" : "Add a new plant"}
        </h2>

        <form
          onSubmit={handleSubmit}
          name="create-plant"
          aria-label="add a plant to your list"
          className="flex flex-col gap-6"
        >
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 rounded-xl border-2 border-secondary-500 px-5 py-3 font-semibold text-secondary-500 transition hover:bg-secondary-500 hover:text-background cursor-pointer"
            >
              Cancel
            </button>
          </div>

          <div className="flex flex-col items-center gap-3">
            <label className="flex flex-col gap-2 font-semibold">
              Plant Image:
            </label>
            <Image
              src={imagePreview}
              alt="Preview of selected plant image"
              width={200}
              height={200}
              className="h-50 w-50 rounded-xl object-cover" /* object-cover cuts the uploaded picture in the preview to the size 200x200px (same as h- and w-50) */
            />
            {/* Allow the user to select an image for the plant. */}
            <label
              htmlFor="plant-image"
              className="cursor-pointer rounded-xl bg-primary-500 px-5 py-3 font-semibold text-background transition hover:bg-primary-700"
            >
              Choose an image
            </label>

            <input
              id="plant-image"
              type="file"
              name="file"
              accept="image/jpeg, image/png" /* only allows jpg, jpeg and png to be uploaded */
              className="hidden"
              onChange={handleImageChange}
            />

            {/* display error message when the wrong image type is uploaded */}
            {imageError && (
              <p className="text-sm font-semibold text-red-600">{imageError}</p>
            )}
          </div>

          <label htmlFor="name" className="flex flex-col gap-2 font-semibold">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={initialData ? initialData.name : ""}
            required
            className="rounded-xl border border-primary-500 bg-white px-4 py-3 font-normal outline-none transition focus:ring-2 focus:ring-primary-700/30"
          />

          <label
            htmlFor="botanical-name"
            className="flex flex-col gap-2 font-semibold"
          >
            Botanical Name:
          </label>
          <input
            type="text"
            id="botanical-name"
            name="botanicalName"
            defaultValue={initialData ? initialData.botanicalName : ""}
            className="rounded-xl border border-primary-500 bg-white px-4 py-3 font-normal outline-none transition focus:ring-2 focus:ring-primary-700/30"
          />

          <fieldset>
            <legend className="flex flex-col gap-2 font-semibold mb-1">
              Water Need:
            </legend>
            <div className="grid grid-cols-3 gap-3">
              <label className="flex w-full cursor-pointer justify-center gap-1 whitespace-nowrap">
                <input
                  type="radio"
                  name="waterNeed"
                  value="Low"
                  required
                  defaultChecked={initialData?.waterNeed === "Low"}
                />
                Low
              </label>
              <label className="flex w-full cursor-pointer justify-center gap-1 whitespace-nowrap">
                <input
                  type="radio"
                  name="waterNeed"
                  value="Medium"
                  defaultChecked={initialData?.waterNeed === "Medium"}
                />
                Medium
              </label>
              <label className="flex w-full cursor-pointer justify-center gap-1 whitespace-nowrap">
                <input
                  type="radio"
                  name="waterNeed"
                  value="High"
                  defaultChecked={initialData?.waterNeed === "High"}
                />
                High
              </label>
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-1 font-semibold">Light Need:</legend>
            <div className="grid grid-cols-3 gap-1">
              <label className="flex w-full cursor-pointer justify-center gap-1 whitespace-nowrap">
                <input
                  type="radio"
                  name="lightNeed"
                  value="Full Sun"
                  required
                  defaultChecked={initialData?.lightNeed === "Full Sun"}
                />
                Full Sun
              </label>
              <label className="flex w-full cursor-pointer justify-center gap-1 whitespace-nowrap">
                <input
                  type="radio"
                  name="lightNeed"
                  value="Partial Shade"
                  defaultChecked={initialData?.lightNeed === "Partial Shade"}
                />
                Partial Shade
              </label>
              <label className="flex w-full cursor-pointer justify-center gap-1 whitespace-nowrap">
                <input
                  type="radio"
                  name="lightNeed"
                  value="Full Shade"
                  defaultChecked={initialData?.lightNeed === "Full Shade"}
                />
                Full Shade
              </label>
            </div>
          </fieldset>

          <fieldset>
            <legend className="flex flex-col gap-2 font-semibold mb-1">
              Fertiliser Season:
            </legend>
            <div className="grid grid-cols-4 gap-3">
              <label className="flex w-full cursor-pointer justify-center gap-1 whitespace-nowrap">
                <input
                  type="checkbox"
                  name="fertiliserSeason"
                  value="Spring"
                  defaultChecked={initialData?.fertiliserSeason?.includes(
                    "Spring",
                  )}
                />
                Spring
              </label>
              <label className="flex w-full cursor-pointer justify-center gap-1 whitespace-nowrap">
                <input
                  type="checkbox"
                  name="fertiliserSeason"
                  value="Summer"
                  defaultChecked={initialData?.fertiliserSeason?.includes(
                    "Summer",
                  )}
                />
                Summer
              </label>
              <label className="flex w-full cursor-pointer justify-center gap-1 whitespace-nowrap">
                <input
                  type="checkbox"
                  name="fertiliserSeason"
                  value="Autumn"
                  defaultChecked={initialData?.fertiliserSeason?.includes(
                    "Autumn",
                  )}
                />
                Autumn
              </label>
              <label className="flex w-full cursor-pointer justify-center gap-1 whitespace-nowrap">
                <input
                  type="checkbox"
                  name="fertiliserSeason"
                  value="Winter"
                  defaultChecked={initialData?.fertiliserSeason?.includes(
                    "Winter",
                  )}
                />
                Winter
              </label>
            </div>
          </fieldset>

          <label
            htmlFor="description"
            className="flex flex-col gap-2 font-semibold"
          >
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            maxLength={250}
            onChange={(event) =>
              setDescriptionLength(event.target.value.length)
            }
            defaultValue={initialData ? initialData.description : ""}
            className="min-h-32 resize-y rounded-xl border border-primary-500 bg-white px-4 py-3 font-normal outline-none transition focus:ring-2 focus:ring-primary-700/30"
          />
          <small className="self-end font-normal text-secondary-700">
            {descriptionLength} / 250
          </small>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 rounded-xl bg-primary-700 px-5 
              py-3 font-semibold text-background shadow-sm transition 
              hover:bg-foreground hover:shadow-md cursor-pointer"
            >
              {initialData ? "UPDATE" : "ADD"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
