import { SidebarContext } from "@/context/sidebar-context";
import { useContext } from "react";

export function useSidebar() {
  const context = useContext(SidebarContext);

  if (!context) throw Error("Cannot use SidebarContext outside its provider");

  return context;
}
