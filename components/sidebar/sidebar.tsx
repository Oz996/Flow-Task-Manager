import { CircleCheck, House } from "lucide-react";
import Link from "next/link";
import SidebarContainer from "./sidebar-container";
import SidebarProjects from "./sidebar-projects";
import { iconSize } from "@/lib/constants";

export default function Sidebar() {
  return (
    <SidebarContainer>
      <nav className="py-5 border-b border-b-main-border">
        <ul className="flex flex-col text-sm px-4">
          <li>
            <Link
              href="/"
              className="flex gap-2 items-center rounded-lg px-3 py-2 hover:bg-main-light duration-200"
            >
              <House size={iconSize} />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="flex gap-2 items-center rounded-lg px-3 py-2 hover:bg-main-light duration-200"
            >
              <CircleCheck size={iconSize} />
              <span>My Tasks</span>
            </Link>
          </li>
        </ul>
      </nav>
      <SidebarProjects />
    </SidebarContainer>
  );
}
