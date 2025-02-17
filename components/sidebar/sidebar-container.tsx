"use client";
import { useSidebar } from "@/hooks/use-sidebar";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

export default function SidebarContainer({
  children,
}: {
  children: ReactNode;
}) {
  const { sidebarOpen } = useSidebar();

  return (
    <AnimatePresence initial={false}>
      {sidebarOpen && (
        <motion.aside
          key="sidebar"
          aria-expanded={sidebarOpen}
          className="bg-main hidden md:block fixed w-[18.5rem] left-0 bottom-0 top-12 h-screen z-10"
          initial={{ left: "-18.5rem" }}
          animate={{ left: 0 }}
          exit={{ left: "-18.5rem" }}
          transition={{ duration: 0.2, ease: "linear" }}
        >
          <motion.div
            key="sidebar-content"
            className="overflow-ellipsis text-nowrap text-white text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1, ease: "linear" }}
          >
            {children}
          </motion.div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
