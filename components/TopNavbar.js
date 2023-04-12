import topNavbarStyles from "@/styles/TopNavbar.module.css";
import Link from "next/link";
import { ListTask, PersonLinesFill } from "react-bootstrap-icons";

export default function TopNavbar() {
  return (
  <div>
    <nav className={topNavbarStyles.navbar + " container-fluid"}>
      <div className="container mx-5">
        <Link legacyBehavior href="/tasks" as={`/`}>
        <span className={topNavbarStyles.span}>
          <ListTask /> Tasks
         </span>
        </Link>
        <Link
            legacyBehavior
            href="/users"
            as={`/users`}
        >
        <span className={topNavbarStyles.span}>
          <PersonLinesFill /> Users
        </span>
        </Link>
      </div>
    </nav>
  </div>
  );
}