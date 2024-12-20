"use client";
import { useSidebar } from "@/hooks/use-sidebar";
import { ReactNode } from "react";

// this component handles layout shifts for whenever sidebar opens and closes.
export default function MainLayout({ children }: { children: ReactNode }) {
  const { sidebarOpen } = useSidebar();

  return <main className="pt-20 h-[calc(100vh-3rem)]">{children}</main>;
}
