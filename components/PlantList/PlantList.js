import Link from "next/link";
import OwnershipButton from "@/components/PlantOwnership/OwnershipButton"; // Import your reusable ownership component
import Image from "next/image";
import PlantCard from "../PlantCard";

export default function PlantList({
  plants,
  onAddPlant,
  onOwnershipToggle,
  successMessage,
}) {
  return (
    <>
      <button
        type="button"
        onClick={onAddPlant}
        className="fixed bottom-25 right-5 z-50 flex h-14 w-14 items-center
        justify-center rounded-full bg-accent-500/80 backdrop-blur-2xl shadow-2xl transition hover:bg-(--color-primary-700) hover:shadow-xl"
      >
        <Image src="/assets/plus.svg" alt="plus sign" width={48} height={48} />
      </button>

      {/* shows message when new plant is successfully added */}
      {successMessage && (
        <p className="mb-6 rounded-xl border border-primary-500/30 bg-primary-100 px-4 py-3 text-center font-semibold text-primary-700 shadow-sm">
          {successMessage}
        </p>
      )}

      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8  list-none">
        {plants.length === 0 ? (
          <p>No plants found</p>
        ) : (
          plants.map((plant) => (
            <PlantCard
              key={plant._id}
              plant={plant}
              onOwnershipToggle={onOwnershipToggle}
            />
          ))
        )}
      </ul>
    </>
  );
}
