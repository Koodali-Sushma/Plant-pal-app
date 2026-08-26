import { useState } from "react";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";
import Link from "next/link";

const fetcher = (url) => fetch(url).then((res) => res.json());

/* temporary ROOMS */

const ROOMS = ["Kitchen", "Balcony", "Living Room", "Bedroom"];

function CareCard({ label, children }) {
  return (
    <div className="flex flex-col items-center gap-1 p-3 rounded-card bg-secondary-100 shadow-soft text-sm text-secondary-900">
      <span className="text-xs uppercase tracking-wide text-secondary-700">
        {label}
      </span>
      <div>{children}</div>
    </div>
  );
}

export default function PlantDetails() {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  const {
    data: plant,
    error,
    isLoading,
  } = useSWR(id ? `/api/plants/${id}` : null, fetcher);

  async function handleDelete() {
    const response = await fetch(`/api/plants/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      router.push("/");
    }
  }

  const [activeImage, setActiveImage] = useState(0);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong.</p>;
  if (!plant) return <p>Plant not found.</p>;

  const images = plant.images?.length
    ? plant.images
    : [plant.imageUrl].filter(Boolean);

  return (
    <main className="max-w-2x1 mx-auto px-4 py-6 font-body text-foreground">
      <div className="flex justify-between items-center mb-4">
        <Link
          href={`/plants/${id}/edit`}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-colors text-sm"
        >
          Edit Plant
        </Link>
        {plant.userCreated && (
          <button
            onClick={() => setShowDeleteConfirmation(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-colors text-sm"
          >
            Delete
          </button>
        )}
      </div>
      {showDeleteConfirmation && (
        <div className="mb-4 p-4 rounded-card bg-red-50 border border-red-200 shadow-soft">
          <p className="text-secondary-700  font-semibold mb-3">
            Are you sure you want to delete this plant?
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleDelete}
              className="bg-(--color-secondary-500) hover:bg-(--color-secondary-700) text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Confirm
            </button>
            <button
              type="button"
              onClick={() => setShowDeleteConfirmation(false)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="relative rounded-card overflow-hidden shadow-soft">
        <img
          src={images[activeImage]}
          alt={plant.name}
          className="w-full h-64 object-cover"
        />
        {images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`h-2 w-2 rounded-full ${i === activeImage ? "bg-primary-500" : "bg-primary-100"}`}
              >
                •
              </button>
            ))}
          </div>
        )}
      </div>

      <h1 className="mt-6 font-heading text-2xl font-semibold">{plant.name}</h1>
      {plant.botanicalName && (
        <p className="italic text-primary-700">{plant.botanicalName}</p>
      )}
      {plant.description && (
        <p className="mt-3 text-foreground/80">{plant.description}</p>
      )}

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <CareCard label="Water">{plant.waterNeed}</CareCard>
        <CareCard label="Light">{plant.lightNeed}</CareCard>
        <CareCard label="Fertilise">
          {plant.fertiliserSeason?.join(", ")}
        </CareCard>
      </div>
      {/* 
      <div className="mt-6 p-4 rounded-card bg-primary-100 shadow-soft">
        <label className="block text-sm font-medium text-primary-700 mb-1">
          Assign to a room
        </label>
        <select className="w-full rounded-card border border-primary-500/30 px-3 py-2 bg-background">
          <option value="">Select a room...</option>
          {ROOMS.map((room) => (
            <option key={room} value={room}>
              {room}
            </option>
          ))}
        </select>
      </div> */}
    </main>
  );
}
