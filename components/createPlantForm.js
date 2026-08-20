/*--- FORM TO ADD A NEW PLANT ---*/

import Image from "next/image";
import { useState } from "react";

export default function CreatePlantForm({ onSubmitForm }) {
  const [descriptionLength, setDescriptionLength] =
    useState(0); /* to count the length of the description  */

  function handleSubmit(event) {
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
    onSubmitForm(data);
    event.target.reset();
    setDescriptionLength(0);
  }

  return (
    <>
      <h2>Add a new plant</h2>
      <form
        onSubmit={handleSubmit}
        name="create-plant"
        aria-label="add a plant to your list"
      >
        {/* This is just a placeholder image, has to be replaced by a real import */}
        <label>Plant Image:</label>
        <Image
          src="/images/plant-placeholder.png"
          alt="placeholder for plant image"
          width={200}
          height={200}
        />

        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="botanical-name">Botanical Name:</label>
        <input type="text" id="botanical-name" name="botanicalName" />

        <fieldset>
          <legend>Water Need:</legend>
          <label>
            <input type="radio" name="waterNeed" value="Low" required />
            Low
          </label>
          <label>
            <input type="radio" name="waterNeed" value="Medium" />
            Medium
          </label>
          <label>
            <input type="radio" name="waterNeed" value="High" />
            High
          </label>
        </fieldset>

        <fieldset>
          <legend>Light Need:</legend>
          <label>
            <input type="radio" name="lightNeed" value="Full Sun" required />
            Full Sun
          </label>
          <label>
            <input type="radio" name="lightNeed" value="Partial Shade" />
            Partial Shade
          </label>
          <label>
            <input type="radio" name="lightNeed" value="Full Shade" />
            Full Shade
          </label>
        </fieldset>

        <fieldset>
          <legend>Fertiliser Season:</legend>
          <label>
            <input type="checkbox" name="fertiliserSeason" value="Spring" />
            Spring
          </label>
          <label>
            <input type="checkbox" name="fertiliserSeason" value="Summer" />
            Summer
          </label>
          <label>
            <input type="checkbox" name="fertiliserSeason" value="Autumn" />
            Autumn
          </label>
          <label>
            <input type="checkbox" name="fertiliserSeason" value="Winter" />
            Winter
          </label>
        </fieldset>

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          maxLength={250}
          onChange={(event) => setDescriptionLength(event.target.value.length)}
        />
        <small>{descriptionLength} / 250</small>

        <label htmlFor="room">Select a Room:</label>
        <select name="room" id="room">
          <option value="livingRoom">Living Room</option>
          <option value="kitchen">Kitchen</option>
          <option value="bedroom">Bedroom</option>
          <option value="balcony">Balcony</option>
          <option value="bathroom">Bathroom</option>
          <option value="other">Other</option>{" "}
          {/* has to be updated once the rooms component is build */}
        </select>

        <button type="submit">ADD</button>
      </form>
    </>
  );
}
