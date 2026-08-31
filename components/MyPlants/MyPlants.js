import PlantCard from "../PlantCard";

export default function MyPlants({
  plants,
  onOwnershipToggle,
  successMessage,
}) {
  return (
    <>
      {/* shows message when new plant is successfully added */}
      {successMessage && (
        <p className="mb-6 rounded-xl border border-primary-500/30 bg-primary-100 px-4 py-3 text-center font-semibold text-primary-700 shadow-sm">
          {successMessage}
        </p>
      )}
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8  list-none">
        {plants.map((plant) => (
          <PlantCard
            key={plant._id}
            plant={plant}
            onOwnershipToggle={onOwnershipToggle}
          />
        ))}
      </ul>
    </>
  );
}
