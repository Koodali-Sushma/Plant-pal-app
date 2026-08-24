/* --- NAVIGATION BAR ---*/

import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

export default function Navigation() {
  const router = useRouter();

  /* !!!!! CORRECT LINKS MUST BE ADDED */
  return (
    <nav className="border-b sticky bottom-0">
      <ul className="mx-auto flex items-center justify-center gap-8">
        <li>
          <Link href="/" className="flex flex-col items-center gap-1">
            {/* link to my-plants */}
            <Image
              src="/assets/plant.svg"
              alt="icon of a plant"
              width={40}
              height={40}
            />
            MyPlants
          </Link>
        </li>
        <li>
          <Link
            href="/PlantListPage"
            className="flex flex-col items-center gap-1"
          >
            {/* link to plant-list */}
            <Image
              src="/assets/explore.svg"
              alt="icon of a compass"
              width={40}
              height={40}
            />
            Explore
          </Link>
        </li>
        <li>
          <Link href="/" className="flex flex-col items-center gap-1">
            {/* link to rooms */}
            <Image
              src="/assets/rooms.svg"
              alt="icon of a house"
              width={40}
              height={40}
            />
            Rooms
          </Link>
        </li>
      </ul>
    </nav>
  );
}
