"use client";
import { useSidebar } from "@/hooks/useSidebar";

export default function Container({ children }: any) {
  const { sidebarOpen } = useSidebar();

  // handles layout shift whenever sidebar is opened/closed
  return (
    <div
      className={`ease-linear duration-200 ${sidebarOpen ? "pl-[18.5rem]" : "pl-0"}`}
    >
      {children}
    </div>
  );
}