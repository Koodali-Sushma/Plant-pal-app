import Image from "next/image";

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
        e.stopPropagation(); // Prevents triggering parent Link clicks if nested
        console.log("Check button clicked");
        onOwnershipToggle(plant);
      }}
      className="absolute right-2 top-2 z-10 
      flex h-8 w-8 items-center justify-center
       rounded-full backdrop-blur-md transition-all 
       duration-200 shadow-md bg-white/80 hover:bg-white"
    >
      {plant.isOwned ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-5 h-5 text-green-600"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="currentColor"
        >
          <path d="M11.5 24.5l-8.5-8.5 2.83-2.83L11.5 18.83l16.17-16.17L30.5 5.5z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-5 h-5 stroke-gray-200"
          fill="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 16l8 8 16-18" />
        </svg>
      )}
    </button>
  );
}
