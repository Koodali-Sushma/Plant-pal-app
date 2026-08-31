


export default function FilterButtons ({filters, toggleFilters, clearFilters}) {
    const lightOptions = [ "Full Sun", "Partial Shade", "Full Shade"];
    const waterOptions = [ "Low", "Medium", "High"];
    const fertiliserOptions = [ "Spring", "Summer","Autumn", "Winter"];

    return <><fieldset className="flex gap-2 mb-2"> 
        {(lightOptions.map((option) => (
        <label key={option} className="bg-(--color-secondary-500) backdrop-blur-md  p-2 text-sm/5 rounded-full border-(--color-secondary-100) hover:bg-(--color-secondary-100)">
        <input
        className="peer sr-only"
        type="checkbox"
        checked={filters.lightNeed.includes(option)}
        onChange={() => toggleFilters("lightNeed", option)}
        />{option}
            </label>
    )))}
    </fieldset>

    <fieldset className="flex gap-2 mb-2"> 
        {(waterOptions.map((option) => (
        <label key={option} className="bg-(--color-secondary-500) backdrop-blur-md  p-2 text-sm/5 rounded-3xl border-(--color-secondary-100) peer-checked:bg-(--color-secondary-100)">
        <input
          className="peer sr-only"
        type="checkbox"
        checked={filters.waterNeed.includes(option)}
        onChange={() => toggleFilters("waterNeed", option)}
        />{option}
            </label>
    )))}
    </fieldset>
  <fieldset className="flex mb-2 gap-2"> 
        {(fertiliserOptions.map((option) => (
        <label for={option} key={option} className="bg-(--color-secondary-500) backdrop-blur-md p-2 text-sm/5 rounded-3xl border-(--color-secondary-100) peer-checked:bg-(--color-secondary-100)">
        <input
          className="peer sr-only"
        type="checkbox"
        checked={filters.fertiliserSeason.includes(option)}
        onChange={() => toggleFilters("fertiliserSeason", option)}
        />{option}
            </label>
    )))}
    </fieldset>
    <button
    className="bg-(--color-accent-500) backdrop-blur-md border-3 p-2 text-sm/5 rounded-3xl border-(--color-secondary-100) hover:bg-(--color-secondary-100)"
     type="button" onClick={() => clearFilters()}>
        Clear all filters
      </button>
    </>
});
}
