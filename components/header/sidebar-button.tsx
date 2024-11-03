"use client";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/hooks/useSidebar";
import { Menu } from "lucide-react";

export default function SidebarButton() {
  const { sidebarOpen, setSidebarOpen } = useSidebar();

  return (
    <Button
      aria-controls="sidebar"
      aria-label={sidebarOpen ? "Close sidebar" : "Expand sidebar"}
      className="text-white bg-transparent p-1 hover:bg-main-light"
      onClick={() => setSidebarOpen(!sidebarOpen)}
    >
      <Menu size={22} />
    </Button>
  );
}
