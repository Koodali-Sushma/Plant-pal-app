/*--- FORM TO ADD A NEW PLANT ---*/

import Image from "next/image";
import { useState } from "react";

export default function CreatePlantForm({ onSubmitForm, onCancel }) {
  const [descriptionLength, setDescriptionLength] =
    useState(0); /* to count the length of the description  */

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      name: formData.get("name"),
      botanicalName: formData.get("botanicalName"),
      imageUrl:
        "/images/plant-placeholder.png" /* has to be replaced when image upload is possible */,
      waterNeed: formData.get("waterNeed"),
      lightNeed: formData.get("lightNeed"),
      fertiliserSeason:
        formData.getAll(
          "fertiliserSeason",
        ) /* getAll because the user can click multiple seasons, returns an array */,
      description: formData.get("description"),
      room: formData.get("room"),
    };

    const success = await onSubmitForm(data);

    if (success) {
      event.target.reset();
      setDescriptionLength(0);
    }
  }

  return (
    <>
      <div className="mx-auto w-full max-w-2xl rounded-3xl bg-primary-100 p-5 shadow-lg sm:p-8">
        <h2 className="mb-2 var(--font-heading) text-3xl font-bold">
          Add a new plant
        </h2>

        <form
          onSubmit={handleSubmit}
          name="create-plant"
          aria-label="add a plant to your list"
          className="flex flex-col gap-6"
        >
          {/* This is just a placeholder image, has to be replaced by a real import */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 rounded-xl border-2 border-secondary-500 px-5 py-3 font-semibold text-secondary-500 transition hover:bg-secondary-500 hover:text-background"
            >
              Cancel
            </button>
          </div>

          <div className="flex flex-col items-center gap-3">
            <label className="flex flex-col gap-2 font-semibold">
              Plant Image:
            </label>
            <Image
              src="/images/plant-placeholder.png"
              alt="placeholder for plant image"
              width={200}
              height={200}
              className="rounded-xl object-cover"
            />
          </div>

          <label htmlFor="name" className="flex flex-col gap-2 font-semibold">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
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
            className="rounded-xl border border-primary-500 bg-white px-4 py-3 font-normal outline-none transition focus:ring-2 focus:ring-primary-700/30" /* /30 means 30% of opacity */
          />

          <fieldset>
            <legend className="flex flex-col gap-2 font-semibold mb-1">
              Water Need:
            </legend>

            <div className="grid grid-cols-3 gap-3">
              <label className="flex w-full cursor-pointer justify-center gap-1 whitespace-nowrap">
                <input type="radio" name="waterNeed" value="Low" required />
                Low
              </label>
              <label className="flex w-full cursor-pointer justify-center gap-1 whitespace-nowrap">
                <input type="radio" name="waterNeed" value="Medium" />
                Medium
              </label>
              <label className="flex w-full cursor-pointer justify-center gap-1 whitespace-nowrap">
                <input type="radio" name="waterNeed" value="High" />
                High
              </label>
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-1 font-semibold ">Light Need:</legend>
            <div className="grid grid-cols-3 gap-1">
              <label className="flex w-full cursor-pointer justify-center gap-1 whitespace-nowrap">
                <input
                  type="radio"
                  name="lightNeed"
                  value="Full Sun"
                  required
                />
                Full Sun
              </label>
              <label className="flex w-full cursor-pointer justify-center gap-1 whitespace-nowrap">
                <input type="radio" name="lightNeed" value="Partial Shade" />
                Partial Shade
              </label>
              <label className="flex w-full cursor-pointer justify-center gap-1 whitespace-nowrap">
                <input type="radio" name="lightNeed" value="Full Shade" />
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
                <input type="checkbox" name="fertiliserSeason" value="Spring" />
                Spring
              </label>
              <label className="flex w-full cursor-pointer justify-center gap-1 whitespace-nowrap">
                <input type="checkbox" name="fertiliserSeason" value="Summer" />
                Summer
              </label>
              <label className="flex w-full cursor-pointer justify-center gap-1 whitespace-nowrap">
                <input type="checkbox" name="fertiliserSeason" value="Autumn" />
                Autumn
              </label>
              <label className="flex w-full cursor-pointer justify-center gap-1 whitespace-nowrap">
                <input type="checkbox" name="fertiliserSeason" value="Winter" />
                Winter
              </label>
            </div>
          </fieldset>

          <label
            htmlFor="description"
            className="flex flex-col gap-2 font-semibold "
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
            className="min-h-32 resize-y rounded-xl border border-primary-500 bg-white px-4 py-3 font-normal outline-none transition focus:ring-2 focus:ring-primary-700/30"
          />
          <small className="self-end font-normal text-secondary-700">
            {descriptionLength} / 250
          </small>

          <label htmlFor="room" className="flex flex-col gap-2 font-semibold">
            Select a Room:
          </label>
          <select
            name="room"
            id="room"
            className="rounded-xl border border-primary-500 bg-white px-4 py-3 outline-none transition focus:ring-2 focus:ring-primary-700/30"
          >
            <option value="">Select a room</option>
            <option value="livingRoom">Living Room</option>
            <option value="kitchen">Kitchen</option>
            <option value="bedroom">Bedroom</option>
            <option value="balcony">Balcony</option>
            <option value="bathroom">Bathroom</option>
            <option value="other">Other</option>{" "}
            {/* has to be updated once the rooms component is build */}
          </select>
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 rounded-xl bg-primary-700 px-5 py-3 font-semibold text-background shadow-sm transition hover:bg-foreground hover:shadow-md"
            >
              ADD
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
