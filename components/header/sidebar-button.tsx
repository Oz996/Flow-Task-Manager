"use client";
import { useSidebar } from "@/hooks/useSidebar";
import { Menu } from "lucide-react";

export default function SidebarButton() {
  const { sidebarOpen, setSidebarOpen } = useSidebar();

  return (
    <button
      aria-controls="sidebar"
      aria-label={sidebarOpen ? "Close sidebar" : "Expand sidebar"}
      className="p-2 text-white hover:bg-transparent/20 duration-200 rounded-lg"
      onClick={() => setSidebarOpen(!sidebarOpen)}
    >
      <Menu size={22} />
    </button>
  );
}
