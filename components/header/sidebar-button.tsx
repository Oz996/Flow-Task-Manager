"use client";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/hooks/useSidebar";
import { Menu } from "lucide-react";

export default function SidebarButton() {
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  console.log("sidebarOpen", sidebarOpen);

  return (
    <Button
      className="bg-transparent p-1 hover:bg-main-light"
      aria-label={sidebarOpen ? "Closoe sidebar" : "Expand sidebar"}
      aria-expanded={sidebarOpen}
      onClick={() => setSidebarOpen(!sidebarOpen)}
    >
      <Menu size={28} />
    </Button>
  );
}
