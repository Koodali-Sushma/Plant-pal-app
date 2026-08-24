import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function PlantList({ plants, onAddPlant }) {
  return (
    <>
      <button type="button" onClick={onAddPlant}className="absolute top-4 z-31 right-20 cursor-pointer">
        <Image src="/assets/plus-light.svg" alt="plus sign" width={40} height={40} />
      </button>
      <div className="grid grid-cols-2 m-auto gap-1  list-none w-100 ">
        {plants.map((plant) => (
          <li
            key={plant._id}
            className=" group relative h-40 w-40 m-auto overflow-hidden rounded-3xl border-(--color-secondary-500)"
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
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[30%] bg-linear-to-t from-black/70 to-transparent z-1" />{" "}
            <Link
              className="absolute left-0 bottom-0 flex flex-col p-3"
              href={`/${plant._id}`}
            >
              <span className="font-semibold  drop-shadow-md z-1 absolute-bottom-0 left-0 bg-(--color-secondary-500)/60 rounded-3xl p-0.75">
                {plant.name}
              </span>
              <span className="text-sm text-(--color-secondary-500)">
                {plant.botanicalName}
              </span>
            </Link>
          </li>
        ))}
      </div>
    </>
  );
}
