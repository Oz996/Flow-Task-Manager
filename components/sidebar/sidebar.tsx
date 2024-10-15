import { CircleCheck, House } from "lucide-react";
import Link from "next/link";
import SidebarContainer from "./sidebar-container";
import ModalButton from "./modal-button";
import ProjectModal from "../modals/project-modal/project-modal";

export default function Sidebar() {
  const iconSize = 18;

  return (
    <SidebarContainer>
      <nav className="py-5 border-b border-b-main-light">
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
      <nav className="py-5 px-4">
        <div className="flex justify-between items-center font-semibold px-3">
          <h2>Projects</h2>
          <ModalButton />
        </div>
        <ul></ul>
      </nav>
      <ProjectModal />
    </SidebarContainer>
  );
}
