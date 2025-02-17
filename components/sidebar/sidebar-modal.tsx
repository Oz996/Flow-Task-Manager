import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Menu } from "lucide-react";
import SidebarProjects from "./sidebar-projects";
import SidebarModalContainer from "./sidebar-modal-container";

export default function SidebarModal() {
  // Tablet navbar
  return (
    <SidebarModalContainer>
      <DialogContent className="w-[20rem] h-[25rem] top-[35%] overflow-auto rounded-lg">
        <SidebarProjects />
      </DialogContent>
    </SidebarModalContainer>
  );
}
