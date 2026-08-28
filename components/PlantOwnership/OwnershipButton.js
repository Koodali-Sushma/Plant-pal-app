import { BookmarkFilledIcon, BookmarkIcon } from "../SvgIcons";
import { useState } from "react";

export default function OwnershipButton({ plant, onOwnershipToggle }) {
  const [failed, setFailed] = useState(false);

  async function handleClick(e) {
    e.stopPropagation();
    setFailed(false);

    try {
      await onOwnershipToggle(plant);
    } catch (error) {
      console.error("Failed to update plant ownership:", error);
      setFailed(true);
    }
  }

  return (
    <>
      <button
        type="button"
        aria-label={
          plant.isOwned
            ? `Mark ${plant.name} as not owned`
            : `Mark ${plant.name} as owned`
        }
        aria-pressed={Boolean(plant.isOwned)}
        onClick={handleClick}
        className="absolute right-3 top-3 z-10 
      flex h-8 w-8 items-center justify-center
       rounded-full backdrop-blur-md transition-all 
       duration-200 shadow-md bg-white/80 hover:bg-white"
      >
        {plant.isOwned ? (
          <BookmarkFilledIcon className={`text-primary-500 p-1`} />
        ) : (
          <BookmarkIcon className={`text-secondary-800 p-1`} />
        )}
      </button>

      {failed && (
        <p className="absolute right-3 top-12 z-10 text-xs text-red-600">
          Failed to update ownership.
        </p>
      )}
    </>
  );
}
