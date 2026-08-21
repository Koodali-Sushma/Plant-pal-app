import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function PlantList({ plants, onAddPlant, successMessage }) {
  return (
    <>
      <button type="button" onClick={onAddPlant}>
        <Image src="/assets/plus.svg" alt="plus sign" width={40} height={40} />
      </button>

      {/* shows message when new plant is successfully added */}
      {successMessage && (
        <p className="mb-6 rounded-xl border border-primary-500/30 bg-primary-100 px-4 py-3 text-center font-semibold text-primary-700 shadow-sm">
          {successMessage}
        </p>
      )}

      <div className="grid grid-cols-2 m-auto gap-5  list-none w-100">
        {plants.map((plant) => (
          <li
            key={plant._id}
            className=" group relative h-48 w-48 overflow-hidden rounded-xl border"
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
              className="absolute left-0 top-0 flex flex-col p-3"
              href={`/${plant._id}`}
            >
              <span className="font-semibold text-white drop-shadow-md z-1 absolute-bottom-0 left-0">
                {plant.name}
              </span>
              <span className="text-sm text-blue drop-shadow-md">
                {plant.botanicalName}
              </span>
            </Link>
          </li>
        ))}
      </div>
    </>
  );
}
