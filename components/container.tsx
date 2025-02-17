"use client";
import { useSidebar } from "@/hooks/use-sidebar";

export default function Container({ children }: any) {
  const { sidebarOpen } = useSidebar();

  // handles layout shift whenever sidebar is opened/closed
  return (
    <div
      className={`ease-linear duration-200 ${sidebarOpen ? "md:pl-[18.5rem]" : "pl-0"}`}
    >
      {children}
    </div>
  );
}
