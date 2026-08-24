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
      className="fixed bottom-4 left-4 right-4 border bg-secondary-100/70 backdrop-blur-md text-secondary-700
      z-50
      rounded-full
      pt-2
      pb-2"
    >
      <ul className="mx-auto flex items-center justify-center gap-12">
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
