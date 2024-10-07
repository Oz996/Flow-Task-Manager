"use client";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function SidebarButton() {
  return (
    <Button className="bg-transparent p-1 hover:bg-main-light">
      <Menu size={28} />
    </Button>
  );
}
