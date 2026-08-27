export function filterPlants( data, filters ) {
    const filteredPlants = data.filter((plant) => {
  const lightOk = filters.lightNeed.length === 0 || filters.lightNeed.includes(plant.lightNeed);
  const waterOk = filters.waterNeed.length === 0 || filters.waterNeed.includes(plant.waterNeed);
  const fertOk  = filters.fertiliserSeason.length === 0 || filters.fertiliserSeason.some((season) => plant.fertiliserSeason.includes(season));
  return lightOk && waterOk && fertOk;
});
return filteredPlants;
}