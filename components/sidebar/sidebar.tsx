"use client";

import { useSidebar } from "@/hooks/useSidebar";
import { AnimatePresence, motion } from "framer-motion";

export default function Sidebar() {
  const { sidebarOpen } = useSidebar();

  return (
    <AnimatePresence>
      {sidebarOpen && (
        <motion.aside
          className="bg-main mt-[3rem] h-screen"
          initial={{ width: 0 }}
          animate={{ width: "16rem" }}
          exit={{ width: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div></div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
