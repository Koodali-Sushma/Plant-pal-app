/*--- FORM TO ADD A NEW PLANT ---*/

import Image from "next/image";
import { useState } from "react";

export default function CreatePlantForm({
  onSubmitForm,
  onCancel,
  initialData,
}) {
  const [descriptionLength, setDescriptionLength] =
    useState(0); /* to count the length of the description  */
  const [successMessage, setSuccessMessage] = useState("");

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

    /* after submitting the data show a message for the user */
    const success = await onSubmitForm(data);

    if (success) {
      event.target.reset();
      setDescriptionLength(0);
      setSuccessMessage(
        initialData ? "Plant successfully updated" : "Plant successfully added",
      );

      /* message disappears after 3 seconds */
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }
  }

  return (
    <>
      {initialData ? <h2>Edit a plant</h2> : <h2>Add a new plant</h2>}
      {successMessage && <p>{successMessage}</p>}
      <form
        onSubmit={handleSubmit}
        name="create-plant"
        aria-label="add a plant to your list"
      >
        {/* This is just a placeholder image, has to be replaced by a real import */}
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <label>Plant Image:</label>
        <Image
          src="/images/plant-placeholder.png"
          alt="placeholder for plant image"
          width={200}
          height={200}
        />

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={initialData ? initialData.name : ""}
          required
        />

        <label htmlFor="botanical-name">Botanical Name:</label>
        <input
          type="text"
          id="botanical-name"
          name="botanicalName"
          defaultValue={initialData ? initialData.botanicalName : ""}
        />

        <fieldset>
          <legend>Water Need:</legend>
          <label>
            <input
              type="radio"
              name="waterNeed"
              value="Low"
              required
              defaultChecked={initialData?.waterNeed === "Low"}
            />
            Low
          </label>
          <label>
            <input
              type="radio"
              name="waterNeed"
              value="Medium"
              defaultChecked={initialData?.waterNeed === "Medium"}
            />
            Medium
          </label>
          <label>
            <input
              type="radio"
              name="waterNeed"
              value="High"
              defaultChecked={initialData?.waterNeed === "High"}
            />
            High
          </label>
        </fieldset>

        <fieldset>
          <legend>Light Need:</legend>
          <label>
            <input
              type="radio"
              name="lightNeed"
              value="Full Sun"
              required
              defaultChecked={initialData?.lightNeed === "Full Sun"}
            />
            Full Sun
          </label>
          <label>
            <input
              type="radio"
              name="lightNeed"
              value="Partial Shade"
              defaultChecked={initialData?.lightNeed === "Partial Shade"}
            />
            Partial Shade
          </label>
          <label>
            <input
              type="radio"
              name="lightNeed"
              value="Full Shade"
              defaultChecked={initialData?.lightNeed === "Full Shade"}
            />
            Full Shade
          </label>
        </fieldset>

        <fieldset>
          <legend>Fertiliser Season:</legend>
          <label>
            <input
              type="checkbox"
              name="fertiliserSeason"
              value="Spring"
              defaultChecked={initialData?.fertiliserSeason?.includes("Spring")}
            />
            Spring
          </label>
          <label>
            <input
              type="checkbox"
              name="fertiliserSeason"
              value="Summer"
              defaultChecked={initialData?.fertiliserSeason?.includes("Summer")}
            />
            Summer
          </label>
          <label>
            <input
              type="checkbox"
              name="fertiliserSeason"
              value="Autumn"
              defaultChecked={initialData?.fertiliserSeason?.includes("Autumn")}
            />
            Autumn
          </label>
          <label>
            <input
              type="checkbox"
              name="fertiliserSeason"
              value="Winter"
              defaultChecked={initialData?.fertiliserSeason?.includes("Winter")}
            />
            Winter
          </label>
        </fieldset>

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          maxLength={250}
          onChange={(event) => setDescriptionLength(event.target.value.length)}
          defaultValue={initialData ? initialData.description : ""}
        />
        <small>{descriptionLength} / 250</small>

        <label htmlFor="room">Select a Room:</label>
        <select
          name="room"
          id="room"
          defaultValue={initialData ? initialData.room : ""}
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

        {initialData ? (
          <button type="submit">UPDATE</button>
        ) : (
          <button type="submit">ADD</button>
        )}
      </form>
    </>
  );
}
