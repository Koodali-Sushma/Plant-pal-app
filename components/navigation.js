/* --- NAVIGATION BAR ---*/

import { useRouter } from "next/router";
import Link from "next/link";
import { MyPlantsIcon, ExploreIcon, RoomsIcon } from "./svgicons";

export default function Navigation() {
  const router = useRouter();

  const isMyPlants = router.pathname === "/";
  const isExplore = router.pathname === "/PlantListPage";
  /*   const isRooms = router.pathname === "/rooms"; */

  return (
  <nav
      className="rounded-3xl sticky bottom-0.5 self-center-safe bg-(--color-secondary-500) z-10 backdrop-blur-md 
      pt-2
      pb-2"
    >
      <ul className="mx-auto flex items-center justify-center gap-8">
        <li>
          <Link
            href="/"
            className={`flex flex-col items-center rounded-full p-2 ${isMyPlants ? "bg-accent-500 text-secondary-800" : ""}`}
          >
            <MyPlantsIcon
              className={`h-10 w-10 ${isMyPlants ? "text-secondary-800" : "text-secondary-700"}`}
            />
          </Link>
        </li>
        <li>
          <Link
            href="/PlantListPage"
            className={`flex flex-col items-center rounded-full p-2 ${isExplore ? "bg-accent-500 text-secondary-900" : ""}`}
          >
            <ExploreIcon
              className={`h-10 w-10 ${isExplore ? "text-secondary-800" : "text-secondary-700"}`}
            />
          </Link>
        </li>
        {/*         <li>
          <Link
            href="/rooms"
            className={`flex flex-col items-center rounded-full p-2 ${isRooms ? "bg-accent-500 text-secondary-900" : ""}`}
          >
            <RoomsIcon
              className={`h-10 w-10 ${isRooms ? "text-secondary-800" : "text-secondary-700"}`}
            />
          </Link>
        </li> */}
      </ul>
    </nav>
  );
}
