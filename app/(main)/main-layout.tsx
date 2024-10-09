"use client";
import { useSidebar } from "@/hooks/useSidebar";
import { ReactNode } from "react";

// this component handles layout shifts for whenever sidebar opens and closes.
export default function MainLayout({ children }: { children: ReactNode }) {
  const { sidebarOpen } = useSidebar();

  return (
    <main
      className={`pt-20 ease-linear duration-200 ${sidebarOpen ? "ml-[18.5rem]" : "ml-0"}`}
    >
      {children}
    </main>
  );
}
