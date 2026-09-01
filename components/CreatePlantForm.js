/*--- FORM TO ADD A NEW PLANT ---*/
import {
  WaterIcon,
  LightIcon,
  SpringIcon,
  AutumnIcon,
  WinterIcon,
  PartialShadeIcon,
  FullShadeIcon,
} from "@/components/SvgIcons";
import Image from "next/image";
import { useState } from "react";

export default function CreatePlantForm({
  onSubmitForm,
  onCancel,
  initialData,
}) {
  const [imageError, setImageError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [descriptionLength, setDescriptionLength] = useState(
    initialData?.description ? initialData.description.length : 0,
  );

  const imagePath = initialData
    ? initialData.imageUrl
    : "/images/plant-placeholder.png";

  const [imagePreview, setImagePreview] = useState(imagePath);

  const isOwnedValue = initialData ? initialData.isOwned : false;

  function handleImageChange(event) {
    const file = event.target.files[0];

    if (!file) return;

    const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedMimeTypes.includes(file.type)) {
      setImageError("Please select a JPEG or PNG image.");
      return;
    }

    setImageError("");

    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const imageFile = formData.get("file");

    let imageUrl = imagePath;

    if (imageFile && imageFile.size > 0) {
      const uploadFormData = new FormData();
      uploadFormData.append("file", imageFile);

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json().catch(() => ({}));

        console.error("Image upload failed:", errorData);

        setImageError(errorData.error || "Image upload failed.");
        return;
      }

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

    const success = await onSubmitForm(data);

    if (!success) {
      setSubmitError("Failed to save the plant. Please try again.");
      return;
    }
  }
  return (
    <>
      <div className="mx-auto w-full max-w-2xl rounded-3xl bg-primary-100 p-5 shadow-lg sm:p-8 mb-10">
        <h2 className="mb-2 font-heading text-3xl font-bold pb-4 text-primary-700">
          {initialData ? "Edit a plant" : "Add a new plant"}
        </h2>

        <form
          onSubmit={handleSubmit}
          name="create-plant"
          aria-label="add a plant to your list"
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col items-center gap-3">
            <label className="flex flex-col gap-2 font-semibold self-start text-secondary-900">
              Plant Image:
            </label>
            <Image
              src={imagePreview}
              alt="Preview of selected plant image"
              width={200}
              height={200}
              className="h-54 w-full rounded-xl object-cover"
            />

            <label
              htmlFor="plant-image"
              className="w-full text-center cursor-pointer rounded-xl bg-primary-700 px-5 py-3 font-semibold text-background transition hover:bg-foreground"
            >
              Upload image
            </label>

            <input
              id="plant-image"
              type="file"
              name="file"
              accept="image/jpeg, image/png"
              className="hidden"
              onChange={handleImageChange}
            />

            {imageError && (
              <p className="text-sm font-semibold text-secondary-500">
                {imageError}
              </p>
            )}
          </div>

          <label
            htmlFor="name"
            className="flex flex-col gap-2 font-semibold text-secondary-900"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="e.g. Monstera"
            defaultValue={initialData ? initialData.name : ""}
            required
            className="rounded-xl border border-primary-700 bg-background text-foreground px-4 py-3 font-normal outline-none transition focus:ring-2 focus:ring-primary-700/50"
          />

          <label
            htmlFor="botanical-name"
            className="flex flex-col gap-2 font-semibold text-secondary-900"
          >
            Botanical Name:
          </label>
          <input
            type="text"
            id="botanical-name"
            name="botanicalName"
            placeholder="Monstera deliciosa"
            defaultValue={initialData ? initialData.botanicalName : ""}
            className="rounded-xl border border-primary-700 bg-background text-foreground px-4 py-3 font-normal outline-none transition focus:ring-2 focus:ring-primary-700/50"
          />

          <fieldset>
            <legend className="flex items-center gap-2 font-semibold text-secondary-900 mb-3">
              Water Need:
            </legend>
            <div className="grid grid-cols-3 gap-3">
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="waterNeed"
                  value="Low"
                  required
                  defaultChecked={initialData?.waterNeed === "Low"}
                  className="peer sr-only"
                />
                <div className="flex h-24 flex-col items-center justify-center gap-2 rounded-2xl border-2 border-primary-100 bg-background p-2 text-foreground/80 transition-all hover:bg-water-100/50 peer-checked:border-water-500 peer-checked:bg-water-100 peer-checked:text-water-700 font-medium text-sm text-center">
                  <div className="flex items-center justify-center gap-0.5">
                    <WaterIcon className="h-6 w-6 text-current" />
                  </div>
                  Low
                </div>
              </label>

              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="waterNeed"
                  value="Medium"
                  defaultChecked={initialData?.waterNeed === "Medium"}
                  className="peer sr-only"
                />
                <div className="flex h-24 flex-col items-center justify-center gap-2 rounded-2xl border-2 border-primary-100 bg-background p-2 text-foreground/80 transition-all hover:bg-water-100/50 peer-checked:border-water-500 peer-checked:bg-water-100 peer-checked:text-water-700 font-medium text-sm text-center">
                  <div className="flex items-center justify-center gap-0.5">
                    <WaterIcon className="h-6 w-6 text-current" />
                    <WaterIcon className="h-6 w-6 text-current" />
                  </div>
                  Medium
                </div>
              </label>

              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="waterNeed"
                  value="High"
                  defaultChecked={initialData?.waterNeed === "High"}
                  className="peer sr-only"
                />
                <div className="flex h-24 flex-col items-center justify-center gap-2 rounded-2xl border-2 border-primary-100 bg-background p-2 text-foreground/80 transition-all hover:bg-water-100/50 peer-checked:border-water-500 peer-checked:bg-water-100 peer-checked:text-water-700 font-medium text-sm text-center">
                  <div className="flex items-center justify-center gap-0.5">
                    <WaterIcon className="h-6 w-6 text-current" />
                    <WaterIcon className="h-6 w-6 text-current" />
                    <WaterIcon className="h-6 w-6 text-current" />
                  </div>
                  High
                </div>
              </label>
            </div>
          </fieldset>

          <fieldset>
            <legend className="flex items-center gap-2 font-semibold text-secondary-900 mb-3">
              Light Need:
            </legend>
            <div className="grid grid-cols-3 gap-3">
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="lightNeed"
                  value="Full Sun"
                  required
                  defaultChecked={initialData?.lightNeed === "Full Sun"}
                  className="peer sr-only"
                />
                <div className="flex h-24 flex-col items-center justify-center gap-2 rounded-2xl border-2 border-primary-100 bg-background p-2 text-foreground/80 transition-all hover:bg-secondary-100/50 peer-checked:border-accent-500 peer-checked:bg-secondary-100 peer-checked:text-secondary-900 font-medium text-sm text-center">
                  <div className="flex items-center justify-center gap-0.5">
                    <LightIcon className="h-6 w-6 text-current" />
                  </div>
                  Full Sun
                </div>
              </label>

              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="lightNeed"
                  value="Partial Shade"
                  defaultChecked={initialData?.lightNeed === "Partial Shade"}
                  className="peer sr-only"
                />
                <div className="flex h-24 flex-col items-center justify-center gap-2 rounded-2xl border-2 border-primary-100 bg-background p-2 text-foreground/80 transition-all hover:bg-secondary-100/50 peer-checked:border-accent-500 peer-checked:bg-secondary-100 peer-checked:text-secondary-900 font-medium text-sm text-center">
                  <div className="flex items-center justify-center gap-0.5">
                    <PartialShadeIcon className="h-6 w-6 text-current" />
                  </div>
                  Partial Shade
                </div>
              </label>

              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="lightNeed"
                  value="Full Shade"
                  defaultChecked={initialData?.lightNeed === "Full Shade"}
                  className="peer sr-only"
                />
                <div className="flex h-24 flex-col items-center justify-center gap-2 rounded-2xl border-2 border-primary-100 bg-background p-2 text-foreground/80 transition-all hover:bg-secondary-100/50 peer-checked:border-accent-500 peer-checked:bg-secondary-100 peer-checked:text-secondary-900 font-medium text-sm text-center">
                  <div className="flex items-center justify-center gap-0.5">
                    <FullShadeIcon className="h-6 w-6 text-current" />
                  </div>
                  Full Shade
                </div>
              </label>
            </div>
          </fieldset>

          <fieldset>
            <legend className="flex items-center gap-2 font-semibold text-secondary-900 mb-3">
              Fertiliser Season:
            </legend>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <label className="cursor-pointer">
                <input
                  type="checkbox"
                  name="fertiliserSeason"
                  value="Spring"
                  defaultChecked={initialData?.fertiliserSeason?.includes(
                    "Spring",
                  )}
                  className="peer sr-only"
                />
                <div className="flex h-24 flex-col items-center justify-center gap-2 rounded-2xl border-2 border-primary-100 bg-background p-2 text-foreground/80 transition-all hover:bg-secondary-100/50 peer-checked:border-secondary-500 peer-checked:bg-secondary-100 peer-checked:text-secondary-900 font-medium text-sm">
                  <div className="flex items-center justify-center gap-0.5">
                    <SpringIcon className="h-6 w-6 text-current" />
                  </div>
                  Spring
                </div>
              </label>
              <label className="cursor-pointer">
                <input
                  type="checkbox"
                  name="fertiliserSeason"
                  value="Summer"
                  defaultChecked={initialData?.fertiliserSeason?.includes(
                    "Summer",
                  )}
                  className="peer sr-only"
                />
                <div className="flex h-24 flex-col items-center justify-center gap-2 rounded-2xl border-2 border-primary-100 bg-background p-2 text-foreground/80 transition-all hover:bg-secondary-100/50 peer-checked:border-secondary-500 peer-checked:bg-secondary-100 peer-checked:text-secondary-900 font-medium text-sm">
                  <div className="flex items-center justify-center gap-0.5">
                    <LightIcon className="h-6 w-6 text-current" />
                  </div>
                  Summer
                </div>
              </label>
              <label className="cursor-pointer">
                <input
                  type="checkbox"
                  name="fertiliserSeason"
                  value="Autumn"
                  defaultChecked={initialData?.fertiliserSeason?.includes(
                    "Autumn",
                  )}
                  className="peer sr-only"
                />
                <div className="flex h-24 flex-col items-center justify-center gap-2 rounded-2xl border-2 border-primary-100 bg-background p-2 text-foreground/80 transition-all hover:bg-secondary-100/50 peer-checked:border-secondary-500 peer-checked:bg-secondary-100 peer-checked:text-secondary-900 font-medium text-sm">
                  <div className="flex items-center justify-center gap-0.5">
                    <AutumnIcon className="h-6 w-6 text-current" />
                  </div>
                  Autumn
                </div>
              </label>
              <label className="cursor-pointer">
                <input
                  type="checkbox"
                  name="fertiliserSeason"
                  value="Winter"
                  defaultChecked={initialData?.fertiliserSeason?.includes(
                    "Winter",
                  )}
                  className="peer sr-only"
                />
                <div className="flex h-24 flex-col items-center justify-center gap-2 rounded-2xl border-2 border-primary-100 bg-background p-2 text-foreground/80 transition-all hover:bg-secondary-100/50 peer-checked:border-secondary-500 peer-checked:bg-secondary-100 peer-checked:text-secondary-900 font-medium text-sm">
                  <div className="flex items-center justify-center gap-0.5">
                    <WinterIcon className="h-6 w-6 text-current" />
                  </div>
                  Winter
                </div>
              </label>
            </div>
          </fieldset>

          <label
            htmlFor="description"
            className="flex flex-col gap-2 font-semibold text-secondary-900"
          >
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Add any care notes or details about this plant..."
            maxLength={250}
            onChange={(event) =>
              setDescriptionLength(event.target.value.length)
            }
            defaultValue={initialData ? initialData.description : ""}
            className="min-h-32 resize-y rounded-xl border border-primary-700 bg-background text-foreground px-4 py-3 font-normal outline-none transition focus:ring-2 focus:ring-primary-700/50"
          />
          <small className="self-end font-normal text-secondary-700">
            {descriptionLength} / 250
          </small>

          {submitError && (
            <p className="text-center font-semibold text-red-600">
              {submitError}
            </p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 rounded-xl bg-primary-700 px-5 py-3 font-semibold text-background shadow-sm transition hover:bg-foreground hover:text-background cursor-pointer"
            >
              {initialData ? "UPDATE" : "ADD"}
            </button>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 rounded-xl border-2 border-secondary-500 px-5 py-3 font-semibold text-secondary-500 bg-secondary-100 transition hover:bg-secondary-500 hover:text-background cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
