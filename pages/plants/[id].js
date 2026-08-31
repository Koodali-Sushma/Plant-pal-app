import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import {
  WaterIcon,
  LightIcon,
  FertilizerIcon,
  EditIcon,
  DeleteIcon,
  SearchIcon,
  PartialShadeIcon,
  FullShadeIcon,
  ChevronDownIcon,
} from "@/components/SvgIcons";

const WATER_LEVELS = { Low: 1, Medium: 2, High: 3 };
const LIGHT_LEVELS = { "Full Shade": 1, "Partial Shade": 2, "Full Sun": 3 };

function CareLevelIcons({ Icon, total = 3, filled }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: total }).map((_, i) => (
        <Icon
          key={i}
          className={`h-5 w-5 text-secondary-900 ${i < filled ? "opacity-100" : "opacity-20"} `}
        />
      ))}
    </div>
  );
}

function CareCard({ label, children, icon }) {
  return (
    <div className="flex flex-col items-center gap-1 p-3 rounded-card bg-secondary-100 shadow-soft text-sm text-secondary-900">
      <span className="text-xs uppercase tracking-wide text-secondary-700">
        {label}
      </span>
      <div className="flex items-center gap-1">
        {children}
        {icon}
      </div>
    </div>
  );
}

export default function PlantDetails() {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  /* Show a temporary success message (=toast) after the plant has been updated */
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => {
    // Wait until the router is ready before accessing query parameters
    if (!router.isReady) return;

    if (router.query.updated === "true") {
      // Show the success toast after the current effect has finished
      const timer = setTimeout(() => {
        setShowSuccessToast(true);
      }, 0);

      // Remove the temporary query parameter from the URL without reloading the page
      router.replace(
        {
          pathname: `/plants/${id}`,
        },
        undefined,
        { shallow: true },
      );

      // Hide the success toast after five seconds
      const hideTimer = setTimeout(() => {
        setShowSuccessToast(false);
      }, 5000);

      // Clean up timers if the component unmounts or the effect runs again
      return () => {
        clearTimeout(timer);
        clearTimeout(hideTimer);
      };
    }
  }, [router, id]);

  const {
    data: plant,
    error,
    isLoading,
  } = useSWR(id ? `/api/plants/${id}` : null);

  async function handleDelete() {
    const response = await fetch(`/api/plants/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      router.push("/");
    }
  }

  const [activeImage, setActiveImage] = useState(0);

  if (isLoading)
    return <p className="mt-2 text-sm text-black-600">Loading...</p>;
  if (error)
    return <p className="mt-2 text-sm text-red-600">Something went wrong.</p>;
  if (!plant)
    return <p className="mt-2 text-sm text-red-600">Plant not found.</p>;

  const images = plant.images?.length
    ? plant.images
    : [plant.imageUrl].filter(Boolean);

  return (
    <main className="max-w-2xl mx-auto px-4 py-6 font-body text-foreground">
      <div className="relative rounded-card overflow-hidden shadow-soft">
        <Image
          src={images[activeImage]}
          alt={plant.name}
          className="w-full h-64 object-cover"
          width={200}
          height={200}
          priority
          loading="eager"
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
        <div className="flex absolute top-3 right-3 gap-3">
          <Link
            href={`/plants/${id}/edit`}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100/90 backdrop-blur-2xl hover:bg-primary-700 shadow-md transition-colors"
          >
            <EditIcon className="h-5 w-5" />
          </Link>
          <button
            onClick={() => setShowDeleteConfirmation(true)}
            disabled={!plant.userCreated}
            title={
              !plant.userCreated ? "This plant cannot be deleted" : undefined
            }
            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100/90 backdrop-blur-2xl hover:bg-primary-700 shadow-md transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none"
          >
            <DeleteIcon className="h-5 w-5 " />
          </button>
        </div>
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

      {showSuccessToast && (
        <p className="mb-6 rounded-xl border border-primary-500/30 bg-primary-100 px-4 py-3 text-center font-semibold text-primary-700 shadow-sm">
          Plant successfully updated
        </p>
      )}

      <h1 className="mt-6 font-heading text-2xl font-semibold">{plant.name}</h1>
      {plant.botanicalName && (
        <p className="italic text-primary-700">{plant.botanicalName}</p>
      )}
      {plant.description && (
        <p className="mt-3 text-foreground/80">{plant.description}</p>
      )}

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <CareCard
          label="Water"
          icon={
            <CareLevelIcons
              Icon={WaterIcon}
              filled={WATER_LEVELS[plant.waterNeed]}
            />
          }
        >
          {plant.waterNeed}
        </CareCard>
        <CareCard
          label="Light"
          icon={
            <>
              {plant.lightNeed === "Full Sun" && (
                <LightIcon className="h-6 w-6 text-secondary-900" />
              )}
              {plant.lightNeed === "Partial Shade" && (
                <PartialShadeIcon className="h-6 w-6 text-secondary-900" />
              )}
              {plant.lightNeed === "Full Shade" && (
                <FullShadeIcon className="h-6 w-6 text-secondary-900" />
              )}
            </>
          }
        >
          {plant.lightNeed}
        </CareCard>
        <CareCard
          label="Fertilise"
          icon={<FertilizerIcon className="h-5 w-5 text-secondary-900" />}
        >
          {plant.fertiliserSeason?.join(", ")}
        </CareCard>
      </div>
    </main>
  );
}
