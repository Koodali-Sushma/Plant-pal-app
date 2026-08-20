/* --- NAVIGATION BAR ---*/

import { useRouter } from "next/router";
import Link from "next/link";

export default function Navigation() {
  const router = useRouter();

  /* !!!!! CORRECT LINKS MUST BE ADDED */
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">
            {/* link to my-plants */}
            <img src="/assets/plant.svg" alt="icon of a plant" />
            MyPlants
          </Link>
        </li>
        <li>
          <Link href="/">
            {/* link to plant-list */}
            <img src="/assets/explore.svg" alt="icon of a compass" />
            Explore
          </Link>
        </li>
        <li>
          <Link href="/">
            {/* link to rooms */}
            <img src="/assets/rooms.svg" alt="icon of a house" />
            Rooms
          </Link>
        </li>
      </ul>
    </nav>
  );
}
