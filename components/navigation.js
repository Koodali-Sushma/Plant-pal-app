/* --- NAVIGATION BAR ---*/

import { useRouter } from "next/router";
import Link from "next/link";

export default function Navigation() {
  const router = useRouter();

  /* !!!!! CORRECT LINKS MUST BE ADDED */
  return (
    <Nav>
      <List role="list">
        <li>
          <Link href="/" $isActive={router.pathname === "/"}>
            {" "}
            {/* link to my-plants */}
            MyPlants
          </Link>
        </li>
        <li>
          <Link href="/" $isActive={router.pathname === "/"}>
            {" "}
            {/* link to plant-list */}
            Explore
          </Link>
        </li>
        <li>
          <Link href="/" $isActive={router.pathname === "/"}>
            {" "}
            {/* link to rooms */}
            Rooms
          </Link>
        </li>
      </List>
    </Nav>
  );
}
