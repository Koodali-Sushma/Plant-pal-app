import Image from "next/image";
import { BookmarkFilledIcon, BookmarkIcon } from "../SvgIcons";

export default function OwnershipButton({ plant, onOwnershipToggle }) {
  return (
    <button
      type="button"
      aria-label={
        plant.isOwned
          ? `Mark ${plant.name} as not owned`
          : `Mark ${plant.name} as owned`
      }
      aria-pressed={Boolean(plant.isOwned)}
      onClick={(e) => {
        e.stopPropagation();
        console.log("Check button clicked");
        onOwnershipToggle(plant);
      }}
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
  );
}
