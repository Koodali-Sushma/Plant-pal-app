import Link from "next/link";
import Image from "next/image";
import OwnershipButton from "./PlantOwnership/OwnershipButton";

export default function PlantCard({ plant, onOwnershipToggle }) {
  return (
    <li
      key={plant._id}
      className="group relative w-40 m-auto bg-primary-100 p-2 rounded-3xl min-h-58"
    >
      <Link
        href={`/plants/${plant._id}`}
        className="group block overflow-hidden"
      >
        <div className="relative h-40 w-full ">
          <Image
            blurDataURL={plant.imageUrl}
            src={plant.imageUrl}
            alt={plant.name}
            fill
            sizes="(max-width: 768px) 50vw, 300px"
            className="object-cover transition-transform duration-300 rounded-2xl"
            priority
            loading="eager"
          />{" "}
        </div>
        <div className="flex flex-col gap-0.5 p-1.5">
          <span className="font-semibold truncate">{plant.name}</span>
          <span className="italic text-xs">{plant.botanicalName}</span>
        </div>
      </Link>
      <OwnershipButton plant={plant} onOwnershipToggle={onOwnershipToggle} />
    </li>
  );
}
