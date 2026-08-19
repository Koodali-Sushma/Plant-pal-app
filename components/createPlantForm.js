/*--- FORM TO ADD A NEW PLANT ---*/

import Image from "next/image";

export default function CreatePlantForm() {
  return (
    <>
      <h2>Add a new plant</h2>
      <form name="create-plant" aria-label="add a plant to your list">
        {/* This is just a placeholder image, has to be replaced by a real import */}
        <label>Plant Image:</label>
        <Image
          src="/images/plant-placeholder.png"
          alt="placeholder for plant image"
        />

        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="botanical-name">Botanical Name:</label>
        <input type="text" id="botanical-name" name="botanical-name" />

        <label htmlFor="water-needs">Water Needs:</label>
        <label>
          <input type="radio" name="water-needs" value="low" required />
          Low
        </label>
        <label>
          <input type="radio" name="water-needs" value="medium" />
          Medium
        </label>
        <label>
          <input type="radio" name="water-needs" value="high" />
          High
        </label>

        <label htmlFor="light-needs">Light Needs:</label>
        <label>
          <input type="radio" name="light-needs" value="full-sun" required />
          Full Sun
        </label>
        <label>
          <input type="radio" name="light-needs" value="partial-shade" />
          Partial Shade
        </label>
        <label>
          <input type="radio" name="light-needs" value="full-shade" />
          Full Shade
        </label>

        <label>
          <input type="checkbox" name="fertiliser-season" value="spring" />
          Spring
        </label>
        <label>
          <input type="checkbox" name="fertiliser-season" value="summer" />
          Summer
        </label>
        <label>
          <input type="checkbox" name="fertiliser-season" value="autumn" />
          Autumn
        </label>
        <label>
          <input type="checkbox" name="fertiliser-season" value="winter" />
          Winter
        </label>

        <label htmlFor="description">Description:</label>
        <input type="text" id="description" name="description" />

        <button type="submit">ADD</button>
      </form>
    </>
  );
}
