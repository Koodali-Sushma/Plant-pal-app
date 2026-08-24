import Link from "next/link";
import OwnershipButton from "@/components/OwnershipButton/OwnershipButton"; // Import your reusable ownership component
import Image from "next/image";

export default function MyPlants({ plants, onOwnershipToggle }) {
  return (
    <>
      <ul className="grid grid-cols-2 m-auto gap-5  list-none w-100">
        {plants.map((plant) => (
          <li
            key={plant._id}
            className="group relative h-40 w-40 m-auto overflow-hidden rounded-2xl border-(--color-secondary-500)"
          >
            {plant.imageUrl && (
              <Image
                placeholder="blur"
                blurDataURL={plant.imageUrl}
                src={plant.imageUrl}
                alt={plant.name}
                fill
                sizes="(max-width: 768px) 50vw, 300px"
                className="object-cover transition-transform duration-300  z-0"
              />
            )}
            <div
              className="pointer-events-none absolute inset-x-0 
            bottom-0 h-[30%] bg-linear-to-t from-black/70 to-transparent z-1"
            />{" "}
            <Link
              className="absolute left-0 bottom-0 flex flex-col p-1.5"
              href={`/plants/${plant._id}`}
            >
              <span
                className="font-semibold  drop-shadow-md z-1 absolute-bottom-0 
              left-0 bg-(--color-primary-500) rounded-3xl p-0.75"
              >
                {plant.name}
              </span>
              <span className="italic text-xs text bg-(--color-primary-100) rounded-3xl">
                {plant.botanicalName}
              </span>
            </Link>
            {/* Reusable Component Used Here */}
            <OwnershipButton
              plant={plant}
              onOwnershipToggle={onOwnershipToggle}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
