/*--- FORM TO ADD A NEW PLANT ---*/

import Image from "next/image";

export default function CreatePlantForm({ onSubmitForm }) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      name: formData.get("name"),
      botanicalName: formData.get("botanicalName"),
      imageUrl: formData.get("imageUrl"),
      waterNeed: formData.get("waterNeed"),
      lightNeed: formData.get("lightNeed"),
      fertiliserSeason:
        formData.getAll(
          "fertiliserSeason",
        ) /* getAll because the user can click multiple seasons */,
      description: formData.get("description"),
    };
    onSubmitForm(data);
    event.target.reset();
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
        />

        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="botanical-name">Botanical Name:</label>
        <input type="text" id="botanical-name" name="botanicalName" />

        <label htmlFor="water-need">Water Need:</label>
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

        <label htmlFor="light-need">Light Need:</label>
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

        <label htmlFor="description">Description:</label>
        <input type="text" id="description" name="description" />

        <button type="submit">ADD</button>
      </form>
    </>
  );
}
