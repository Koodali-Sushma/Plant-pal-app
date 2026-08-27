


export default function FilterButtons ({filters, toggleFilters, clearFilters}) {
    const lightOptions = [ "Full Sun", "Partial Shade", "Full Shade"];
    const waterOptions = [ "Low", "Medium", "High"];
    const fertiliserOptions = [ "Spring", "Summer","Autumn", "Winter"];

    return <><fieldset> 
        {(lightOptions.map((option) => (
        <label key={option}>
        <input
        type="checkbox"
        checked={filters.lightNeed.includes(option)}
        onChange={() => toggleFilters("lightNeed", option)}
        />{option}
            </label>
    )))}
    </fieldset>

    <fieldset> 
        {(waterOptions.map((option) => (
        <label key={option}>
        <input
        type="checkbox"
        checked={filters.waterNeed.includes(option)}
        onChange={() => toggleFilters("waterNeed", option)}
        />{option}
            </label>
    )))}
    </fieldset>
  <fieldset> 
        {(fertiliserOptions.map((option) => (
        <label key={option}>
        <input
        type="checkbox"
        checked={filters.fertiliserSeason.includes(option)}
        onChange={() => toggleFilters("fertiliserSeason", option)}
        />{option}
            </label>
    )))}
    </fieldset>
    <button type="button" onClick={() => clearFilters()}>
        Clear all filters
    </button>
    </>
   
}