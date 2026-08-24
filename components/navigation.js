/* --- NAVIGATION BAR ---*/

import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

export default function Navigation() {
  const router = useRouter();

  /* !!!!! CORRECT LINKS MUST BE ADDED */
  return (
    <nav className="rounded-3xl sticky bottom-0 self-center-safe bg-(--color-secondary-500) z-10">
      <ul className="mx-auto flex items-center justify-center gap-8">
        <li>
          <Link href="/" className="flex flex-col items-center">
            {/* link to my-plants */}
            <Image 
              src="/assets/plant-light.svg"
              alt="icon of a plant"
              width={40}
              height={40}
            />
            MyPlants
          </Link>
        </li>
        <li>
          <Link href="/" className="flex flex-col items-center">
            {/* link to plant-list */}
            <Image
              src="/assets/explore-light.svg"
              alt="icon of a compass"
              width={40}
              height={40}
            />
            Explore
          </Link>
        </li>
        <li>
          <Link href="/" className="flex flex-col items-center p-0.5">
            {/* link to rooms */}
            <Image
              src="/assets/rooms-light.svg"
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
