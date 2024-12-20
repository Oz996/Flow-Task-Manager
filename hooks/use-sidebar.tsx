import { SidebarContext } from "@/context/sidebar-context";
import { use } from "react";

export function useSidebar() {
  const context = use(SidebarContext);

  if (!context) throw Error("Cannot use SidebarContext outside its provider");

  return context;
}
