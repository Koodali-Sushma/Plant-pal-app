import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function PlantList({ plants, onAddPlant, successMessage }) {
  return (
    <>
      <button
        type="button"
        onClick={onAddPlant}
        className="fixed bottom-20 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent-500 shadow-2xl transition hover:bg-primary-700 hover:shadow-xl"
      >
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
              className="absolute left-0 top-0 flex flex-col p-3"
              href={`/plants/${plant._id}`}
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
