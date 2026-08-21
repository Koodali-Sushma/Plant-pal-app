import { useState } from "react";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

/* temporary ROOMS */

const ROOMS = ["Kitchen", "Balcony", "Living Room", "Bedroom"];

function CareCard({ label, children }) {
  return (
    <div>
      <span>{label}</span>
      <div>{children}</div>
    </div>
  );
}

export default function PlantDetails() {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: plant,
    error,
    isLoading,
  } = useSWR(id ? `/api/plants/${id}` : null, fetcher);

  const [activeImage, setActiveImage] = useState(0);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong.</p>;
  if (!plant) return <p>Plant not found.</p>;

  const images = plant.images?.length
    ? plant.images
    : [plant.imageUrl].filter(Boolean);

  return (
    <main>
      <button onClick={() => router.back()}>← Back</button>

      <div>
        <img src={images[activeImage]} alt={plant.name} />
        {images.length > 1 && (
          <div>
            {images.map((_, i) => (
              <button key={i} onClick={() => setActiveImage(i)}>
                •
              </button>
            ))}
          </div>
        )}
      </div>

      <h1>{plant.name}</h1>
      {plant.botanicalName && <p>{plant.botanicalName}</p>}
      {plant.description && <p>{plant.description}</p>}

      <div>
        <CareCard label="Water">{plant.waterNeed}</CareCard>
        <CareCard label="Light">{plant.lightNeed}</CareCard>
        <CareCard label="Fertilise">
          {plant.fertiliserSeason?.join(", ")}
        </CareCard>
      </div>

      <div>
        <label>Assign to a room</label>
        <select>
          <option value="">Select a room...</option>
          {ROOMS.map((room) => (
            <option key={room} value={room}>
              {room}
            </option>
          ))}
        </select>
      </div>
    </main>
  );
}
